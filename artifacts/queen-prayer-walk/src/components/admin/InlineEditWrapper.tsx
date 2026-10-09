import React, { type ReactNode } from 'react';
import { useCMS } from '../../cms/cmsContext';
import { Edit3 } from 'lucide-react';
import { useLocation } from 'wouter';

interface InlineEditWrapperProps {
  sectionKey: string;
  sectionName: string;
  children: ReactNode;
  adminTabTarget?: string;
}

export function InlineEditWrapper({
  sectionKey,
  sectionName,
  children,
  adminTabTarget = 'home',
}: InlineEditWrapperProps) {
  const { isInlineEditActive, setActiveEditModal } = useCMS();
  const [, setLocation] = useLocation();

  if (!isInlineEditActive) {
    return <>{children}</>;
  }

  const handleEditClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setLocation(`/admin?tab=${adminTabTarget}`);
  };

  return (
    <div className="relative group/inline border-2 border-dashed border-purple-400/80 rounded-2xl m-1 transition-all duration-200">
      {/* Floating Badge */}
      <div className="absolute top-3 right-3 z-30 opacity-90 group-hover/inline:opacity-100 transition">
        <button
          type="button"
          onClick={handleEditClick}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-900/90 hover:bg-purple-950 text-white text-xs font-semibold rounded-full shadow-lg backdrop-blur-md border border-purple-300/40 cursor-pointer transition transform hover:scale-105"
        >
          <Edit3 size={13} className="text-amber-400" />
          <span>Edit {sectionName}</span>
        </button>
      </div>

      {children}
    </div>
  );
}

