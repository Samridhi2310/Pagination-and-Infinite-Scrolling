import { configureStore } from '@reduxjs/toolkit';
import toDoReducer from './features/ToDoUser/ToDoSlice'; // Correct import

export default configureStore({
  reducer: {
    todo: toDoReducer, // Correct reducer reference
  },
});
