export const vigo = (newsCards) =>
  newsCards
    .map((newCard) => {
      const title = newCard.querySelector(".title")?.textContent?.trim();
      const imageSrcElement = newCard.querySelector(".image img");
      const imageSrc = imageSrcElement
        ? imageSrcElement.getAttribute("src")
        : null;
      const datestr = newCard.querySelector(".dateText")?.textContent?.trim();
      const link = newCard.querySelector(".title a")?.getAttribute("href");
      const text = newCard.querySelector(".subtitle")?.textContent?.trim();

      const [id] = link?.split("/")?.at(-1)?.split("-") ?? [];

      if (!title || !imageSrc || !datestr || !link || !text || !id) {
        return null;
      }

      const [d, m, y] = datestr.split(",").at(-1).trim().split(" ");

      return {
        id,
        title,
        image: imageSrc,
        date: `${d}-${m}-${y}`,
        link,
        text,
        source: "vigo",
      };
    })
    .filter(Boolean);
