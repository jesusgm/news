import { test } from "playwright/test";
import { config } from "dotenv";
import path from "path";
import { saveFile } from "./utils";
import { redondela } from "./mappers/redondela";

config({ path: path.resolve(__dirname, "../..", ".env") });

const MAX_NEWS_TO_FETCH = 50;
const source = "redondela";

test(source, async () => {
  const response = await fetch(
    `https://redondela.gal/wp-json/wp/v2/posts?per_page=${MAX_NEWS_TO_FETCH}&_embed`
  );

  if (!response.ok) {
    throw new Error("Error fetching data");
  }

  const news = await response.json();

  const newsData = news.map(redondela).filter(Boolean);

  await saveFile(source, newsData);
});
