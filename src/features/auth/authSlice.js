import { createSlice } from "@reduxjs/toolkit";

/* ================= LOCALSTORAGE KEYS ================= */
const USERS_KEY = "loginUsers";       // old "users" renamed
const CURRENT_USER_KEY = "currentUser"; // keep as is

/* ================= HELPER FUNCTIONS ================= */
const getUsers = () =>
  JSON.parse(localStorage.getItem(USERS_KEY)) || [];

const getCurrentUser = () =>
  JSON.parse(localStorage.getItem(CURRENT_USER_KEY));

/* ================= INITIAL STATE ================= */
const initialState = {
  users: getUsers(),
  currentUser: getCurrentUser(),
};

/* ================= SLICE ================= */
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
        isAdmin: state.users.length === 0, // first user is admin
      };

      state.users.push(newUser);
      localStorage.setItem(USERS_KEY, JSON.stringify(state.users));
    },

    login: (state, action) => {
      const user = state.users.find(
        u =>
          u.email === action.payload.email &&
          u.password === action.payload.password
      );

      if (!user) return;

      state.currentUser = user;
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    },

    logout: (state) => {
      state.currentUser = null;
      localStorage.removeItem(CURRENT_USER_KEY);
    },
  },
});

/* ================= EXPORTS ================= */
export const { register, login, logout } = authSlice.actions;
export default authSlice.reducer;
