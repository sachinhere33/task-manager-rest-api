module.exports = async (req, res) => {
    
	try {
        
		req.user.tokens = req.user.token.filter((token) => {
			return token.token !== req.token;
		});
        
		await req.user.save();
		res.status(200).json({ status: 'success' });
	} catch (error) {
        console.log(error)
		res.status(500).json({ status: 'fail', error });
	}
};