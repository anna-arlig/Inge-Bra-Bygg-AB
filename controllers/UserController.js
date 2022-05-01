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
            const user = await User.create({email,name,password,role, address: {zipCode,street,city}})
            res.json({
                message: "User created!",
                user: {id:user.id,email,name, role, address:{city,street,zipCode}}
            })
        },

        getById: async (req, res) => {
            const user = await User.findById(req.params.id)
            res.json(user)
        },

        me: async (req, res) => {
            const {name,email,role} = req.user
            res.json({name,email,role})
        },

        all: async(req, res) => {
            const users = await User.find({})
            res.json({users})
        },

        update: async (req, res) => {
            const {city, street, zipCode} = req.body
            const user = await User.findById(req.params.id)
            console.log(city, street, zipCode)
            await user.updateOne({address:{city, street, zipCode}})

            res.json( {message: "User updated"})
        }

}