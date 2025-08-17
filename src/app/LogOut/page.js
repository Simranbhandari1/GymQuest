// "use client";
// import { useEffect } from "react";
// import { useAuth } from "@/auth/AuthContext";


// export default function LogoutPopup({ onConfirm, onCancel }) {
//   useEffect(() => {
//     const closeOnEscape = (e) => {
//       if (e.key === "Escape") onCancel();
//     };
//     document.addEventListener("keydown", closeOnEscape);
//     return () => document.removeEventListener("keydown", closeOnEscape);
//   }, [onCancel]);

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-xl shadow-lg p-6 text-center w-80">
//         <h2 className="text-lg font-semibold mb-4">Are you sure you want to logout?</h2>
//         <div className="flex justify-center gap-4">
//           <button
//             onClick={onConfirm}
//             className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
//           >
//             Yes, Logout
//           </button>
//           <button
//             onClick={onCancel}
//             className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
//           >
//             Stay Signed In
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
