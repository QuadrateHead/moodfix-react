import TrendingCard from '../elements/TrendingCard';

// Portrait-format poster images from public/images (selected for aspect ratio)
const trendingMovies = [
  {
    rank: 1,
    title: 'Enola Holmes 2',
    poster: '/images/27dac2c12e2272b54c156629988113de5f90871e',
  },
  {
    rank: 2,
    title: 'Dungeons & Dragons',
    poster: '/images/7ba8cd7216bac0799640ccc1ba75a9e6d02afa4d',
  },
  {
    rank: 3,
    title: 'Oppenheimer',
    poster: '/images/55175474e23d453f1330eb3696d2ee561d22385c',
  },
  {
    rank: 4,
    title: 'The Flash',
    poster: '/images/7720d3b216ea0ef59d644ba9d193da783342c4a8',
  },
  {
    rank: 5,
    title: 'Sri Asih',
    poster: '/images/875ffe712e11708a6bc3c2beee85fd4a9800daf1',
  },
  {
    rank: 6,
    title: 'Ant-Man Quantumania',
    poster: '/images/5ae78a26471ded5db8f1e5c507fd634bfc204e4a',
  },
];

export default function Trending() {
  return (
    <section className="trending">
      <h2>Trending</h2>
      <ul>
        {trendingMovies.map((movie) => (
          <TrendingCard
            key={movie.rank}
            rank={movie.rank}
            posterSrc={movie.poster}
            title={movie.title}
          />
        ))}
      </ul>
    </section>
  );
}
