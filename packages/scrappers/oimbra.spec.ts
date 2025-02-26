import { chromium } from "playwright";
import { test } from "playwright/test";
import { config } from "dotenv";
import path from "path";
import { getRandUserAgent, saveFile } from "./utils";
import { oimbra } from "./mappers/oimbra";
import { randomUUID } from "crypto";

config({ path: path.resolve(__dirname, "../..", ".env") });

const source = "oimbra";

test.skip(source, async () => {
  const browser = await chromium.launch({
    args: ["--disable-blink-features=AutomationControlled"],
  });
  const context = await browser.newContext({
    ignoreHTTPSErrors: true,
    userAgent: getRandUserAgent(),
    viewport: { width: 1280, height: 720 },
    deviceScaleFactor: 1,
    isMobile: false,
  });

  const page = await context.newPage();
  try {
    await page.goto(`https://www.oimbra.gal/category/novas`);

    await page.waitForTimeout(5000);

    const news = await page.locator("article.post").evaluateAll(oimbra);

    await saveFile(source, news);
  } finally {
    await browser.close();
  }
});
