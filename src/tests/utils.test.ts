import { composePathAndParams, mapToQueryString } from "../utils/commons";

describe("mapToQueryString", () => {
  it("should convert simple object into query string", () => {
    const params = { search: "apple", page: 1 };
    const result = mapToQueryString(params);
    expect(result).toBe("search=apple&page=1");
  });

  it("should encode special characters", () => {
    const params = { search: "apple & banana", filter: "new+release" };
    const result = mapToQueryString(params);
    expect(result).toBe("search=apple%20%26%20banana&filter=new%2Brelease");
  });

  it("should handle array values", () => {
    const params = { tags: ["apple", "banana", "cherry"] };
    const result = mapToQueryString(params);
    expect(result).toBe("tags=apple%2Cbanana%2Ccherry");
  });

  it("should handle null and undefined values", () => {
    const params = { valid: "yes", invalid: null, undefinedParam: undefined };
    const result = mapToQueryString(params);
    expect(result).toBe("valid=yes");
  });

  it("should handle empty string values", () => {
    const params = { valid: "" };
    const result = mapToQueryString(params);
    expect(result).toBe("");
  });

  it("should return empty string if no params are passed", () => {
    const params = {};
    const result = mapToQueryString(params);
    expect(result).toBe("");
  });
});

describe("composePathAndParams", () => {
  it("should add query params with '?' if path doesn't have query params", () => {
    const path = "https://example.com";
    const params = { search: "apple", page: 1 };
    const result = composePathAndParams(path, params);
    expect(result).toBe("https://example.com?search=apple&page=1");
  });

  it("should append query params with '&' if path already has query params", () => {
    const path = "https://example.com?existingParam=value";
    const params = { search: "apple", page: 1 };
    const result = composePathAndParams(path, params);
    expect(result).toBe(
      "https://example.com?existingParam=value&search=apple&page=1"
    );
  });

  it("should handle edge case where params are empty", () => {
    const path = "https://example.com";
    const params = {};
    const result = composePathAndParams(path, params);
    expect(result).toBe("https://example.com");
  });

  it("should handle undefined path correctly", () => {
    const path = undefined;
    const params = { search: "apple" };
    const result = composePathAndParams(path as any, params);
    expect(result).toBe(undefined); // or return empty string depending on your use case
  });
});
