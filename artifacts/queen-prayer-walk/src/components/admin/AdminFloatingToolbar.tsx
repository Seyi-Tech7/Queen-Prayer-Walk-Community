import React, { useState } from 'react';
import { useCMS } from '../../cms/cmsContext';
import { Link, useLocation } from 'wouter';
import { Settings, Edit, ChevronDown, ChevronUp, Lock } from 'lucide-react';

export function AdminFloatingToolbar() {
  const { isInlineEditActive, setIsInlineEditActive, isAdminLoggedIn, logout } = useCMS();
  const [collapsed, setCollapsed] = useState(false);
  const [location] = useLocation();

  // CRITICAL: NEVER show to regular public visitors!
  // Only displays when the administrator is actively logged in, and never on the admin page itself.
  if (!isAdminLoggedIn || location.startsWith('/admin')) {
    return null;
  }

  if (collapsed) {
    return (
      <aside aria-label="Admin quick controls" className="fixed bottom-4 right-4 z-50">
        <button
          type="button"
          onClick={() => setCollapsed(false)}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-[#3c2c4c] text-white rounded-full shadow-lg hover:bg-[#513b65] transition border border-purple-300/30 text-xs font-medium cursor-pointer"
          title="Open Admin Bar"
        >
          <Settings size={13} className="text-amber-300" />
          <span>Admin Toolbar</span>
          <ChevronUp size={12} />
        </button>
      </aside>
    );
  }

  return (
    <aside aria-label="Admin control panel dock" className="fixed bottom-4 right-4 z-50 animate-fade-in">
      <div className="bg-[#2e203c]/95 text-white backdrop-blur-md px-3 py-1.5 rounded-full shadow-2xl border border-purple-400/30 flex items-center gap-2 text-xs">
        {/* Brand label */}
        <div className="flex items-center gap-1.5 pr-2 border-r border-purple-700/60">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span className="font-semibold text-[11px] text-amber-200 tracking-wide">
            Admin Logged In
          </span>
        </div>

        {/* Live Edit Mode toggle */}
        <button
          type="button"
          onClick={() => setIsInlineEditActive(!isInlineEditActive)}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium transition cursor-pointer ${
            isInlineEditActive
              ? 'bg-amber-400 text-purple-950 font-bold shadow-xs'
              : 'bg-purple-900/60 hover:bg-purple-800 text-purple-200'
          }`}
          title="Highlight sections on the live page for quick editing"
        >
          <Edit size={11} />
          <span>{isInlineEditActive ? 'Highlight Mode: ON' : 'Highlight Sections'}</span>
        </button>

        {/* Go to Admin Panel */}
        <Link
          href="/admin"
          className="flex items-center gap-1 px-2.5 py-1 bg-purple-700 hover:bg-purple-600 text-white rounded-full text-[11px] font-medium shadow-xs transition cursor-pointer"
        >
          <Settings size={11} />
          <span>Edit Site Content</span>
        </Link>

        {/* Log out */}
        <button
          type="button"
          onClick={logout}
          className="text-purple-300 hover:text-white p-1 text-[11px] cursor-pointer"
          title="Log out of admin"
        >
          <Lock size={12} />
        </button>

        {/* Minimize button */}
        <button
          type="button"
          onClick={() => setCollapsed(true)}
          className="p-1 text-purple-400 hover:text-white rounded-full transition cursor-pointer"
          title="Minimize admin dock"
        >
          <ChevronDown size={13} />
        </button>
      </div>
    </aside>
  );
}
