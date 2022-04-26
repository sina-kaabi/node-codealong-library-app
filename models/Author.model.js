const {Schema, model} = require("mongoose");

const authorSchema = new Schema(
    {
        name: String,
        favouritefood: String,
        country: String
    }
);


const Author = model("Author", authorSchema);

module.exports = Author;
