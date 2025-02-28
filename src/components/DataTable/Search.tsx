"use client";

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { setSearchQuery } from "@/store/tableSlice";
import Image from "next/image";
import SearchIcon from "@/assets/svgs/search.svg";

const Search = () => {
  const dispatch = useDispatch<AppDispatch>();
  const searchQuery = useSelector(
    (state: RootState) => state.table.searchQuery,
  );
  const [isInputVisible, setIsInputVisible] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const toggleSearchInput = () => {
    setIsInputVisible(true);
    setTimeout(() => inputRef.current?.focus(), 100); // Auto-focus input
  };

  // Close input when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsInputVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative flex items-center">
      {!isInputVisible ? (
        <button onClick={toggleSearchInput} className="cursor-pointer">
          <Image src={SearchIcon} alt="Search" width={20} height={20} />
        </button>
      ) : (
        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search..."
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue h-8"
        />
      )}
    </div>
  );
};

export default Search;
