"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { setActiveFilter, setFilterValue } from "@/store/tableSlice";
import debounce from "lodash.debounce";
import { useCallback, useState } from "react";

interface BaseFilterOptions {
  key: string;
  label: string;
}

interface TextFilterOption extends BaseFilterOptions {
  type: "text";
}
interface SelectFilterOption extends BaseFilterOptions {
  type: "select";
  options: string[];
}

export type FilterOption = TextFilterOption | SelectFilterOption;

interface FiltersProps {
  filters: FilterOption[];
}

const Filters = ({ filters }: FiltersProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { activeFilter } = useSelector((state: RootState) => state.table);
  const [inputValue, setInputValue] = useState("");

  // Debounced function to update Redux state (filter value)
  const debouncedFilterUpdate = useCallback(
    debounce((value: string) => {
      dispatch(setFilterValue(value));
    }, 250),
    [dispatch],
  );

  // Handle filter selection
  const handleFilterChange = (filterKey: string) => {
    dispatch(setActiveFilter(filterKey === activeFilter ? null : filterKey));
    setInputValue("");
  };

  // Handle input change with debounce
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setInputValue(e.target.value);
    debouncedFilterUpdate(e.target.value);
  };

  return (
    <div className="flex items-center space-x-4">
      {/* Filter Buttons */}
      {filters.map((filter) => (
        <button
          key={filter.key}
          className={`px-3 py-1 border rounded ${
            activeFilter === filter.key ? "bg-blue text-white" : "bg-white"
          }`}
          onClick={() => handleFilterChange(filter.key)}
        >
          {filter.label}
        </button>
      ))}

      {/* Filter Input Field */}
      {activeFilter && (
        <div>
          {filters.map((filter) => {
            if (filter.key !== activeFilter) return null;
            return filter.type === "select" ? (
              <select
                key={filter.key}
                value={inputValue}
                onChange={handleInputChange}
                className="border rounded px-2 py-1"
              >
                <option value="">Select {filter.label}</option>
                {filter.options?.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input
                key={filter.key}
                type={filter.type}
                value={inputValue}
                onChange={handleInputChange}
                placeholder={`Filter by ${filter.label}`}
                className="border rounded px-2 py-1"
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Filters;
