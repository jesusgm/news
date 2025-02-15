import { chromium } from "playwright";
import { test } from "playwright/test";
import { config } from "dotenv";
import path from "path";
import { cleanText, getRandUserAgent, saveFile } from "./utils";
import { getlinks } from "./mappers/crecente";

config({ path: path.resolve(__dirname, "../..", ".env") });

test("crecente", async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    ignoreHTTPSErrors: true,
    userAgent: getRandUserAgent(),
  });
  const page = await context.newPage();

  // avoid images to optimize speed
  await page.route("**/fotos/**", (route) =>
    route.fulfill({
      status: 200,
      body: "testData",
    })
  );

  await page.goto("https://www.crecente.es/noticias.htm");

  const newsLinks = (await page
    .locator("#listado_registros article a")
    .evaluateAll(getlinks)) as string[];

  const promises = newsLinks
    .filter((link) => !link.endsWith(".pdf"))
    .splice(0, 5)
    .map(async (link) => {
      const newPage = await context.newPage();
      await newPage.goto(link);

      const title = await newPage.locator("h1").textContent();
      const dateStr = (await newPage.locator(".data").textContent()) ?? "";
      const text = await newPage
        .locator(".zona .contenedor")
        .first()
        .textContent();
      const image = await newPage
        .locator(".zona .contenedor")
        .first()
        .locator(" img")
        .first()
        .getAttribute("src");

      await newPage.close();

      const [d, m, y] = dateStr.split("/");
      const date = new Date(`${y}-${m}-${d}`);

      return {
        id: crypto.randomUUID(),
        title,
        date: date.getTime(),
        text: cleanText(text ?? "-")
          .replace(dateStr, "")
          .trim(),
        image,
        link,
        source: "crecente",
      };
    });

  const newsData = await Promise.all(promises);

  await browser.close();

  await saveFile("crecente", JSON.parse(JSON.stringify(newsData)));
});
