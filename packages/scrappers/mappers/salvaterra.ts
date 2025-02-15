export const salvaterra = (newsCards) =>
  newsCards
    .map((newCard) => {
      const title = newCard.querySelector(".newstitle")?.textContent?.trim();
      const imageSrcElement = newCard.querySelector(".innerpicture img");
      const imageSrc = imageSrcElement
        ? imageSrcElement.getAttribute("src")
        : null;
      const datestr = newCard.querySelector(".news_date")?.textContent?.trim();
      const link = newCard.querySelector(".newstitle a")?.getAttribute("href");
      const text = newCard.querySelector(".newsintro")?.textContent?.trim();

      const id = newCard.getAttribute("id")?.split("-").at(-1) ?? null;

      if (!title || !imageSrc || !datestr || !link || !text || !id) {
        return null;
      }

      return {
        id,
        title,
        image: `https://www.concellodesalvaterra.com${imageSrc}`,
        date: datestr,
        link: `https://www.concellodesalvaterra.com${link}`,
        text,
        source: "salvaterra",
      };
    })
    .filter(Boolean);
