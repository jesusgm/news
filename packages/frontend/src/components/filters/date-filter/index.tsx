import { useState } from "react";
import Calendar from "react-calendar";
import { formatDate } from "date-fns";

import "react-calendar/dist/Calendar.css";
import styles from "./styles.module.css";

type DateFilterProps = {
  value: { datefrom: string; dateto: string };
  onChange: (value: { datefrom: string; dateto: string }) => void;
};

export function DateFilter({ value, onChange }: DateFilterProps) {
  const { datefrom, dateto } = value;
  const [open, setOpen] = useState(false);
  const [from, setFrom] = useState<string | undefined>(datefrom ?? "");
  const [to, setTo] = useState<string | undefined>(dateto ?? "");

  const handleSave = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen(false);
    if (!from || !to) return;

    onChange({
      datefrom: formatDate(new Date(from), "yyyy-MM-dd"),
      dateto: formatDate(new Date(to), "yyyy-MM-dd"),
    });
  };

  const handleClear = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();

    setFrom(undefined);
    setTo(undefined);
    onChange({ datefrom: "", dateto: "" });
  };

  const fromFormatted = from ? formatDate(new Date(from), "dd-MM-yyyy") : "";
  const toFormatted = to ? formatDate(new Date(to), "dd-MM-yyyy") : "";

  const valueStr =
    from || to ? `${fromFormatted} - ${toFormatted}` : "Select date";

  return (
    <div className={styles.dateWrapper} onClick={() => setOpen(true)}>
      <span>{valueStr}</span>
      {(from || to) && (
        <button className={styles.closeBtn} onClick={handleClear}>
          X
        </button>
      )}
      {open && (
        <>
          <button className={styles.overlay} onClick={handleSave}></button>
          <div className={styles.datePopup}>
            <Calendar
              value={[
                from ? new Date(from) : new Date(),
                to ? new Date(to) : new Date(),
              ]}
              showDoubleView
              selectRange
              defaultView="month"
              onClickDay={() => {
                setTo(undefined);
              }}
              onChange={(value) => {
                const [start, end] = value as Date[];
                if (!start || !end) return;
                setFrom(start?.toString());
                setTo(end?.toString());
              }}
            />
            <button className={styles.saveBtn} onClick={handleSave}>
              Save
            </button>
          </div>
        </>
      )}
    </div>
  );
}
