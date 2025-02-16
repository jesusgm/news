import { test } from "playwright/test";
import { config } from "dotenv";
import path from "path";
import { saveFile } from "./utils";
import { cualedro } from "./mappers/cualedro";

config({ path: path.resolve(__dirname, "../..", ".env") });

const MAX_NEWS_TO_FETCH = 10;
const source = "cualedro";

test(source, async () => {
  try {
    const response = await fetch(
      `https://www.cualedro.es/wp-json/wp/v2/posts?per_page=${MAX_NEWS_TO_FETCH}&_embed`
    );

    if (!response.ok) {
      return;
    }

    const news = await response.json();

    const newsData = news.map(cualedro).filter(Boolean);

    await saveFile(source, newsData);
  } catch (e) {
    console.log(e);
  }
});
