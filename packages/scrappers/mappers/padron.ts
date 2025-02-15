export const padron = (newsCards) =>
  newsCards
    .map((newCard) => {
      const title = newCard.querySelector(".catItemTitle")?.textContent?.trim();
      const imageSrc = newCard.querySelector("img").getAttribute("src");
      const datestr = newCard
        .querySelector(".create")
        ?.textContent?.split(", ")
        .at(-1)
        ?.trim();
      const link = newCard.querySelector("a")?.getAttribute("href");
      const text = newCard
        .querySelector(".catItemIntroText")
        ?.textContent?.trim();

      const [id] = link?.split("/")?.at(-1)?.split("-") ?? [];

      if (!title || !imageSrc || !datestr || !link || !text || !id) {
        return null;
      }

      return {
        id,
        title,
        image: `https://padron.gal/${imageSrc}`,
        date: datestr,
        link: `https://padron.gal/${link}`,
        text,
        source: "padron",
      };
    })
    .filter(Boolean);
