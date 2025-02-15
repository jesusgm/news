import { chromium } from "playwright";
import { test } from "playwright/test";
import { config } from "dotenv";
import { getDateFromStr, getRandUserAgent, saveFile } from "./utils";
import path from "path";
import { salvaterra } from "./mappers/salvaterra";

config({ path: path.resolve(__dirname, "../..", ".env") });

test("salvaterra", async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    ignoreHTTPSErrors: true,
    userAgent: getRandUserAgent(),
  });
  const page = await context.newPage();

  // avoid images to optimize speed
  await page.route("*.jpg", (route) =>
    route.fulfill({
      status: 200,
      body: "testData",
    })
  );

  await page.goto("https://www.concellodesalvaterra.com/");

  const newsData = await page
    .locator(".latestnews-items .latestnews-item")
    .evaluateAll(salvaterra);

  await browser.close();

  const body = newsData.map((news) => {
    if (!news) return null;

    const date = getDateFromStr(news.date);
    return {
      ...news,
      date: date.getTime(),
    };
  });

  await saveFile("salvaterra", body);
});
