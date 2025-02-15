import { test } from "playwright/test";
import { config } from "dotenv";
import path from "path";
import { saveFile } from "./utils";
import { baiona } from "./mappers/baiona";

config({ path: path.resolve(__dirname, "../..", ".env") });

const MAX_NEWS_TO_FETCH = 25;
const source = "baiona";

test(source, async () => {
  const response = await fetch(
    `https://www.baiona.gal/wp-json/wp/v2/posts?per_page=${MAX_NEWS_TO_FETCH}&_embed`
  );

  if (!response.ok) {
    throw new Error("Error fetching data");
  }

  const news = await response.json();

  const newsData = news
    // Filter out news in Spanish to avoid duplicates
    // .filter((newsItem) => !newsItem.link.startsWith("https://www.baiona.gal/es/"))
    // Map the data to the format we want
    .map(baiona)
    .filter(Boolean);

  await saveFile(source, newsData);
});
