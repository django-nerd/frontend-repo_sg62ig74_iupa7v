import React, { useState } from 'react';
import { Search, User } from 'lucide-react';

const Navbar = ({ onSearchChange, username = 'Alex' }) => {
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    const v = e.target.value;
    setQuery(v);
    onSearchChange?.(v);
  };

  return (
    <header className="w-full sticky top-0 z-30 border-b" style={{ borderColor: '#ff2770', backgroundColor: '#25252b' }}>
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-md flex items-center justify-center font-bold text-white border" style={{ borderColor: '#ff2770', backgroundColor: '#25252b' }}>
            MP
          </div>
          <span className="text-white text-lg font-semibold">Mood<span style={{ color: '#ff2770' }}>Pad</span></span>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-md text-sm border" style={{ borderColor: '#3a3a40', backgroundColor: '#1f1f24' }}>
            <Search className="h-4 w-4 text-gray-300" />
            <input
              value={query}
              onChange={handleChange}
              placeholder="Search notes..."
              className="bg-transparent outline-none text-gray-200 placeholder:text-gray-400 w-56"
            />
          </div>
          <div className="flex items-center gap-2 text-gray-300">
            <User className="h-5 w-5" />
            <span className="hidden sm:inline text-sm">{username}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
