import { useReducer } from "react";
import { Stock } from "../utils/commons";

type ActionType =
  | { type: "SET_SEARCH_TERM"; payload: string | undefined }
  | { type: "HAS_MORE"; payload: string }
  | { type: "LOAD_MORE_TICKERS"; payload: Stock[] }
  | { type: "RENDER_TICKERS"; payload: Stock[] }
  | { type: "SET_ERROR"; payload: Error };

type StateType = {
  searchTerm: string | undefined;
  url: any;
  tickers: Stock[];
  error: Error | undefined;
  isLoadMoreClicked: boolean;
};

const initialState: StateType = {
  searchTerm: undefined,
  url: "https://api.polygon.io/v3/reference/tickers",
  tickers: [],
  error: undefined,
  isLoadMoreClicked: false,
};

export function useTickersReducer() {
  const [state, dispatch] = useReducer(getReducer, initialState);
  return { state, dispatch };
}

function getReducer(state: StateType, action: ActionType): StateType {
  switch (action.type) {
    case "RENDER_TICKERS":
      return {
        ...state,
        tickers: !state?.isLoadMoreClicked
          ? action.payload
          : [...state?.tickers, ...action?.payload],
      };
    case "SET_SEARCH_TERM":
      return {
        ...state,
        searchTerm: action.payload,
        url: "https://api.polygon.io/v3/reference/tickers",
        isLoadMoreClicked: false,
      };
    case "HAS_MORE":
      return { ...state, url: action.payload, isLoadMoreClicked: true };
    case "LOAD_MORE_TICKERS":
      return {
        ...state,
        isLoadMoreClicked: true,
        tickers: [...state?.tickers, ...action.payload],
      };

    default:
      return state;
  }
}
