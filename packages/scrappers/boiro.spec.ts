import { chromium } from "playwright";
import { test } from "playwright/test";
import { config } from "dotenv";
import path from "path";
import { getRandUserAgent, saveFile } from "./utils";
import { boiro } from "./mappers/boiro";

config({ path: path.resolve(__dirname, "../..", ".env") });

test("boiro", async () => {
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

  await page.goto("https://www.boiro.gal/index.php/es/todas-las-noticias");

  const newsData = await page
    .locator("#noticias .titulares")
    .evaluateAll(boiro);

  await browser.close();

  await saveFile("boiro", newsData);
});
