import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface OptionsState {
  valueOption: string;
}

const initialState: OptionsState = {
  valueOption: 'Dashboard',
};

const navbarSection = createSlice({
  name: 'setOption',
  initialState,
  reducers: {
    setOption: (state, action: PayloadAction<string>) => {
      state.valueOption = action.payload;
    }
  },
});

export const { setOption } = navbarSection.actions;
export default navbarSection.reducer;
