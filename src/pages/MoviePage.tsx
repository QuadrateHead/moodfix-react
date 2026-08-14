import modalMoviePoster from "../assets/images/modal-movie-poster.png";
import modalMovieBanner from "../assets/images/modal-movie-banner.png";
import arrowRightIcon from "../assets/arrow-right-icon.svg";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Spinner from "../elements/Spinner";
import LogoutButton from "../components/LogoutButton";

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

interface MovieDetails {
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

export default function MoviePage() {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/");
  };
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(false);
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchMovieDetails = async () => {
      try {
        const apiKey = import.meta.env.VITE_TMDB_API_KEY;
        if (!apiKey) {
          throw new Error('TMDB API key is not configured. Please add VITE_TMDB_API_KEY.');
        }
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?append_to_response=videos,credits,similar`,
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${apiKey}`,
            },
          }
        );
        const data = await response.json();
        setMovieDetails(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        setIsLoading(false);
      }
    };
    if (id) {
      fetchMovieDetails();
    }
  }, [id]);

  useEffect(() => {
    setShowTrailer(false);
  }, [id]);

  if (!movieDetails || isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  const backdropPath = movieDetails.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movieDetails.backdrop_path}`
    : modalMovieBanner;
  const posterPath = movieDetails.poster_path
    ? `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`
    : modalMoviePoster;
  const formattedReleaseDate = movieDetails.release_date
    ? new Date(movieDetails.release_date).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "Unknown";
  const countryNames = movieDetails.production_countries?.map((country) => country.name) ?? [];
  const languageNames = movieDetails.spoken_languages?.map(
    (lang) => lang.english_name || lang.name || lang.iso_639_1
  ) ?? [];
  const runtimeLabel = movieDetails.runtime
    ? `${Math.floor(movieDetails.runtime / 60)}h ${movieDetails.runtime % 60}m`
    : "N/A";
  const ratingLabel = movieDetails.vote_average !== undefined
    ? `${movieDetails.vote_average.toFixed(1)} / 10 (${movieDetails.vote_count?.toLocaleString() ?? "N/A"})`
    : "N/A";
  const budgetLabel = movieDetails.budget !== undefined
    ? `$${movieDetails.budget.toLocaleString()}`
    : "N/A";
  const revenueLabel = movieDetails.revenue !== undefined
    ? `$${movieDetails.revenue.toLocaleString()}`
    : "N/A";
  const genreTags = movieDetails.genres?.length ? movieDetails.genres : [];
  const companyNames = movieDetails.production_companies?.map((company) => company.name) ?? [];
  const trailer = movieDetails.videos?.results.find(
    (video) => video.site === "YouTube" && video.type === "Trailer"
  );
  const trailerUrl = trailer ? `https://www.youtube.com/embed/${trailer.key}?rel=0&autoplay=1` : null;
  const hasTrailer = Boolean(trailerUrl);

  return (
    <main className="movie-detail-page">
      <LogoutButton />

      {/* Back Button */}
      <button onClick={handleBack} className="back-button">
        <svg
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Back to Home
      </button>

      {/* Backdrop */}

      <div className="wrapper">
        <div className="movie-info">
          {/* Header Row */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
            <div>
              <h1>{movieDetails.title}</h1>
              <div className="meta-info">
                <span className="pill">{movieDetails.release_date?.slice(0, 4) ?? "N/A"}</span>
                <span className="pill">{movieDetails.adult ? "18+" : "PG-13"}</span>
                <span className="pill">{runtimeLabel}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="pill rating">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                {ratingLabel}
              </div>
              <div className="pill">
                <span>Trend #1</span>
              </div>
            </div>
          </div>

          {/* Media Gallery Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
            <div className="lg:col-span-1">
              <img
                src={posterPath}
                alt={`${movieDetails.title} Poster`}
                className="w-full h-[441px] object-cover rounded-xl shadow-2xl"
              />
            </div>
            <div className="lg:col-span-2 relative">
              {showTrailer && trailerUrl ? (
                <iframe
                  className="w-full h-[441px] rounded-xl shadow-2xl"
                  src={`${trailerUrl}&vq=hd1080`}
                  title={`${movieDetails.title} Trailer`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <img
                  src={backdropPath}
                  alt={`${movieDetails.title} Banner`}
                  className="w-full h-[441px] object-cover rounded-xl shadow-2xl"
                />
              )}
              <button
                onClick={() => setShowTrailer((prev) => !prev)}
                className="absolute bottom-6 left-6 flex items-center gap-3 bg-white/80 backdrop-blur-md px-5 py-2.5 rounded-full text-dark-900 font-semibold hover:opacity-90 transition-opacity"
                type="button"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                <span>{showTrailer ? "Stop Trailer" : hasTrailer ? "Play Trailer" : "No Trailer"}</span>
              </button>
            </div>
          </div>

          {/* Genres + CTA Row */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-10 border-b border-light-100/10 mb-10">
            <div className="flex items-center gap-4 flex-wrap">
              <span className="text-light-200 font-medium">Genres</span>
              <div className="flex gap-2 flex-wrap">
                {genreTags.length > 0 ? (
                  genreTags.map((genre) => (
                    <span key={genre.id} className="tag">
                      {genre.name}
                    </span>
                  ))
                ) : (
                  <span className="tag">N/A</span>
                )}
              </div>
            </div>

            <button
              onClick={handleBack}
              className="flex items-center gap-2 bg-gradient-to-r from-[#D6C7FF] to-[#AB8BFF] text-dark-100 px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              <span>Visit Homepage</span>
              <img src={arrowRightIcon} alt="arrow" className="w-5 h-5" />
            </button>
          </div>

          {/* Detail Info List */}
          <div className="space-y-6 text-light-200 w-full">
            <div className="flex flex-col md:flex-row md:items-start md:justify-start gap-4 w-full">
              <span className="text-light-200 font-medium md:w-[25%] md:max-w-[25%] text-left">Overview</span>
              <p className="text-white md:flex-1 text-left leading-relaxed">
                {movieDetails.overview ?? "No overview available."}
              </p>
            </div>

            <div className="flex flex-col md:flex-row md:items-start md:justify-start gap-4 w-full">
              <span className="text-light-200 font-medium md:w-[25%] md:max-w-[25%] text-left">Release date</span>
              <span className="text-[#D6C7FF] md:flex-1 text-left font-semibold">
                {formattedReleaseDate}
                {countryNames.length > 0 ? ` (${countryNames.join(", ")})` : ""}
              </span>
            </div>

            <div className="flex flex-col md:flex-row md:items-start md:justify-start gap-4 w-full">
              <span className="text-light-200 font-medium md:w-[25%] md:max-w-[25%] text-left">Countries</span>
              <div className="text-[#D6C7FF] md:flex-1 text-left font-semibold flex items-center gap-2 flex-wrap">
                {countryNames.length > 0 ? (
                  countryNames.flatMap((country, index) => [
                    <span key={`country-${index}`}>{country}</span>,
                    index < countryNames.length - 1 ? (
                      <span key={`country-sep-${index}`} className="w-1.5 h-1.5 rounded-full bg-light-200"></span>
                    ) : null,
                  ])
                ) : (
                  <span>Unknown</span>
                )}
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-start md:justify-start gap-4 w-full">
              <span className="text-light-200 font-medium md:w-[25%] md:max-w-[25%] text-left">Status</span>
              <span className="text-[#D6C7FF] md:flex-1 text-left font-semibold">
                {movieDetails.status ?? "Unknown"}
              </span>
            </div>

            <div className="flex flex-col md:flex-row md:items-start md:justify-start gap-4 w-full">
              <span className="text-light-200 font-medium md:w-[25%] md:max-w-[25%] text-left">Language</span>
              <div className="text-[#D6C7FF] md:flex-1 text-left font-semibold flex items-center gap-2 flex-wrap">
                {languageNames.length > 0 ? (
                  languageNames.flatMap((language, index) => [
                    <span key={`language-${index}`}>{language}</span>,
                    index < languageNames.length - 1 ? (
                      <span key={`language-sep-${index}`} className="w-1.5 h-1.5 rounded-full bg-light-200"></span>
                    ) : null,
                  ])
                ) : (
                  <span>{movieDetails.original_language ?? "N/A"}</span>
                )}
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-start md:justify-start gap-4 w-full">
              <span className="text-light-200 font-medium md:w-[25%] md:max-w-[25%] text-left">Budget</span>
              <span className="text-[#D6C7FF] md:flex-1 text-left font-semibold">{budgetLabel}</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-start md:justify-start gap-4 w-full">
              <span className="text-light-200 font-medium md:w-[25%] md:max-w-[25%] text-left">Revenue</span>
              <span className="text-[#D6C7FF] md:flex-1 text-left font-semibold">{revenueLabel}</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-start md:justify-start gap-4 w-full">
              <span className="text-light-200 font-medium md:w-[25%] md:max-w-[25%] text-left">Tagline</span>
              <span className="text-[#D6C7FF] md:flex-1 text-left font-semibold">
                {movieDetails.tagline ?? "No tagline available."}
              </span>
            </div>

            <div className="flex flex-col md:flex-row md:items-start md:justify-start gap-4 w-full">
              <span className="text-light-200 font-medium md:w-[25%] md:max-w-[25%] text-left">Production Companies</span>
              <div className="text-[#D6C7FF] md:flex-1 text-left font-semibold flex items-center gap-2 flex-wrap">
                {companyNames.length > 0 ? (
                  companyNames.flatMap((company, index) => [
                    <span key={`company-${index}`}>{company}</span>,
                    index < companyNames.length - 1 ? (
                      <span key={`company-sep-${index}`} className="w-1.5 h-1.5 rounded-full bg-[#D6C7FF]"></span>
                    ) : null,
                  ])
                ) : (
                  <span>Unknown</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
