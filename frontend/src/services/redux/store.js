import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist"
import thunk from "redux-thunk";
import certificationsReducer from './certificationsSlice';
import userReducer from './userSlice';


const reducers = combineReducers({
    user: userReducer,
    certifications: certificationsReducer,
});

//config for presist -> storing state in local storage
const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

//store configutration for redux state manager
const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk],
});

export default store;