const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const Handlebars = require('handlebars')
const fs = require('fs')
const path = require('path')

const db = require('../db')

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await db.user.findOne({ where: { email } })
    if (!user) {
      return res.status(401).send({
        message: { error: "Invalid credentials" }
      })
    }
    const passwordIsValid = bcrypt.compareSync(password, user.password)
    if (!passwordIsValid) {
      return res.status(401).send({
        message: { error: "Invalid credentials" }
      })
    }
    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      {
        algorithm: 'HS256',
        allowInsecureKeySizes: true,
        expiresIn: 1814400, //21 days
      }
    )
    res.status(200).send({ token })
  } catch (err) {
    console.log(err)
    res.status(500).send({ message: { error: 'Please try again later' } })
  }
}