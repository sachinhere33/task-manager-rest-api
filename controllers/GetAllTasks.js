const Task = require("../models/Task")
module.exports = async (req, res) => {
    console.log("yes");
    console.log("req.user:", req.user);

    

    try {
        const user = await Task.find({owner:req.user._id})
           
console.log(user)
        res.status(200).json({ status: 'success', user: user});
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 'fail', error: error.message });
    }
};
