import { useContext } from "react";
import { NewsContext } from "../contexts/news";

export const useNews = () => {
  return useContext(NewsContext);
};
