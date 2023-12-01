import React, { useEffect, useRef, useState } from "react";
import reportWebVitals from "../reportWebVitals";

const InfiniteScrollFromScratch = (props) => {
  reportWebVitals(console.log);
  const [isLoading, setIsLoading] = useState("false");
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);

  const getData = () => {
    setIsLoading(true);
    setTimeout(async () => {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${page}`
      );
      const data = await res.json();
      setItems((prevData) => {
        return [...prevData, ...data];
      });
      setPage((prevPage) => prevPage + 1);
      setIsLoading(false);
    }, 3000);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleInfiniteScroll = () => {
    //   console.log("window.innerHeight= "+window.innerHeight);
    //   console.log("document.documentElement.scrollHeight= "+document.documentElement.scrollHeight);
    //   console.log("document.documentElement.scrollTop= "+document.documentElement.scrollTop);
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      getData();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleInfiniteScroll);

    // Why did we return a function from our effect?
    // This is the optional cleanup mechanism for effects.
    // Every effect may return a function that cleans up after it.
    // This lets us keep the logic for adding and removing subscriptions close to each other.
    // They’re part of the same effect!

    // When exactly does React clean up an effect?
    // React performs the cleanup when the component unmounts.
    // However, as we learned earlier, effects run for every render and not just once.
    // This is why React also cleans up effects from the previous render before running the effects next time.
    // This helps avoid bugs.
    return () => window.removeEventListener("scroll", handleInfiniteScroll);
  }, [isLoading]);

  return (
    <>
      <div>
        {items.map((item, index) => {
          return (
            <div key={index}>
              <h2>{item.title}</h2>
              <h3>item.id = {item.id}</h3>
              <p>{item.body}</p>
              <p>---------------------------------------------------</p>
            </div>
          );
        })}

        {isLoading && <h1>Loading</h1>}
      </div>
    </>
  );
};

export default InfiniteScrollFromScratch;
