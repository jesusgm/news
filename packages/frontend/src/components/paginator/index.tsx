import { useNews } from "../../hooks/news";

import styles from "./styles.module.css";

export function Paginator() {
  const { page, setPage, hasNextPage, pageSize, setPageSize } = useNews();

  const handleChangePagesize = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPage(0);
    setPageSize(parseInt(e.target.value, 10));
  };

  return (
    <div className={styles.paginationBase}>
      <select onChange={handleChangePagesize} value={pageSize}>
        <option value={6}>6</option>
        <option value={12}>12</option>
        <option value={18}>18</option>
        <option value={24}>24</option>
        <option value={48}>48</option>
        <option value={96}>96</option>
      </select>
      <button onClick={() => setPage(page - 1)} disabled={page === 0}>
        Previous
      </button>
      <span>{page + 1}</span>
      <button onClick={() => setPage(page + 1)} disabled={!hasNextPage}>
        Next
      </button>
    </div>
  );
}
