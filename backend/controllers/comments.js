const db = require('../models/index.model');
const getUserId = require("../utils/getUserId");

exports.postComment = (req, res, next) => {    
    db.Comment.create({
        gifId: req.body.gifId,
        userId: req.body.userId,
        content: req.body.content
    })
    .then(() => res.status(201).json({ message: 'commentaire publié !'}))
    .catch(error => res.status(400).json({ error }))   
};

exports.deleteComment = (req, res, next) => {   
    db.Comment.findOne({where: { id: req.params.id}})
        .then(comment => {
            if(comment.userId !== getUserId(req)){
                return res.status(401).json({message: 'Requête non autorisée !'})
            }
    comment.destroy()
            .then(() => res.status(200).json({ message: 'commentaire effacé !'}))
            .catch(error => res.status(400).json({error}))
    });
};

exports.getAllComments = (req, res, next) => {
    db.Comment.findAll()
        .then((comments) => res.status(200).json(comments))
        .catch(error => res.status(400).json({error}))
};

exports.adminDeleteComment = (req, res, next) => { 
    db.Comment.destroy({where: { id: req.params.id }})
            .then(() => res.status(200).json({ message: 'commentaire effacé !'}))
            .catch(error => res.status(400).json({error}))
    .catch(error => res.status(403).json({ message: 'requête réservée aux admins'}))
};