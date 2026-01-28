import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
  "products/fetch",
  async () => {
    const res = await axios.get("https://fakestoreapi.com/products");
    return res.data;
  }
);

const saved = JSON.parse(localStorage.getItem("products")) || [];

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: saved,
    filtered: saved,
    loading: false,
  },
  reducers: {
    addProduct: (state, action) => {
      state.items.push(action.payload);
      state.filtered = state.items;
      localStorage.setItem("products", JSON.stringify(state.items));
    },
    updateProduct: (state, action) => {
      state.items = state.items.map(p =>
        p.id === action.payload.id ? action.payload : p
      );
      state.filtered = state.items;
      localStorage.setItem("products", JSON.stringify(state.items));
    },
    deleteProduct: (state, action) => {
      state.items = state.items.filter(p => p.id !== action.payload);
      state.filtered = state.items;
      localStorage.setItem("products", JSON.stringify(state.items));
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, s => {
        s.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (s, a) => {
        s.loading = false;
        if (s.items.length === 0) {
          s.items = a.payload;
          s.filtered = a.payload;
          localStorage.setItem("products", JSON.stringify(a.payload));
        }
      });
  },
});

export const { addProduct, updateProduct, deleteProduct } =
  productsSlice.actions;

export default productsSlice.reducer;
