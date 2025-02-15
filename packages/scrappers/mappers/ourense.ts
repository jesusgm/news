export const ourense = (newsCards) =>
  newsCards
    .map((newCard) => {
      const title = newCard.querySelector("h3")?.textContent?.trim();
      const datestr = newCard
        .querySelector(
          "a:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > span:nth-child(2)"
        )
        ?.textContent?.trim();
      const link = newCard.querySelector("a")?.getAttribute("href");

      const imgel = newCard.querySelector(
        "a:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1)"
      );
      const img = imgel
        ?.getAttribute("style")
        ?.split("url(")[1]
        ?.split(")")[0]
        ?.replace(/'/g, "");

      const text = "-";

      const id = crypto.randomUUID();

      if (!title || !datestr || !link || !text || !id || !img) {
        return null;
      }

      const [y, m, d] = datestr?.replace(",", "")?.split(" ") ?? [];

      return {
        id,
        title,
        image: `https://ourense.gal${img}`,
        date: `${y}-${m}-${d}`,
        link: `https://ourense.gal${link}`,
        text,
        source: "ourense",
      };
    })
    .filter(Boolean);
