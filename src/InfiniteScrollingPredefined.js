import { useEffect, useState } from "react";
import axios from "axios"; 
import InfiniteScroll from "react-infinite-scroll-component";

export default function FetchAxios() {
    const [result, setResult] = useState([]); 
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true); 

    const fetchData = async () => {
        try {
            const response = await axios.get(
                `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${page}`
            ); 

            if (response.data.length === 0) {
                setHasMore(false); 
                return;
            }

            setResult((prev) => [...prev, ...response.data]);  
            setPage((prevPage) => prevPage + 1); 
        } catch (error) {
            console.error("Error fetching data:", error); 
        }
    };

  
    useEffect(() => {
        fetchData();
    }, []); 

    return (
        <InfiniteScroll
            dataLength={result.length} 
            next={fetchData}
            hasMore={hasMore}  
            loader={<h4>Loading...</h4>}
            endMessage={
                <p style={{ textAlign: 'center' }}>
                    <b> You have seen it all</b>
                </p>
            }
        >
            <table>
                <thead>
                    <tr className="bg-gray-300">
                        <th className="p-2 border border-gray-800">User Id</th>
                        <th className="p-2 border border-gray-800">ID</th>
                        <th className="p-2 border border-gray-800">Title</th>
                        <th className="p-2 border border-gray-800">Body</th>
                    </tr>
                </thead>
                <tbody>
                    {result.map((user) => (  
                        <tr key={user.id} className="bg-white">
                            <td className="border border-gray-800 p-2">{user.userId}</td>
                            <td className="border border-gray-800 p-2">{user.id}</td>
                            <td className="border border-gray-800 p-2">{user.title}</td>
                            <td className="border border-gray-800 p-2">{user.body}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </InfiniteScroll>
    );
}
