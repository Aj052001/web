import { useState ,useEffect} from "react";
import axios from "axios";
import Add from "./Add";

const Data  = () => {

    const [data,setData] = useState([]);
    const [editBook, setEditBook] = useState(null);
// const getData = async () => {
//     try {
//         const response = await fetch('http://localhost:5000/books');
//         const data = await response.json();
//         console.log(data);
//         setData(data);
//     } catch (error) {
//         console.error('Error fetching data:', error);
//     }
// }   



const getData = async () => {
    try {
        const response = await axios.get('http://localhost:5000/books');

        console.log(response.data);

        setData(response.data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

useEffect(() => {
    getData();
},[])


const allDataDelete = async (req,res)=>{
    try{
        await axios.delete(`http://localhost:5000/books`);

    }
    catch(err)
    {
        console.log(err)
    }

}

const deleteBook = async (id) => {
    
    try {
        await axios.delete(`http://localhost:5000/books/${id}`);  
        console.log("book delete successfully")  

        setData(data.filter(book => book._id !== id));
    }
    catch (error) {
        console.error('Error deleting book:', error);
    }
}   







    return (
       <>
        <Add editBook={editBook} getBooks={getData} />
         {
            data.map((item, index) => (
                <div key={index}>
                    <h2>{item.title}</h2>
                    <p>Author: {item.author}</p>
                    <p>Published: {item.published.split("T")[0]}</p>
                    <p>Language: {item.language}</p>
                    <p>Type: {item.type}</p>
                    <img src={item.frontPageCover} alt={item.title} />
                    <button onClick={()=>{
                        deleteBook(item._id)
                    }}>Delete</button>
                    <button onClick={() => setEditBook(item)}>
    Update
</button>
                </div>
            ))  
         }

         <button onClick={allDataDelete}>add data delete</button>
       </>
    );
}

export default Data;