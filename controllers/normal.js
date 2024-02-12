const fs = require('fs')
const path = require('path')
const { v4: uuid } = require('uuid')
const moment = require('moment')
// const { generateMessage } = require("../services/llm")
// const llm = require('../services/llm')
const db = require('../db')
const llm = require('../services/llm')

exports.me = async (req, res) => {
  res.status(200).send({
    id: req.user.id,
    email: req.user.email,
    name: req.user.name,
    role: req.user.role,
    profile: req.user.profile
  })
}

exports.homeSetting = async (req, res) => {
  const homeSetting = await db.homeSetting.findOne({})
  res.json({
    homeSetting
  })
}

exports.findOutMore = async (req, res) => {
  const findOutMore = await db.blog.findOne({})
  res.json({
    findOutMore
  })
}

exports.sendMessage = (req, res) => {
  let { messages } = req.body
  db.homeSetting.findOne({})
    .then(homeSetting => {
      llm.generateMessage({ prompt: homeSetting.prompt, useVectorDB: true, messages, wordLimit: 100, type: 'widgetbot' })
        .then(content => {
          if (!content) {
            throw ('no content')
          }
          return res.json({
            content
          })
        }).catch(err => {
          console.log(err)
          return res.status(500).send({ message: { error: 'Please try again later' } })
        })
    }).catch(err => {
      console.log(err)
      return res.status(500).send({ message: { error: 'Please try again later' } })
    })
}

exports.detectSegment = (req, res) => {
  let { messages } = req.body
  db.homeSetting.findOne({})
    .then(homeSetting => {
      llm.getSegment({ prompt: homeSetting.widgetPrompt, useVectorDB: true, messages })
        .then(async (segmentDetectionContent) => {
          segmentDetectionContent = segmentDetectionContent.trim()
          const detectedBrochure = segmentDetectionContent.split('/')[0]?.trim()
          const brochure = await db.brochure.findOne({ where: { segment: detectedBrochure } })
          const percentage = Number(segmentDetectionContent.split('/')[1]?.trim())
          const rationale = segmentDetectionContent.split('/')[2]?.trim()
          console.log('=========================')
          console.log("temp:", segmentDetectionContent)
          console.log('------------------------')
          console.log("brochure:", brochure)
          console.log('------------------------')
          console.log("percentage:", percentage || 0)
          console.log('------------------------')
          console.log("rationale:", rationale || 'The user has not provided enough information yet.')
          console.log('------------------------')
          return res.json({
            segment: {
              brochure,
              percentage: percentage || 0,
              rationale: rationale || 'The user has not provided enough information yet.'
            }
          })
        }).catch(err => {
          console.log(err)
          return res.status(500).send({ message: { error: 'Please try again later' } })
        })

    }).catch(err => {
      console.log(err)
      return res.status(500).send({ message: { error: 'Please try again later' } })
    })
}

exports.brochure = async (req, res) => {
  try {
    let number = Number(req.query.number)
    const brochure = await db.brochure.findOne({ where: { number } })
    if (!brochure) {
      return res.status(400).send({
        message: { error: 'Brochure not found' }
      })
    }
    return res.json({
      brochure
    })
  } catch (err) {
    return res.status(500).send({
      message: { error: 'Please try again later' }
    })
  }
}

exports.sitebotSendMessage = async (req, res) => {
  try {
    let { messages } = req.body
    const homeSetting = await db.homeSetting.findOne({})
    const content = await llm.generateMessage({ prompt: homeSetting.sitebotPrompt, type: 'sitewidebot', messages, useVectorDB: true, wordLimit: 100 })

    if (!content) {
      throw ('no content')
    }
    return res.json({
      content
    })
  } catch (err) {
    console.log(err)
    return res.status(500).send({ message: { error: 'Please try again later' } })
  }
}

exports.widgetbotHistory = async (req, res) => {
  try {
    const { chatbotIndex, question, answer, segment, type, chatHistory } = req.body;
    await db.chatbotQuestion.create({
      chatbotIndex,
      question,
      answer,
      segment: segment?.brochure?.segment || null,
      percentage: segment?.percentage || 0,
      rationale: segment?.rationale || null,
      number: segment?.brochure?.number || 0,
      chatHistory: chatHistory?.map(history => history.role==='user'?'User: ':'Bot: ' + history.content).join('\n') || null,
      type
    })
  } catch (err) {
    console.log(err)
  }
  res.json({})
}

exports.initWidgetbot = async (req, res) => {
  try {
    const homeSetting = await db.homeSetting.findOne({})
    await homeSetting.update({ widgetbotIndex: homeSetting.widgetbotIndex + 1 })
    return res.json({
      index: homeSetting.widgetbotIndex
    })
  } catch (err) { return res.status(500).send({ message: { error: 'Please try again later' } }) }
}

exports.initSitewidebot = async (req, res) => {
  try {
    const homeSetting = await db.homeSetting.findOne({})
    await homeSetting.update({ sitewidebotIndex: homeSetting.sitewidebotIndex + 1 })
    return res.json({
      index: homeSetting.sitewidebotIndex,
      sitebotGreeting: homeSetting.sitebotGreeting
    })
  } catch (err) { return res.status(500).send({ message: { error: 'Please try again later' } }) }
}

exports.botHistory = async (req, res) => {
  try {
    let { page, pageSize, type } = req.query
    page = Number(page)
    pageSize = Number(pageSize)
    const totalCount = await db.chatbotQuestion.count({ where: { type } });
    const totalPage = Math.ceil(totalCount / pageSize) || 1
    if (page > totalPage) page = totalPage
    const history = await db.chatbotQuestion.findAll({
      where: { type },
      order: [
        ['createdAt', 'DESC']
      ],
      offset: (page - 1) * pageSize,
      limit: pageSize
    })

    return res.json({
      history,
      page,
      totalPage,
      totalCount
    })
  } catch (err) {
    return res.status(500).send({
      message: { error: 'Please try again later.' }
    })
  }
}