export const mondariz = (newsItem) => {
  const id = newsItem.id;
  const title = newsItem.title.rendered;
  const date = newsItem.date;
  const link = newsItem.link;
  const text = newsItem.excerpt.rendered;
  const content = newsItem.content.rendered;
  const image =
    newsItem._embedded["wp:featuredmedia"]?.at(0)?.source_url ??
    content.match(/src="([^"]+)"/)?.[1] ??
    "https://mondariz.gal/wp-content/uploads/2023/11/cropped-LateralASF_web.png";

  if (!title || !image || !date || !link || !text || !id) {
    return null;
  }

  const dateParsed = new Date(date);

  return {
    id,
    title: title.length > 250 ? title.slice(0, 250) + "..." : title,
    image,
    date: dateParsed.getTime(),
    link,
    text,
    source: "mondariz",
  };
};
