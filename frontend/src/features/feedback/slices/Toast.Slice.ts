// store/toastSlice.ts
import { createSlice, nanoid } from "@reduxjs/toolkit";

const toastSlice = createSlice({
  name: "toast",
  initialState: {
    toasts: [] as { id: string; message: string; type: "success" | "error" }[],
  },
  reducers: {
    addToast: (state, action) => {
      state.toasts.push({ id: nanoid(), ...action.payload });
    },
    removeToast: (state, action) => {
      state.toasts = state.toasts.filter((t) => t.id !== action.payload);
    },
  },
});
export const { addToast, removeToast } = toastSlice.actions;
export default toastSlice.reducer;
