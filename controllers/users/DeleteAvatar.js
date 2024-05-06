
module.exports = async (req, res) => {
	try {
		req.user.avatar = undefined;
		await req.user.save();
	
		res.status(204).send({"message":"deleted"});
	} catch (error) {
		res.status(500).json({ status: 'fail', error });
	}
};