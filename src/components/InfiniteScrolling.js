import axios from "axios";
import { useEffect, useRef, useState } from "react";

export default function DataShow() {
    const [users, setUsers] = useState([]);
    const LoadingRef = useRef(null);
    const observer = useRef(null); 
    const [pageCount, setPageCount] = useState(1);
    const [isLastPage, setIsLastPage] = useState(false); 
    const [loading,setLoading]=useState(true)

    useEffect(() => {
        setLoading(true); 
        async function dataFetch() {
            try {
                const response = await axios.get(
                    `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${pageCount}`
                );

                if (response.data.length === 0) {
                    setIsLastPage(true); 
                    if (observer.current) observer.current.disconnect(); 
                    return;
                }

                setUsers((prevUsers) => [...prevUsers, ...response.data]);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        dataFetch();
    }, [pageCount]);

    useEffect(() => {
        if (isLastPage){ 
            
            return}; 

        observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setPageCount((prevPage) => prevPage + 1);
            }
        });

        if (LoadingRef.current) {
            observer.current.observe(LoadingRef.current);
        }

        return () => observer.current?.disconnect();
    }, [users, isLastPage,setLoading]);  

    return (
        <div className="place-items-center bg-slate-400 md:p-9 md:m-9">
            <table>
                <thead>
                    <tr className="bg-white">
                        <th className="p-2 border border-gray-800">User Id</th>
                        <th className="p-2 border border-gray-800">ID</th>
                        <th className="p-2 border border-gray-800">Title</th>
                        <th className="p-2 border border-gray-800">Body</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id} className="bg-zinc-300">
                            <td className="border border-gray-800 p-2">{user.userId}</td>
                            <td className="border border-gray-800 p-2">{user.id}</td>
                            <td className="border border-gray-800 p-2">{user.title}</td>
                            <td className="border border-gray-800 p-2">{user.body}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div ref={LoadingRef}>
                {isLastPage ? " Last Page Reached" : "Loading..."}
            </div>
        </div>
    );
}
