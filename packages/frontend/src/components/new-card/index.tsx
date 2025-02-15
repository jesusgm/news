import { sourcesWithHtmlContent } from "../../../../constants/";
import { New } from "../../../../types";
import { Share } from "../share";

import styles from "./styles.module.css";

export function NewCard(newData: New) {
  const date = new Date(newData.date);
  const dateformated = date.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const titleTruncated =
    newData.title.length > 75
      ? `${newData.title.slice(0, 75)}...`
      : newData.title;

  const textTruncated =
    newData.text.length > 200
      ? `${newData.text.slice(0, 200)}...`
      : newData.text;

  return (
    <li className={styles.card}>
      <article>
        <img
          className={styles.image}
          loading="lazy"
          src={newData.image}
          alt={newData.title}
        />
        <h2>
          <a href={newData.link} target="_blanc">
            {titleTruncated}
          </a>
        </h2>
        {sourcesWithHtmlContent.includes(newData.source) ? (
          <div dangerouslySetInnerHTML={{ __html: textTruncated }} />
        ) : (
          <p>{textTruncated}</p>
        )}
        <small>{dateformated}</small> · <small>{newData.source}</small>
        <footer>
          <Share title={newData.title} url={newData.link} />
        </footer>
      </article>
    </li>
  );
}
