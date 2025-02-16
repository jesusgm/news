import { test } from "playwright/test";
import { config } from "dotenv";
import path from "path";
import { saveFile } from "./utils";
import { monterrei } from "./mappers/monterrei";

config({ path: path.resolve(__dirname, "../..", ".env") });

const MAX_NEWS_TO_FETCH = 50;
const source = "monterrei";

test(source, async () => {
  const response = await fetch(
    `https://www.monterrei.es/wp-json/wp/v2/posts?per_page=${MAX_NEWS_TO_FETCH}&_embed`
  );

  if (!response.ok) {
    return;
    ("Error fetching data");
  }

  const news = await response.json();

  const newsData = news
    // Filter out news in Spanish to avoid duplicates
    .filter(
      (newsItem) => !newsItem.link.startsWith("https://www.monterrei.es/es/")
    )
    // Map the data to the format we want
    .map(monterrei)
    .filter(Boolean);

  await saveFile(source, newsData);
});
