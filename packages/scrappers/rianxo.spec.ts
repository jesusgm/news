import Parser from "rss-parser";
import { chromium } from "playwright";
import { test } from "playwright/test";
import { config } from "dotenv";
import path from "path";
import { saveFile } from "./utils";

config({ path: path.resolve(__dirname, "../..", ".env") });

test("rianxo", async () => {
  const parser = new Parser({
    requestOptions: {
      rejectUnauthorized: false,
    },
  });
  const feed = await parser.parseURL(
    "https://concelloderianxo.gal/c/blogs/rss?plid=155101&groupId=156233"
  );

  const itemsPromise = feed.items
    .map(async (newCard, index) => {
      // only get last 10 news increase speed
      if (index > 10) return null;

      const title = newCard.title?.trim();

      const datestr = newCard.pubDate?.trim();
      const link = newCard.link?.trim();

      const text = newCard.summary?.trim();
      const [, id] = newCard.id.split("entryId=");

      const browser = await chromium.launch();
      const context = await browser.newContext({
        ignoreHTTPSErrors: true,
        userAgent:
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" +
          " AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
      });
      const page = await context.newPage();
      // avoid images to optimize speed
      await page.route("**.jpg**", (route) =>
        route.fulfill({
          status: 200,
          body: "testData",
        })
      );
      await page.goto(link ?? "");

      const imageSrc =
        (await page
          .locator(".cover-image")
          .getAttribute("style")
          .then((style) => {
            return style?.split("url(")?.at(-1)?.split(")")[0];
          })) ?? null;

      await browser.close();

      if (!title || !datestr || !link || !text || !id) {
        return null;
      }

      const date = new Date(datestr);

      const newData = {
        id,
        title,
        image: imageSrc ?? "",
        date: date.getTime(),
        link,
        text,
        source: "rianxo",
      };

      return newData;
    })
    .filter(Boolean);

  const newsData = (await Promise.all(itemsPromise)).filter(Boolean);

  await saveFile("rianxo", JSON.parse(JSON.stringify(newsData)));
});
