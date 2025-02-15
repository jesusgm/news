export const boiro = (newsCards) =>
  newsCards
    .map((newCard) => {
      const title = newCard.querySelector(".enunciado")?.textContent?.trim();
      const imageSrcElement = newCard.querySelector(".img_post");
      const imageSrc = imageSrcElement
        ? imageSrcElement.getAttribute("src")
        : null;
      const datestr = newCard
        .querySelector(".fechanoticias")
        ?.textContent?.trim();
      const link = newCard.querySelector("a")?.getAttribute("href");
      const text = newCard.querySelector(".introduccion")?.textContent?.trim();

      const [id] = link?.split("/")?.at(-1)?.split("-") ?? [];

      if (!title || !imageSrc || !datestr || !link || !text || !id) {
        return null;
      }

      const [d, m, y] = datestr.split("-");
      const date = new Date(`${y}-${m}-${d}`);

      return {
        id,
        title,
        image: `https://www.boiro.gal${imageSrc}`,
        date: date.getTime(),
        link: `https://www.boiro.gal${link}`,
        text,
        source: "boiro",
      };
    })
    .filter(Boolean);
