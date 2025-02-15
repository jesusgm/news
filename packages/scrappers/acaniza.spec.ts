import { chromium } from "playwright";
import { test } from "playwright/test";
import { config } from "dotenv";
import path from "path";
import { getRandUserAgent, saveFile } from "./utils";
import { acaniza } from "./mappers/acaniza";

config({ path: path.resolve(__dirname, "../..", ".env") });

test("acaniza", async () => {
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

  await page.goto("https://www.caniza.org/es/actualidade/novas");

  const newsData = await page
    .locator(".view-content .row > div.col-lg-12")
    .evaluateAll(acaniza);

  await browser.close();

  await saveFile("acaniza", newsData);
});
