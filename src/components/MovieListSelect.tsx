import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { MovieListType } from "@/pages/HomePage";
import React from "react";

interface MovieListSelectProps {
  value: MovieListType;
  onValueChange: (value: MovieListType) => void;
}
const items: { label: string; value: MovieListType }[] = [
  { label: "Popular", value: "popular" },
  { label: "Top Rated", value: "top_rated" },
  { label: "Now Playing", value: "now_playing" },
  { label: "Upcoming" , value: "upcoming"}
];
const MovieListSelect = ({ value, onValueChange }: MovieListSelectProps) => {
  return (
    <Select
      items={items}
      value={value}
      onValueChange={(newValue) => {
        if (newValue) {
          onValueChange(newValue as MovieListType);
        }
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue className="text-foreground" placeholder="Popular" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {items.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default React.memo(MovieListSelect);
