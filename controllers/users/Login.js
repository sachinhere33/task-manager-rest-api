const User  =  require(
    "../../models/User"
)
module.exports = async (req, res) => {
    try {
        // Find the user by email and password
        const user = await User.findByLoginCredentials(req.body.email, req.body.password);

        // Check if user exists
       console.log( user)

        // Generate an authentication token for the user
        const token = await user.generateAuthToken();

        // Send success response with user and token
        res.status(200).json({ status: 'success', user, token });
    } catch (error) {
        console.log(error);
        // Send error response if login fails
        res.status(400).json({ status: 'user login failed', error: error.message });
    }
};