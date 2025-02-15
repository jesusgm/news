import { chromium } from "playwright";
import { test } from "playwright/test";
import { config } from "dotenv";
import path from "path";
import { getDateFromStr, getRandUserAgent, saveFile } from "./utils";
import { acoruna } from "./mappers/acoruna";

config({ path: path.resolve(__dirname, "../..", ".env") });

test("acoruna", async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    ignoreHTTPSErrors: true,
    userAgent: getRandUserAgent(),
  });
  const page = await context.newPage();

  // avoid images to optimize speed
  await page.route("**/IMG/**", (route) =>
    route.fulfill({
      status: 200,
      body: "testData",
    })
  );

  await page.goto("https://www.coruna.gal/web/gl/actualidade/novas");

  const newsData = await page
    .locator("ul.listadoResultados li")
    .evaluateAll(acoruna);

  await browser.close();

  const body = newsData.map((news) => {
    return {
      ...news,
      date: getDateFromStr(news.date).getTime(),
    };
  });

  await saveFile("acoruna", body);
});
