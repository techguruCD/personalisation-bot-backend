const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const Handlebars = require('handlebars')
const fs = require('fs')
const path = require('path')

const db = require('../db')

exports.updateFindOutMore = async (req, res) => {
  try {
    const { content } = req.body;
    const findOutMore = await db.blog.findOne({})
    await findOutMore.update({
      content
    })
    return res.json({
      findOutMore,
      message: { success: 'Blog updated successfully' }
    })
  } catch (err) {
    return res.status(500).send({
      message: { error: 'Please try again later' }
    })
  }
}

exports.updateHomeSetting = async (req, res) => {
  try {
    const {key, value} = req.body;
    const homeSetting = await db.homeSetting.findOne({})
    await homeSetting.update({
      [key]: value
    })
    return res.json({
      message: {success: 'Updated successfully'}
    })
  } catch (err) {
    return res.status(500).send({
      message: {error: 'Please try again later'}
    })
  }
}