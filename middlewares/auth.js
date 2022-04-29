const { JWT_SECRET } = require("../config");
const jwt = require('jsonwebtoken')

module.exports = {
    async admin(req, res, next) {
try{
  const token = req.header('Authorization').replace('Bearer ', '')
  const admin = jwt.verify(token, JWT_SECRET)
  if(admin.role != "admin"){
    console.log("Unauthorized!")
    throw new Error("User is not admin!")
  }
  req.user = admin
  next()
}catch (error){
  res.status(401)
  .send({ error: 'Unauthorized' })
}
},

    async client(req, res, next) {
      try{
        const token = req.header('Authorization').replace('Bearer ', '')
        const client = jwt.verify(token, JWT_SECRET)
        if(client.role != "client"){
          console.log("Unauthorized!")
          throw new Error("User is not client!")
        }
        req.user = client
        next()
      }catch(error){
        res.status(401)
        .send({ error: 'Unauthorized' })
      }
    },
    async worker(req, res, next) {
      try{
        const token = req.header('Authorization').replace('Bearer ', '')
        const worker = jwt.verify(token, JWT_SECRET)
        if(worker.role != "worker"){
          console.log("Unauthorized!")
          throw new Error("User is not worker!")
        }
        req.user = worker
        next()
      }catch(error){
        res.status(401)
        .send({ error: 'Unauthorized' })
      }
    },
    async workerClient(req, res, next) {
      try{
        const token = req.header('Authorization').replace('Bearer ', '')
        const user = jwt.verify(token, JWT_SECRET)
        if(user.role != "worker" || user.role != "client"){
          console.log("Unauthorized!")
          throw new Error("User is not authorized!")
        }
        req.user = user
        next()
      }catch(error){
        res.status(401)
        .send({ error: 'Unauthorized' })
      }
    },



    async loggedin(req, res, next) {
      try{

      }catch(error){

      }
    },
  };