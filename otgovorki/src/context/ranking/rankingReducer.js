import {
  SET_IS_RANKING_LOADING,
  SET_IS_RANKING_LOADING_FAILED,
  SET_RANKING_ITEMS,
  SET_SORT_TYPE,
  SET_ITEMS_ARE_SORTED,
} from "../types";

const rankingReducer = (state, action) => {
  switch (action.type) {
    case SET_IS_RANKING_LOADING:
      return {
        ...state,
        isRankingLoading: true,
      };
    case SET_IS_RANKING_LOADING_FAILED:
      return {
        ...state,
        isRankingLoading: false,
        isRankingLoadingFailed: true,
      };
    case SET_RANKING_ITEMS:
      console.log("setting ranking items with ", action.payload);
      return {
        ...state,
        isRankingLoading: false,
        rankingItems: action.payload,
      };
    case SET_SORT_TYPE:
      return {
        ...state,
        sortType: action.payload,
        itemsAreSorted: false,
      };
    case SET_ITEMS_ARE_SORTED:
      return {
        ...state,
        itemsAreSorted: true,
      };
  }
};

export default rankingReducer;
