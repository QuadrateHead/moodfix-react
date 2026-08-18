import logoSvg from '../assets/logo.svg';
import Hero from '../components/Hero';
import Trending from '../components/Trending';
import Popular from '../components/Popular';
import Pagination from '../components/Pagination';
import LogoutButton from '../components/LogoutButton';
import { useCallback, useEffect, useState } from 'react';
import { useDebounce } from "@uidotdev/usehooks";
import { fetchMovies, fetchTrendingMovies, saveSearchCount, type Movie } from '../lib/api';
import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Spinner from '../elements/Spinner';

const EMPTY_MOVIES: Movie[] = [];

export type MovieListType = "popular" | "top_rated" | "now_playing" | "upcoming"

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [listMode, setListMode] = useState<MovieListType>("popular");
  const handleListModeChange = useCallback((nextMode: MovieListType) => {
    setListMode(nextMode);
    setCurrentPage(1);
  }, []);
  const queryClient = useQueryClient();
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const trendingQuery = useQuery({
    queryKey: ["trendingMovies"],
    queryFn: fetchTrendingMovies,
    staleTime: 60 * 1000 * 3,
  });
  const searchCountMutation = useMutation({
    mutationFn: ({ searchTerm, movie }: { searchTerm: string; movie: Movie }) =>
      saveSearchCount(searchTerm, movie),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trendingMovies"] });
    },
  });
  const moviesQuery = useQuery({
    queryKey: ["movieList", debouncedSearchTerm, listMode],
    queryFn: () => fetchMovies(debouncedSearchTerm, listMode),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
   placeholderData: keepPreviousData
  })
  useEffect(() => {
    if (debouncedSearchTerm && moviesQuery.data && moviesQuery.data.length > 0) {
      searchCountMutation.mutate({
        searchTerm: debouncedSearchTerm,
        movie: moviesQuery.data[0],
      });
      setCurrentPage(1);
    }
  }, [debouncedSearchTerm, moviesQuery.data]);
  const movies = moviesQuery.data ?? EMPTY_MOVIES;
  const isLoading = moviesQuery.isLoading;
  const errorMessage = moviesQuery.error instanceof Error ? moviesQuery.error.message : '';
  

  //!Page logic//
  const [pageSize, setPageSize] = useState<number>(12);
  useEffect(() => {
    const updatePageSize = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setPageSize(12);
      } else if (width >= 768) {
        setPageSize(9);
      } else if (width >= 640) {
        setPageSize(6);
      } else {
        setPageSize(4);
      }
    };

  updatePageSize();
    window.addEventListener('resize', updatePageSize);
    return () => window.removeEventListener('resize', updatePageSize);
  }, []);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = Math.max(Math.ceil(movies.length / pageSize), 1);
  const movePagePrev = useCallback(() => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  }, []);
  const movePageNext = useCallback(() => {
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  }, [totalPages]);
  useEffect(() => {
    setCurrentPage((prev) => (prev > totalPages ? totalPages : prev));
  }, [totalPages]);

  return (
    <main>
      <LogoutButton />
      <div className="wrapper">
        {/* Logo — centred at very top, alone */}
        <header>
          <img src={logoSvg} alt="MoodFix logo" />
        </header>

        <Hero searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>

        <Trending trendingMovies = {trendingQuery.data || []}/>

        {isLoading && !movies.length ? (
            <ul className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {Array.from({ length: pageSize }).map((_, i) => (
                <li className='w-full h-full flex items-center justify-center' key={i}>
                  <Spinner />
                </li>
              ))}
            </ul>
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : movies.length === 0 ? (
            <h2 className="w-full text-5xl">Not Found</h2>
          ) : (
            <Popular
              movieList={movies}
              listMode={listMode}
              handleListModeChange={handleListModeChange}
              currentPage={currentPage}
              pageSize={pageSize}
            />
          )}

        {/* Pagination: centred left-arrow / current of total / right-arrow */}
        <div className="mt-12">
          <Pagination currentPage={currentPage} totalPages={totalPages} movePagePrev = {movePagePrev} movePageNext = {movePageNext}/>
        </div>
      </div>
    </main>
  );
}
