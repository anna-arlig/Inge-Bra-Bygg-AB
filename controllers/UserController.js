const User = require('../models/User')

module.exports = {

        all: async(req, res) => {
            const users = await User.find({})
            res.json({users})
        }

}