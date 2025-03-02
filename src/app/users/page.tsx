"use client";
import { DataTable } from "@/components/DataTable";
import { FilterOption } from "@/components/DataTable/Filters";
import { AppDispatch } from "@/store/store";
import { resetTableState } from "@/store/tableSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const columns = [
  { key: "firstName", label: "First Name" },
  { key: "lastName", label: "Last Name" },
  { key: "maidenName", label: "Maiden Name" },
  { key: "age", label: "Age" },
  { key: "gender", label: "Gender" },
  { key: "email", label: "Email" },
  { key: "username", label: "User Name" },
  { key: "bloodGroup", label: "Blood Group" },
  { key: "eyeColor", label: "Eye Color" },
];

const filters = [
  { label: "Name", type: "text", key: "firstName" },
  { label: "Email", type: "text", key: "email" },
  {
    label: "Age",
    type: "select",
    key: "age",
    options: Array.from({ length: 100 }, (_, i) => (i + 1).toString()),
  },
  {
    label: "Gender",
    type: "select",
    key: "gender",
    options: ["male", "female"],
  },
] satisfies FilterOption[];

export default function Users() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    return () => {
      dispatch(resetTableState());
    };
  }, []);
  const generateFilterUrlFn = (activeFilter: string, filterValue: string) => {
    return `/filter?key=${activeFilter}&value=${filterValue}`;
  };

  return (
    <DataTable
      columns={columns}
      filters={filters}
      dataKey="users"
      generateFilterUrlFn={generateFilterUrlFn}
    />
  );
}
