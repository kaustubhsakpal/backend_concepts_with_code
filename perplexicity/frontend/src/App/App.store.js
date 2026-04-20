import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from '../features/auth/State/auth.state.js'
import ChatReducer from '../features/dashbord/state/dashboard.slice.js'
const store = configureStore({
    reducer:{
        Auth: AuthReducer,
        chat:ChatReducer
    }
})

export default store