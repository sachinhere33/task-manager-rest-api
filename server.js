const {app} = require("./index")
const http = require("http")


const server = http.createServer(app)
server.listen(4000,()=>{
    console.log("server is running on port 4000")
})