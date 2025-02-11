import "./App.css";
import { Pagination } from "./components/PaginationWithData";
import RefExample from "./refExample";
import ViewPort from "./components/IntersectionObservers";
import DataShow from "./components/InfiniteScrolling";
import FetchAxios from "./InfiniteScrollingPredefined";
import DisplayPhotos from "./components/InfiniteScrollingWithToDo";

function App() {
  return (
    <>
        {/* <Pagination itemsPerPage={10} /> */}
       {/* <RefExample/> 
          <ViewPort/>   
          <DataShow/>  
           <FetchAxios/> 
         */}
         <DisplayPhotos/>
         
    </>
  );
}

export default App;
// for building 
// npm run build 
// npm install -g serve
//  serve -s build