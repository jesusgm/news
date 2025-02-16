import { test } from "playwright/test";
import { config } from "dotenv";
import path from "path";
import { saveFile } from "./utils";
import { cmValenca } from "./mappers/cm-valenca";

config({ path: path.resolve(__dirname, "../..", ".env") });

const MAX_NEWS_TO_FETCH = 10;
const source = "cm-valenca";

test(source, async () => {
  const response = await fetch(
    `https://cm-valenca.pt/wp-json/wp/v2/posts?per_page=${MAX_NEWS_TO_FETCH}&_embed`
  );

  if (!response.ok) {
    return;
    ("Error fetching data");
  }

  const news = await response.json();

  const newsData = news.map(cmValenca).filter(Boolean);

  await saveFile(source, newsData);
});
