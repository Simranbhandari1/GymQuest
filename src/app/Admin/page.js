// "use client";

// import { useEffect, useState } from "react";
// import {
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   AreaChart,
//   Area,
//   BarChart,
//   Bar,
// } from "recharts";
// import DonutChart from "../components/organisms/DonutChart";

// export default function AdminDashboard() {
//   const [stats, setStats] = useState(null);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     fetch("/api/Admin/stats")
//       .then((res) => {
//         if (!res.ok) throw new Error("Failed to fetch stats");
//         return res.json();
//       })
//       .then((data) => setStats(data))
//       .catch((err) => {
//         console.error("Failed to load stats", err);
//         setError("Unable to fetch dashboard stats.");
//       });
//   }, []);

//   if (error) return <div className="p-8 text-red-500">{error}</div>;
//   if (!stats) return <div className="p-8">Loading...</div>;

//   const donutData = [
//     { name: "Users", value: stats.users },
//     { name: "Workouts", value: stats.workouts },
//     { name: "Nutrition", value: stats.nutrition },
//     { name: "Diet Plans", value: stats.dietPlans },
//     { name: "BMI Checks", value: stats.bmiChecks },
//     { name: "Contacts", value: stats.contacts },
//   ];

//   return (
//     <div className="flex min-h-screen font-sans">
//       {/* Sidebar */}
//       <aside className="w-64 bg-[#ecf3fe] p-6 space-y-4 shadow-md">
//         <h2 className="text-2xl font-bold text-blue-600 mb-6">🏋️ Admin Panel</h2>
//         <NavItem label="Home" />
//         <NavItem label="Workouts" />
//         <NavItem label="Diet Plans" />
//         <NavItem label="BMI Records" />
//         <NavItem label="Contacts" />
//         <NavItem label="Users" />
//         <NavItem label="Settings" />
//         <div className="absolute bottom-6">
//           <button className="text-sm text-red-600 hover:underline">Log out</button>
//         </div>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 p-8 bg-gray-100 overflow-y-auto">
//         <h1 className="text-3xl font-semibold mb-6">Welcome back, Admin!</h1>

//         {/* Stat Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
//           <StatCard title="👤 Users" value={stats.users} color="blue" />
//           <StatCard title="🏋️‍♂️ Workouts" value={stats.workouts} color="green" />
//           <StatCard title="🥗 Nutrition" value={stats.nutrition} color="teal" />
//           <StatCard title="🍽️ Diet Plans" value={stats.dietPlans} color="yellow" />
//           <StatCard title="⚖️ BMI Checks" value={stats.bmiChecks} color="purple" />
//           <StatCard title="📬 Contacts" value={stats.contacts} color="red" />
//         </div>

//         {/* Bar Charts */}
//         {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
//           {["users", "workouts", "nutrition", "dietPlans", "bmiChecks", "contacts"].map((key) => (
//             <div key={key} className="bg-white p-4 rounded-lg shadow">
//               <h3 className="text-md font-semibold mb-2 text-gray-700">
//                 {key.replace(/([A-Z])/g, " $1")} Bar Chart
//               </h3>
//               <ResponsiveContainer width="100%" height={200}>
//                 <BarChart data={[{ name: key, value: stats[key] }]}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="name" />
//                   <YAxis />
//                   <Tooltip />
//                   <Bar dataKey="value" fill={getColor(key)} />
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>
//           ))}
//         </div> */}

//         {/* Donut Chart */}
//         <div className="bg-white p-6 rounded-lg shadow mb-10">
//           <h2 className="text-xl font-semibold mb-4">📊 Stats Distribution</h2>
//           <DonutChart data={donutData} />
//         </div>

//         {/* Area Chart for Visits */}
//         <div className="bg-white p-6 rounded-lg shadow">
//           <h2 className="text-xl font-semibold mb-4">📈 Website Visits This Week</h2>
//           <ResponsiveContainer width="100%" height={300}>
//             <AreaChart data={stats.visits}>
//               <defs>
//                 <linearGradient id="visitsColor" x1="0" y1="0" x2="0" y2="1">
//                   <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
//                   <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
//                 </linearGradient>
//               </defs>
//               <XAxis dataKey="day" />
//               <YAxis />
//               <CartesianGrid strokeDasharray="3 3" />
//               <Tooltip />
//               <Area
//                 type="monotone"
//                 dataKey="visits"
//                 stroke="#8884d8"
//                 fillOpacity={1}
//                 fill="url(#visitsColor)"
//               />
//             </AreaChart>
//           </ResponsiveContainer>
//         </div>
//       </main>
//     </div>
//   );
// }

// function StatCard({ title, value, color }) {
//   const bgColors = {
//     blue: "bg-blue-100 text-blue-800",
//     green: "bg-green-100 text-green-800",
//     yellow: "bg-yellow-100 text-yellow-800",
//     red: "bg-red-100 text-red-800",
//     purple: "bg-purple-100 text-purple-800",
//     teal: "bg-teal-100 text-teal-800",
//   };

//   return (
//     <div className={`p-5 rounded-xl shadow-md ${bgColors[color]}`}>
//       <h3 className="text-md font-medium">{title}</h3>
//       <p className="text-3xl font-bold mt-2">{value}</p>
//     </div>
//   );
// }

// function NavItem({ label }) {
//   return (
//     <button className="w-full text-left px-4 py-2 rounded-md hover:bg-white text-gray-800 transition">
//       {label}
//     </button>
//   );
// }

// function getColor(key) {
//   const map = {
//     users: "#3b82f6",
//     workouts: "#22c55e",
//     nutrition: "#14b8a6",
//     dietPlans: "#eab308",
//     bmiChecks: "#8b5cf6",
//     contacts: "#ef4444",
//     visits: "#f97316", // Optional for login visits
//   };
//  return map[key] || "#9ca3af";
// }

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import DonutChart from "../components/organisms/DonutChart";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/Admin/stats")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch stats");
        return res.json();
      })
      .then((data) => setStats(data))
      .catch((err) => {
        console.error("Failed to load stats", err);
        setError("Unable to fetch dashboard stats.");
      });
  }, []);

  if (error) return <div className="p-8 text-red-500">{error}</div>;
  if (!stats) return <div className="p-8">Loading...</div>;

  const donutData = [
    { name: "Users", value: stats.users },
    { name: "Workouts", value: stats.workouts },
    { name: "Nutrition", value: stats.nutrition },
    { name: "Diet Plans", value: stats.dietPlans },
    { name: "BMI Checks", value: stats.bmiChecks },
    { name: "Contacts", value: stats.contacts },
  ];

  return (
    <div className="flex min-h-screen mt-20 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-[#e0f2f1] p-6 space-y-4 shadow-md">
        <h2 className="text-2xl font-bold text-[#2e8b57] mb-6"> Admin Panel</h2>
        <NavItem label="Home" href="/admin" />
        <NavItem label="Users" href="/admin/users" />
        <div className="absolute bottom-6">
          <button className="text-sm text-red-600 hover:underline">Log out</button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 bg-gray-50 overflow-y-auto">
        <h1 className="text-3xl font-semibold mb-6 text-[#2e8b57]">Welcome back, Admin!</h1>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          <StatCard title="👤 Users" value={stats.users} />
          <StatCard title="🏋️‍♂️ Workouts" value={stats.workouts} />
          <StatCard title="🥗 Nutrition" value={stats.nutrition} />
          <StatCard title="🍽️ Diet Plans" value={stats.dietPlans} />
          <StatCard title="⚖️ BMI Checks" value={stats.bmiChecks} />
          <StatCard title="📬 Contacts" value={stats.contacts} />
        </div>

        {/* Donut Chart */}
        <div className="bg-white p-6 rounded-lg shadow mb-10">
          <h2 className="text-xl font-semibold mb-4 text-[#2e8b57]">📊 Stats Distribution</h2>
          <DonutChart data={donutData} />
        </div>

        {/* Area Chart */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 text-[#2e8b57]">📈 Website Visits This Week</h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={stats.visits}>
              <defs>
                <linearGradient id="visitsColor" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2e8b57" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#2e8b57" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="visits"
                stroke="#2e8b57"
                fillOpacity={1}
                fill="url(#visitsColor)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </main>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="p-5 rounded-xl shadow-md bg-[#b2dfdb] text-[#004d40]">
      <h3 className="text-md font-medium">{title}</h3>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
}

function NavItem({ label, href }) {
  return (
    <Link href={href}>
      <button className="w-full text-left px-4 py-2 rounded-md hover:bg-white text-[#004d40] transition">
        {label}
      </button>
    </Link>
  );
}
