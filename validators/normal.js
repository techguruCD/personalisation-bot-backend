const Joi = require('joi')
const validator = require('express-joi-validation').createValidator({
  passError: true,
  statusCode: 400
})

const brochure = validator.query(
  Joi.object({
    number: Joi.number().min(0).max(6).required().label('Brochure number'),
  }).required()
)

module.exports = {
  brochure
}