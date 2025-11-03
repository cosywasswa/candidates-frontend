import { configureStore } from "@reduxjs/toolkit";
import SliceReducer from './candidateSlice'

const store = configureStore({
    reducer:{
        candidatesData: SliceReducer
    }
})

export default store;