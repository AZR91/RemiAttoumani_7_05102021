const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');
const multerGifs = require('../middleware/multer-gifs');

const gifCtrl = require('../controllers/gifs');

router.post('/', auth, multerGifs, gifCtrl.createGif);
router.put('/:id', auth, multerGifs, gifCtrl.modifyGif);
router.delete('/:id', auth, multerGifs, gifCtrl.deleteGif);
router.get('/:id', auth, gifCtrl.getOneGif);
router.get('/', auth, gifCtrl.getAllGifs);

router.put('/admin/:id', adminAuth, multerGifs, gifCtrl.modifyGif);
router.delete('/admin/:id', adminAuth, multerGifs, gifCtrl.adminDeleteGif);

module.exports = router;