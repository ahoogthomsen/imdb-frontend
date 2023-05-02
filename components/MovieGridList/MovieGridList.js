import React, { useState } from "react";
import styles from "./MovieGridList.module.css";

import { mockData } from "@/mockData";
import MovieListItem from "../MovieListItem/MovieListItem";

const MovieGridList = () => {
  const [data, setData] = useState(mockData);

  const handleDeleteItem = (id) => {
    console.log({ id });
  };

  const handleCreateItem = (item) => {
    console.log({ item });
  };

  const handleUpdateItem = (item) => {
    console.log({ item });
  };

  return (
    <>
      <ul className={styles.movieGridList}>
        {data.map((movie, index) => (
          <MovieListItem
            key={index}
            movie={movie}
            onDelete={handleDeleteItem}
          />
        ))}
      </ul>
    </>
  );
};

export default MovieGridList;
