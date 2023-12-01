import FRUITS from "./data.js";

export const getSuggestions = (keyword) => {
  const result = FRUITS.filter((item)=>{
    return item.substring(0, keyword.length).toLowerCase() === keyword.toLowerCase()
  });

  return new Promise((res)=>{
    setTimeout(()=>res(result),1000);
  });
};

export const debounce = (mainFunction, delay=1000)=>{

  let timer;

  return function(...args){
    clearTimeout(timer);

    timer = setTimeout(()=>{  
      mainFunction(...args);
    }, delay);
  }
}

export const debouncedGetSuggestions = debounce(getSuggestions, 3000);
