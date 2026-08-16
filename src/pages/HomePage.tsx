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


const EMPTY_MOVIES: Movie[] = [];

interface MoviesState {
  movies: Movie[];
  isLoading: boolean;
  errorMessage: string;
}

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');
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


  const [pageSize, setPageSize] = useState<number>(12);
  
  const moviesQuery = useQuery({
    queryKey: ["movieList", debouncedSearchTerm],
    queryFn: () => fetchMovies(debouncedSearchTerm),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
   placeholderData: keepPreviousData
  })

  {/*const fetchData = useCallback(async (query: string) => {
    setMoviesState((prev) => ({
      ...prev,
      isLoading: true,
      errorMessage: '',
    }));
    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${API_KEY}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch movies');
      }
      const data = await response.json();
      if (!data.results) {
        setMoviesState({
          movies: EMPTY_MOVIES,
          isLoading: false,
          errorMessage: data.Error || 'Failed to fetch movies',
        });
        return;
      }
      setMoviesState({
        movies: data.results.length > 0 ? data.results : EMPTY_MOVIES,
        isLoading: false,
        errorMessage: '',
      });
      if (query && data.results.length > 0) {
        searchCountMutation.mutate({ 
          searchTerm: query, 
          movie: data.results[0] 
        });
        setCurrentPage(1);
      }
    } catch (error) {
      console.error(error);
      setMoviesState({
        movies: EMPTY_MOVIES,
        isLoading: false,
        errorMessage: error instanceof Error ? error.message : 'Failed to fetch movies',
      });
    }
  }, []);*/}
  
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

        {/* Hero: poster fan + headline + search */}
        <Hero searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>

        {/* Trending: 6 numbered horizontal thumbnails */}
        <Trending trendingMovies = {trendingQuery.data || []}/>

        {/* Popular: 4-col × 3-row movie grid */}
        <Popular
          movieList={movies}
          errorMessage={errorMessage}
          isLoading={isLoading}
          currentPage={currentPage}
          pageSize={pageSize}
        />

        {/* Pagination: centred left-arrow / current of total / right-arrow */}
        <div className="mt-12">
          <Pagination currentPage={currentPage} totalPages={totalPages} movePagePrev = {movePagePrev} movePageNext = {movePageNext}/>
        </div>
      </div>
    </main>
  );
}
