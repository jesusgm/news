import { chromium } from "playwright";
import { test } from "playwright/test";
import { config } from "dotenv";
import path from "path";
import { getRandUserAgent, saveFile } from "./utils";
import { santiago } from "./mappers/santiago";

config({ path: path.resolve(__dirname, "../..", ".env") });

test("santiago", async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    ignoreHTTPSErrors: true,
    userAgent: getRandUserAgent(),
  });
  const page = await context.newPage();

  await page.goto("https://santiagodecompostela.gal/gl/noticias");

  await page.waitForSelector(".resultados-listado .article");

  const newsData = await page
    .locator(".resultados-listado .article")
    .evaluateAll(santiago);

  await browser.close();

  await saveFile("santiago", newsData);
});
