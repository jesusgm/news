import { SOURCES } from "../../../../../constants/";
import { IFilters } from "../../../../../types";

import styles from "./styles.module.css";

export function SourceFilter({ value }: { value?: IFilters["source"] }) {
  return (
    <ul className={styles.list}>
      {SOURCES.map((source) => (
        <li key={source.id} className={styles.listItem}>
          <input
            id={source.id}
            name="source"
            type="checkbox"
            value={source.id}
            defaultChecked={value?.includes(source.id)}
          />
          <label htmlFor={source.id}>{source.name}</label>
        </li>
      ))}
    </ul>
  );
}
