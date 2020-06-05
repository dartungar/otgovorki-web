import React, {useState, useEffect} from "react";
import RankingItem from "./RankingItem";
import {SortingIconArrow} from "./SortingIcons";
import {defaultItems} from "./defaultItems.js";


function Ranking() {

    const [testConfig] = useState(false);
    const [items, setItems] = useState([]);
    const [numToLoad] = useState(10);
    const [sortType, setSortType] = useState();
    const [isSorted, setIsSorted] = useState();

    // load otgovorki once on page load
    useEffect(() => {
        loadItems();
    }, [])

    function loadItems() {
        fetch(
            // pass active settings as request url params
            `/api/otgovorki/get?sort=${sortType}&currentNum=${items.length}&numToLoad=${numToLoad}`,
            {
                method: "GET",
                mode: "cors"
            })
            .then((res) => res.json())
            .then((data) => {
                // store new otgovorka in state variable
                console.log('fetched items', data);
                setItems((prevItems) => {
                    //if (data.length) {}
                    return [...prevItems, ...data] })
                    })
            .catch((error) => {
                console.log(error);
            });
        console.log('set items from fetched:', items);
    }


    // if testing, add some mock items
    useEffect(() => {      
        if (testConfig) {
            console.log('setting default items:', defaultItems)
            setItems(prevItems => {
                return [...prevItems, ...defaultItems];
            });
            console.log('set items from default:', items);
        };
        
    }, [items, testConfig])


    // handle scroll to bottom
    useEffect(() => {
        function onScroll() {
            if ((window.innerHeight + window.pageYOffset) >= document.body.scrollHeight) {
                console.log("you're at the bottom of the page");
                // TODO: дозагрузка
                loadItems();
            }
        }
        window.addEventListener("scroll", onScroll);
    
        return () => window.removeEventListener("scroll", onScroll);
    });


    // 
    function updateOtgovorkaValue(newOtgovorka) {
        let oldItems = items;
        console.log('old items:', oldItems);
        const newItems = oldItems.map(item => {
            if (item.id === newOtgovorka.id) {
                console.log('found match!', newOtgovorka)
                return newOtgovorka;
            } else return item;
        });
        setItems(() => {
            console.log('updating items...');
            return newItems});
    }

    // sort items based on current sort type
    function sortItems(type) {
        console.log('starting sort...')
        setIsSorted(false);
        console.log('set isSorted to: ', isSorted)
        if (type === 'likes') {
            return items.sort((a, b) => b.likes_count - a.likes_count);
        } else if (type === 'laughs') {
            return items.sort((a, b) => b.laughs_count - a.laughs_count);
        } else if (type === 'doubts') {
            return items.sort((a, b) => b.doubts_count - a.doubts_count);
        };
    }

    
    // sort items on render
    useEffect(() => {
        if (!sortType) {
            setSortType('likes');
        }
        if (items && items.length > 0) {
            setItems(sortItems(sortType));
        }
        // это нужно чтобы правильно обновлялось
        setIsSorted(true);
    }, [sortType, items, sortItems])

    function handleSort(event) {
        if (!isSorted) {
            setIsSorted(true);
        }
        const name = event.target.name;
        //setSortType(name);
        setIsSorted(() => {
            setSortType(name);
            return false;
        });
    }

    function hadleLoadItemsError() {
        // костылик для периодического бага при смене фильтра
        window.location.reload();
    }

    // console.log('current items are:', items)

    return <div className="ranking-container">
                <div className="sorting-buttons-container">
                        <button className="ranking-sort-btn" name="likes" disabled={sortType === 'likes'} onClick={handleSort} title="сортировать по 'неплохо'"><SortingIconArrow/>👍</button>
                        <button className="ranking-sort-btn" name="laughs" disabled={sortType === 'laughs'} onClick={handleSort} title="сортировать по 'смешно'"><SortingIconArrow/>🤣</button>
                        <button className="ranking-sort-btn" name="doubts" disabled={sortType === 'doubts'} onClick={handleSort} title="сортировать по 'эээ...'"><SortingIconArrow/>🤔</button>
                </div>
                <div className={isSorted && "ranking-item-animated"}>
                    {items ? 
                        items.map((item, index) => {
                            return <RankingItem otgovorka={item} key={index} onUpdate={updateOtgovorkaValue}/>   
                        })
                    : hadleLoadItemsError()
                    }
                </div>
           </div>
}

export default Ranking;