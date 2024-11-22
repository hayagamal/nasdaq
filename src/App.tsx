import "./App.css";
import { Navbar } from "./components/Navbar/Navbar";
import { StockList } from "./components/StockList/StockList";
import { useTickers } from "./hooks/useTickers";

function App() {
  const { data, isLoading, setSearchTerm } = useTickers();
  return (
    <div className="App">
      <Navbar setSearchTerm={setSearchTerm} />
      <StockList stocks={data} areStocksLoading={isLoading} />
    </div>
  );
}

export default App;
