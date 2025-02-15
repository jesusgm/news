export const oporrino = (newsCards) =>
  newsCards
    .map((newCard) => {
      const title = newCard.querySelector("h2")?.textContent?.trim();
      const imageSrcElement = newCard.querySelector(".wpp_image_left");
      const imageSrc = imageSrcElement
        ? imageSrcElement.getAttribute("src")
        : null;
      const datestr = newCard
        .querySelector(".wpp_date")
        ?.textContent?.replace(",", "")
        .trim();
      const link = newCard
        .querySelector(".wpp_readmore a")
        ?.getAttribute("href");
      const text = newCard.querySelector(".wpp_contents")?.textContent?.trim();

      if (!title || !imageSrc || !datestr || !link || !text) {
        return null;
      }

      return {
        id: Date.now(),
        title,
        image: imageSrc,
        date: datestr,
        link,
        text,
        source: "oporrino",
      };
    })
    .filter(Boolean);
