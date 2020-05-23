import React, {useState, useEffect} from "react";


function RandomWord(props) {
    const [word, setWord] = useState("");

    const updateWord = useEffect(() => {
        fetch("http://localhost:5000/api/random", {
        method: 'GET',
        mode: 'cors',
        })
        .then(res => res.json())
        .then(data => setWord(data));
    }, [])

    return word;
}

export default RandomWord;

