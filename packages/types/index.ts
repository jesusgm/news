import z, { number } from "zod";

export const newSchema = z.object({
  id: z.string().or(z.number()).optional(),
  extId: z.string().optional(),
  title: z.string(),
  image: z.string(),
  date: z.number(),
  text: z.string(),
  link: z.string(),
  source: z.string(),
});

export type New = z.infer<typeof newSchema>;

export const newsSchemaList = z.array(newSchema);

export type NewsList = z.infer<typeof newsSchemaList>;

export type NewsContextType = {
  news: NewsList;
  loading: boolean;
  filters: URLSearchParams;
  setFilters: (filters: URLSearchParams) => void;
  setSource: (source: string) => void;
  setSearch: (search: string) => void;
  setDates: (dates: { datefrom: string; dateto: string }) => void;
  page: number;
  setPage: (page: number) => void;
  pageSize: number;
  setPageSize: (pageSize: number) => void;
  hasNextPage: boolean;
};

export type StatusContextType = {
  status: Status[];
  sources: string[];
};

export interface IFilters {
  limit?: string;
  offset?: string;
  source?: string;
  search?: string;
}

export const StatusSchema = z.object({
  id: number(),
  datetime: z.string(),
  source: z.string(),
  status: z.string(),
  text: z.string(),
});

export type Status = z.infer<typeof StatusSchema>;
