export const acoruna = (newsCards) =>
  newsCards
    .map((newCard) => {
      const title = newCard.querySelector("h1")?.textContent?.trim();
      const imageSrc = newCard.querySelector("img")?.getAttribute("src");
      const dia = newCard
        .querySelector("p.fechaCorta .fDia")
        ?.textContent?.trim();
      const mes = newCard
        .querySelector("p.fechaCorta .fMes")
        ?.textContent?.trim();
      const ano = newCard
        .querySelector("p.fechaCorta .fAno")
        ?.textContent?.trim();
      const datestr = `${dia} ${mes} ${ano}`;
      const link = newCard.querySelector("a")?.getAttribute("href");
      const text = newCard.querySelector(".entradilla")?.textContent?.trim();

      const id = link?.split("/")?.at(-1) ?? crypto.randomUUID();

      if (!title || !imageSrc || !datestr || !link || !text || !id) {
        return null;
      }

      return {
        id,
        title,
        image: `https://www.coruna.gal${imageSrc}`,
        date: datestr,
        link: `https://www.coruna.gal${link}`,
        text,
        source: "acoruna",
      };
    })
    .filter(Boolean);
