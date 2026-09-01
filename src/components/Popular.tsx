
import MovieCard from "../elements/MovieCard";
import { memo, useCallback, useMemo, useState } from "react";
import type { Movie } from "../lib/api";
import MovieListSelect from "./MovieListSelect";
import { useFilterStore } from "@/store/store";
import { RotateCcw } from "lucide-react";

interface PopularProps {
  movieList: Movie[]
  currentPage: number
  pageSize: number
}

function Popular({movieList, currentPage, pageSize} : PopularProps) {
  const listMode = useFilterStore((state) => state.listMode);
  const resetFilters = useFilterStore((state) => state.resetFilters);
  const [isSpinning, setIsSpinning] = useState(false);

  const handleReset = useCallback(() => {
    resetFilters();
    setIsSpinning(true);
    setTimeout(() => {
      setIsSpinning(false);
    }, 500);
  }, [resetFilters]);

  const visibleMovies = useMemo(
    () => movieList.slice(pageSize * (currentPage - 1), pageSize * currentPage),
    [movieList, currentPage, pageSize]
  );
  return (
    <section className="all-movies">
      <div className="flex items-center justify-between gap-1 flex-wrap">
        <h2 className = "capitalize">{listMode.replace("_", " ")}</h2>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center justify-center h-9 w-9 rounded-full bg-light-100/10 hover:bg-light-100/20 text-light-200 hover:text-white border border-light-100/10 hover:border-light-100/25 transition-all duration-200 cursor-pointer shadow-xs active:scale-95"
            title="Reset filters"
            aria-label="Reset filters"
          >
            <RotateCcw className={`w-4 h-4 ${isSpinning ? "animate-spin" : ""}`} />
          </button>
          <MovieListSelect/>
        </div>
        
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
