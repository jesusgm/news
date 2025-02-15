import { chromium } from "playwright";
import { test } from "playwright/test";
import { config } from "dotenv";
import path from "path";
import { getDateFromStr, getRandUserAgent, saveFile } from "./utils";
import { chaves } from "./mappers/chaves";

config({ path: path.resolve(__dirname, "../..", ".env") });

test("chaves", async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    ignoreHTTPSErrors: true,
    userAgent: getRandUserAgent(),
  });
  const page = await context.newPage();

  // avoid images to optimize speed
  await page.route("**/image/**", (route) =>
    route.fulfill({
      status: 200,
      body: "testData",
    })
  );

  await page.goto("https://www.chaves.pt/pages/210");

  const newsData = await page.locator(".news_list ul li").evaluateAll(chaves);

  await browser.close();

  const body = newsData.map((news) => ({
    ...news,
    date: getDateFromStr(news.date).getTime(),
  }));

  await saveFile("chaves", body);
});
