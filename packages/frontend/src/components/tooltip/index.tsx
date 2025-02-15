import styles from "./styles.module.css";

type TooltipProps = {
  children: React.ReactNode;
  text: React.ReactNode;
};

export function Tooltip({ children, text }: TooltipProps) {
  return (
    <div className={styles.tooltip}>
      {children}
      <span className={styles.tooltiptext}>{text}</span>
    </div>
  );
}
