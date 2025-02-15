import { test } from "playwright/test";
import { config } from "dotenv";
import path from "path";
import { moncao } from "./mappers/moncao";
import { saveFile } from "./utils";

config({ path: path.resolve(__dirname, "../..", ".env") });

test("moncao", async () => {
  const response = await fetch(
    "https://api.noticias.cm-moncao.pt.stage.vf-portal.com/website/News"
  );

  if (!response.ok) {
    throw new Error("Error fetching data");
  }

  const news = await response.json();

  const newsData = news.items.map(moncao).filter(Boolean);

  await saveFile("moncao", newsData);
});
