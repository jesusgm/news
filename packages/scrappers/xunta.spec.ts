import { chromium } from "playwright";
import { test } from "playwright/test";
import { config } from "dotenv";
import path from "path";
import { getRandUserAgent, saveFile } from "./utils";
import { xunta } from "./mappers/xunta";

config({ path: path.resolve(__dirname, "../..", ".env") });

test("xunta", async () => {
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

  await page.goto("https://www.xunta.gal/es/notas-de-prensa");

  const newsData = await page
    .locator(".contedor__env__listado .contedor__ext__contido")
    .evaluateAll(xunta);

  await browser.close();

  await saveFile("xunta", newsData);
});
