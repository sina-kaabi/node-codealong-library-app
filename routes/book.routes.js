const Book = require("../models/Book.model");

const router = require("express").Router();

router.get("/books", (req, res, next) => {
    Book.find()
        .then((booksArr) => {
            res.render("books/books-list", { books: booksArr });
        })
        .catch(err => {
            console.log("error getting books from DB", err)
            next(err);
        });
});


router.get("/books/:bookId", (req, res, next) => {
    const id = req.params.bookId;

    Book.findById(id)
        .then((bookDetails) => {
            res.render("books/book-details", bookDetails);
        })
        .catch(err => {
            console.log("error getting book details from DB", err)
            next(err);
        });
})

module.exports = router;