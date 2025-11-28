import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { PacsUidResponse } from '../types/order';


const initialState: PacsUidResponse = {
  studyInstanceUID: '',
  seriesInstanceUID: '',
  instanceUID: '',
};

const pacsInstanceUID = createSlice({
  name: 'pacsInstanceUID',
  initialState,
  reducers: {
    setValue: (state, action: PayloadAction<PacsUidResponse>) => {
      state.studyInstanceUID = action.payload.studyInstanceUID;
      state.seriesInstanceUID = action.payload.seriesInstanceUID;
      state.instanceUID = action.payload.instanceUID;
    },
    setStudyInstanceUID: (state, action: PayloadAction<string>) => {
      state.studyInstanceUID = action.payload;
    },
    setSeriesInstanceUID: (state, action: PayloadAction<string>) => {
      state.seriesInstanceUID = action.payload;
    },
    setInstanceUID: (state, action: PayloadAction<string>) => {
      state.instanceUID = action.payload;
    },
    resetValue: (state) => {
      state.studyInstanceUID = '';
      state.seriesInstanceUID = '';
      state.instanceUID = '';
    },
  },
});

export const { 
  setValue, 
  setStudyInstanceUID, 
  setSeriesInstanceUID, 
  setInstanceUID,
  resetValue 
} = pacsInstanceUID.actions;
export default pacsInstanceUID.reducer;
