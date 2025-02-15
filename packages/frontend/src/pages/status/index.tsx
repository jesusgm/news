import { type Status } from "../../../../types";

import styles from "./styles.module.css";
import { Tooltip } from "../../components/tooltip";
import { lightFormat } from "date-fns";
import { useStatus } from "../../hooks/status";
import { StatusContextProvider } from "../../contexts/status";
import { getAdded } from "./utils";

const MAX_STATUS = 50;

function TooltipContent({ status }: { status: Status }) {
  const date = new Date(status.datetime);
  return (
    <>
      <h3>{status.source}</h3>
      <p>{lightFormat(date, "HH:mm dd-MM-yy")}</p>
      <p>{status.text}</p>
    </>
  );
}

function PageContent() {
  const { status, sources } = useStatus();

  return (
    <div>
      <h1>Status</h1>
      <div className={styles.statusContainer}>
        <h2>All sources</h2>
        <ul className={styles.statusList}>
          {status
            .filter((_, i) => i < MAX_STATUS)
            .map((s) => {
              const added = getAdded(s);
              return (
                <Tooltip text={<TooltipContent status={s} />}>
                  <li
                    key={s.id}
                    className={`${styles.statusItem} ${
                      s.status ? styles.ok : styles.ko
                    }`}
                  >
                    <span>{added}</span>
                  </li>
                </Tooltip>
              );
            })}
        </ul>
      </div>

      {sources
        .sort((a, b) => a.localeCompare(b))
        .filter((_, i) => i < MAX_STATUS)
        .map((source) => {
          const sourceStatuses = status.filter((s) => s.source === source);

          return (
            <div className={styles.statusContainer}>
              <h2>{source}</h2>
              <ul className={styles.statusList}>
                {sourceStatuses.map((s) => {
                  const added = getAdded(s);
                  return (
                    <Tooltip text={<TooltipContent status={s} />}>
                      <li
                        key={s.id}
                        className={`${styles.statusItem} ${
                          s.status ? styles.ok : styles.ko
                        }`}
                      >
                        <span>{added}</span>
                      </li>
                    </Tooltip>
                  );
                })}
              </ul>
            </div>
          );
        })}
    </div>
  );
}

export function Status() {
  return (
    <StatusContextProvider>
      <PageContent />
    </StatusContextProvider>
  );
}
