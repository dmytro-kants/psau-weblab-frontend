import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import $api from "../api";

const initialState = {
  carouselItems: [],
  status: 'idle',
  error: null,
};

export const getAllCarouselItemsAsync = createAsyncThunk('carousel/getAllCarouselItems', async () => {
  try {
    const response = await $api.get(`/getAllCarouselItems`);
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const updateCarouselItemAsync = createAsyncThunk('carousel/updateCarouselItem', async (item) => {
  try {
    const response = await $api.put(`/updateCarouselItem`, item);
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const deleteCarouselItemAsync = createAsyncThunk('carousel/deleteCarouselItem', async (id) => {
  try {
    const response = await $api.delete(`/carouselItem?id=${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
});

const carouselSlice = createSlice({
  name: 'carousel',
  initialState,
  reducers: {
    updateCarouselItemByIndex: (state, action) => {
      const { index, updatedData } = action.payload;
      state.carouselItems[index] = { ...state.carouselItems[index], ...updatedData };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCarouselItemsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllCarouselItemsAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.carouselItems = action.payload.carouselItems;
      })
      .addCase(getAllCarouselItemsAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteCarouselItemAsync.fulfilled, (state, action) => {

        state.carouselItems = state.carouselItems.filter(item => item.id !== item.payload);
        state.status = 'succeeded';
      })
      .addCase(deleteCarouselItemAsync.rejected, (state, action) => {

        state.status = 'failed';
        state.error = action.error.message;
      })
  },
});

export const { updateCarouselItemByIndex } = carouselSlice.actions;
export default carouselSlice.reducer;