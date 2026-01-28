import { createSlice } from "@reduxjs/toolkit";

const getUsers = () =>
  JSON.parse(localStorage.getItem("users")) || [];

const getCurrentUser = () =>
  JSON.parse(localStorage.getItem("currentUser"));

const initialState = {
  users: getUsers(),
  currentUser: getCurrentUser(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    register: (state, action) => {
      const exists = state.users.find(
        u => u.email === action.payload.email
      );
      if (exists) return;

      const newUser = {
        id: Date.now(),
        ...action.payload,
        isAdmin: state.users.length === 0, // ⭐ first user admin
      };

      state.users.push(newUser);
      localStorage.setItem("users", JSON.stringify(state.users));
    },

    login: (state, action) => {
      const user = state.users.find(
        u =>
          u.email === action.payload.email &&
          u.password === action.payload.password
      );

      if (!user) return;

      state.currentUser = user;
      localStorage.setItem("currentUser", JSON.stringify(user));
    },

    logout: (state) => {
      state.currentUser = null;
      localStorage.removeItem("currentUser");
    },
  },
});

export const { register, login, logout } = authSlice.actions;
export default authSlice.reducer;
