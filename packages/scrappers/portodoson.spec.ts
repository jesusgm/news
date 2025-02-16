import { test } from "playwright/test";
import { config } from "dotenv";
import path from "path";
import { saveFile } from "./utils";
import { portodoson } from "./mappers/portodoson";

config({ path: path.resolve(__dirname, "../..", ".env") });

const MAX_NEWS_TO_FETCH = 20;
const source = "portodoson";

test(source, async () => {
  try {
    const response = await fetch(
      `https://portodoson.gal/wp-json/wp/v2/posts?per_page=${MAX_NEWS_TO_FETCH}&_embed`
    );

    if (!response.ok) {
      return;
    }

    const news = await response.json();

    const newsData = news.map(portodoson).filter(Boolean);

    await saveFile(source, newsData);
  } catch (e) {
    console.log(e);
  }
});
