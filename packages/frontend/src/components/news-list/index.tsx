import { useEffect } from "react";
import { useNews } from "../../hooks/news";
import { NewCard } from "../new-card";

import styles from "./styles.module.css";

export function NewsList() {
  const { news, loading } = useNews();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [news]);

  return (
    <>
      {loading && <div className={styles.loading}>Loading...</div>}
      <ul className={styles.cardList}>
        {news.map((newData) => (
          <NewCard key={newData.id} {...newData} />
        ))}
      </ul>
    </>
  );
}
