import React from "react";
import { Select } from "native-base";

interface FilterSelectProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  categories: string[];
}

const FilterSelect: React.FC<FilterSelectProps> = ({
  selectedCategory,
  onCategoryChange,
  categories,
}) => (
  <Select
    selectedValue={selectedCategory}
    onValueChange={onCategoryChange}
    placeholder="Filter by category"
  >
    <Select.Item label="All" value="All" />
    {categories.map((cat) => (
      <Select.Item key={cat} label={cat} value={cat} />
    ))}
  </Select>
);

export default FilterSelect;
