import React, { useEffect, useState } from "react";
import styles from "./MovieGridList.module.css";
import MovieListItem from "../MovieListItem/MovieListItem";
import MovieModal from "../MovieModal/MovieModal";

import {
  getMovies,
  deleteMovie,
  addMovie,
  editMovie,
} from "@/pages/movies/api";
import Toaster from "@/pages/fetch-example/components/Toaster/Toaster";

const MovieGridList = () => {
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [toaster, setToaster] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await getMovies();
        setData(response.data);
      } catch (e) {
        setToaster({
          message: "An error occured when fetching movies",
          type: "error",
        });
      }
    };

    fetchMovies();
  }, []);

  const handleToggleModal = () => {
    setIsOpen((prevState) => !prevState);
  };

  const closeToaster = () => {
    setToaster(null);
  };

  const handleDeleteItem = async (id) => {
    try {
      await deleteMovie(id);
      setData((prevState) => prevState.filter((movie) => movie.imdbID !== id));
    } catch (e) {
      setToaster({
        message: "An error occured when trying to delete a movie",
        type: "error",
      });
    }
  };

  const handleCreateItem = async (item) => {
    try {
      const { data: newMovie, status } = await addMovie(item);
      if (status !== 200) {
        setToaster({
          message: "An error occured when trying to create a movie",
          type: "error",
        });
      }
      setData((prevState) => [...prevState, newMovie]);
    } catch (e) {
      setToaster({
        message: "An error occured when trying to create a movie",
        type: "error",
      });
    }
  };

  const handleUpdateItem = async (item) => {
    try {
      const { data: updatedMovie, status } = await editMovie({
        id: item.imdbID,
        movie: item,
      });

      if (status !== 200) {
        setToaster({
          message: "An error occured when trying to update a movie",
          type: "error",
        });
      }

      setData((prevState) =>
        prevState.map((movie) =>
          movie.imdbID === item.imdbID ? { ...updatedMovie } : movie
        )
      );
    } catch (e) {
      setToaster({
        message: "An error occured when trying to update a movie",
        type: "error",
      });
    }
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
      {toaster && (
        <Toaster
          message={toaster.message}
          type={toaster.type}
          onClose={closeToaster}
        />
      )}
    </>
  );
};

export default MovieGridList;
