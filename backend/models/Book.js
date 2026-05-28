import mongoose from "mongoose";


const bookSchema = new mongoose.Schema({    
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
   
    published: {
        type: Date,
        required: true
    },
    language: {
        type: String,
        required: true
    },
     type: {
        type: String,
        required: true
    },
    frontPageCover: {
        type: String,
        required: false
    }
    
});

const Book = mongoose.model("Book", bookSchema);

export default Book;