import { chromium } from "playwright";
import { test } from "playwright/test";
import { config } from "dotenv";
import path from "path";
import { getDateFromStr, getRandUserAgent, saveFile } from "./utils";
import { padron } from "./mappers/padron";

config({ path: path.resolve(__dirname, "../..", ".env") });

test("padron", async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    ignoreHTTPSErrors: true,
    userAgent: getRandUserAgent(),
  });
  const page = await context.newPage();

  // avoid images to optimize speed
  await page.route("**/media/k2/**", (route) =>
    route.fulfill({
      status: 200,
      body: "testData",
    })
  );

  await page.goto("https://padron.gal/actualidade");

  const newsData = await page.locator(".itemContainer").evaluateAll(padron);

  await browser.close();

  const body = newsData.map((news) => {
    return {
      ...news,
      date: getDateFromStr(news.date).getTime(),
    };
  });

  await saveFile("padron", body);
});
