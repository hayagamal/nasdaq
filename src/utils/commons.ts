export type Stock = {
  name: string;
  ticker: string;
};

export function composePathAndParams(
  path: string,
  params: Record<string, unknown>
): string {
  const queryString = mapToQueryString(params);
  return path && queryString?.length > 0 ? [path, queryString].join("?") : path;
}

export function mapToQueryString(params: Record<string, unknown>): string {
  return (
    params &&
    Object.entries(params)
      .reduce<string[]>((accumulator, [key, value]) => {
        if (Array.isArray(value)) {
          accumulator.push(
            `${encodeURIComponent(key)}=${encodeURIComponent(value.join(","))}`
          );
        } else if (value !== null && typeof value !== "undefined") {
          accumulator.push(
            `${encodeURIComponent(key)}=${encodeURIComponent(value.toString())}`
          );
        }
        return accumulator;
      }, [])
      .join("&")
  );
}
