import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/db.js';
import Book from './models/Book.js';
import cors from 'cors';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

connectDB();


app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello, World!');
});




app.post('/books', async (req, res) => {
    try {
        const { title, author, published, language, type , frontPageCover} = req.body;
        const newBook = new Book({ title, author, published, language, type,frontPageCover});
        await newBook.save();
        res.status(201).json(newBook);
    } catch (error) {
        res.status(500).json({ message: 'Error creating book', error });
    }
});


app.get('/books', async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching books', error });
    }
});

app.get('/books/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json(book);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching book', error });
    }
});


app.delete('/books/:id', async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json({ message: 'Book deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting book', error });
    }
});


app.delete('/books', async (req, res) => {
    try {
        await Book.deleteMany({});
        res.json({ message: 'All books deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting books', error });
    }
});

app.put('/books/:id', async (req, res) => {
    try {
        const { title, author, published, language, type ,frontPageCover} = req.body;
        const book = await Book.findByIdAndUpdate(
            req.params.id,
            { title, author, published, language, type , frontPageCover},
            { new: true }
        );
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json({ message: "Book updated successfully", data: book });
    } catch (error) {
        res.status(500).json({ message: 'Error updating book', error });
    }
});






app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});