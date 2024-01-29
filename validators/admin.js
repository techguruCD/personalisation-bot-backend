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

module.exports = {
  blog
}