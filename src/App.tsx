import "./App.css";
import { ErrorBoundary } from "./components/ErrorBoundary/ErrorBoundary";
import { Navbar } from "./components/Navbar/Navbar";
import { StockList } from "./components/StockList/StockList";
import { useTickers } from "./hooks/useTickers";
import { useTickersReducer } from "./hooks/useTickersReducer";
import { API_KEY, composePathAndParams } from "./utils/commons";

function App() {
  const { state, dispatch } = useTickersReducer();

  const params = {
    apiKey: API_KEY,
    limit: 8,
    exchanges: "nasdaq",
    search: state.searchTerm,
  };

  const fetchUrl = state?.isLoadMoreClicked
    ? state?.url
    : composePathAndParams(state?.url, params);

  const { data, isLoading, error } = useTickers({ fetchUrl });

  const setSearchTerm = (term: string) => {
    dispatch({
      type: "SET_SEARCH_TERM",
      payload: term?.length > 0 ? term : undefined,
    });
  };

  return (
    <div className="App">
      <Navbar setSearchTerm={setSearchTerm} />
      <ErrorBoundary error={error}>
        <StockList
          stocks={data}
          areStocksLoading={isLoading}
          state={state}
          dispatch={dispatch}
        />
      </ErrorBoundary>
    </div>
  );
}

export default App;
