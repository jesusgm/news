import { CopyIcon } from "../icons/copy";
import { ShareIcon } from "../icons/share";

import styles from "./styles.module.css";

export function Share({ title, url }: { title: string; url: string }) {
  const share = async () => {
    if (navigator.share) {
      await navigator
        .share({
          title,
          url,
        })
        .catch(console.error);
    } else {
      navigator.clipboard.writeText(url);
      alert("Link copied to clipboard");
    }
  };

  return (
    <button className={styles.base} onClick={share}>
      <ShareIcon className={styles.share} />
      <CopyIcon className={styles.copy} />
    </button>
  );
}
