import modalMoviePoster from "../assets/images/modal-movie-poster.png";
import modalMovieBanner from "../assets/images/modal-movie-banner.png";
import arrowRightIcon from "../assets/arrow-right-icon.svg";

export default function MoviePage() {
  const handleBack = () => {
    window.history.pushState({}, "", "/");
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  return (
    <main className="movie-detail-page">
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
      <div
        className="backdrop"
        style={{ backgroundImage: `url(${modalMovieBanner})` }}
      />

      <div className="wrapper">
        <div className="movie-info">
          {/* Header Row */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
            <div>
              <h1>Squid Game 2</h1>
              <div className="meta-info">
                <span className="pill">2024</span>
                <span className="pill">PG-13</span>
                <span className="pill">2h 46m</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="pill rating">
                <svg
                  className="h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                8.9 / 10 (200K)
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
                src={modalMoviePoster}
                alt="Squid Game 2 Poster"
                className="w-full h-[441px] object-cover rounded-xl shadow-2xl"
              />
            </div>
            <div className="lg:col-span-2 relative">
              <img
                src={modalMovieBanner}
                alt="Squid Game 2 Banner"
                className="w-full h-[441px] object-cover rounded-xl shadow-2xl"
              />
              <div className="absolute bottom-6 left-6 flex items-center gap-3 bg-white/30 backdrop-blur-md px-5 py-2.5 rounded-full text-white font-semibold">
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
                <span>Trailer</span>
                <span className="w-1.5 h-1.5 rounded-full bg-light-200"></span>
                <span className="text-sm font-normal text-light-100">
                  00:31
                </span>
              </div>
            </div>
          </div>

          {/* Genres + CTA Row */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-10 border-b border-light-100/10 mb-10">
            <div className="flex items-center gap-4 flex-wrap">
              <span className="text-light-200 font-medium">Genres</span>
              <div className="flex gap-2 flex-wrap">
                <span className="tag">Adventure</span>
                <span className="tag">Action</span>
                <span className="tag">Drama</span>
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
          <div className="space-y-6 text-light-200">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
              <span className="text-light-200 font-medium md:col-span-1">
                Overview
              </span>
              <p className="text-white md:col-span-3 leading-relaxed">
                Hundreds of cash-strapped players accept a strange invitation to
                compete in children's games. Inside, a tempting prize awaits
                with deadly high stakes: a survival game that has a whopping
                45.6 billion-won prize at stake.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
              <span className="text-light-200 font-medium md:col-span-1">
                Release date
              </span>
              <span className="text-[#D6C7FF] md:col-span-3 font-semibold">
                December 26, 2024 (Worldwide)
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
              <span className="text-light-200 font-medium md:col-span-1">
                Countries
              </span>
              <div className="text-[#D6C7FF] md:col-span-3 font-semibold flex items-center gap-2 flex-wrap">
                <span>United States</span>
                <span className="w-1.5 h-1.5 rounded-full bg-light-200"></span>
                <span>Canada</span>
                <span className="w-1.5 h-1.5 rounded-full bg-light-200"></span>
                <span>UAE</span>
                <span className="w-1.5 h-1.5 rounded-full bg-light-200"></span>
                <span>Hungary</span>
                <span className="w-1.5 h-1.5 rounded-full bg-light-200"></span>
                <span>Italy</span>
                <span className="w-1.5 h-1.5 rounded-full bg-light-200"></span>
                <span>New Zealand</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
              <span className="text-light-200 font-medium md:col-span-1">
                Status
              </span>
              <span className="text-[#D6C7FF] md:col-span-3 font-semibold">
                Released
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
              <span className="text-light-200 font-medium md:col-span-1">
                Language
              </span>
              <div className="text-[#D6C7FF] md:col-span-3 font-semibold flex items-center gap-2 flex-wrap">
                <span>English</span>
                <span className="w-1.5 h-1.5 rounded-full bg-light-200"></span>
                <span>Korean</span>
                <span className="w-1.5 h-1.5 rounded-full bg-light-200"></span>
                <span>Hindi</span>
                <span className="w-1.5 h-1.5 rounded-full bg-light-200"></span>
                <span>Arabic</span>
                <span className="w-1.5 h-1.5 rounded-full bg-light-200"></span>
                <span>German</span>
                <span className="w-1.5 h-1.5 rounded-full bg-light-200"></span>
                <span>Spanish</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
              <span className="text-light-200 font-medium md:col-span-1">
                Budget
              </span>
              <span className="text-[#D6C7FF] md:col-span-3 font-semibold">
                $21.4 million
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
              <span className="text-light-200 font-medium md:col-span-1">
                Revenue
              </span>
              <span className="text-[#D6C7FF] md:col-span-3 font-semibold">
                $900 Million
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
              <span className="text-light-200 font-medium md:col-span-1">
                Tagline
              </span>
              <span className="text-[#D6C7FF] md:col-span-3 font-semibold">
                45.6 Billion Won is Child's Play
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
              <span className="text-light-200 font-medium md:col-span-1">
                Production Companies
              </span>
              <div className="text-[#D6C7FF] md:col-span-3 font-semibold flex items-center gap-2 flex-wrap">
                <span>Legendary Entertainment</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#D6C7FF]"></span>
                <span>Warner Bros. Entertainment</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#D6C7FF]"></span>
                <span>Villeneuve Films</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
