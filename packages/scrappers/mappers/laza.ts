export const laza = (newsCards) =>
  newsCards
    .map((newCard) => {
      const title = newCard
        .querySelector(".aidanews2_title")
        ?.textContent?.trim();
      const imageSrcElement = newCard.querySelector("img");
      const imageSrc = imageSrcElement
        ? imageSrcElement.getAttribute("src")
        : "http://www.laza.es/images/contidoEstatico/logo2.png";
      const datetime = newCard
        .querySelector(".aidanews2_date")
        ?.textContent?.trim();
      const link = newCard.querySelector("a")?.getAttribute("href");
      const text = newCard
        .querySelector(".aidanews2_text")
        ?.textContent?.trim();

      const [id] = link?.split("/")?.at(-1)?.split("-") ?? [];

      if (!title || !imageSrc || !datetime || !link || !text || !id) {
        // return null;
      }

      const [datestr, time] = datetime.split(", ");
      const [d, m, y] = datestr.split("/");
      const date = new Date(`${y}-${m}-${d}T${time ?? "02:00"}:00.000Z`);

      return {
        id,
        title,
        image: `http://www.laza.es/${imageSrc}`,
        date: date.getTime(),
        link: `http://www.laza.es${link}`,
        text,
        source: "laza",
      };
    })
    .filter(Boolean);
