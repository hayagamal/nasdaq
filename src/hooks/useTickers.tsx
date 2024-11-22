import useSWR from "swr";
import { composePathAndParams } from "../utils/commons";
import { useState } from "react";

const API_KEY = "feKuZMPdKdNXpfPG7JKap6ZTy_Dnqo4q";

const url = "https://api.polygon.io/v3/reference/tickers";

export function useTickers() {
  const [searchInput, setSearchInput] = useState("");
  const params = {
    apiKey: API_KEY,
    limit: 8,
    search: searchInput,
  };
  const fetchUrl = composePathAndParams(url, params);

  const fetchTickers = async () => {
    const response = await fetch(fetchUrl);
    if (response.ok) {
      return response.json();
    } else {
      if (response.status === 429) {
      }
    }
  };

  const { data, error, isLoading, mutate } = useSWR(fetchUrl, fetchTickers, {
    revalidateOnFocus: false,
    revalidateOnMount: true,
    revalidateOnReconnect: true,
  });

  return {
    data,
    error,
    isLoading,
    mutate,
    setSearchTerm: setSearchInput,
  };
}
