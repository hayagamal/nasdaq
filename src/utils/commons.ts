export const API_KEY = "feKuZMPdKdNXpfPG7JKap6ZTy_Dnqo4q";

export type Stock = {
  name: string;
  ticker: string;
};

export function composePathAndParams(
  path: string,
  params: Record<string, unknown>
) {
  if (!path || !params) {
    return;
  }

  const queryString = mapToQueryString(params);
  if (queryString?.length > 0) {
    if (path.includes("?")) {
      return [path, queryString].join("&");
    } else {
      return [path, queryString].join("?");
    }
  }
  return path;
}

export function mapToQueryString(params: Record<string, unknown>): string {
  return (
    params &&
    Object.entries(params)
      .reduce<string[]>((accumulator, [key, value]) => {
        if (value === "") {
          return accumulator;
        }
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
