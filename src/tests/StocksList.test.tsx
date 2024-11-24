import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { StockList } from "../components/StockList/StockList";

jest.mock("../utils/commons", () => ({
  API_KEY: "mockApiKey",
  composePathAndParams: jest.fn().mockReturnValue("next_page_url"),
}));

jest.mock("../components/Card/Card", () => ({
  __esModule: true,
  default: ({ stock }: { stock: any }) => <div>{stock.name}</div>,
}));

jest.mock("../components/SplashScreen/SplashScreen", () => ({
  SplashScreen: () => (
    <div className="full-page">
      <div>
        <img
          src="/images/logo_with_title.svg"
          alt="logo"
          width={400}
          height={120}
          className="logo"
        />
      </div>
      <h1 className="desc">Haya Gamal</h1>
    </div>
  ),
}));

describe("StockList", () => {
  let dispatch: jest.Mock;

  beforeEach(() => {
    dispatch = jest.fn(); // Mock dispatch
  });

  it("should render the SplashScreen while loading", () => {
    render(
      <StockList
        areStocksLoading={true}
        stocks={undefined}
        dispatch={dispatch}
      />
    );

    expect(screen.getAllByAltText("logo")).toHaveLength(1);
  });

  it("should render 'No Data Found' when no stocks are available", () => {
    render(
      <StockList
        areStocksLoading={false}
        stocks={{ results: [], next_url: "" }}
        dispatch={dispatch}
      />
    );

    expect(screen.getByText("No Data Found")).toBeInTheDocument();
  });

  it("should render stock cards when stocks are available", () => {
    const stocks = {
      results: [
        { name: "AAPL", ticker: "AAPL" },
        { name: "GOOGL", ticker: "GOOGL" },
      ],
      next_url: "next_url",
    };

    render(
      <StockList
        areStocksLoading={false}
        stocks={stocks}
        dispatch={dispatch}
        state={{ tickers: stocks.results }}
      />
    );

    expect(screen.getByText("AAPL")).toBeInTheDocument();
    expect(screen.getByText("GOOGL")).toBeInTheDocument();
  });

  it("should render 'Load More' button when next_url is present", () => {
    const stocks = {
      results: [{ name: "AAPL", ticker: "AAPL" }],
      next_url: "next_url",
    };

    render(
      <StockList
        areStocksLoading={false}
        stocks={stocks}
        dispatch={dispatch}
        state={{ tickers: stocks.results }}
      />
    );

    expect(screen.getByText("Load More")).toBeInTheDocument();
  });

  it("should call handleLoadMore and dispatch action when 'Load More' is clicked", async () => {
    const stocks = {
      results: [{ name: "AAPL", ticker: "AAPL" }],
      next_url: "next_url",
    };

    render(
      <StockList
        areStocksLoading={false}
        stocks={stocks}
        dispatch={dispatch}
        state={{ tickers: stocks.results }}
      />
    );

    const loadMoreButton = screen.getByText("Load More");

    userEvent.click(loadMoreButton);
  });

  it("should dispatch 'RENDER_TICKERS' when stocks are updated", async () => {
    const stocks = {
      results: [
        { name: "AAPL", ticker: "AAPL" },
        { name: "GOOGL", ticker: "GOOGL" },
      ],
      next_url: "next_url",
    };

    render(
      <StockList
        areStocksLoading={false}
        stocks={stocks}
        dispatch={dispatch}
        state={{ tickers: [] }}
      />
    );

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({
        type: "RENDER_TICKERS",
        payload: stocks.results,
      });
    });
  });

  it("should not render 'Load More' if next_url is not present", () => {
    const stocks = {
      results: [{ name: "AAPL", ticker: "AAPL" }],
      next_url: "",
    };

    render(
      <StockList
        areStocksLoading={false}
        stocks={stocks}
        dispatch={dispatch}
        state={{ tickers: stocks.results }}
      />
    );

    expect(screen.queryByText("Load More")).not.toBeInTheDocument();
  });
});
