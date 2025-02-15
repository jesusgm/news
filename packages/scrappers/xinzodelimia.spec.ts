import { chromium } from "playwright";
import { test } from "playwright/test";
import { config } from "dotenv";
import path from "path";
import { getRandUserAgent, saveFile } from "./utils";
import { xinzodelimia } from "./mappers/xinzodelimia";

config({ path: path.resolve(__dirname, "../..", ".env") });

test("xinzodelimia", async () => {
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

  await page.goto("https://www.xinzodelimia.gal/");

  const newsData = await page
    .locator("#main-container article")
    .evaluateAll(xinzodelimia);

  await browser.close();

  await saveFile("xinzodelimia", newsData);
});
