import axios from "axios";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

function DataShow({ currentItems }) {
  return (
    <div className=" place-items-center bg-slate-200 md:m-6 m-2">
      <table className="">
        <thead>
          <tr className="bg-white">
            <th className="p-2 border border-gray-800">User Id</th>
            <th className="p-2 border border-gray-800">ID</th>
            <th className="p-2 border border-gray-800">Title</th>
            <th className="p-2 border border-gray-800">Body</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((user) => (
            <tr key={user.id} className="bg-zinc-300">
              <td className="border border-gray-800 p-2">{user.userId}</td>
              <td className="border border-gray-800 p-2">{user.id}</td>
              <td className="border border-gray-800 p-2">{user.title}</td>
              <td className="border border-gray-800 p-2">{user.body}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Pagination({ itemsPerPage }) {
  const [users, setUsers] = useState([]);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    async function dataFetch() {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts"
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    dataFetch();
  }, []);

  const endOffset = itemOffset + itemsPerPage;
  const currentData = users.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(users.length / itemsPerPage);

  const HandlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % users.length;
    setItemOffset(newOffset);
  };

  return (
    <div className="md:p-10 bg-slate-300 ">
      <DataShow currentItems={currentData} />
      <ReactPaginate
        breakLabel="..."
        nextLabel="next < "
        onPageChange={HandlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous" className="flex md:gap-10 gap-3 items-center justify-center "
        pageClassName="border border-black md:p-3 p-2 bg-slate-300 font-bold " 
        activeClassName="bg-white text-black font-bold border-2 border-gray-700" 
      />
    </div>
  );
}

export default DataShow;
