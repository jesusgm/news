export const moncao = (newCard) => {
  const title = newCard.title;
  const imageSrc = newCard.image[0].link;
  const datestr = newCard.date;
  const link = newCard.link.url;
  const text = newCard.description.substring(0, 200);

  const id = link?.split("/").at(1) ?? crypto.randomUUID();

  if (!title || !imageSrc || !datestr || !link || !text || !id) {
    return null;
  }

  return {
    id,
    title,
    image: imageSrc,
    date: new Date(datestr).getTime(),
    link: `https://noticias.moncao.pt${link}`,
    text,
    source: "moncao",
  };
};
