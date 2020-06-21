import {
  SET_IS_RANKING_LOADING,
  SET_IS_RANKING_LOADING_FAILED,
  NO_ITEMS_TO_LOAD,
  SET_RANKING_ITEMS,
  SET_SORT_TYPE,
  SET_ITEMS_ARE_ANIMATED,
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
    case NO_ITEMS_TO_LOAD:
      return {
        ...state,
        noItemsToLoad: action.payload,
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
        itemsAreAnimated: true,
        noItemsToLoad: false,
      };
    case SET_ITEMS_ARE_ANIMATED:
      return {
        ...state,
        itemsAreAnimated: action.payload,
      };
  }
};

export default rankingReducer;
