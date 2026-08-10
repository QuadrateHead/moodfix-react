import logoSvg from '../assets/logo.svg';
import Hero from '../components/Hero';
import Trending from '../components/Trending';
import Popular from '../components/Popular';
import type { Movie } from '../components/Popular';
import Pagination from '../components/Pagination';
import { useCallback, useEffect, useState } from 'react';
import { useDebounce } from "@uidotdev/usehooks";
import { getTrendingMovies, updateSearchCount } from '../lib/appwrite';
import type { MetricsRow } from '../lib/appwrite'; 

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const isTmdbConfigured = Boolean(API_KEY);

const EMPTY_MOVIES: Movie[] = [];

interface MoviesState {
  movies: Movie[];
  isLoading: boolean;
  errorMessage: string;
}

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');

  const [moviesState, setMoviesState] = useState<MoviesState>({
    movies: EMPTY_MOVIES,
    isLoading: false,
    errorMessage: '',
  });

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const [trendingMovies, setTrendingMovies] = useState<MetricsRow[]>([]);
  const [pageSize, setPageSize] = useState<number>(12);
  
  const fetchData = useCallback(async (query: string) => {
    setMoviesState((prev) => ({
      ...prev,
      isLoading: true,
      errorMessage: '',
    }));
    try {
      if (!isTmdbConfigured) {
        throw new Error('TMDB API key is not configured. Please add VITE_TMDB_API_KEY.');
      }
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
        await updateSearchCount(query, data.results[0]);
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
  }, []);
  
  const loadTrendingMovies = useCallback(async () => {
    try {
      const movies = await getTrendingMovies();
      setTrendingMovies(movies);
    } catch (error) {
      console.error(`Error fetching trending movies: ${error}`);
    }
  }, []);
  useEffect(() => {
    loadTrendingMovies();
  }, []);

  useEffect(() => {
    fetchData(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

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
  const totalPages = Math.max(Math.ceil(moviesState.movies.length / pageSize), 1);

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
      <div className="wrapper">
        {/* Logo — centred at very top, alone */}
        <header>
          <img src={logoSvg} alt="MoodFix logo" />
        </header>

        {/* Hero: poster fan + headline + search */}
        <Hero searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>

        {/* Trending: 6 numbered horizontal thumbnails */}
        <Trending trendingMovies = {trendingMovies}/>

        {/* Popular: 4-col × 3-row movie grid */}
        <Popular
          movieList={moviesState.movies}
          errorMessage={moviesState.errorMessage}
          isLoading={moviesState.isLoading}
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
