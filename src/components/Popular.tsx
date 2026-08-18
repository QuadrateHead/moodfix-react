
import MovieCard from "../elements/MovieCard";
import { memo, useMemo } from "react";
import type { Movie } from "../lib/api";
import MovieListSelect from "./MovieListSelect";
import type { MovieListType } from "@/pages/HomePage";


interface PopularProps {
  movieList: Movie[]
  currentPage: number
  pageSize: number
  listMode: MovieListType
  handleListModeChange: (nextMode: MovieListType) => void
}

function Popular({movieList, currentPage, pageSize, listMode, handleListModeChange} : PopularProps) {
  const visibleMovies = useMemo(
    () => movieList.slice(pageSize * (currentPage - 1), pageSize * currentPage),
    [movieList, currentPage, pageSize]
  );
  return (
    <section className="all-movies">
      <div className="flex items-center justify-between">
        <h2 className = "capitalize" >{listMode.replace("_", " ")}</h2>
        <MovieListSelect value={listMode} onValueChange={handleListModeChange}/>
      </div>
      <ul>
        {visibleMovies.map((movie) => (
          <MovieCard movie={movie} key={movie.id}/>
        ))}
      </ul>
    </section>
  );
}
export default memo(Popular)
