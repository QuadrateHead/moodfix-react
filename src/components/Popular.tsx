
import MovieCard from "../elements/MovieCard";
import { memo, useMemo } from "react";
import type { Movie } from "../lib/api";
import MovieListSelect from "./MovieListSelect";
import { useFilterStore } from "@/store/store";

interface PopularProps {
  movieList: Movie[]
  currentPage: number
  pageSize: number
}

function Popular({movieList, currentPage, pageSize} : PopularProps) {
  const listMode = useFilterStore((state) => state.listMode);
  const visibleMovies = useMemo(
    () => movieList.slice(pageSize * (currentPage - 1), pageSize * currentPage),
    [movieList, currentPage, pageSize]
  );
  return (
    <section className="all-movies">
      <div className="flex items-center justify-between">
        <h2 className = "capitalize" >{listMode.replace("_", " ")}</h2>
        <MovieListSelect/>
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
