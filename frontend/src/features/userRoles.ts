import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Role } from '../apis/authApis';

interface rolesState {
  value: Role[];
}

const initialState: rolesState = {
  value: [],
};

const rolesUser = createSlice({
  name: 'setRoles',
  initialState,
  reducers: {
    setRoles: (state, action: PayloadAction<Role[]>) => {
      state.value = action.payload;
    }
  },
});

export const { setRoles } = rolesUser.actions;
export default rolesUser.reducer;
