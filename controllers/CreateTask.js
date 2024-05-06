const Task = require("../models/Task")
module.exports = async (req,res)=>{
    try{
const task = new Task(req.body)
await task.save()
res.status(201).json({status:"task created scuccesfully ",task})
    }catch(err){res.status(400).json({status:"task creation failed ",err})
}
}