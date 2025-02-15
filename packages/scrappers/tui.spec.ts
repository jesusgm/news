import { chromium } from "playwright";
import { test } from "playwright/test";
import { config } from "dotenv";
import path from "path";
import { getRandUserAgent, saveFile } from "./utils";
import { tui } from "./mappers/tui";

config({ path: path.resolve(__dirname, "../..", ".env") });

test("tui", async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    ignoreHTTPSErrors: true,
    userAgent: getRandUserAgent(),
  });
  const page = await context.newPage();

  await page.goto("https://tui.gal/gl/actualidade/novas");

  const newsData = await page.locator(".item-list ul li").evaluateAll(tui);

  await browser.close();

  await saveFile("tui", newsData);
});
