import { Stock } from "../../utils/commons";
import Card from "../Card/Card";
import { SplashScreen } from "../SplashScreen/SplashScreen";

type StockListProps = {
  stocks: { results: Stock[] };
  areStocksLoading: boolean;
};

export function StockList({ stocks, areStocksLoading }: StockListProps) {
  if (areStocksLoading && !stocks) {
    return <SplashScreen />;
  }

  return (
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
      {stocks?.results?.map((stock: Stock) => {
        return <Card stock={stock} />;
      })}
    </div>
  );
}
