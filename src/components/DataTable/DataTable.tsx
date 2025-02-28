"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setItemsPerPage } from "@/store/tableSlice";
import axios from "axios";
import { AppDispatch, RootState } from "@/store/store";
import Pagination from "./Pagination";
import Search from "./Search";
import Filters, { FilterOption } from "./Filters";

interface Column {
  key: string;
  label: string;
}

interface DataTableProps {
  columns: Column[];
  filters?: FilterOption[];
  fetchUrl: string;
  dataKey: string;
}

const DataTable = ({ columns, fetchUrl, dataKey, filters }: DataTableProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { itemsPerPage, currentPage, searchQuery, activeFilter, filterValue } =
    useSelector((state: RootState) => state.table);

  const [data, setData] = useState<any[]>([]); // eslint-disable-line @typescript-eslint/no-explicit-any
  const [loading, setLoading] = useState<boolean>(true);
  const [totalItems, setTotalItems] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const baseParams = `limit=${itemsPerPage}&skip=${(currentPage - 1) * itemsPerPage}&select=${columns.map((col) => col.key).join("&select=")}`;
        let url = `${fetchUrl}`;
        if (activeFilter && filterValue) {
          url += `/filter?key=${activeFilter}&value=${filterValue}&${baseParams}`;
        } else {
          url += `?${baseParams}`;
        }
        const response = await axios.get(url);
        setData(response.data[dataKey]);
        setTotalItems(response.data.total);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [
    fetchUrl,
    columns,
    dataKey,
    itemsPerPage,
    currentPage,
    activeFilter,
    filterValue,
  ]);

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
        <Search />
        {/* Filters */}
        {filters && filters.length > 0 && (
          <>
            <div>|</div>
            <Filters filters={filters} />
          </>
        )}
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
              ? Array(itemsPerPage)
                  .fill(0)
                  .map((_, idx) => (
                    <tr key={idx} className="animate-pulse">
                      {columns.map((col) => (
                        <td
                          key={col.key}
                          className="border border-gray-100 p-2 bg-grey h-[41px]"
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
