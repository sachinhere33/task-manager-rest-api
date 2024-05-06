const express = require("express")
const app = express()
const userrouter = require("./routes/user");
const taskrouters = require("./routes/task");
app.use(express.json())



app.use(userrouter)
app.use(taskrouters)



module.exports = {app}