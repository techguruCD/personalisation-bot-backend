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