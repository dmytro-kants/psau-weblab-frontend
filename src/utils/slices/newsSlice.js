import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import $api from "../api";

const initialState = {
    articles: [],
    currentPage: 1,
    totalPages: 1,
    status: 'idle',
    error: null,
  };
  
export const getAllArticlesAsync = createAsyncThunk('articles/getAllArticles', async (page) => {
    try {
        const response = await $api.get(`/getAllArticles?page=${page}`);
        return response.data;
      } catch (error) {
        throw error;
      }
  });

    
export const deleteArticleAsync = createAsyncThunk('articles/deleteArticle', async (id) => {
  try {
      const response = await $api.delete(`/deleteArticle?id=${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
});

  const articlesSlice = createSlice({
    name: 'articles',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getAllArticlesAsync.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(getAllArticlesAsync.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.articles = action.payload.articles;
          state.currentPage = action.payload.currentPage;
          state.totalPages = action.payload.totalPages;
        })
        .addCase(getAllArticlesAsync.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        })
        .addCase(deleteArticleAsync.fulfilled, (state, action) => {
          
          state.articles = state.articles.filter(article => article.id !== action.payload);
          state.status = 'succeeded';
        })
        .addCase(deleteArticleAsync.rejected, (state, action) => {
   
          state.status = 'failed';
          state.error = action.error.message;
        })
    },
  });
  
  export default articlesSlice.reducer;