const db = require('../models/index.model');
const getUserId = require("../utils/getUserId");
const fs = require('fs');

exports.getAllGifs = (req, res, next) => {
    db.Gif.findAll()
        .then((gifs) => res.status(200).json({gifs}))
        .catch(error => res.status(400).json({ error })
        )
};


exports.getOneGif = (req, res, next) => {
    db.Gif.findOne({ where: { id: req.params.id } })
        .then((gif) => res.status(200).json({gif}))
        .catch((error) => res.status(404).json({ error })
        )
};

exports.createGif = (req, res, next) => {
    db.Gif.create({
        userId: getUserId(req),
        statusText: req.body.statusText,
        imageUrl: `${req.protocol}://${req.get('host')}/../gifs/${req.file.filename}`,
    })
        .then(() => res.status(201).json({ message: 'gif publié !' }))
        .catch((error) => res.status(400).json({ error }))
};

exports.modifyGif = (req, res, next) => {
    db.Gif.findOne({ where: { id: req.params.id } })
        .then(gif => {
            if (gif.userId !== getUserId(req)) {
                return res.status(401).json({ message: 'Requête non autorisée !' })
            };
            const gifObject = req.file ?
                {
                    ...req.body.gif,
                    imageUrl: `${req.protocol}://${req.get('host')}/gifs/${req.file.filename}`
                } : { ...req.body };
            db.Gif.update({ ...gifObject }, { where: { id: req.params.id } })
                .then(() => res.status(200).json({ message: 'Gif modifié !' }))
                .catch(error => res.status(400).json({ error }))
        });
};

exports.deleteGif = (req, res, next) => {
    db.Gif.findOne({ where: { id: req.params.id } })
        .then(gif => {
            if (gif.userId !== getUserId(req)) {
                return res.status(401).json({ message: 'Requête non autorisée !' })
            };
            const filename = gif.imageUrl.split('/gifs/')[1];
            fs.unlink(`gifs/${filename}`, () => {
                gif.destroy({ where: { id: req.params.id } })
                    .then(() => res.status(200).json({ message: 'Gif supprimé !' }))
                    .catch(error => res.status(400).json({ error }))
            })
        });
};

exports.adminDeleteGif = (req, res, next) => {
    db.Gif.findOne({ where: { id: req.params.id } })
        .then(gif => {
            const filename = gif.imageUrl.split('/gifs/')[1];
            fs.unlink(`gifs/${filename}`, () => {
                gif.destroy({ where: { id: req.params.id } })
                    .then(() => res.status(200).json({ message: 'Gif supprimé !' }))
                    .catch(error => res.status(403).json({ message: 'requête réservée aux admins' }))
            })
        });
};