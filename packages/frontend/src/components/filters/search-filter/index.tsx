import styles from "./styles.module.css";

export function SearchFilter({ value }: { value: string }) {
  return (
    <label className={styles.label}>
      <input
        className={styles.input}
        type="text"
        name="search"
        placeholder="Search by title or text"
        defaultValue={value}
        autoFocus
        autoComplete="off"
      />
    </label>
  );
}
