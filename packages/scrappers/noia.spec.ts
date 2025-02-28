import { test } from "playwright/test";
import { config } from "dotenv";
import path from "path";
import { saveFile } from "./utils";
import { noia } from "./mappers/noia";

config({ path: path.resolve(__dirname, "../..", ".env") });

const MAX_NEWS_TO_FETCH = 20;
const source = "noia";

test(source, async () => {
  try {
    const response = await fetch(
      `https://concellodenoia.gal/wp-json/wp/v2/posts?per_page=${MAX_NEWS_TO_FETCH}&_embed`
    );

    if (!response.ok) {
      throw new Error("Error fetching data");
    }

    const news = await response.json();

    const newsData = news.map(noia).filter(Boolean);

    await saveFile(source, newsData);
  } catch (e) {
    console.log(e);
  }
});
