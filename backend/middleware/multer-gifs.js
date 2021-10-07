/**
 * Multer-config - middleware
 * 
 * Le package @multer permet de gérer les fichiers gifs : enregistrer, modifier, supprimer dans le dossier images
 * 
 */

const multer = require('multer');

const MIME_TYPES = {
'image/jpg': 'jpg',
'image/jpeg': 'jpg',
'image/png': 'png',
'image/gif': 'gif'
};

const storage = multer.diskStorage({
destination: (req, file, callback) => {
    callback(null, 'gifs');
},
filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
}
});

module.exports = multer({storage: storage}).single('gif');