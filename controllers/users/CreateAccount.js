const User  =  require(
    "../../models/User"
)
module.exports = async (req,res)=>{
    const user  =  new User(req.body)
    try{
        console.log("uset")
await user.save()
console.log("uset")
if(!user){
    throw new Error("unable to create account")
}
const token = await user.generateAuthToken();


res.status(201).json({status:'success', user, token });
    }catch(error){
        console.log(error)
        res.status(400).json({status:' user creation failed', error });

    }



}