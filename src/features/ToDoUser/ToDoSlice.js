import { createSlice } from "@reduxjs/toolkit";

const toDoUser = createSlice({
  name: "todo",
  initialState: {
    value: [],
  },
  reducers: {
    addToDo: (state, action) => {
      state.value.push(action.payload);
    },
    deleteToDo: (state, action) => {
      state.value = state.value.filter((item) => item.id !== action.payload);
    },
    updateToDo: (state, action) => {
      const { id, newTodo } = action.payload;
      const todo = state.value.find((item) => item.id === id);
      if (todo) {
        todo.todo = newTodo; // Update the todo text
      }
    },
  },
});

export const { addToDo, deleteToDo ,updateToDo} = toDoUser.actions;
export default toDoUser.reducer;
