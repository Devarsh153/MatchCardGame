import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  level: '',
  currentLevel: '',
};

export const LevelSlice = createSlice({
  name: 'level',
  initialState,
  reducers: {
    changeLevel: (state, action) => {
      action.payload = JSON.parse(JSON.stringify(action.payload));
      console.log('action payload:', action.payload);
      state.level = action.payload;
    },
    changeCurrentLevel: (state, action) => {
      action.payload = JSON.parse(JSON.stringify(action.payload));
      console.log('action payload:', action.payload);
      state.currentLevel = action.payload;
    },
  },
});

export const {changeLevel, changeCurrentLevel} = LevelSlice.actions;
export default LevelSlice.reducer;
