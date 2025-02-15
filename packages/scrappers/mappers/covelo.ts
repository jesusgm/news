export const covelo = (newsCards) =>
  newsCards
    .map((newCard) => {
      const title = newCard.querySelector("a")?.textContent?.trim();
      const imageSrcElement = newCard.querySelector("img");
      const imageSrc = imageSrcElement
        ? imageSrcElement.getAttribute("src")
        : null;
      const datestr = newCard.querySelector("b")?.textContent?.trim();
      const link = newCard.querySelector("a")?.getAttribute("href");
      const text = newCard?.textContent?.trim();

      const id = new URLSearchParams(link).get("id_noticia");

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
        link: `https://www.concellodecovelo.es${link}`,
        text,
        source: "covelo",
      };
    })
    .filter(Boolean);
