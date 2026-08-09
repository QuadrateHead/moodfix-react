import { Link } from "react-router-dom";
import MovieCard from "../elements/MovieCard";

export interface Movie {
  id: number;
  title: string;
  release_date: string;
  vote_average: number;
  original_language: string;
  poster_path: string;
}
interface PopularProps {
  movieList: Movie[]
  errorMessage: string
  isLoading: boolean
}
export default function Popular({movieList, errorMessage, isLoading} : PopularProps) {
  
  return (
    <section className="all-movies">
      <h2>{"Popular"}</h2>
      {isLoading ? (<p className="w-full text-5xl">Loading...</p>) : errorMessage ? (<p>{errorMessage}</p>) :
      (<ul>
        {movieList.map((movie) => (
          <Link to={`/movie/${movie.id}`} key={movie.id}>
            <MovieCard movie = {movie}/>
          </Link>
        ))}
      </ul>)}
    </section>
  );
}
