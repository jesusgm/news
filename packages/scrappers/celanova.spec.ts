import { chromium } from "playwright";
import { test } from "playwright/test";
import { config } from "dotenv";
import path from "path";
import { getDateFromStr, getRandUserAgent, saveFile } from "./utils";
import { celanova } from "./mappers/celanova";

config({ path: path.resolve(__dirname, "../..", ".env") });

test("celanova", async () => {
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

  await page.goto("https://celanova.gal/index.php/gl/");

  const newsData = await page
    .locator(".sppb-addon.sppb-addon-articles .sppb-col-sm-4")
    .evaluateAll(celanova);

  await browser.close();

  const body = newsData.map((news) => {
    return {
      ...news,
      date: getDateFromStr(news.date).getTime(),
    };
  });

  await saveFile("celanova", body);
});
