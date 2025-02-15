export const acaniza = (newsCards) =>
  newsCards
    .map((newCard) => {
      const title = newCard.querySelector(".h6")?.textContent?.trim();
      const imageSrc = newCard.querySelector("img").getAttribute("src");
      const datestr = newCard.querySelector("time")?.textContent?.trim();
      const link = newCard.querySelector(".h6 a")?.getAttribute("href");
      const text = newCard.querySelector(".card-text")?.textContent?.trim();

      const id = crypto.randomUUID();

      if (!title || !imageSrc || !datestr || !link || !text || !id) {
        return null;
      }

      const [d, m, y] = datestr.split("/");
      const date = new Date(`${y}-${m}-${d}`);

      return {
        id,
        title,
        image: `https://www.caniza.org${imageSrc}`,
        date: date.getTime(),
        link: `https://www.caniza.org${link}`,
        text,
        source: "acaniza",
      };
    })
    .filter(Boolean);
