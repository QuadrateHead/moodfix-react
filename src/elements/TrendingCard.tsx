import { memo } from "react";

interface TrendingCardProps {
  rank: number;
  posterSrc: string;
  title: string;
}

function TrendingCard({ rank, posterSrc, title }: TrendingCardProps) {

  return (
    <li className="cursor-pointer">
      <p className="fancy-text mt-[22px] text-nowrap">{rank}</p>
      <img src={posterSrc} alt={title} />
    </li>
  );
}
export default memo(TrendingCard)