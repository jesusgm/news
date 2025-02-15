import { SourceFilter } from "./source-filter";
import { useNews } from "../../hooks/news";
import { SearchFilter } from "./search-filter";
import { DateFilter } from "./date-filter";

export function Filters() {
  const { filters, setSource, setSearch, setDates } = useNews();

  const handleChange = (event: React.ChangeEvent<HTMLFormElement>) => {
    const formData = new FormData(event.currentTarget);
    const selectedSources = Array.from(formData.getAll("source") ?? []);
    const sourceValues = Object.fromEntries(selectedSources.entries());
    setSource(Object.values(sourceValues).join(","));

    const search = formData.get("search") as string;
    setSearch(search);
  };

  const handleChangeDates = (value: { datefrom: string; dateto: string }) => {
    setDates(value);
  };

  return (
    <form onChange={handleChange}>
      <SourceFilter value={filters.get("source") ?? ""} />
      <SearchFilter value={filters.get("search") ?? ""} />
      <DateFilter
        value={{
          datefrom: filters.get("datefrom") ?? "",
          dateto: filters.get("dateto") ?? "",
        }}
        onChange={handleChangeDates}
      />
    </form>
  );
}
