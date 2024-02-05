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

exports.sendMessage = async (req, res) => {
  try {
    let { messages } = req.body
    const homeSetting = await db.homeSetting.findOne({})
    const content = await llm.generateMessage({prompt: homeSetting.prompt, messages})
    const segmentDetectionContent = (await llm.getSegment({prompt: homeSetting.widgetPrompt, messages})).trim()
    const detectedBrochure = segmentDetectionContent.split('/')[0]?.trim()
    const brochure = await db.brochure.findOne({where: {segment: detectedBrochure}})
    const percentage = Number(segmentDetectionContent.split('/')[1]?.trim())
    const rationale = segmentDetectionContent.split('/')[2]?.trim()
    console.log('=========================')
    console.log("temp:", segmentDetectionContent)
    console.log('------------------------')
    console.log("brochure:", brochure)
    console.log('------------------------')
    console.log("percentage:", percentage)
    console.log('------------------------')
    console.log("rationale:", rationale)
    console.log('------------------------')

    if (!content) {
      throw ('no content')
    }
    return res.json({
      content,
      segment: {
        brochure,
        percentage,
        rationale
      }
    })
  } catch (err) {
    console.log(err)
    return res.status(500).send({ message: { error: 'Please try again later' } })
  }
}

exports.brochure = async (req, res) => {
  try {
    let number = Number(req.query.number)
    const brochure = await db.brochure.findOne({where: {number}})
    if (!brochure) {
      return res.status(400).send({
        message: {error: 'Brochure not found'}
      })
    }
    return res.json({
      brochure
    })
  } catch (err) {
    return res.status(500).send({
      message: {error: 'Please try again later'}
    })
  }
}