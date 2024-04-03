/* In the *PlayingCardList* component, we initialize an empty array in state, and add 
to it via an AJAX request we make with *axios*. Since we use *axios* in a few components, 
let’s move this logic into a function called *useAxios*.

*useAxios* should take in a URL, and similar to *useState*, it should return an array with 
two elements. The first element is an array of data obtained from previous AJAX requests 
(since we will add to this array, it’s a piece of state). The second element is a function 
that will add a new object of data to our array.

Once you’ve written this hook, refactor *PlayingCardList* to use this custom hook.*/

import React from "react";
import PlayingCard from "./PlayingCard";
import {formatCard} from "./helpers";
import "./PlayingCardList.css";
import {useAxios} from "./hooks";

function CardTable() {
  const [cards, addCard, clearCards] = useAxios(
    "cards",
    "https://deckofcardsapi.com/api/deck/new/draw/"
  );
  return (
    <div className="PlayingCardList">
      <h3>Pick a playing card:</h3>
      <div>
        <button onClick={() => addCard(formatCard)}>Add Card</button>
        <button onClick={clearCards}>Clear Cards</button>
      </div>
      <div className="PlayingCardList-card-area">
        {cards.map(card => (
          <PlayingCard key={card.id} front={card.image} />
        ))}
      </div>
    </div>
  );
}

CardTable.defaultProps = {};

export default CardTable;