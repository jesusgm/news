import randomUserAgent from "random-useragent";
import fs from "node:fs";
import path from "node:path";

export function getDateFromStr(datestr: string): Date {
  if (!datestr) {
    return new Date();
  }

  let m;
  const [d, strMonth, y, hour] = datestr.replace(/-/g, " ").split(" ");
  switch (strMonth.toLocaleLowerCase()) {
    case "xaneiro":
    case "xan":
    case "enero":
    case "janeiro":
      m = "01";
      break;
    case "febreiro":
    case "febrero":
    case "feb":
    case "fevereiro":
      m = "02";
      break;
    case "marzo":
    case "mar":
    case "março":
      m = "03";
      break;
    case "abril":
    case "abr":
      m = "04";
      break;
    case "maio":
    case "mayo":
    case "mai":
      m = "05";
      break;
    case "xuño":
    case "xuñ":
    case "junio":
    case "junho":
      m = "06";
      break;
    case "xullo":
    case "xul":
    case "julio":
    case "julho":
      m = "07";
      break;
    case "agosto":
    case "ago":
      m = "08";
      break;
    case "setembro":
    case "set":
    case "septiembre":
      m = "09";
      break;
    case "outubro":
    case "out":
    case "octubre":
      m = "10";
      break;
    case "novembro":
    case "nov":
    case "noviembre":
      m = "11";
      break;
    case "decembro":
    case "dec":
    case "dicembre":
    case "dezembro":
      m = "12";
      break;
    default:
      m = "01";
      break;
  }

  const date = new Date(
    `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}${hour ? "T" + hour : ""}`
  );

  return date;
}

export const cleanText = (text: string): string => {
  return text
    .replace(/\n/g, "")
    .replace(/\t/g, "")
    .replace(/\s+/g, " ")
    .substring(0, 240)
    .trim();
};

export const getRandUserAgent = () => {
  return (
    randomUserAgent.getRandom() ??
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/237.84.2.178 Safari/537.36"
  );
};

export const saveFile = async (source: string, content: string) => {
  const filename = `${source}.json`;
  const filePath = path.resolve(__dirname, "../..", "files", filename);
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(filePath, JSON.stringify(content));
};
