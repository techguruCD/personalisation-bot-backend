const fs = require('fs')
const path = require('path')
const { v4: uuid } = require('uuid')
const moment = require('moment')
// const { generateMessage } = require("../services/llm")
// const llm = require('../services/llm')
const db = require('../db')

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