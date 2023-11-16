import { configureStore } from '@reduxjs/toolkit'
import authReducer from "../utils/slices/authSlice"
import newsReducer from "../utils/slices/newsSlice"
import worksReducer from "../utils/slices/worksSlice"

export const store = configureStore({
    reducer: {
        auth: authReducer,
        articles: newsReducer,
        works: worksReducer,
    },
})