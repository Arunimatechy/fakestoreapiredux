import { createSlice } from "@reduxjs/toolkit";

const initialState =
  JSON.parse(localStorage.getItem("orders")) || [];

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    placeOrder: (state, action) => {
      state.push({
        id: Date.now(),
        ...action.payload,
        status: "Pending",
      });
      localStorage.setItem("orders", JSON.stringify(state));
    },
    updateOrderStatus: (state, action) => {
      const o = state.find(i => i.id === action.payload.id);
      if (o) o.status = action.payload.status;
      localStorage.setItem("orders", JSON.stringify(state));
    },
  },
});

export const { placeOrder, updateOrderStatus } =
  ordersSlice.actions;
export default ordersSlice.reducer;
