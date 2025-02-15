export const xinzodelimia = (newsCards) =>
  newsCards
    .map((newCard) => {
      const title = newCard.querySelector(".title")?.textContent?.trim();
      const imageSrcElement = newCard.querySelector("figure img");
      const imageSrc = imageSrcElement
        ? imageSrcElement.getAttribute("src")
        : "https://www.xinzodelimia.gal/media/xinzodelimia/images/2023/08/04/2023080410480443179.png";
      const datestr = newCard
        .querySelector(".content-time")
        ?.textContent?.trim();
      const link = newCard.querySelector("a")?.getAttribute("href");
      const text = newCard.querySelector(".summary")?.textContent?.trim();

      const [id] = link?.split("/")?.at(-1)?.split(".") ?? [];

      if (!title || !imageSrc || !datestr || !link || !text || !id) {
        return null;
      }

      const [d, m, y] = datestr.split(".");
      const date = new Date(`${y}-${m}-${d.padStart(2, "0")}T02:00:00.000Z`);

      return {
        id,
        title,
        image: `https://www.xinzodelimia.gal${imageSrc}`,
        date: date.getTime(),
        link,
        text,
        source: "xinzodelimia",
      };
    })
    .filter(Boolean);
