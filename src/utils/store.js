import { configureStore } from '@reduxjs/toolkit'
import authReducer from "../utils/slices/authSlice"
import newsReducer from "../utils/slices/newsSlice"
import worksReducer from "../utils/slices/worksSlice"
import carouselReducer from "../utils/slices/carouselSlice"

export const store = configureStore({
    reducer: {
        auth: authReducer,
        articles: newsReducer,
        works: worksReducer,
        carousel: carouselReducer,
    },
})