import React, { useEffect, useContext } from "react";
import RankingItem from "./RankingItem";
import ScrollToTopBtn from "./ScrollToTopBtn";
import { SortingIconArrow } from "./SortingIcons";
import RankingContext from "../../context/ranking/rankingContext";

function Ranking() {
  const rankingContext = useContext(RankingContext);
  const {
    rankingItems,
    loadItems,
    isRankingLoading,
    isRankingLoadingFailed,
    sortType,
    changeSortType,
    itemsAreAnimated,
    setItemsAreAnimated,
  } = rankingContext;

  // load otgovorki once on page load
  useEffect(() => {
    loadItems();
    // eslint-disable-next-line
  }, []);

  // if items are already animated on render, re-animate them
  // because ranking should always fade-in smoothly after each change
  useEffect(() => {
    console.log("items are animated? ", itemsAreAnimated);
    if (itemsAreAnimated) {
      setItemsAreAnimated(false);
    }
  });

  // handle scroll to bottom
  useEffect(() => {
    function onScroll() {
      if (
        window.innerHeight + window.pageYOffset >=
        document.body.scrollHeight
      ) {
        console.log("you're at the bottom of the page");
        // TODO: дозагрузка
        loadItems();
      }
    }
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  });

  return (
    <div className="ranking-container">
      <div className="sorting-buttons-container">
        <button
          className="ranking-sort-btn"
          name="likes"
          disabled={sortType === "likes"}
          onClick={() => changeSortType("likes")}
          title="сортировать по 'неплохо'"
        >
          <SortingIconArrow />
          👍
        </button>
        <button
          className="ranking-sort-btn"
          name="laughs"
          disabled={sortType === "laughs"}
          onClick={() => changeSortType("laughs")}
          title="сортировать по 'смешно'"
        >
          <SortingIconArrow />
          🤣
        </button>
        <button
          className="ranking-sort-btn"
          name="doubts"
          disabled={sortType === "doubts"}
          onClick={() => changeSortType("doubts")}
          title="сортировать по 'эээ...'"
        >
          <SortingIconArrow />
          🤔
        </button>
      </div>
      <div className={!itemsAreAnimated && "ranking-items-animated"}>
        {isRankingLoading && (
          <div className="loader-box">
            <span className="emoji-loader" role="img">
              🤷‍♂️
            </span>
          </div>
        )}
        {isRankingLoadingFailed && (
          <p>
            Не получилось загрузить топ! 😟 <br /> Попробуйте чуть позже, а пока
            - развлекитесь <br />
            <a href="/" className="custom-link">
              генератором
            </a>
            .
          </p>
        )}
        {rankingItems &&
          rankingItems.map((item, index) => {
            return <RankingItem otgovorka={item} key={item.id} />;
          })}
      </div>
      <ScrollToTopBtn />
    </div>
  );
}

export default Ranking;
