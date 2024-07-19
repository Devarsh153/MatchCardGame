import {configureStore} from '@reduxjs/toolkit';
import levelReducer from './LevelSlice';

export const store = configureStore({
  reducer: {
    level: levelReducer,
  },
});
