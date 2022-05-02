const Task = require("../models/Task");
const Token = require("../utils/token");
const { TaskNotFound, InvalidFile, FileExists } = require("../errors");

module.exports = {
  all: async (req, res) => {
    const tasks = await Task.find({});
    res.json({ tasks });
  },
};
