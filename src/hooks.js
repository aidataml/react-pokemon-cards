/* Create a *hooks.js* file in *src/*, and in that file write a custom hook called 
*useFlip* which will hold the business logic for flipping any type of card.

*useFlip* doesn’t need to take an argument, and similar to *useState*, it should return 
an array with two elements. The first element is the current flip state of the card, and 
the second element is a function that will toggle the flip state.*/

import React, {useState, useEffect} from "react";
import axios from "axios";

const useFlip = (initialFlipState = true) => {
    const [isFlipped, setIsFlipped] = React.useState(initialFlipState);
    const flip = () => setIsFlipped(prevState => !prevState);
  
    return [isFlipped, flip];
};

/* Figure out a way to modify your useAxios hook so that when you call useAxios you can just 
provide a base url, and when you want to add to your array of response data in state, you can 
provide the rest of the url.*/

function useAxios(keyInLS, baseUrl) {
    const [responses, setResponses] = useLocalStorage(keyInLS);
  
    const addResponseData = async (formatter = data => data, restOfUrl = "") => {
      const response = await axios.get(`${baseUrl}${restOfUrl}`);
      setResponses(data => [...data, formatter(response.data)]);
    };
  
    const clearResponses = () => setResponses([]);
  
    return [responses, addResponseData, clearResponses];
  }
  
  function useLocalStorage(key, initialValue = []) {
    if (localStorage.getItem(key)) {
      initialValue = JSON.parse(localStorage.getItem(key));
    }
    const [value, setValue] = useState(initialValue);
  
    useEffect(() => {
      localStorage.setItem(key, JSON.stringify(value));
    }, [value, key]);
  
    return [value, setValue];
  }
  
  export default useLocalStorage;
  
  export { useFlip, useAxios, useLocalStorage };  