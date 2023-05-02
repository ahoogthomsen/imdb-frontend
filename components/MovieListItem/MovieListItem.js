import { useState } from "react";
import styles from "./MovieListItem.module.css";
import MovieModal from "../MovieModal/MovieModal";

const MovieListItem = ({ movie, onDelete, onUpdate }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleModal = () => {
    setIsOpen((prevState) => !prevState);
  };
  return (
    <li className={styles.movieListItem}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className={styles.moviePoster}
        src={movie.Poster}
        alt={`${movie.Title} Poster`}
      />
      <div className={styles.movieInfo}>
        <h2 className={styles.movieTitle}>{movie.Title}</h2>
        <p className={styles.movieYear}>Released: {movie.Year}</p>
        <p className={styles.movieGenre}>Genre: {movie.Genre}</p>
      </div>
      <div>
        <button onClick={() => onDelete(movie.imdbID)}>Delete movie</button>
        <button onClick={handleToggleModal}>Edit movie</button>
      </div>
      {isOpen && (
        <MovieModal
          movie={movie}
          onSubmit={onUpdate}
          onClose={handleToggleModal}
        />
      )}
    </li>
  );
};

export default MovieListItem;
