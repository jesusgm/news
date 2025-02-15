import { useEffect, useState } from "react";

export function useSources() {
  const [sources, setSources] = useState<string[]>([]);

  useEffect(() => {
    const apiurl =
      window.location.hostname === "localhost"
        ? `${import.meta.env.VITE_API_URL}/sources`
        : "/news-api/api/sources";

    fetch(apiurl)
      .then((res) => res.json())
      .then((data) => {
        setSources(data);
      });
  }, []);

  return sources;
}
