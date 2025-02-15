import { chromium } from "playwright";
import { test } from "playwright/test";
import { config } from "dotenv";
import path from "path";
import { getDateFromStr, getRandUserAgent, saveFile } from "./utils";
import { catoira } from "./mappers/catoira";

config({ path: path.resolve(__dirname, "../..", ".env") });

test("catoira", async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    ignoreHTTPSErrors: true,
    userAgent: getRandUserAgent(),
  });
  const page = await context.newPage();

  // avoid images to optimize speed
  await page.route("**/uploads/**", (route) =>
    route.fulfill({
      status: 200,
      body: "testData",
    })
  );

  await page.goto("https://catoira.gal/es/noticias/");

  const newsData = await page.locator("article").evaluateAll(catoira);

  await browser.close();

  const body = newsData.map((news) => {
    if (!news) return null;

    return {
      ...news,
      date: getDateFromStr(news.date).getTime(),
    };
  });

  await saveFile("catoira", body);
});
