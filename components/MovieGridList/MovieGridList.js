import React, { useState } from "react";
import styles from "./MovieGridList.module.css";

import { mockData } from "@/mockData";
import MovieListItem from "../MovieListItem/MovieListItem";

const MovieGridList = () => {
  const [data, setData] = useState(mockData);

  const handleDeleteItem = (id) => {
    setData((prevState) => prevState.filter((item) => item.imdbID !== id));
  };

  const handleCreateItem = (item) => {
    console.log({ item });
  };

  const handleUpdateItem = (item) => {
    setData((prevState) =>
      prevState.map((movie) => (movie.imdbID === item.id ? { ...item } : movie))
    );
  };

  return (
    <>
      <ul className={styles.movieGridList}>
        {data.map((movie, index) => (
          <MovieListItem
            key={index}
            movie={movie}
            onDelete={handleDeleteItem}
            onUpdate={handleUpdateItem}
          />
        ))}
      </ul>
    </>
  );
};

export default MovieGridList;
