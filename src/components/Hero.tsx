import heroImage1 from '../assets/images/home-hero-image-1.png';
import heroImage2 from '../assets/images/home-hero-image-2.png';
import heroInfoImage from '../assets/images/home-hero-info-image.png';
import searchIcon from '../assets/search-icon.svg';

export default function Hero() {
  return (
    <section className="hero">
      {/* Fanned poster stack */}
      <div className="hero-posters">
        <img
          src={heroImage1}
          alt="Black Adam movie poster"
          className="hero-poster hero-poster--left"
        />
        <img
          src={heroInfoImage}
          alt="Dungeons & Dragons movie poster"
          className="hero-poster hero-poster--center"
        />
        <img
          src={heroImage2}
          alt="Enola Holmes 2 movie poster"
          className="hero-poster hero-poster--right"
        />
      </div>

      {/* Headline */}
      <h1>
        Find <span className="text-gradient">Movies</span> You'll Love
        <br />
        Without the Hassle
      </h1>

      {/* Subheadline */}
      <p className="hero-sub">
        Discover trending films, explore popular picks, and get personalised
        recommendations — all in one place.
      </p>

      {/* Search bar */}
      <div className="search">
        <div>
          <img src={searchIcon} alt="search" />
          <input
            id="hero-search"
            type="text"
            placeholder="Search through 300+ movies online"
          />
        </div>
      </div>
    </section>
  );
}
