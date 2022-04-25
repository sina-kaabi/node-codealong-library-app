const Book = require("../models/Book.model");

const router = require("express").Router();

router.get("/books", (req, res, next) => {
    Book.find()
        .then( (booksArr) => {
            res.render("books/books-list", {books: booksArr});
        })
        .catch( err => {
            console.log("error getting books from DB", err)
            next(err);
        });
});


module.exports = router;