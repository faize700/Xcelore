import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action) => action.payload,
    addUser: (state, action) => [...state, action.payload],
    editUser: (state, action) => state.map((user) => user._id === action.payload._id ? action.payload : user),
    removeUser: (state, action) => state.filter((user) => user._id !== action.payload),
  },
});

export const { setUsers, addUser, editUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
