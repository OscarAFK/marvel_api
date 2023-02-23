import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import ListCharacters from "../components/ListCharacters";
import { fetchCharacters } from "../api/searchCharacter";

/**
 * A react component to display the browse page.
 */
function Browse() {
    const navigate = useNavigate();
    const [params] = useSearchParams();
    const [characterListParameters, characterListParametersListParameters] = useState({
        characters: [],
        fetchFinished: false
    })
    const [page, setPage] = useState(params.get('page') || "");

    useEffect(() => {
        const queryPage = params.get('page');
        if (!queryPage) {
            return;
        }
        fetchCharacters(queryPage).then((res) => {
            if (res.error) {
                return;
            }
            characterListParametersListParameters(res);
        }).catch((error) => {
            console.error(error);
        });
    }, [navigate, params]);

    const handleClickOnCharacter = (character) => {
    }

    return (
        <div className="container text-light">
            <ListCharacters characters={characterListParameters.characters} addRemoveCharacterFromSuperteam={handleClickOnCharacter} />
        </div>
    )
}

export default Browse;