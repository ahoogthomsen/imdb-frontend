import React from "react";
import styles from "./MovieGridList.module.css";

import { mockData } from "@/mockData";
import MovieListItem from "../MovieListItem/MovieListItem";

const MovieGridList = () => {
  return (
    <ul className={styles.movieGridList}>
      {mockData.map((movie, index) => (
        <MovieListItem key={index} movie={movie} />
      ))}
    </ul>
  );
};

export default MovieGridList;
