import { chromium } from "playwright";
import { test } from "playwright/test";
import { config } from "dotenv";
import path from "path";
import { getRandUserAgent, saveFile } from "./utils";
import { outes } from "./mappers/outes";

config({ path: path.resolve(__dirname, "../..", ".env") });

test("outes", async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    ignoreHTTPSErrors: true,
    userAgent: getRandUserAgent(),
  });
  const page = await context.newPage();

  // avoid images to optimize speed
  await page.route("**/uploads/**", (route) =>
    route.fulfill({
      status: 200,
      body: "testData",
    })
  );

  await page.goto("https://www.outes.gal/gl/anuncios");

  const newsData = await page.locator(".span6 > div").evaluateAll(outes);

  await browser.close();

  await saveFile("outes", newsData);
});
