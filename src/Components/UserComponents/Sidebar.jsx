import { useState } from "react";
import { Menu, User, Edit3 } from "lucide-react";

export default function Sidebar({ active, setActive }) {
  const [open, setOpen] = useState(true);

  const menuItems = [
    { id: "profile", label: "Profile", icon: <User size={20} /> },
    { id: "edit", label: "Edit Profile", icon: <Edit3 size={20} /> },
  ];

  return (
    <div
      className={`flex ${open ? "w-64" : "w-16"} bg-[#f59e0b] text-white min-h-screen transition-all duration-300`}
    >
      <div className="flex flex-col w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          {open && <h1 className="text-lg font-bold">Dashboard</h1>}
          <button onClick={() => setOpen(!open)}>
            <Menu size={24} />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex flex-col mt-6 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              className={`flex items-center gap-3 px-4 py-2 text-left hover:bg-[#823b06] transition 
                ${active === item.id ? "bg-[#823b06]" : ""}`}
            >
              {/* Icon always visible */}
              {item.icon}
              {/* Label only visible when sidebar open */}
              {open && <span>{item.label}</span>}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
