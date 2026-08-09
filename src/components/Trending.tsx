import { Link } from 'react-router-dom';
import TrendingCard from '../elements/TrendingCard';
import type { MetricsRow } from '../lib/appwrite'; 
// Portrait-format poster images from public/images (selected for aspect ratio)

interface TrendingProps {
  trendingMovies: MetricsRow[]
}
export default function Trending({trendingMovies}: TrendingProps) {
  return (
    <section className="trending">
      <h2>Trending</h2>
      <ul>
        {trendingMovies.map((movie, index) => (
          <Link to = {`/movie/${movie.movie_id}`} key={movie.$id || movie.movie_id}>
            <TrendingCard
              rank={index + 1}
              posterSrc={movie.poster_url}
              title={movie.movie_id.toString()}
            />
          </Link>
        ))}
      </ul>
    </section>
  );
}
