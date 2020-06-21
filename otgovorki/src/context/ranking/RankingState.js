import React, { useReducer } from "react";
import rankingContext from "./rankingContext";
import rankingReducer from "./rankingReducer";
import {
  SET_IS_RANKING_LOADING,
  SET_IS_RANKING_LOADING_FAILED,
  SET_RANKING_ITEMS,
  SET_SORT_TYPE,
  SET_ITEMS_ARE_ANIMATED,
} from "../types";

const RankingState = (props) => {
  const initialState = {
    isRankingLoading: false,
    isRankingLoadingFailed: false,
    rankingItems: [],
    itemsToLoad: 10,
    sortType: "likes",
    itemsAreAnimated: false,
  };

  const [state, dispatch] = useReducer(rankingReducer, initialState);

  // load a portion of items
  const loadItems = async (sort, offset, toLoad) => {
    console.log("trying to load items with sortType ", sort, offset, toLoad);
    const response = await fetch(
      `/api/otgovorki/get?sort=${sort}&currentNum=${offset}&numToLoad=${toLoad}`,
      {
        method: "GET",
        mode: "cors",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        return data;
      })
      .catch((error) => {
        return false;
      });
    console.log(response);
    return response;
  };

  // load first batch of items
  const loadFirstItems = async (sort) => {
    const { sortType, itemsToLoad } = state;
    dispatch({ type: SET_IS_RANKING_LOADING });
    console.log("will try to load items with", sort, 0, itemsToLoad);
    const items = await loadItems(sort, 0, itemsToLoad);
    if (items) {
      dispatch({ type: SET_RANKING_ITEMS, payload: items });
    } else {
      dispatch({ type: SET_IS_RANKING_LOADING_FAILED });
    }
  };

  // load additional items
  const loadMoreItems = async () => {
    const { sortType, itemsToLoad, rankingItems } = state;
    dispatch({ type: SET_IS_RANKING_LOADING });
    console.log(
      "will try to load items with",
      sortType,
      rankingItems.length,
      itemsToLoad
    );
    const items = await loadItems(sortType, rankingItems.length, itemsToLoad);
    if (items) {
      dispatch({
        type: SET_RANKING_ITEMS,
        payload: [...rankingItems, ...items],
      });
    } else {
      dispatch({ type: SET_IS_RANKING_LOADING_FAILED });
    }
  };

  // register upvote
  async function registerUpvote(id, content, type) {
    let newData = await fetch("/api/upvote/post", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id, content: content, type: type }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Upvote registered!", data);
        return data;
      })
      .catch((error) => {
        console.log("Error registering upvote: ", error);
      });
    console.log("newData: ", newData);
    return newData;
  }

  // if item is upvoted, update it with the new value
  function updateOtgovorkaValue(newOtgovorka) {
    let oldItems = state.rankingItems;
    console.log("old items:", oldItems);
    const newItems = oldItems.map((item) => {
      if (item.id === newOtgovorka.id) {
        console.log("found match!", newOtgovorka);
        return newOtgovorka;
      } else return item;
    });
    console.log("dispatching new items with UpdateOtgovorkaValue ", newItems);
    dispatch({
      type: SET_RANKING_ITEMS,
      payload: newItems,
    });
  }

  // change sort type
  const changeSortType = (newSortType) => {
    dispatch({ type: SET_RANKING_ITEMS, payload: [] });
    dispatch({ type: SET_SORT_TYPE, payload: newSortType });
    // using arg because state updates unreliably
    loadFirstItems(newSortType);
    //sortItems(newSortType);
  };

  const setItemsAreAnimated = (value) => {
    dispatch({ type: SET_ITEMS_ARE_ANIMATED, payload: value });
  };

  // sort items based on said sort type
  const sortItems = (newSortType) => {
    const { rankingItems } = state;
    console.log("sorting items with ", newSortType);
    var newItems;
    if (newSortType === "likes") {
      newItems = rankingItems.sort((a, b) => b.likes_count - a.likes_count);
    } else if (newSortType === "laughs") {
      newItems = rankingItems.sort((a, b) => b.laughs_count - a.laughs_count);
    } else if (newSortType === "doubts") {
      newItems = rankingItems.sort((a, b) => b.doubts_count - a.doubts_count);
    } else {
      console.log("sorting type did not match!");
    }
    console.log("sorted items are: ", newItems);
    dispatch({
      type: SET_RANKING_ITEMS,
      payload: newItems,
    });
  };

  return (
    <rankingContext.Provider
      value={{
        isRankingLoading: state.isRankingLoading,
        isRankingLoadingFailed: state.isRankingLoadingFailed,
        rankingItems: state.rankingItems,
        sortType: state.sortType,
        itemsAreAnimated: state.itemsAreAnimated,
        loadFirstItems,
        loadMoreItems,
        changeSortType,
        sortItems,
        setItemsAreAnimated,
        registerUpvote,
        updateOtgovorkaValue,
      }}
    >
      {props.children}
    </rankingContext.Provider>
  );
};

export default RankingState;
