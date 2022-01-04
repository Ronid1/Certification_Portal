import { createSlice } from "@reduxjs/toolkit";

// https://www.bezkoder.com/redux-toolkit-example-crud/
// https://blog.devgenius.io/async-api-fetching-with-redux-toolkit-2020-8623ff9da267

const initialState = {id: '', name: '', isAdmin: false, role: '', image: null, isLoggedIn: false, instructorFor: []};

export const userSlice = createSlice ({
    name: "user",
    initialState: {value: initialState},
    reducers:{
        login: (state, action) => {
            state.value = action.payload;
        },

        logout: (state) => {
            state.value = initialState;
        },

        changeProfilePic: (state, action) => {
           state.value.image = action.payload;
        },

        updateInstructorFor: (state, action) => {
            state.value.instructorFor = action.payload;
         },

    }
});

export const { login, logout, changeProfilePic, updateInstructorFor} = userSlice.actions;
export default userSlice.reducer;

  //way to get info from redux
  //const user = useSelector((state) => state.user);
  //import { useSelector } from "react-redux"