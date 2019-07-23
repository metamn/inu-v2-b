import { useContext } from "react";
import { ThemeContext } from "../components/Home";

const useTheme = () => {
  return useContext(ThemeContext);
};

export default useTheme;
