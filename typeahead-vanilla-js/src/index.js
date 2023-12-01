import {getSuggestions, debounce} from "./utils.js"

// const rejected = ()=>{
//     console.log(rejected);
// }

// getSuggestions("man").then((res)=>{
//     console.log(res);
// }, rejected)

const searchBox = document.getElementById("searchBox");
const suggestionsBox = document.getElementById("suggestionsBox");

const resetState = ()=>{
    suggestionsBox.classList.remove("suggestionsBoxVisible");
}

const renderDropdown = (list)=>{
    const listFragment = document.createDocumentFragment();
    
    for(let i = 0;i<list.length;i++){
        const listItem = document.createElement('li');
        listItem.textContent = list[i];
        listFragment.appendChild(listItem);
    }

    suggestionsBox.innerHTML = "";
    suggestionsBox.appendChild(listFragment);
}

const handleSearch = async (searchTxt)=>{
    const suggestionsLoaded = await getSuggestions(searchTxt);
    
    if(suggestionsLoaded.length>0){
        suggestionsBox.classList.add("suggestionsBoxVisible");
        renderDropdown(suggestionsLoaded);        
    }else{
        resetState();
    }
}

const handleInputChange = (event)=>{

    const searchTxt = event.target.value;
    console.log(searchTxt);
    if(searchTxt){
        handleSearch(searchTxt);
    }else{
        resetState();
    }
    
}

searchBox.addEventListener("input", debounce(handleInputChange,500));