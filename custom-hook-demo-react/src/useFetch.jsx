import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [data, setData] = useState([]);

  const getData = async () => {
    const todoResponse = await fetch(url);
    const todoJSON = await todoResponse.json();
    console.log(todoJSON);
    setData(todoJSON);
  };

  useEffect(() => {
    getData();
  }, []);

  console.log(typeof data);

  return [data];
};

export default useFetch;
