import { chromium } from "playwright";
import { test } from "playwright/test";
import { config } from "dotenv";
import path from "path";
import { getRandUserAgent, saveFile } from "./utils";
import { covelo } from "./mappers/covelo";

config({ path: path.resolve(__dirname, "../..", ".env") });

test("covelo", async () => {
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

  await page.goto("https://www.concellodecovelo.es/?sec=96");

  const newsData = await page.locator("#contenidos > div").evaluateAll(covelo);

  await browser.close();

  await saveFile("covelo", newsData);
});
