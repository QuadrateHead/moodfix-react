import { getTrendingMovies, updateSearchCount } from "./appwrite";
import * as z from "zod"

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export const MovieSchema = z.object({
  id: z.number(),
  title: z.string(),
  release_date: z.string().optional().default(''),
  vote_average: z.number().optional().default(0),
  original_language: z.string().optional().default('en'),
  poster_path: z.string().nullable().optional().default(null),
})

const MoviesResponseSchema = z.object({
  results: z.array(MovieSchema).default([]),
});

export type Movie = z.infer<typeof MovieSchema>

interface Genre {
  id: number;
  name: string;
}
interface ProductionCompany {
  id: number;
  name: string;
}
interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}
interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}
interface VideoResult {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
}
export interface MovieDetails {
  adult?: boolean;
  backdrop_path?: string | null;
  genres?: Genre[];
  homepage?: string;
  id: number;
  imdb_id?: string;
  original_language?: string;
  original_title?: string;
  overview?: string;
  popularity?: number;
  poster_path?: string | null;
  production_companies?: ProductionCompany[];
  production_countries?: ProductionCountry[];
  release_date?: string;
  revenue?: number;
  runtime?: number;
  spoken_languages?: SpokenLanguage[];
  status?: string;
  tagline?: string;
  title: string;
  vote_average?: number;
  vote_count?: number;
  budget?: number;
  videos?: {
    results: VideoResult[];
  };
}

async function tmdbFetch<T>(url: string): Promise<T> {
  if (!API_KEY) {
    throw new Error("TMDB API key is not configured. Please add VITE_TMDB_API_KEY.");
  }

  const response = await fetch(`${API_BASE_URL}${url}`, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch TMDB data");
  }

  return response.json() as Promise<T>;
}

export async function fetchMovies(query?: string): Promise<Movie[]> {
  const endpoint = query
    ? `/search/movie?query=${encodeURIComponent(query)}`
    : `/discover/movie?sort_by=popularity.desc`;

  const data = await tmdbFetch<{ results: Movie[] }>(endpoint);
  const parsed = MoviesResponseSchema.parse(data);
  return parsed.results;
}

export async function fetchMovieById(id: string): Promise<MovieDetails> {
  return tmdbFetch<MovieDetails>(
    `/movie/${id}?append_to_response=videos,credits,similar`
  );
}

export async function fetchTrendingMovies(){
   try {
      const movies = await getTrendingMovies();
      return movies;
   } catch (error) {
      console.error(`Error fetching trending movies: ${error}`);
   }
};

export async function saveSearchCount(searchTerm: string, movie: Movie) {
  return updateSearchCount(searchTerm, movie);
}