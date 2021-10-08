const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');
const connectLimiter = require('../middleware/connectLimiter');
const multerUsers = require('../middleware/multer-users');

const userCtrl = require('../controllers/users');

router.post('/signup', userCtrl.signup);
router.post('/login', connectLimiter, userCtrl.login);
router.put('/:id', auth, multerUsers, userCtrl.updateProfile);
router.delete('/:id', auth, multerUsers, userCtrl.deleteProfile);
router.get('/:id', auth, userCtrl.getProfile);
router.get('/', auth, userCtrl.getAllProfiles);

router.delete('/admin/del/:id', adminAuth, multerUsers, userCtrl.adminDeleteProfile);
router.put('/admin/:id', adminAuth, multerUsers, userCtrl.adminUpdateProfile);
router.put('/new/admin/:id', userCtrl.setUserAsAdmin);
module.exports = router;