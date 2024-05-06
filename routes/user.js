const express = require('express');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload.js');
const CreateAccount = require('../controllers/users/CreateAccount.js');
const Login = require('../controllers/users/Login.js');
const Logout = require('../controllers/users/Logout.js');
const LogoutAllAccounts = require('../controllers/users/LogoutAllAccounts.js');
const Profile = require('../controllers/users/Profile.js');
const UpdateAccount = require('../controllers/users/UpdateAccount.js');
const DeleteAccount = require('../controllers/users/DeleteAccount.js');
const UploadAvatar = require('../controllers/users/UploadAvatar.js');
const DeleteAvatar = require('../controllers/users/DeleteAvatar.js');
const GetAvatar = require('../controllers/users/GetAvatar.js');

const router = express.Router();
router.use(auth);
router.post('/users', CreateAccount);
router.post('/users/login', Login);

router.post('/users/logout', Logout);
router.post('/users/logoutAll', LogoutAllAccounts);
router
	.route('/users/me')
	.get(Profile)
	.patch(UpdateAccount)
	.delete(DeleteAccount);
router
	.route('/users/me/avatar')
	.post(upload.single('avatar'), UploadAvatar)
	.delete(DeleteAvatar);
router.get('/users/:id/avatar', GetAvatar);
module.exports = router;