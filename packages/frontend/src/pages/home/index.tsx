import { Filters } from "../../components/filters";
import { NewsList } from "../../components/news-list";
import { Paginator } from "../../components/paginator";
import { NewsContextProvider } from "../../contexts/news";

export function Home() {
  return (
    <NewsContextProvider>
      <Filters />
      <NewsList />
      <Paginator />
    </NewsContextProvider>
  );
}
