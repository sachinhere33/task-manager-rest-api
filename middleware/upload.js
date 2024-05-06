const multer = require("multer")
const upload = multer({
    limits:{
        fileSize:1000000
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(jpeg|jpg|png)$/)){
            return cb(new Error ("please upload a image "))
        }
        cb(undefined,true)
    }
})

module.exports = upload