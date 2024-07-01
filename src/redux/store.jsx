import {configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import {persistReducer} from 'redux-persist'
import { combineReducers } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key:"root",
    storage
}
const reducers = combineReducers({
    auth: authReducer
})
const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
    reducer :persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false,
        }),
})

// export type RootState = ReturnType<typeof store.getState> //dont know why
