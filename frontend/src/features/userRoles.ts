import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface rolesState {
  value: string[];
}

const initialState: rolesState = {
  value: ['ROLE_USER'],
};

const rolesUser = createSlice({
  name: 'setRoles',
  initialState,
  reducers: {
    setRoles: (state, action: PayloadAction<string[]>) => {
      state.value = action.payload;
    }
  },
});

export const { setRoles } = rolesUser.actions;
export default rolesUser.reducer;
