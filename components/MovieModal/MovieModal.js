import classes from "./MovieModal.module.css";

import React, { useState } from "react";
import ReactDOM from "react-dom";

const MovieModal = ({ movie = {}, onSubmit, onClose }) => {
  const [poster, setPoster] = useState(movie.Poster || "");
  const [title, setTitle] = useState(movie.Title || "");
  const [year, setYear] = useState(movie.Year || "");
  const [genre, setGenre] = useState(movie.Genre || "");

  const posterChangeHandler = (event) => {
    setPoster(event.target.value);
  };

  const titleChangeHandler = (event) => {
    setTitle(event.target.value);
  };

  const yearChangeHandler = (event) => {
    setYear(event.target.value);
  };

  const genreChangeHandler = (event) => {
    setGenre(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const movieData = {
      Poster: poster,
      Title: title,
      Year: year,
      Genre: genre,
    };

    onSubmit(movieData);
    setPoster("");
    setTitle("");
    setYear("");
    setGenre("");
  };

  return ReactDOM.createPortal(
    <div className={classes.backdrop} onClick={onClose}>
      <form
        className={classes.modal}
        onSubmit={submitHandler}
        onClick={(e) => e.stopPropagation()}
      >
        <label htmlFor="poster">Poster:</label>
        <input
          type="text"
          id="poster"
          value={poster}
          onChange={posterChangeHandler}
          required
        />

        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={titleChangeHandler}
          required
        />

        <label htmlFor="year">Year:</label>
        <input
          type="number"
          id="year"
          value={year}
          onChange={yearChangeHandler}
          required
        />

        <label htmlFor="genre">Genre:</label>
        <input
          type="text"
          id="genre"
          value={genre}
          onChange={genreChangeHandler}
          required
        />

        <div className={classes.actions}>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>,
    document.getElementById("modal-root")
  );
};

export default MovieModal;
