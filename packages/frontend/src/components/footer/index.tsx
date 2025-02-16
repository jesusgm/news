import { Link } from "react-router-dom";

import styles from "./styles.module.css";

export function Footer() {
  return (
    <nav className={styles.nav}>
      <Link to="/">News</Link>
    </nav>
  );
}
