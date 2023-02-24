import React, { useState, useEffect } from "react";
import ListCharacters from "../components/ListCharacters";
import LoadMoreCharacters from "../components/LoadMoreCharacters";
import { fetchCharacters } from "../api/searchCharacter";

/**
 * A react component to display the browse page.
 */
function Browse() {
    const [characters, setCharacters] = useState([]);
    const [fetchStarted, setFetchStarted] = useState(true);
    const [page, setPage] = useState(0);
    
    useEffect(() => {
        const abortController = new AbortController();
        fetchCharacters(page, abortController).then((res) => {
            if (res.error) {
                return;
            }
            setCharacters(prevCharacters => [...prevCharacters, ...res.characters]);
            setFetchStarted(res.fetchStarted);
        }).catch((error) => {
            console.error(error);
        });

        return () => {
            abortController.abort();
        };
    }, [page]);

    const handleClickOnCharacter = (character) => {
        
    }

    const handleClickOnLoadMoreCharacter = (event) => {
        setPage(page + 1);
        setFetchStarted(true);
    }

    return (
        <div className="container text-light">
            <ListCharacters characters={characters} addRemoveCharacterFromSuperteam={handleClickOnCharacter} />
            <LoadMoreCharacters onLoadMoreCharacters={handleClickOnLoadMoreCharacter} shouldBeLoading={fetchStarted} />
        </div>
    )
}

export default Browse;