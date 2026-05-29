import { useState, useEffect } from "react";
import axios from "axios";

const Add = ({ editBook, getBooks }) => {

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [published, setPublished] = useState("");
    const [language, setLanguage] = useState("");
    const [type, setType] = useState("");
    const [frontPageCover, setFrontPageCover] = useState("");




    // Fill inputs when clicking edit
    useEffect(() => {

        if (editBook) {
            setTitle(editBook.title);
            setAuthor(editBook.author);
            setPublished(editBook.published.split("T")[0]);
            setLanguage(editBook.language);
            setType(editBook.type);
            setFrontPageCover(editBook.frontPageCover);
        }

    }, [editBook]);

    const handleSubmit = async (e) => {

        e.preventDefault();

        const bookData = {
            title,
            author,
            published : published.split("T")[0],
            language,
            type,
            frontPageCover
        };

        try {

            // UPDATE
            if (editBook) {

                await axios.put(
                    `http://localhost:5000/books/${editBook._id}`,
                    bookData
                );

                alert("Book Updated");

            } else {

                // ADD
                await axios.post(
                    "http://localhost:5000/books",
                    bookData
                );

                alert("Book Added");
            }

            // refresh books
            getBooks()

            // clear form
            setTitle("");
            setAuthor("");
            setPublished("");
            setLanguage("");
            setType("");
            setFrontPageCover("");

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <h1>
                {editBook ? "Update Book" : "Add Book"}
            </h1>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    placeholder="Book Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                />

                <input
                    type="date"
                    value={published}
                    onChange={(e) => setPublished(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Language"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Type"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Front Page Cover"
                    value={frontPageCover}
                    onChange={(e) => setFrontPageCover(e.target.value)}
                />

                <button type="submit">
                    {editBook ? "Update Book" : "Add Book"}
                </button>

            </form>

            <hr />
        </>
    );
};

export default Add;