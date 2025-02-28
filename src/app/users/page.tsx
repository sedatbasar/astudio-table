import { DataTable } from "@/components/DataTable";

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

export default function Users() {
  return (
    <DataTable
      columns={columns}
      fetchUrl="https://dummyjson.com/users"
      dataKey="users"
    />
  );
}
