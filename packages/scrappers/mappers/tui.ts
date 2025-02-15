export const tui = (newsCards) =>
  newsCards
    .map((newCard) => {
      const title = newCard
        .querySelector(".views-field-title")
        ?.textContent?.trim();
      const imageSrcElement = newCard.querySelector(
        ".views-field-field-image img"
      );
      const imageSrc = imageSrcElement
        ? imageSrcElement.getAttribute("src")
        : null;
      const datestr = newCard
        .querySelector(".views-field-field-fecha")
        ?.textContent?.trim();
      const link = newCard
        .querySelector(".views-field-title a")
        ?.getAttribute("href");
      const text = newCard
        .querySelector(".views-field-body")
        ?.textContent?.trim();

      const id = crypto.randomUUID();

      if (!title || !imageSrc || !datestr || !link || !text || !id) {
        return null;
      }

      const [d, m, y] = datestr.split("/");
      const date = new Date(`${y}-${m}-${d}`);

      return {
        id,
        title,
        image: imageSrc,
        date: date.getTime(),
        link: `https://tui.gal${link}`,
        text,
        source: "tui",
      };
    })
    .filter(Boolean);
