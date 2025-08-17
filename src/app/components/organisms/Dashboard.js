import UserTable from "./UserTable";

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold p-4">Admin Dashboard</h1>
      <UserTable />
    </div>
  );
}
