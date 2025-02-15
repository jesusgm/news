import { chromium } from "playwright";
import { test } from "playwright/test";
import { config } from "dotenv";
import path from "path";
import { getRandUserAgent, saveFile } from "./utils";
import { laza } from "./mappers/laza";

config({ path: path.resolve(__dirname, "../..", ".env") });

test("laza", async () => {
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

  await page.goto("http://www.laza.es/");

  const newsData = await page.locator(".aidanews2_art").evaluateAll(laza);

  await browser.close();

  await saveFile("laza", newsData);
});
