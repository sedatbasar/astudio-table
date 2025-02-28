"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setItemsPerPage, setSearchQuery } from "@/store/tableSlice";
import axios from "axios";
import { AppDispatch, RootState } from "@/store/store";
import Pagination from "./Pagination";

interface Column {
  key: string;
  label: string;
}

interface DataTableProps {
  columns: Column[];
  fetchUrl: string;
  dataKey: string;
}

const DataTable = ({ columns, fetchUrl, dataKey }: DataTableProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { itemsPerPage, currentPage, searchQuery } = useSelector(
    (state: RootState) => state.table,
  );

  const [data, setData] = useState<any[]>([]); // eslint-disable-line @typescript-eslint/no-explicit-any
  const [loading, setLoading] = useState<boolean>(true);
  const [totalItems, setTotalItems] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${fetchUrl}?limit=${itemsPerPage}&skip=${(currentPage - 1) * itemsPerPage}&select=${columns.map((col) => col.key).join("&select=")}`,
        );
        setData(response.data[dataKey]);
        setTotalItems(response.data.total);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [fetchUrl, itemsPerPage, currentPage, columns, dataKey]);

  const filteredData = data.filter((item) =>
    Object.values(item)
      .join("")
      .toLowerCase()
      .includes(searchQuery.toLowerCase()),
  );

  return (
    <div>
      {/* Filters & Search */}
      <div className="flex gap-4 items-center mb-4">
        {/* Items Per Page */}
        <div>
          <select
            id="itemsPerPage"
            value={itemsPerPage}
            onChange={(e) => dispatch(setItemsPerPage(Number(e.target.value)))}
          >
            {[5, 10, 20, 50].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
          <label htmlFor="itemsPerPage" className="align-middle ml-1">
            Entries
          </label>
        </div>
        <div>|</div>
        {/* Search Input */}
        <div>
          <input
            type="text"
            placeholder="Search..."
            className="border rounded p-1"
            value={searchQuery}
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          />
        </div>
        <div>|</div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-grey">
          <thead>
            <tr className="bg-blue uppercase font-bold">
              {columns.map((col) => (
                <th key={col.key} className="border border-grey p-2 text-left">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading
              ? Array(5)
                  .fill(0)
                  .map((_, idx) => (
                    <tr key={idx} className="animate-pulse">
                      {columns.map((col) => (
                        <td
                          key={col.key}
                          className="border border-gray-100 p-2 bg-grey h-10"
                        ></td>
                      ))}
                    </tr>
                  ))
              : filteredData.map((row, index) => (
                  <tr key={index} className="hover:bg-grey">
                    {columns.map((col) => (
                      <td key={col.key} className="border p-2 border-grey">
                        {row[col.key]}
                      </td>
                    ))}
                  </tr>
                ))}
          </tbody>
        </table>
      </div>

      <Pagination totalItems={totalItems} />
    </div>
  );
};

export default DataTable;
