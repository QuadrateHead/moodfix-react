interface TrendingCardProps {
  rank: number;
  posterSrc: string;
  title: string;
}

export default function TrendingCard({ rank, posterSrc, title }: TrendingCardProps) {

  return (
    <li className="cursor-pointer">
      <p className="fancy-text mt-[22px] text-nowrap">{rank}</p>
      <img src={posterSrc} alt={title} />
    </li>
  );
}
