import { chromium } from "playwright";
import { test } from "playwright/test";
import { config } from "dotenv";
import path from "path";
import { getDateFromStr, getRandUserAgent, saveFile } from "./utils";
import { vigo } from "./mappers/vigo";

config({ path: path.resolve(__dirname, "../..", ".env") });

test("vigo", async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    ignoreHTTPSErrors: true,
    userAgent: getRandUserAgent(),
  });
  const page = await context.newPage();

  // avoid images to optimize speed
  await page.route("**/images/**", (route) =>
    route.fulfill({
      status: 200,
      body: "testData",
    })
  );

  await page.goto("https://xornal.vigo.org/");

  const newsData = await page.locator("article.columns.post").evaluateAll(vigo);

  await browser.close();

  const body = newsData.map((news) => ({
    ...news,
    date: getDateFromStr(news.date).getTime(),
  }));

  await saveFile("vigo", body);
});
