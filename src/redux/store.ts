import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slices/couter'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});