export const xunta = (newsCards) =>
  newsCards
    .map((newCard) => {
      const title = newCard
        .querySelector(".contedor__contido a.texto-color-xunta-primario p")
        ?.textContent?.trim();
      const imageSrcElement = newCard.querySelector(".imaxe img");
      const imageSrc = imageSrcElement
        ? imageSrcElement.getAttribute("src")
        : null;
      const dateHourStr = newCard
        .querySelector(".contedor__fecha")
        ?.textContent?.trim();
      const link = newCard
        .querySelector(".contedor__contido a.texto-color-xunta-primario")
        ?.getAttribute("href");
      const text = newCard.querySelector(".itemParrafo")?.textContent?.trim();

      const [id] = link?.split("/")?.at(-2)?.split("-") ?? [];

      if (!title || !imageSrc || !dateHourStr || !link || !text || !id) {
        return null;
      }

      const [dateStr, hourStr] = dateHourStr.split(" | ");
      const [d, m, y] = dateStr.split("/");
      const [h, min] = hourStr.split(":");
      const date = new Date(`${y}-${m}-${d} ${h}:${min}`);

      return {
        id,
        title,
        image: `https://www.xunta.gal${imageSrc}`,
        date: date.getTime(),
        link,
        text,
        source: "xunta",
      };
    })
    .filter(Boolean);
