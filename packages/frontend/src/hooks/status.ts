import { useContext } from "react";
import { StatusContext } from "../contexts/status";

export const useStatus = () => {
  return useContext(StatusContext);
};
