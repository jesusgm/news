import { test } from "playwright/test";
import { config } from "dotenv";
import path from "path";
import { moncao } from "./mappers/moncao";
import { saveFile } from "./utils";

config({ path: path.resolve(__dirname, "../..", ".env") });

const source = "moncao";

test(source, async () => {
  try {
    const response = await fetch(
      "https://api.noticias.cm-moncao.pt.stage.vf-portal.com/website/News"
    );

    if (!response.ok) {
      return;
    }

    const news = await response.json();

    const newsData = news.items.map(moncao).filter(Boolean);

    await saveFile(source, newsData);
  } catch (e) {
    console.log(e);
  }
});
