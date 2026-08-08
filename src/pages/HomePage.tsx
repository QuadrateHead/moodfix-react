import logoSvg from '../assets/logo.svg';
import Hero from '../components/Hero';
import Trending from '../components/Trending';
import Popular from '../components/Popular';
import Pagination from '../components/Pagination';

export default function HomePage() {
  return (
    <main>
      {/* Background radial glow pattern matching Figma */}
      <div className="pattern" />

      <div className="wrapper">
        {/* Logo — centred at very top, alone */}
        <header>
          <img src={logoSvg} alt="MoodFix logo" />
        </header>

        {/* Hero: poster fan + headline + search */}
        <Hero />

        {/* Trending: 6 numbered horizontal thumbnails */}
        <Trending />

        {/* Popular: 4-col × 3-row movie grid */}
        <Popular />

        {/* Pagination: centred left-arrow / current of total / right-arrow */}
        <div className="mt-12">
          <Pagination currentPage={1} totalPages={3} />
        </div>
      </div>
    </main>
  );
}
