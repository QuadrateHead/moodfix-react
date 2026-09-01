import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useCallback } from "react";
import {useFilterStore, type MovieListType} from "@/store/store"

const items: { label: string; value: MovieListType }[] = [
  { label: "Popular", value: "popular" },
  { label: "Top Rated", value: "top_rated" },
  { label: "Now Playing", value: "now_playing" },
  { label: "Upcoming" , value: "upcoming"}
];
const MovieListSelect = () => {
  const {listMode, setListMode, setCurrentPage} = useFilterStore()
  const handleListModeChange = useCallback((nextMode: MovieListType) => {
    setListMode(nextMode);
    setCurrentPage(1);
  }, []);
  return (
    <Select
      items={items}
      value={listMode}
      onValueChange={(newValue) => {
        if (newValue) {
          handleListModeChange(newValue);
        }
      }}
    >
      <SelectTrigger className="w-45">
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
