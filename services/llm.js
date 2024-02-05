const fs = require('fs')
const path = require('path')
const Handlebars = require('handlebars')
// const { OpenAIEmbeddings } = require('langchain/embeddings/openai')
const { OpenAIEmbeddings } = require('@langchain/openai')
const { Pinecone } = require('@pinecone-database/pinecone')
// const { PineconeStore } = require('langchain/vectorstores/pinecone')
const { PineconeStore } = require('@langchain/pinecone')
const { PDFLoader } = require('langchain/document_loaders/fs/pdf')
const { OpenAIClient, AzureKeyCredential } = require('@azure/openai')

Handlebars.registerHelper('eq', function(arg1, arg2) {
  return arg1 === arg2;
});

Handlebars.registerHelper('joinArray', function(array) {
  return array.join(', ');
});

Handlebars.registerHelper('toLowerCase', function(str) {
  return str.toLowerCase();
});

Handlebars.registerHelper('toUpperCase', function(str) {
  return str.toUpperCase();
});

global.CONVERSATION_CHAIN = {}

const embeddings = new OpenAIEmbeddings({
  azureOpenAIApiKey: process.env.AZURE_OPENAI_KEY,
  azureOpenAIApiVersion: process.env.AZURE_OPENAI_CHAT_VERSION,
  azureOpenAIApiInstanceName: process.env.AZURE_OPENAI_INSTANCE_NAME,
  azureOpenAIApiDeploymentName: process.env.AZURE_OPENAI_DEPLOYMENT_NAME,
})

const pinecone = new Pinecone();
const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX_NAME)

// const pineconeStore = new PineconeStore(embeddings, { pineconeIndex })
const openAIClient = new OpenAIClient(process.env.AZURE_OPENAI_BASE_URL, new AzureKeyCredential(process.env.AZURE_OPENAI_KEY))

async function saveFileEmbedding({ filePath, fileId }) {
  const loader = new PDFLoader(filePath)
  const docs = (await loader.load()).map(doc => ({
    pageContent: doc.pageContent,
    metadata: {
      app: process.env.APP,
      fileId
    }
  }))
  const vectorStore = await PineconeStore.fromExistingIndex(embeddings, { pineconeIndex })
  await vectorStore.addDocuments(docs)
}

async function delFileEmbedding({ fileId }) {
  console.log(fileId, process.env.APP)
  const vectorStore = await PineconeStore.fromExistingIndex(embeddings, { pineconeIndex })
  await vectorStore.delete({
    filter: {
      app: { $eq: process.env.APP },
      fileId: { $eq: fileId }
    }
  })
}

async function generateMessage({ prompt, messages }) {
  const vectorStore = await PineconeStore.fromExistingIndex(embeddings, { pineconeIndex })
  const inputDocs = (await vectorStore.similaritySearchWithScore(messages[messages.length - 1].content, 5, { app: { $eq: process.env.APP } }))
  inputDocs.sort((a, b) => b[1] - a[1])
  let systemContent = ""

  for (let i = 5; i > 1; i--) {
    let inputDoc = inputDocs.slice(0, i).map((doc, index) => `- Document ${index + 1}: ${doc[0].pageContent}`).join('\n')
    systemContent = `Similarity Docs: ${inputDoc}\n\nPrompt:"${prompt}\n********************************\n"`
    if (systemContent.length <= 8192) break;
  }

  try {
    const result = await openAIClient.getChatCompletions(process.env.AZURE_OPENAI_CHAT_DEPLOYMENT_ID, [
      {
        role: 'system',
        content: systemContent
      },
      ...messages
    ])
    return result.choices?.[0]?.message?.content
  } catch (err) {
    return null;
  }
}

const segmentDetectionPrompt = Handlebars.compile(fs.readFileSync(path.join(__dirname, '../configs/prompts/segmentDetection.hbs'), 'utf8'))

async function getSegment({ prompt, messages }) {
  const vectorStore = await PineconeStore.fromExistingIndex(embeddings, { pineconeIndex })
  // const inputDocs = (await vectorStore.similaritySearchWithScore(messages[messages.length - 1].content, 5, { app: { $eq: process.env.APP } }))
  // inputDocs.sort((a, b) => b[1] - a[1])
  let systemContent = ""

  for (let i = 5; i > 1; i--) {
    // let inputDoc = inputDocs.slice(0, i).map((doc, index) => `- Document ${index + 1}: ${doc[0].pageContent}`).join('\n')
    systemContent = `${prompt}\nNow here are some of the setences that our customer said. You need to detect what kind of user the customer is. This determination is very important to my business. You don't need to reply any no-neccessary words. Just Definitely Respond by one of these 6 results as well as only definitely percentage like "20%": "Quality Seeke", "Strategic Saver", "Habitual Sprinter", "Dollar Defaulter", "Passionate Explorer", "Opportunistic Adventurer"\n`
    systemContent += messages.map(message => (message.role==='assistant'?'Interviewer':'Customer') + ': ' + message.content).join('\n')
    systemContent += '\n\nIdentify the User Type:'
    // systemContent = `${prompt}\nNow here are some of the setences that our customer said. You need to detect what kind of user the customer is.`
    // systemContent += messages.filter(message => message.rol === 'Customer').map(message => "Customer: " + message.content).join('\n')
    if (systemContent.length <= 8192) break;
  }

  const content = segmentDetectionPrompt({
    messages: messages.map(message => ({...message, content: message.content.replace(/[\n]/g, '. ')})),
    prompt
  })
  console.log(content)

  try {
    const result = await openAIClient.getChatCompletions(process.env.AZURE_OPENAI_CHAT_DEPLOYMENT_ID, [
      {
        role: 'system',
        content
      }
    ])
    return result.choices?.[0]?.message?.content
  } catch (err) {
    return null;
  }
}

module.exports = {
  delFileEmbedding,
  generateMessage,
  saveFileEmbedding,
  getSegment
}