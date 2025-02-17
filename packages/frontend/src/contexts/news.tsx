import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { type NewsContextType, NewsList } from "../../../types";
import { debounce } from "../utils/debounce";
import { useSearchParams, useLocation } from "react-router-dom";
import { PAGE_SIZE } from "../../../constants";
import newsFromFile from "../../../files/index.json";
import { newsSorter } from "../utils/sorter";

const NewsContext = createContext<NewsContextType>({
  news: [],
  loading: false,
  filters: new URLSearchParams({ limit: PAGE_SIZE.toString(), offset: "0" }),
  setFilters: () => {},
  setSource: () => {},
  setSearch: () => {},
  setDates: () => {},
  page: 0,
  setPage: () => {},
  pageSize: PAGE_SIZE,
  setPageSize: () => {},
  hasNextPage: true,
});

const NewsContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [news, setNews] = useState<NewsList>([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const [filters, setFilters] = useSearchParams();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(PAGE_SIZE);

  useEffect(() => {
    setLoading(true);
    const source = filters.get("source") ?? "";
    const search = filters.get("search") ?? "";
    const datefrom = filters.get("datefrom") ?? "";
    const dateto = filters.get("dateto") ?? "";
    const limitFilter = filters.get("limit") ?? "18";
    const offsetFilter = filters.get("offset") ?? "0";
    const newsFiltered = newsFromFile.sort(newsSorter).filter((n) => {
      return (
        (source === "" || n.source === source) &&
        (search === "" ||
          n.title.includes(search) ||
          n.text.includes(search)) &&
        (datefrom === "" || n.date >= new Date(datefrom).getTime()) &&
        (dateto === "" || n.date <= new Date(dateto).getTime())
      );
    });
    console.log("newsFiltered", newsFiltered);
    setNews(
      newsFiltered.slice(
        parseInt(offsetFilter),
        parseInt(offsetFilter) + parseInt(limitFilter)
      )
    );
    setLoading(false);
  }, [filters]);

  useEffect(() => {
    const search = filters.toString();
    location.search = search;
  }, [location, filters]);

  useEffect(() => {
    const newOffset = page * pageSize;
    setFilters((prevFilters) => {
      prevFilters.set("offset", `${newOffset}`);
      prevFilters.set("limit", `${pageSize}`);
      return prevFilters;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pageSize]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const setSource = useCallback(
    debounce((souceValue: string) => {
      setFilters((prevFilters) => {
        prevFilters.set("source", souceValue);
        return prevFilters;
      });
    }, 500),
    [setFilters]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const setSearch = useCallback(
    debounce((searchValue: string) => {
      setFilters((prevFilters) => {
        prevFilters.set("search", searchValue);
        return prevFilters;
      });
    }, 500),
    [setFilters]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const setDates = useCallback(
    debounce((dates: { datefrom: string; dateto: string }) => {
      setFilters((prevFilters) => {
        prevFilters.set("datefrom", dates.datefrom);
        prevFilters.set("dateto", dates.dateto);
        return prevFilters;
      });
    }, 500),
    [setFilters]
  );

  const value = useMemo(
    () => ({
      news,
      loading,
      filters,
      setFilters,
      setSource,
      setSearch,
      setDates,
      page,
      setPage,
      hasNextPage: news.length === pageSize,
      pageSize,
      setPageSize,
    }),
    [
      news,
      loading,
      filters,
      setFilters,
      setSource,
      setSearch,
      setDates,
      page,
      setPage,
      pageSize,
      setPageSize,
    ]
  );

  return <NewsContext.Provider value={value}>{children}</NewsContext.Provider>;
};

export { NewsContext, NewsContextProvider };
