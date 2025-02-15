export const outes = (newsCards) =>
  newsCards
    .map((newCard) => {
      console.log("entra");

      const title = newCard.querySelector("h5")?.textContent?.trim();
      const imageSrc = "/assets/novo-logo-da7645c361171cbef501a4cde054f1ff.svg";
      const datestr = newCard.querySelector("span")?.textContent?.trim();
      const link = newCard.querySelector("a")?.getAttribute("href");
      const text = newCard.querySelector("p")?.textContent?.trim();

      const [id] = link?.split("/")?.at(-1)?.split("-") ?? [];

      if (!title || !imageSrc || !datestr || !link || !text || !id) {
        return null;
      }

      const [d, m, y] = datestr.split("/");
      const date = new Date(`${y}-${m}-${d}`);

      return {
        id,
        title,
        image: `https://www.outes.gal${imageSrc}`,
        date: date.getTime(),
        link: `https://www.outes.gal${link}`,
        text,
        source: "outes",
      };
    })
    .filter(Boolean);
