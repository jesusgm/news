import { chromium } from "playwright";
import { test } from "playwright/test";
import { config } from "dotenv";
import path from "path";
import { getDateFromStr, getRandUserAgent, saveFile } from "./utils";
import { ourense } from "./mappers/ourense";

config({ path: path.resolve(__dirname, "../..", ".env") });

test("ourense", async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    ignoreHTTPSErrors: true,
    userAgent: getRandUserAgent(),
  });
  const page = await context.newPage();

  await page.goto("https://ourense.gal/gl/actualidad/");

  const newsData = await page
    .locator("#listado-noticias article")
    .evaluateAll(ourense);

  await browser.close();

  const body = newsData.map((news) => ({
    ...news,
    date: getDateFromStr(news.date).getTime(),
  }));

  await saveFile("ourense", body);
});
