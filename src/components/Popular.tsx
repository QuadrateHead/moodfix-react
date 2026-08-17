import { Link } from "react-router-dom";
import MovieCard from "../elements/MovieCard";
import { memo } from "react";
import { updateSearchCount } from "../lib/appwrite";
import Spinner from "../elements/Spinner";
import type { Movie } from "../lib/api";


interface PopularProps {
  movieList: Movie[]
  errorMessage: string
  isLoading: boolean
  currentPage: number
  pageSize: number
}
function Popular({movieList, currentPage, pageSize} : PopularProps) {
  
  return (
    <section className="all-movies">
      <h2>Popular</h2>
      <ul>
        {movieList.slice(pageSize * (currentPage - 1), pageSize * currentPage).map((movie) => (
          <Link onClick={() => updateSearchCount(movie.title, movie)} to={`/movie/${movie.id}`} key={movie.id}>
            <MovieCard movie={movie} />
          </Link>
        ))}
      </ul>
    </section>
  );
}
export default memo(Popular)