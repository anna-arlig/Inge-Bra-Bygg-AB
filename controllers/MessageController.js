const Task = require("../models/Task");
const Token = require("../utils/token");
const {Message} = require("../models/Message")


module.exports = {

sendMessage: async (req, res) => {
    const newMessage = {
        content: "Tjenare",
        userId: "626eb0e546ff8cfffea32049"}

    const task = Task.updateOne({
        _id: "626eb5be81442f2d164219af"
    }, {$push: {messages: newMessage}})
}

}