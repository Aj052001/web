import { useState ,useEffect} from "react";

const Data  = () => {

    const [data,setData] = useState([]);
const getData = async () => {
    try {
        const response = await fetch('http://localhost:5000/books');
        const data = await response.json();
        console.log(data);
        setData(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}   

useEffect(() => {
    getData();
},[])





    return (
       <>
         {
            data.map((item, index) => (
                <div key={index}>
                    <h2>{item.title}</h2>
                    <p>Author: {item.author}</p>
                    <p>Published: {item.published}</p>
                    <p>Language: {item.language}</p>
                    <p>Type: {item.type}</p>
                    <img src={item.frontPageCover} alt={item.title} />
                </div>
            ))  
         }
       </>
    );
}

export default Data;