
const User = require('../../models/User');
module.exports = async (req,res)=>{
   
    try{
        await User.findByIdAndDelete(req.user._id);


res.status(204).json({status:'successly rmeoved',});
    }catch(error){
        console.log(error)
        res.status(400).json({status:' user deletion  failed', error });

    }



}