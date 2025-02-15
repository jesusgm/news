export const chaves = (newsCards) =>
  newsCards
    .map((newCard) => {
      const title = newCard.querySelector(".title")?.textContent?.trim();
      const imageSrcElement = newCard.querySelector("img");
      const imageSrc = imageSrcElement
        ? imageSrcElement.getAttribute("src")
        : null;
      const datestr = newCard.querySelector(".date")?.textContent?.trim();
      const link = newCard.querySelector("a")?.getAttribute("href");
      const text = newCard.querySelector(".summary")?.textContent?.trim();

      const id = new URL(link).searchParams.get("news_id");

      if (!title || !imageSrc || !datestr || !link || !text || !id) {
        return null;
      }

      return {
        id,
        title,
        image: `https://www.chaves.pt${imageSrc}`,
        date: datestr,
        link,
        text,
        source: "chaves",
      };
    })
    .filter(Boolean);
