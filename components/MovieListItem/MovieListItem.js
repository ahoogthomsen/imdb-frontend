import styles from "./MovieListItem.module.css";

const MovieListItem = ({ movie }) => {
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
    </li>
  );
};

export default MovieListItem;
