import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/* ================= CONFIG ================= */

const STORAGE_KEY = "reactmart_productItem_v2"; // new key

/* ================= API ================= */

export const fetchProductItem = createAsyncThunk(
  "products/fetchProductItem",
  async () => {
    const res = await axios.get("https://dummyjson.com/products");
    return res.data.products.map(p => ({
      id: p.id,
      title: p.title,
      price: p.price,
      image: p.thumbnail,
      category: p.category,
      description: p.description,
    }));
  }
);

/* ================= INITIAL STATE ================= */

const saved = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

const initialState = {
  items: saved,
  filtered: saved,
  loading: false,
};

/* ================= SLICE ================= */

const productsSlice = createSlice({
  name: "products",
  initialState,

  reducers: {
    addProduct: (state, action) => {
      state.items.push(action.payload);
      state.filtered = state.items;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    },

    updateProduct: (state, action) => {
      state.items = state.items.map(p =>
        p.id === action.payload.id ? action.payload : p
      );
      state.filtered = state.items;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    },

    deleteProduct: (state, action) => {
      state.items = state.items.filter(p => p.id !== action.payload);
      state.filtered = state.items;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    },

    setSearch: (state, action) => {
      const term = action.payload.toLowerCase();
      state.filtered = state.items.filter(p =>
        p.title.toLowerCase().includes(term)
      );
    },
  },

  extraReducers: builder => {
    builder
      .addCase(fetchProductItem.pending, state => {
        state.loading = true;
      })
      .addCase(fetchProductItem.fulfilled, (state, action) => {
        state.loading = false;
        if (state.items.length === 0) {
          state.items = action.payload;
          state.filtered = action.payload;
          localStorage.setItem(STORAGE_KEY, JSON.stringify(action.payload));
        }
      })
      .addCase(fetchProductItem.rejected, state => {
        state.loading = false;
      });
  },
});

/* ================= EXPORTS ================= */

export const { addProduct, updateProduct, deleteProduct, setSearch } =
  productsSlice.actions;

export default productsSlice.reducer;



