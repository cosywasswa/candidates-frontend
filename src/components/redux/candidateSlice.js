import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL ="http://localhost:5000/api/candidates"

export const fetchCandidates = createAsyncThunk('candidates/fetchCandidates', async(thunkAPI)=>{

    try{
        const response = await axios.get(baseURL)
        return response.data

    }catch(error){
        return RejectedWithValue(error?.message)
    }
})

const initialState = {
    candidates: [],
    isLoading: false,
    isError: false
}

const CandidateSlice = createSlice({
    initialState,
    name: "candidatesData", 
    reducers:{},
    extraReducers: (builder)=>{
builder.addCase(fetchCandidates.pending, (state)=>{
    state.isLoading = true;
    state.isError = false
}),
builder.addCase(fetchCandidates.fulfilled, (state, action)=>{
    state.isLoading = false;
    state.isError = false
    state.candidates = action.payload
}),
builder.addCase(fetchCandidates.rejected, (state)=>{
    state.isLoading = false;
    state.isError = true
})
    }
})
export default CandidateSlice.reducer