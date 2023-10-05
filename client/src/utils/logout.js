// useLogout.js
import { logout as logoutFromSlice } from "state/authSlice";
import { useDispatch } from "react-redux";
import { clearPersistor } from "../state/store"

const useLogout = () => {
  const dispatch = useDispatch();

  const logout = () => {
    localStorage.clear()
    dispatch(logoutFromSlice());
    clearPersistor(); 
  };

  return logout;
};

export default useLogout;
