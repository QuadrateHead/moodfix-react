import MovieCard from "../elements/MovieCard";

// 12 movies for the Popular grid (4 cols × 3 rows visible)
const popularMovies = [
  {
    title: "Wednesday",
    year: "2022",
    rating: "8.1",
    language: "en",
    poster: "/images/c9c69665233b43b7d753fdc9e3859d6517f1b13b",
  },
  {
    title: "Beef",
    year: "2023",
    rating: "8.0",
    language: "en",
    poster: "/images/52e69e0b7c6e57a905e9e9bdc7dbf38cb8b9ee0c",
  },
  {
    title: "Squid Game",
    year: "2021",
    rating: "8.0",
    language: "ko",
    poster: "/images/3af71750b597ba32e5bdbc6a4703fbbc751a5f5b",
  },
  {
    title: "The Witcher",
    year: "2019",
    rating: "7.6",
    language: "en",
    poster: "/images/b4bf6dbd339383800e80344380fcb75fa552d3fa",
  },
  {
    title: "Ghost Doctor",
    year: "2022",
    rating: "7.9",
    language: "ko",
    poster: "/images/0bfbe639a838d065ab10292ba92abec492475c4a",
  },
  {
    title: "Insider",
    year: "2022",
    rating: "7.8",
    language: "ko",
    poster: "/images/9d3c180bde932932e6462f8f4d75dedcafc8ddbc",
  },
  {
    title: "Oppenheimer",
    year: "2023",
    rating: "8.3",
    language: "en",
    poster: "/images/55175474e23d453f1330eb3696d2ee561d22385c",
  },
  {
    title: "John Wick Ch.4",
    year: "2023",
    rating: "7.7",
    language: "en",
    poster: "/images/20bcfc614161b2e0ec815ed2ba23ae263b8e032f",
  },
  {
    title: "D&D: Honor",
    year: "2023",
    rating: "7.3",
    language: "en",
    poster: "/images/7ba8cd7216bac0799640ccc1ba75a9e6d02afa4d",
  },
  {
    title: "Sri Asih",
    year: "2022",
    rating: "6.9",
    language: "id",
    poster: "/images/875ffe712e11708a6bc3c2beee85fd4a9800daf1",
  },
  {
    title: "Enola Holmes 2",
    year: "2022",
    rating: "6.9",
    language: "en",
    poster: "/images/27dac2c12e2272b54c156629988113de5f90871e",
  },
  {
    title: "Toxic",
    year: "2023",
    rating: "7.2",
    language: "ko",
    poster: "/images/f4a46f8d093c125adc23ec496516abe6e98099c1",
  },
];

export default function Popular() {
  const handleCardClick = () => {
    window.history.pushState({}, "", "/movie");
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  return (
    <section className="all-movies mt-20">
      <h2>Popular</h2>
      <ul>
        {popularMovies.map((movie) => (
          <li key={movie.title}>
            <MovieCard
              title={movie.title}
              year={movie.year}
              rating={movie.rating}
              language={movie.language}
              posterSrc={movie.poster}
              onClick={handleCardClick}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
