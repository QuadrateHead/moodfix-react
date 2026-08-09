import logoSvg from '../assets/logo.svg';
import Hero from '../components/Hero';
import Trending from '../components/Trending';
import Popular from '../components/Popular';
import Pagination from '../components/Pagination';
import { useEffect, useState } from 'react';
import { useDebounce } from "@uidotdev/usehooks";
import { getTrendingMovies, updateSearchCount } from '../lib/appwrite';
import type { MetricsRow } from '../lib/appwrite'; 

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}
export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');

  const [movieList, setMovieList] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const [trendingMovies, setTrendingMovies] = useState<MetricsRow[]>([]);
  
  const fetchData = async (query: string) => {
    setIsLoading(true);
    setErrorMessage('');
    try{
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);
      if(!response.ok){
        throw new Error('Failed to fetch movies');
      }
      const data = await response.json();
      if(!data.results) {
        setErrorMessage(data.Error || 'Failed to fetch movies');
        setMovieList([]);
        return;
      }
      setMovieList(data.results || []);
      if(query && data.results.length > 0) {
        await updateSearchCount(query, data.results[0]);
      }
    }catch(error){
      console.error(error);
      setErrorMessage(error instanceof Error ? error.message : 'Failed to fetch movies');
    }
    finally{
      setIsLoading(false);
    }
  }

  const loadTrendingMovies = async () => {
    try {
      const movies = await getTrendingMovies();
      setTrendingMovies(movies);
    } catch (error) {
      console.error(`Error fetching trending movies: ${error}`);
    }
  }
  useEffect(() => {
    loadTrendingMovies();
  }, []);
  useEffect(() => {
    fetchData(debouncedSearchTerm)
  }, [debouncedSearchTerm])
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
        <Popular movieList = {movieList} errorMessage={errorMessage} isLoading={isLoading} />

        {/* Pagination: centred left-arrow / current of total / right-arrow */}
        <div className="mt-12">
          <Pagination currentPage={1} totalPages={3} />
        </div>
      </div>
    </main>
  );
}
