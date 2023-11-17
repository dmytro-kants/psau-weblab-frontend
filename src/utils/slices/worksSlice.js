import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import $api from "../api";

const initialState = {
  works: [],
  currentPage: 1,
  totalPages: 1,
  status: 'idle',
  error: null,
};

export const getAllWorksAsync = createAsyncThunk('works/getAllWorks', async (data) => {
  try {
    const response = await $api.get(`/getAllWorks?page=${data.currentPage}&searchValue=${data.searchInput}`);
    console.log('asdasd');
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const updateWorkAsync = createAsyncThunk('works/updateWork', async (work) => {
  try {
    console.log(work);
    const response = await $api.put(`/updateWork`, work);
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const deleteWorkAsync = createAsyncThunk('works/deleteWork', async (id) => {
  try {
    const response = await $api.delete(`/deleteWork?id=${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
});

const worksSlice = createSlice({
  name: 'works',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllWorksAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllWorksAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.works = action.payload.works;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(getAllWorksAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteWorkAsync.fulfilled, (state, action) => {

        state.works = state.works.filter(work => work.id !== work.payload);
        state.status = 'succeeded';
      })
      .addCase(deleteWorkAsync.rejected, (state, action) => {

        state.status = 'failed';
        state.error = action.error.message;
      })
  },
});

export default worksSlice.reducer;