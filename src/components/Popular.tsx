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
function Popular({movieList, errorMessage, isLoading, currentPage, pageSize} : PopularProps) {
  
  return (
    <section className="all-movies">
      <h2>Popular</h2>
      {movieList.length <=0 && <h2 className="w-full text-5xl">Not Found</h2>}
      {isLoading ? (
        <Spinner/>
      ) : errorMessage ? (
        <p>{errorMessage}</p>
      ) : (
        <ul>
          {movieList.slice(pageSize * (currentPage - 1), pageSize * currentPage).map((movie) => (
            <Link onClick={() => updateSearchCount(movie.title, movie)} to={`/movie/${movie.id}`} key={movie.id}>
              <MovieCard movie={movie} />
            </Link>
          ))}
        </ul>
      )}
    </section>
  );
}
export default memo(Popular)