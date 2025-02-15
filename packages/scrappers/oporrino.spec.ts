import { chromium } from "playwright";
import { test } from "playwright/test";
import { config } from "dotenv";
import path from "path";
import { getDateFromStr, getRandUserAgent, saveFile } from "./utils";
import { oporrino } from "./mappers/oporrino";

config({ path: path.resolve(__dirname, "../..", ".env") });

test("oporrino", async () => {
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

  await page.goto("https://oporrino.org");

  const newsData = await page.locator(".wpp_post").evaluateAll(oporrino);

  await browser.close();

  const body = newsData.map((n) => ({
    ...n,
    date: getDateFromStr(n?.date ?? "").getTime(),
  }));

  await saveFile("oporrino", body);
});
