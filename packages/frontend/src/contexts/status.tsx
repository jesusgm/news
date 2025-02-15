import { createContext, useEffect, useState } from "react";
import { Status, StatusContextType } from "../../../types";
import { useSources } from "../hooks/sources";

const StatusContext = createContext<StatusContextType>({
  status: [],
  sources: [],
});

const StatusContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [status, setStatus] = useState<Status[]>([]);
  const sources = useSources();

  useEffect(() => {
    const apiurl =
      window.location.hostname === "localhost"
        ? `${import.meta.env.VITE_API_URL}/status`
        : "/news-api/api/status";

    fetch(`${apiurl}?limit=300`)
      .then((res) => res.json())
      .then(setStatus);
  }, []);

  const value = { status, sources };

  return (
    <StatusContext.Provider value={value}>{children}</StatusContext.Provider>
  );
};

export { StatusContext, StatusContextProvider };
