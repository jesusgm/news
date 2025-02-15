import { chromium } from "playwright";
import { test } from "playwright/test";
import { config } from "dotenv";
import path from "path";
import { getDateFromStr, getRandUserAgent, saveFile } from "./utils";
import { ribeira } from "./mappers/ribeira";

config({ path: path.resolve(__dirname, "../..", ".env") });

test("ribeira", async () => {
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

  await page.goto("https://www.ribeira.gal/noticias", {
    timeout: 60000,
  });

  const newsData = await page.locator(".card").evaluateAll(ribeira);

  await browser.close();

  const body = newsData.map((news) => {
    if (!news) return null;

    return {
      ...news,
      date: getDateFromStr(news.date).getTime(),
    };
  });

  await saveFile("ribeira", body);
});
