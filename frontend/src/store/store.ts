import { configureStore } from '@reduxjs/toolkit'
import navbarSectionReducer from '../features/navbarsection/navbarSection';
import roleUserReducer from '../features/userRoles';

export const store = configureStore({
  reducer: {
    option: navbarSectionReducer,
    roles: roleUserReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;