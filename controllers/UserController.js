const User = require('../models/User')
const Token = require('../utils/token')

module.exports = {

        auth: async (req,res) => {
            const {email, name, password, role} = req.body
            const token = Token.createToken(email, name, password, role)
            res.json({token})
        },

        createUser: async (req, res) => {
            const {email, name, password, role} = req.body
            const {zipCode, street, city} = req.body.address
            const user = await User.create({email,name,password,role,zipCode,street,city})
            res.json({
                message: "User created!",
                user: {id:user.id,email,name, role, address:{city,street,zipCode}}
            })
        },

        me: async (req, res) => {

        },

        all: async(req, res) => {
            const users = await User.find({})
            res.json({users})
        }

}