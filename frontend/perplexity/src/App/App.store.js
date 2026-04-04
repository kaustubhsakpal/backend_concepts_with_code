import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from '../features/auth/State/auth.state.js'
const store = configureStore({
    reducer:{
        Auth: AuthReducer
    }
})

export default store