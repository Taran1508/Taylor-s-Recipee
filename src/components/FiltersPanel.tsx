import { useIsMobile } from "@/hooks/useMobile";
import React from "react";

interface FiltersPanelProps {
  category: string;
  setCategory: (value: string) => void;
  area: string;
  setArea: (value: string) => void;
}

const FiltersPanel: React.FC<FiltersPanelProps> = ({
  category,
  setCategory,
  area,
  setArea,
}) => {
  const isMobile = useIsMobile();
  return (
    <div
      className={`flex mt-2 font-semibold text-sm  ml-4 my-4${isMobile ? "flex-row gap-2" : "flex-col gap-4"}`}
    >
      {/* Category Filter */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className={` border p-1 rounded-full bg-black text-[var(--background)] ${isMobile ? "text-[10px] w-26 h-6" : "w-34 h-10"}`}
      >
        <option value="">All Categories</option>
        <option value="Dessert">Dessert</option>
        <option value="Vegetarian">Vegetarian</option>
        <option value="Seafood">Seafood</option>
      </select>

      {/* Area Filter */}
      <select
        value={area}
        onChange={(e) => setArea(e.target.value)}
        className={` border p-1 rounded-full bg-black text-[var(--background)] ${isMobile ? "text-[10px]  w-20 h-6" : "w-26 h-10"}`}
      >
        <option value="">All Areas</option>
        <option value="American">American</option>
        <option value="Italian">Italian</option>
        <option value="Indian">Indian</option>
      </select>

      {/* Cooking Time Filter (Taylor's use-case), Unfortunately not available in the fee version*/}
    </div>
  );
};

export default FiltersPanel;
