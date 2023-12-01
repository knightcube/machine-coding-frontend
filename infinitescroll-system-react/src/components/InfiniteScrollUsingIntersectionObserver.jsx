import React, { useEffect, useRef, useState } from "react";
import reportWebVitals from "../reportWebVitals";

const InfiniteScrollUsingIntersectionObserver = () => {
  reportWebVitals(console.log);

  const observerTarget = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
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

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting && !isLoading) {
        getData();
      }
    });
    observer.observe(observerTarget.current);
    return () => observer.disconnect();
  }, [isLoading]);

  return (
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
      {isLoading && <h1>Loading...</h1>}
      <div
        className="dummy-element"
        ref={observerTarget}
        style={{ height: "10px" }}
      ></div>
    </div>
  );
};

export default InfiniteScrollUsingIntersectionObserver;
