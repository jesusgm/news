import { chromium } from "playwright";
import { test } from "playwright/test";
import { config } from "dotenv";
import path from "path";
import { getRandUserAgent, saveFile } from "./utils";
import { oimbra } from "./mappers/oimbra";

config({ path: path.resolve(__dirname, "../..", ".env") });

const source = "oimbra";

test(source, async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    ignoreHTTPSErrors: true,
    userAgent: getRandUserAgent(),
  });

  const page = await context.newPage();
  try {
    await page.goto(`https://www.oimbra.gal/category/novas?rand=${Date.now()}`);

    await page.waitForTimeout(5000);

    const news = await page.locator("article.post").evaluateAll(oimbra);

    await saveFile(source, news);
  } finally {
    await browser.close();
  }
});
