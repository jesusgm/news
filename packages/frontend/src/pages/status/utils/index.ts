import { Status } from "../../../../../types";

export function getAdded(s: Status) {
  if (!s.text.includes("Added")) {
    return "";
  }

  const [parts] = s.text.split(",");
  const [, added] = parts.split(":");

  if (!added || added.trim() === "0") {
    return "";
  }

  return added.trim();
}
