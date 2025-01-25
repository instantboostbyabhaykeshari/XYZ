import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    user: null
}

const profileSlice = createSlice({
    name: "profile",
    initialState: initialState,
    reducers: {
        setNull(state, value){
            state.user = value.payload
        }
    }
});

export const {setNull} = profileSlice.actions;
export default profileSlice.reducer;