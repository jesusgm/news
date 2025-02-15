export const ribeira = (newsCards) =>
  newsCards
    .map((newCard) => {
      const title = newCard.querySelector(".card-title")?.textContent?.trim();
      const imageSrcElement = newCard.querySelector(".image-wrapper img");
      const imageSrc = imageSrcElement
        ? imageSrcElement.getAttribute("src")
        : null;
      const datestr = newCard.querySelector(".date")?.textContent?.trim();
      const link = newCard.querySelector("a.card-title")?.getAttribute("href");
      const text = newCard.querySelector(".card-text")?.textContent?.trim();
      const id = newCard
        .querySelector(".card-subtitle span:first-child")
        ?.getAttribute("id")
        ?.replace("share-", "");

      if (!title || !imageSrc || !datestr || !link || !text || !id) {
        return null;
      }

      const [, date] = datestr.split(",");

      const newData = {
        id,
        title,
        image: `https://www.ribeira.gal${imageSrc}`,
        date: date.trim(),
        link,
        text,
        source: "ribeira",
      };

      return newData;
    })
    .filter(Boolean);
