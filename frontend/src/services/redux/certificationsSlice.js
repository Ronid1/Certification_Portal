import { createSlice } from "@reduxjs/toolkit";

// https://www.bezkoder.com/redux-toolkit-example-crud/
// https://blog.devgenius.io/async-api-fetching-with-redux-toolkit-2020-8623ff9da267

const initialState = { certifications: [], trainings: [] };

export const certificationsSlice = createSlice ({
    name: "certifications",
    initialState: {value: initialState},
    reducers:{
        getCertifications: (state, action) => {
            state.value.certifications = action.payload;
        },

        getTrainings: (state, action) => {
            state.value.trainings = action.payload;
        },
    }
    });

export const { getCertifications, getTrainings } = certificationsSlice.actions;
export default certificationsSlice.reducer;