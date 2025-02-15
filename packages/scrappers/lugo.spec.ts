import { chromium } from "playwright";
import { test } from "playwright/test";
import { config } from "dotenv";
import path from "path";
import { getDateFromStr, getRandUserAgent, saveFile } from "./utils";
import { lugo } from "./mappers/lugo";

config({ path: path.resolve(__dirname, "../..", ".env") });

test("lugo", async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    ignoreHTTPSErrors: true,
    userAgent: getRandUserAgent(),
  });
  const page = await context.newPage();

  // avoid images to optimize speed
  await page.route("*.(jpeg|png)", (route) =>
    route.fulfill({
      status: 200,
      body: "testData",
    })
  );

  await page.goto("https://concellodelugo.gal/");

  const newsData = await page
    .locator(".view-noticias .views-row")
    .evaluateAll(lugo);

  await browser.close();

  const body = newsData.map((news) => {
    return {
      ...news,
      date: getDateFromStr(news.date).getTime(),
    };
  });

  await saveFile("lugo", body);
});
