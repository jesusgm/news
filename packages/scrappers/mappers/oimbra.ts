export const oimbra = (newsItems) =>
  newsItems
    .map((newCard) => {
      const title = newCard.querySelector(".entry-title")?.textContent?.trim();
      const imageSrcElement = newCard.querySelector("img");
      const imageSrc = imageSrcElement
        ? imageSrcElement.getAttribute("src")
        : null;
      const datestr = newCard.querySelector(".date_label")?.textContent?.trim();
      const link = newCard.querySelector("a")?.getAttribute("href");
      const text = "-";

      const classes = newCard.getAttribute("class")?.split(" ");

      const id = classes
        .filter((c) => c !== "post-item")
        ?.find((c) => c.startsWith("post-"))
        ?.split("-")[1];

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
        link,
        text,
        source: "oimbra",
      };
    })
    .filter(Boolean);
