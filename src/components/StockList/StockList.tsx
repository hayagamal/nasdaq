import { useEffect } from "react";
import { API_KEY, composePathAndParams, Stock } from "../../utils/commons";
import Card from "../Card/Card";
import { SplashScreen } from "../SplashScreen/SplashScreen";
import styles from "./StockList.module.css";

type StockListProps = {
  stocks?: { results: Stock[]; next_url: string };
  areStocksLoading: boolean;
  state?: any;
  dispatch?: any;
};

export function StockList({
  stocks,
  areStocksLoading,
  state,
  dispatch,
}: StockListProps) {
  useEffect(() => {
    if (stocks && !areStocksLoading) {
      dispatch({ type: "RENDER_TICKERS", payload: stocks?.results });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(stocks)]);

  const handleLoadMore = () => {
    const params = {
      apiKey: API_KEY,
    };

    dispatch({
      type: "HAS_MORE",
      payload: composePathAndParams(stocks?.next_url as string, params),
    });
  };

  if (areStocksLoading && !stocks) {
    return <SplashScreen />;
  }

  if (stocks && stocks?.results?.length === 0) {
    return <div className="full-page">No Data Found</div>;
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "center",
          marginTop: "30px",
          height: "100%",
        }}
      >
        {state?.tickers?.map((stock: Stock) => {
          return <Card stock={stock} key={stock?.name} />;
        })}
      </div>
      {stocks?.next_url && (
        <button className={styles["loadMore"]} onClick={handleLoadMore}>
          Load More
        </button>
      )}
    </>
  );
}
