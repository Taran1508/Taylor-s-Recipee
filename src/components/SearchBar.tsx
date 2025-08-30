import { useIsMobile } from "@/hooks/useMobile";
import { useState, useEffect } from "react";

interface SearchBarProps {
  onSearch: (value: string) => void;
  delay?: number; // default 400ms
}

export const SearchBar = ({ onSearch, delay = 400 }: SearchBarProps) => {
  const isMobile = useIsMobile();
  const [value, setValue] = useState("");

  //reset on every keypress, change in delay, Onsearch
  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(value.trim());
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay, onSearch]);

  return (
    <input
      type="text"
      id="searchb"
      placeholder="Search by ingredient or use filters..."
      value={value}
      onChange={(e) => setValue(e.target.value)}
      aria-label="Search recipes by ingredient"
      className={`border p-2 flex-1 px-6 py-4 rounded-full bg-white text-gray-800 placeholder:text-gray-500 outline-none text-lg shadow-elegant ${isMobile ? "w-3/4 h-10 text-xs" : "w-1/2"}`}
    />
  );
};
