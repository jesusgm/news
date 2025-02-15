export const lousame = (newsCards) =>
  newsCards
    .map((newCard) => {
      const title = newCard
        .querySelector(".cuadricula_title")
        ?.textContent?.trim();
      const imageSrc = newCard
        .querySelector(".miniatura_medium img")
        ?.getAttribute("src");
      const datestr = newCard.querySelector("time")?.textContent?.trim();
      const link = newCard.querySelector("a")?.getAttribute("href");
      const text = newCard.querySelector(".introtext")?.textContent?.trim();

      const [id] = link?.split("/")?.at(-1)?.split("-") ?? [];

      if (!title || !imageSrc || !datestr || !link || !id) {
        return null;
      }

      return {
        id,
        title,
        image: `http://www.concellodelousame.gal${imageSrc}`,
        date: datestr,
        link: `http://www.concellodelousame.gal${link}`,
        text: text.length > 0 ? text : "-",
        source: "lousame",
      };
    })
    .filter(Boolean);
