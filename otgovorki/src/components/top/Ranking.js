import React, {useState, useEffect} from "react";
import Card from "react-bootstrap/Card";
import RankingItem from "./RankingItem";

function Ranking() {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        console.log(items);
        console.log('fetching items...')
        loadOtgovorki('like', 0, 3);
    }, [])

    function loadOtgovorki(sort, currentNum, numToLoad) {
        setIsLoading(true);
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
                setIsLoading(false);
                console.log('items are', items)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    // TODO: удаление старой отговорки. и сделать новую функцию для сортировки списка
    function updateOtgovorkaValue(newOtgovorka) {
        setItems(prevValue => {
            return [...prevValue, newOtgovorka]
        });
        setItems(Set(items));
    }


    console.log('current items:', items)

    return <div className="ranking-container">
                {items !== {} &&
                    items.map(item => {
                    return <RankingItem otgovorka={item} onUpdate={updateOtgovorkaValue}/>
                    })
                }
                <RankingItem 
                otgovorka={{content: "Еду я по выбоинам, по выбоинам да не выеду я. Шла Саша по шоссе и сосала сушки. Ехал Сталин через Сталин - видит Сталин: Сталин Сталин.",
                likes_count: 10,
                laughs_count: 116,
                doubts_count: 3,
                id: 123}}
                />
                <RankingItem 
                otgovorka={{content: "Еду я по выбоинам, по выбоинам да не выеду я. Шла Саша по шоссе и сосала сушки. Ехал Сталин через Сталин - видит Сталин: Сталин Сталин. Ехал Сталин через Сталин - видит Сталин: Сталин Сталин.",
                likes_count: 8,
                laughs_count: 25,
                doubts_count: 34,
                id: 123}}
                />
                <RankingItem 
                otgovorka={{content: "Еду я по выбоинам, по выбоинам да не выеду я. Шла Саша по шоссе и сосала сушки. ",
                likes_count: 93,
                laughs_count: 2,
                doubts_count: 18,
                id: 123}}
                />
           </div>
}

export default Ranking;