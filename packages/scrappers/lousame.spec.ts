import { chromium } from "playwright";
import { test } from "playwright/test";
import { config } from "dotenv";
import path from "path";
import { getDateFromStr, getRandUserAgent, saveFile } from "./utils";
import { lousame } from "./mappers/lousame";

config({ path: path.resolve(__dirname, "../..", ".env") });

test("lousame", async () => {
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

  await page.goto(
    "http://www.concellodelousame.gal/index.php/gl/novas/todas-as-novas"
  );

  const newsData = await page.locator("#noticias .row").evaluateAll(lousame);

  await browser.close();

  const body = newsData.map((news) => ({
    ...news,
    date: getDateFromStr(news.date).getTime(),
  }));

  await saveFile("lousame", body);
});
