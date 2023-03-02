import React, { useState, useEffect, FormEvent } from "react";
import ListCharacters from "../components/ListCharacters";
import LoadMoreCharacters from "../components/LoadMoreCharacters";
import { fetchCharacters, addRemoveCharacterFromSuperteam } from "../api/searchCharacter";
import { Character } from "../types/Character";
import { OperationOnCharacter } from "../types/OperationOnCharacter";

/**
 * A react component to display the browse page.
 */
function Browse() {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [fetchStarted, setFetchStarted] = useState(true);
    const [page, setPage] = useState(0);
    const [error, setError] = useState("");

    useEffect(() => {
        const abortController = new AbortController();
        fetchCharacters(page, abortController).then((res) => {
            if (res.error) {
                //In dev mode, will also catch an "AbortError", and display it as a message every time the page is loaded.
                //This is caused by the useEffect function being called twice in dev mode.
                setError(res.error);
                return;
            }
            setError("");
            setCharacters(prevCharacters => [...prevCharacters, ...res.characters]);
            setFetchStarted(res.fetchStarted);
        }).catch((error) => {
            setError(error);
        });

        return () => {
            abortController.abort();
        };
    }, [page]);

    const handleClickOnSuperteam: OperationOnCharacter = (character: Character) => {
        addRemoveCharacterFromSuperteam(character).then((res) => {
            let newCharactersList = structuredClone(characters);    //structuredClone is necessary to get a new reference, so that the components can understand that they should rebuild. 
            const indexCharacter = newCharactersList.findIndex((c) => { return c.id === character.id });
            newCharactersList[indexCharacter].inSuperteam = !newCharactersList[indexCharacter].inSuperteam;
            setCharacters(newCharactersList);
        }).catch((error) => {
            console.error(error);
        })
    }

    const handleClickOnLoadMoreCharacter = (event: FormEvent) => {
        setPage(page + 1);
        setFetchStarted(true);
    }

    return (
        <div className="container text-light">
            {
                error !== "" && (
                    <div className="text-danger text-center">
                        {error}
                    </div>
                )
            }
            <ListCharacters characters={characters} addRemoveCharacterFromSuperteam={handleClickOnSuperteam} />
            <LoadMoreCharacters onLoadMoreCharacters={handleClickOnLoadMoreCharacter} shouldBeLoading={fetchStarted} />
        </div>
    )
}

export default Browse;