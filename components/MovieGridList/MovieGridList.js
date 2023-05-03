import React, { useState } from "react";
import styles from "./MovieGridList.module.css";

import { mockData } from "@/mockData";
import MovieListItem from "../MovieListItem/MovieListItem";
import MovieModal from "../MovieModal/MovieModal";

const MovieGridList = () => {
  const [data, setData] = useState(mockData);
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleModal = () => {
    setIsOpen((prevState) => !prevState);
  };

  const handleDeleteItem = (id) => {
    setData((prevState) => prevState.filter((item) => item.imdbID !== id));
  };

  const handleCreateItem = (item) => {
    const imdbID = Math.floor(Math.random() * 100);

    const { id, ...props } = item;
    const newMovie = { ...props, imdbID };

    setData((prevState) => [...prevState, newMovie]);
  };

  const handleUpdateItem = (item) => {
    setData((prevState) =>
      prevState.map((movie) => (movie.imdbID === item.id ? { ...item } : movie))
    );
  };

  return (
    <>
      <button onClick={handleToggleModal}>Add new movie</button>
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
      {isOpen && (
        <MovieModal onSubmit={handleCreateItem} onClose={handleToggleModal} />
      )}
    </>
  );
};

export default MovieGridList;
