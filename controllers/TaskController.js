const Task = require('../models/Task')
const Token = require('../utils/token')

module.exports = {

    all: async (req, res) => {
        const tasks = await Task.find({})
        res.json({tasks})
    }
}