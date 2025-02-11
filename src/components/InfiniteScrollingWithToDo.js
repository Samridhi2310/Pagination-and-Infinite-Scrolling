import axios from "axios";
import { useEffect, useRef, useState } from "react";

export default function DisplayPhotos() {
    const [ToDoData, setToDoData] = useState([]);
    const [pageCount, setPageCount] = useState(1);
    const loadingRef = useRef();
    const [lastPage,setLastPage]=useState(false);

    // Fetch Data when pageCount updates
    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                const response = await axios.get(`https://jsonplaceholder.typicode.com/todos?_limit=10&_page=${pageCount}`);
                setToDoData((prevData) => [...prevData, ...response.data]);
                if(response.data.length===0){
                    setLastPage(true)
                    return;
                console.log("Fetched Data:", response.data);
                }
            } catch (error) {
                console.error("Error fetching photos:", error);
            }
        };

        fetchPhotos();
    }, [pageCount]);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setPageCount((prev) => prev + 1);
            }
        });

        if (loadingRef.current) {
            observer.observe(loadingRef.current);
        }

        return () => observer.disconnect(); 
    }, [lastPage]); 

    return (
        <div className="place-items-center bg-slate-400 md:p-9 md:m-9">
            <table>
                <thead>
                    <tr className="bg-white">
                        <th className="p-2 border border-gray-800">User Id</th>
                        <th className="p-2 border border-gray-800">ID</th>
                        <th className="p-2 border border-gray-800">ToDo</th>
                        <th className="p-2 border border-gray-800">Completed</th>
                    </tr>
                </thead>
                <tbody>
                    {ToDoData.map((item, index) => (
                        <tr key={`${item.id}-${index}`} className="bg-zinc-300">
                            <td className="border border-gray-800 p-2">{item.userId}</td>
                            <td className="border border-gray-800 p-2">{item.id}</td>
                            <td className="border border-gray-800 p-2">{item.title}</td>
                            <td className="border border-gray-800 p-2">{item.completed ? "Yes" : "No"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {(lastPage)?<h1>Completed</h1>:
            <div ref={loadingRef} className="text-center p-4">Loading...</div>}
           

        </div>
    );
}
