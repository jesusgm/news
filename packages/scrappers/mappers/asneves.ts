export const asneves = (newsItem) => {
  const id = newsItem.id;
  const title = newsItem.title.rendered;
  const date = newsItem.date;
  const link = newsItem.link;
  const text = newsItem.excerpt.rendered;
  const content = newsItem.content.rendered;
  const image =
    newsItem._embedded["wp:featuredmedia"]?.at(0)?.source_url ??
    content.match(/src="([^"]+)"/)?.[1] ??
    "https://asneves.gal/wp-content/uploads/2021/09/logo-asneves-10.png";

  if (!title || !image || !date || !link || !text || !id) {
    return null;
  }

  const dateParsed = new Date(date);

  return {
    id,
    title,
    image,
    date: dateParsed.getTime(),
    link,
    text,
    source: "asneves",
  };
};
