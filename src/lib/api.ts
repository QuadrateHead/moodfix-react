import { getTrendingMovies, updateSearchCount } from "./appwrite";
import * as z from "zod";
 
const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export const MovieSchema = z.object({
  id: z.number(),
  title: z.string(),
  release_date: z.string().optional().default(''),
  vote_average: z.number().optional().default(0),
  original_language: z.string().optional().default('en'),
  poster_path: z.string().nullable().optional().default(null),
});

const MoviesResponseSchema = z.object({
  page: z.number().optional().default(1),
  results: z.array(MovieSchema).default([]),
  total_pages: z.number().optional().default(1),
  total_results: z.number().optional().default(0),
});

export type Movie = z.infer<typeof MovieSchema>;

export const GenreSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const ProductionCompanySchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const ProductionCountrySchema = z.object({
  iso_3166_1: z.string(),
  name: z.string(),
});

export const SpokenLanguageSchema = z.object({
  english_name: z.string().optional().default(''),
  iso_639_1: z.string().optional().default(''),
  name: z.string().optional().default(''),
});

export const VideoResultSchema = z.object({
  id: z.string(),
  key: z.string(),
  name: z.string(),
  site: z.string(),
  type: z.string(),
});

export const MovieDetailsSchema = z.object({
  adult: z.boolean().optional().default(false),
  backdrop_path: z.string().nullable().optional().default(null),
  genres: z.array(GenreSchema).optional().default([]),
  homepage: z.string().nullable().optional().default(null),
  id: z.number(),
  imdb_id: z.string().nullable().optional().default(null),
  original_language: z.string().optional().default(''),
  original_title: z.string().optional().default(''),
  overview: z.string().optional().default(''),
  popularity: z.number().optional().default(0),
  poster_path: z.string().nullable().optional().default(null),
  production_companies: z.array(ProductionCompanySchema).optional().default([]),
  production_countries: z.array(ProductionCountrySchema).optional().default([]),
  release_date: z.string().optional().default(''),
  revenue: z.number().optional().default(0),
  runtime: z.number().nullable().optional().default(null),
  spoken_languages: z.array(SpokenLanguageSchema).optional().default([]),
  status: z.string().optional().default(''),
  tagline: z.string().optional().default(''),
  title: z.string(),
  vote_average: z.number().optional().default(0),
  vote_count: z.number().optional().default(0),
  budget: z.number().optional().default(0),
  videos: z.object({
    results: z.array(VideoResultSchema).optional().default([]),
  }).optional().default({ results: [] }),
});

export type MovieDetails = z.infer<typeof MovieDetailsSchema>;


async function tmdbFetch(url: string): Promise<unknown> {
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

  return response.json();
}

const PAGES_TO_FETCH = 6; // 5 * 20 = 100 movies

function buildEndpoint(query: string | undefined, listMode: string | undefined, page: number): string {
  return query
    ? `/search/movie?query=${encodeURIComponent(query)}&page=${page}`
    : `/movie/${listMode || "popular"}?page=${page}`;
}

export async function fetchMovies(query?: string, listMode?: string): Promise<Movie[]> {
  const firstEndpoint = buildEndpoint(query, listMode, 1);
  const firstData = await tmdbFetch(firstEndpoint);
  const firstParsed = MoviesResponseSchema.parse(firstData);

  const pagesToFetch = Math.min(PAGES_TO_FETCH, firstParsed.total_pages);

  const remainingPageNumbers = Array.from(
    { length: Math.max(0, pagesToFetch - 1) },
    (_, i) => i + 2
  );

  const remainingResults = await Promise.all(
    remainingPageNumbers.map(async (page) => {
      const data = await tmdbFetch(buildEndpoint(query, listMode, page));
      return MoviesResponseSchema.parse(data).results;
    })
  );

  const allResults = [firstParsed.results, ...remainingResults].flat();

  const seen = new Set<number>();
  const deduped = allResults.filter((movie) => {
    if (seen.has(movie.id)) return false;
    seen.add(movie.id);
    return true;
  });

  return deduped;
}

export async function fetchMovieById(id: string): Promise<MovieDetails> {
  const data = await tmdbFetch(
    `/movie/${id}?append_to_response=videos,credits,similar`
  );

  return MovieDetailsSchema.parse(data);
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