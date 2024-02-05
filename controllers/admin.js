const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const Handlebars = require('handlebars')
const fs = require('fs')
const path = require('path')
const { v4: uuidv4 } = require('uuid')

const db = require('../db')
const llm = require('../services/llm')

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
    const { key, value } = req.body;
    const homeSetting = await db.homeSetting.findOne({})
    await homeSetting.update({
      [key]: value
    })
    return res.json({
      message: { success: 'Updated successfully' }
    })
  } catch (err) {
    return res.status(500).send({
      message: { error: 'Please try again later' }
    })
  }
}

exports.brochures = async (req, res) => {
  try {
    const brochures = await db.brochure.findAll({
      order: [
        ['number', 'ASC']
      ]
    })
    return res.json({
      brochures
    })
  } catch (err) {
    return res.status(500).send({
      message: { error: 'Please try again later' }
    })
  }
}

exports.brochureUpload = async (req, res) => {
  try {
    const { number, file } = req.body;
    const brochure = await db.brochure.findOne({ where: { number: number } })

    if (!brochure) {
      return res.json({
        message: { error: 'Brochure not found' }
      })
    }

    if (brochure.file) {
      try {
        fs.unlinkSync(path.join(__dirname, '../', brochure.file))
      } catch (err) { }
    }

    const base64Data = file.data.split(',')[1];
    const decodedData = Buffer.from(base64Data, 'base64')
    const timestamp = '' + new Date().getTime()
    const fileName = `/uploads/brochures/${uuidv4()}.pdf`;

    try {
      fs.mkdirSync(path.join(__dirname, '../uploads'))
    } catch (err) { }
    try {
      fs.mkdirSync(path.join(__dirname, '../uploads/brochures'))
    } catch (err) { }

    const filePath = path.join(__dirname, '../', fileName)
    fs.writeFileSync(filePath, decodedData)
    await brochure.update({
      file: fileName
    })
    return res.json({
      brochure,
      message: { success: 'Brochure updated' }
    })
  } catch (err) {
    console.log(err)
    return res.status(500).send({
      message: { error: 'Please try again later' }
    })
  }
}

exports.brochureDelete = async (req, res) => {
  try {
    const { number } = req.body;
    const brochure = await db.brochure.findOne({ where: { number } })
    if (!brochure) {
      return res.json({
        message: { error: 'Brochure not found' }
      })
    }

    if (brochure.file) {
      const file = brochure.file;
      await brochure.update({
        file: null
      })

      if (file) {
        try {
          fs.unlinkSync(path.join(__dirname, '../', file))
        } catch (err) {
          console.log(err)
        }
      }
    }

    return res.json({
      brochure,
      message: { success: 'Brochure file deleted' }
    })
  } catch (err) {
    return res.status(500).send({
      message: { error: 'Please try again later.' }
    })
  }
}

exports.botFiles = async (req, res) => {
  try {
    let { page, pageSize } = req.query
    page = Number(page)
    pageSize = Number(pageSize)
    const totalCount = await db.botFile.count({});
    const totalPage = Math.ceil(totalCount / pageSize) || 1
    if (page > totalPage) page = totalPage
    const botFiles = await db.botFile.findAll({
      offset: (page - 1) * pageSize,
      limit: pageSize
    })
    return res.json({
      botFiles,
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

exports.botFileUpload = async (req, res) => {
  try {
    const { data, name, content2Extension } = req.body;
    const base64Data = data.split(',')[1];
    const decodedData = Buffer.from(base64Data, 'base64')
    const fileName = `/uploads/botFiles/${uuidv4()}.${content2Extension}`
    try {
      fs.mkdirSync(path.join(__dirname, '../uploads'))
    } catch (err) { }
    try {
      fs.mkdirSync(path.join(__dirname, '../uploads/botFiles'))
    } catch (err) { }
    const filePath = path.join(__dirname, '../', fileName)
    fs.writeFileSync(filePath, decodedData)
    const botFile = await db.botFile.create({
      path: fileName,
      name
    })
    try {
      await llm.saveFileEmbedding({ filePath, fileId: String(botFile.id) })
    } catch (err) {
      await db.botFile.destroy({ where: { id: botFile.id } })
      throw (err)
    }
    return res.json({
      botFile,
      message: { success: 'Bot File Uploaded' }
    })
  } catch (err) {
    console.log(err)
    return res.status(500).send({
      message: { error: 'Please try again later.' }
    })
  }
}

exports.botFileDelete = async (req, res) => {
  try {
    const { id } = req.body;
    const botFile = await db.botFile.findOne({ where: { id } })
    if (!botFile) {
      return res.status(400).send({
        message: { error: 'Bot File not found' }
      })
    }
    const fileId = String(botFile.id)
    await db.botFile.destroy({
      where: { id }
    });
    try {
      fs.unlinkSync(path.join(__dirname, '../', botFile.path))
    } catch (err) { console.log(err) }

    await llm.delFileEmbedding({ fileId })
    return res.json({
      message: { success: 'Bot File deleted' }
    })
  } catch (err) {
    console.log(err)
    return res.status(500).send({
      message: { error: 'Please try again later.' }
    })
  }
}