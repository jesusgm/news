import { test } from "playwright/test";
import { config } from "dotenv";
import path from "path";
import { saveFile } from "./utils";
import { verin } from "./mappers/verin";

config({ path: path.resolve(__dirname, "../..", ".env") });

const MAX_NEWS_TO_FETCH = 20;
const source = "verin";

test(source, async () => {
  try {
    const response = await fetch(
      `https://verin.es//wp-json/wp/v2/posts?per_page=${MAX_NEWS_TO_FETCH}&_embed`
    );

    if (!response.ok) {
      throw new Error("Error fetching data");
    }

    const news = await response.json();

    const newsData = news.map(verin).filter(Boolean);

    await saveFile(source, newsData);
  } catch (e) {
    console.log(e);
  }
});
