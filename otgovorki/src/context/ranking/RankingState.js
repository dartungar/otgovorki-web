import React, { useReducer } from "react";
import rankingContext from "./rankingReducer";
import rankingReducer from "./generatorReducer";
import {} from "../types";

const RankingState = (props) => {
  const initialState = {
    isRankingLoading: false,
    isRankingLoadingFailed: false,
    rankingItems: [],
    sortType: "likes",
  };

  const [state, dispatch] = useReducer(rankingReducer, initialState);

  return (
    <rankingContext.Provider
      value={{
        isRankingLoading: state.isRankingLoading,
        isRankingLoadingFailed: state.isRankingLoadingFailed,
        rankingItems: state.rankingItems,
        sortType: state.sortType,
      }}
    >
      {props.children}
    </rankingContext.Provider>
  );
};
