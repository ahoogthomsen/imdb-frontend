import MovieGridList from "@/components/MovieGridList/MovieGridList";
import styles from "./Movies.module.css";

export default function Movies() {
  return (
    <div className={styles.container}>
      <MovieGridList />
    </div>
  );
}
