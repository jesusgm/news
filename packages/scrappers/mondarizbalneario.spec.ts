import { test } from "playwright/test";
import { config } from "dotenv";
import path from "path";
import { saveFile } from "./utils";
import { mondarizbalneario } from "./mappers/mondarizbalneario";

config({ path: path.resolve(__dirname, "../..", ".env") });

const MAX_NEWS_TO_FETCH = 50;
const source = "mondarizbalneario";

test(source, async () => {
  const response = await fetch(
    `https://mondarizbalneario.gal/wp-json/wp/v2/posts?per_page=${MAX_NEWS_TO_FETCH}&_embed`
  );

  if (!response.ok) {
    throw new Error("Error fetching data");
  }

  const news = await response.json();

  const newsData = news.map(mondarizbalneario).filter(Boolean);

  await saveFile(source, newsData);
});
