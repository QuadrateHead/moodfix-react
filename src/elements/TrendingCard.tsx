interface TrendingCardProps {
  rank: number;
  posterSrc: string;
  title: string;
}

export default function TrendingCard({ rank, posterSrc, title }: TrendingCardProps) {
  const handleClick = () => {
    window.history.pushState({}, '', '/movie');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <li className="cursor-pointer" onClick={handleClick}>
      <p className="fancy-text mt-[22px] text-nowrap">{rank}</p>
      <img src={posterSrc} alt={title} />
    </li>
  );
}
