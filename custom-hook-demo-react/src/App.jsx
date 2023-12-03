import { useEffect, useState } from 'react'
import './App.css'
import useFetch from './useFetch';

function App() {
  const url = "https://jsonplaceholder.typicode.com/todos";

  const [data] = useFetch(url);

  return <>
    {data.map((item)=>{
      return <h4 key={item.id}>{item.title}</h4>
    }) }
  </>
}

export default App
