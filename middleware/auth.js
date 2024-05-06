const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
	try {
        console.log(req
			.header('Authorization').replace('Bearer ', ''))
		const tokenProvidedByUser = req
			.header('Authorization')
			.replace('Bearer ', '');
            console.log(tokenProvidedByUser)
		const decode = jwt.verify(tokenProvidedByUser, "test");
        console.log(decode)
		const user = await User.findOne({
			_id: decode._id,
			'token': tokenProvidedByUser
		});
        console.log(user)
		if (!user) {
			throw new Error();
		}
		req.token = tokenProvidedByUser;
		req.user = user;
		next();
	} catch (e) {
		res.status(401).json({ status: 'fail', error: 'Please authenticate.' });
	}
};

module.exports = auth;