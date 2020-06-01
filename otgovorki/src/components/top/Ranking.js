import React, {useState, useEffect} from "react";
import Card from "react-bootstrap/Card";
import RankingItem from "./RankingItem";
import {defaultItems} from "./defaultItems.js"

function Ranking() {

    const [testConfig] = useState(true);
    const [items, setItems] = useState();
    const [sortType, setSortType] = useState('likes');
    const [isSorted, setIsSorted] = useState();
    const [itemsLoaded, setItemsLoaded] = useState(0);

    if (testConfig && !items) {
        setItems((prevItems) => {
            return defaultItems;
        });
    }

    useEffect(() => {
        if (items && !isSorted) {
            console.log('have items but no sort')
            sortItems();
        }
    })

    useEffect(() => {
        loadOtgovorki('like', 0, 10);
    }, [])

    useEffect(() => {
        console.log(items);
        console.log('fetching items...');

        //loadOtgovorki('like', 0, 10);

        console.log('sort type: ', sortType);
        if (items) {
            sortItems();
        }
        
        console.log('sorted: ', items);
    }, [])

    function loadOtgovorki(sort, currentNum, numToLoad) {

        fetch(
            // pass active settings as request url params
            `/api/otgovorki/get?sort=${sort}&currentNum=${currentNum}&numToLoad=${numToLoad}`,
            {
                method: "GET",
                mode: "cors"
            })
            .then((res) => res.json())
            .then((data) => {
                // store new otgovorka in state variable
                console.log('fetched items', data)
                setItems(data);
                setItemsLoaded(true);
                console.log('items are', items)
            })
            .catch((error) => {
                setItemsLoaded(false);
                setItems(defaultItems);
                console.log(error);
            });
    }

    // TODO: удаление старой отговорки. и сделать новую функцию для сортировки списка
    function updateOtgovorkaValue(newOtgovorka) {
        let oldItems = items;
        console.log('old items:', oldItems);
        const newItems = oldItems.map(item => {
            if (item.id === newOtgovorka.id) {
                console.log('found match!', newOtgovorka)
                return newOtgovorka;
            } else return item;
        });
        console.log('new items:', newItems)
        // вот тут что-то идёт не так
        setItems(() => newItems);
        console.log('updated items:', items);
        sortItems();
        console.log('sorted updated items:', items);
        
        //setItems(Set(items));
    }

    function sortItems() {
        console.log('starting sort...')
        setItems(() => {
            console.log(sortType);
            let sortedItems;
            if (sortType === 'likes') {
                sortedItems = items.sort((a, b) => b.likes_count - a.likes_count);
            } else if (sortType === 'laughs') {
                sortedItems = items.sort((a, b) => b.laughs_count - a.laughs_count);
            } else if (sortType === 'doubts') {
                sortedItems = items.sort((a, b) => b.doubts_count - a.doubts_count);
            };
            console.log('sorted items! : ', sortedItems)
            return sortedItems;
        });
        setIsSorted(true);

    }

    console.log('current items:', items)

    return <div className="ranking-container">
                {items && isSorted && items.map((item, index) => {
                    return <RankingItem otgovorka={item} key={index} onUpdate={updateOtgovorkaValue}/>
                    })
                }
           </div>
}

export default Ranking;