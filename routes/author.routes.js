const Author = require("../models/Author.model");

const router = require("express").Router();


router.get("/authors", (req, res, next) => {
    Author.find()
    .then((authorToEdit) => {
        res.render('books/authors-list',  {author: authorToEdit});

    })
    .catch(error => {
        next(error);
    });
})



module.exports = router;