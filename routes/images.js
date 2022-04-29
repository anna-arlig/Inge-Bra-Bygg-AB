const { Router } = require("express");

const images = new Router();
images.get("/");
images.post("/");
module.exports = images;
