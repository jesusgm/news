export const catoira = (newsCards) =>
  newsCards
    .map((newCard) => {
      const title = newCard
        .querySelector(".article-title")
        ?.textContent?.trim();
      const imageSrcElement = newCard.querySelector(".article-image img");
      const imageSrc = imageSrcElement
        ? imageSrcElement.getAttribute("src")
        : null;
      const datestr = newCard
        .querySelector(".article-date-permalink")
        ?.textContent?.trim();
      const link = newCard
        .querySelector(".article-image a")
        ?.getAttribute("href");
      const text = newCard
        .querySelector(".article-content-inner")
        ?.innerHTML?.trim();

      const articleClass =
        newCard
          .getAttribute("class")
          ?.split(" ")
          ?.find((c) => c.startsWith("post-")) ?? "post-0";

      const [, id] = articleClass.split("-");

      if (!title || !imageSrc || !datestr || !link || !text || !id) {
        return null;
      }

      const newData = {
        id,
        title,
        image: imageSrc,
        date: datestr.replace(",", ""),
        link,
        text,
        source: "catoira",
      };

      return newData;
    })
    .filter(Boolean);
