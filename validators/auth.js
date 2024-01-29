const Joi = require('joi')
const validator = require('express-joi-validation').createValidator({
  passError: true,
  statusCode: 400
})

const login = validator.body(
  Joi.object({
    email: Joi.string().email().required().label('Email'),
    password: Joi.string().min(1).required().label('Password')
  }).required()
)

module.exports = {
  login
}