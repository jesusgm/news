export const lugo = (newsCards) =>
  newsCards
    .map((newCard) => {
      const title = newCard
        .querySelector(".texto-titular")
        ?.textContent?.trim();

      const imageSrc =
        newCard
          .querySelector(".views-field-field-imagen img")
          ?.getAttribute("src") ??
        "https://concellodelugo.gal/sites/default/files/logo.png";

      const datestr = newCard
        .querySelector(".date-display-single")
        ?.textContent?.split(", ")
        .at(-1)
        .replace(/ de /g, " ")
        ?.trim();
      const link = newCard.querySelector("a")?.getAttribute("href");
      const text = newCard
        .querySelector(".views-field-field-entradilla")
        ?.textContent?.trim();

      const id = crypto.randomUUID();

      if (!title || !imageSrc || !datestr || !link || !text || !id) {
        return null;
      }

      return {
        id,
        title,
        image: imageSrc,
        date: datestr,
        link: `https://concellodelugo.gal${link}`,
        text,
        source: "lugo",
      };
    })
    .filter(Boolean);
