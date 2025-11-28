import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { setOption } from "../features/navbarsection/navbarSection";
import type { AppDispatch } from "../store/store";
import { useDispatch } from "react-redux";

export const useNavigateWithOption = () => {
  const dispatch = useDispatch<AppDispatch>();
  const routerNavigate = useNavigate();

  const navigateWithOption = useCallback(
    (option: string, path: string): void => {
      dispatch(setOption(option));
      routerNavigate(path);
    },
    [dispatch, routerNavigate]
  );

  return { navigateWithOption };
};
