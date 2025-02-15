export const celanova = (newsCards) =>
  newsCards
    .map((newCard) => {
      const title = newCard.querySelector("h3")?.textContent?.trim();
      const imageSrcElement = newCard.querySelector("img");
      const imageSrc = imageSrcElement
        ? imageSrcElement.getAttribute("src")
        : "https://celanova.gal/images/logos/logo_celanova.jpg";
      const datestr = newCard
        .querySelector('[itemprop="datePublished"')
        ?.textContent?.trim();
      const link = newCard.querySelector("a")?.getAttribute("href");
      const text = "-";

      const [id] = link?.split("/")?.at(-1)?.split("-") ?? [];

      if (!title || !imageSrc || !datestr || !link || !text || !id) {
        return null;
      }

      return {
        id,
        title,
        image: `https://celanova.gal${imageSrc}`,
        date: datestr,
        link: `https://celanova.gal${link}`,
        text,
        source: "celanova",
      };
    })
    .filter(Boolean);
