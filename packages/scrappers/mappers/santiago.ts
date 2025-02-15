export const santiago = (newsCards) =>
  newsCards
    .map((newCard) => {
      const title = newCard.querySelector("h2")?.textContent?.trim();
      const datestr = newCard.querySelector(".date")?.textContent?.trim();
      const link = newCard.querySelector("h2 a")?.getAttribute("href");
      const text = newCard.querySelector(".resumen")?.textContent?.trim();

      const id = newCard.getAttribute("id");

      const image = newCard.querySelector("img")?.getAttribute("src");

      if (!title || !datestr || !link || !text || !id) {
        return null;
      }

      const [d, m, y] = datestr.split(".");
      const date = new Date(`${y}-${m}-${d}`);

      return {
        id,
        title,
        image: image
          ? `http://santiagodecompostela.gal${image}`
          : `http://santiagodecompostela.gal/auxiliarV2/images/image-slide-logo.png`,
        date: date.getTime(),
        link,
        text,
        source: "santiago",
      };
    })
    .filter(Boolean);
