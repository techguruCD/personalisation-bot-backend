const Joi = require('joi')
const validator = require('express-joi-validation').createValidator({
  passError: true,
  statusCode: 400
})

const blog = validator.body(
  Joi.object({
    content: Joi.string().min(1).required().label('Content'),
  }).required()
)

const homeSetting = validator.body(
  Joi.object({
    key: Joi.string().min(1).valid(
      'mainTitle', 
      'subTitle', 
      'text', 
      'chatbotTitle',
      'chatbotSubTitle',
      'segmentTitle',
      'segmentSubTitle',
      'segmentLabel1',
      'segmentLabel2',
      'segmentLabel3',
      'segmentLabel4',
      'prompt',
      ).required(),
    value: Joi.string().min(1).required()
  })
)

module.exports = {
  blog,
  homeSetting
}