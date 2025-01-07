import useSWR from "swr";

export function useTickers({ fetchUrl }: { fetchUrl: string }) {
  const fetchTickers = async () => {
    const response = await fetch(fetchUrl);
    if (response.ok) {
      const json = await response.json();

      return json;
    } else {
      if (response.status === 429) {
        return Promise.reject({
          message:
            "Live Stocks retrieval failed due to too many requests. Please wait...",
        });
      }
      return Promise.reject({ message: "Failed to fetch tickers." });
    }
  };

  const { data, error, isLoading } = useSWR(fetchUrl, fetchTickers, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
    revalidateOnMount: true,
    revalidateOnReconnect: false,
    keepPreviousData: true,
  });

  return {
    data,
    error,
    isLoading,
  };
}
