import React, { useState, useEffect } from "react";
import { fetchSuperteamCharacters, addRemoveCharacterFromSuperteam } from "../api/searchCharacter";
import ListCharacters from "../components/ListCharacters";

/**
 * A react component to display the superteam page.
 */
const Superteam = () => {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    fetchSuperteamCharacters().then((res) => {
      setCharacters(res);
    }).catch((error) => {
      console.error(error);
    });
  }, []);

  const handleClickOnSuperteam = (character) => {
    addRemoveCharacterFromSuperteam(character).then((res) => {
      setCharacters(res.characters);
    }).catch((error) => {
      console.error(error);
    })
  }

  return (
    <div className="container text-light py-2">
      <h1 className="display-1" >My Superteam</h1>
      <ListCharacters characters={characters}
        addRemoveCharacterFromSuperteam={handleClickOnSuperteam} />
    </div>
  );
};

export default Superteam