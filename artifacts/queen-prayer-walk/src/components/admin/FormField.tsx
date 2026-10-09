import React from 'react';

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  description?: string;
}

export function TextInput({ label, description, className = '', ...props }: TextInputProps) {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold text-purple-950">
          {label}
        </label>
        {description && <span className="text-[10px] text-purple-600/70">{description}</span>}
      </div>
      <input
        className={`w-full px-3 py-1.5 text-xs sm:text-sm bg-white border border-purple-200/80 rounded-lg text-purple-950 placeholder-purple-300 focus:outline-none focus:ring-1.5 focus:ring-purple-500 focus:border-transparent transition shadow-2xs ${className}`}
        {...props}
      />
    </div>
  );
}

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  description?: string;
}

export function TextAreaField({ label, description, className = '', rows = 2, ...props }: TextAreaProps) {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold text-purple-950">
          {label}
        </label>
        {description && <span className="text-[10px] text-purple-600/70">{description}</span>}
      </div>
      <textarea
        rows={rows}
        className={`w-full px-3 py-1.5 text-xs sm:text-sm bg-white border border-purple-200/80 rounded-lg text-purple-950 placeholder-purple-300 focus:outline-none focus:ring-1.5 focus:ring-purple-500 focus:border-transparent transition shadow-2xs leading-relaxed ${className}`}
        {...props}
      />
    </div>
  );
}

interface ToggleProps {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function ToggleField({ label, description, checked, onChange }: ToggleProps) {
  return (
    <div className="flex items-center justify-between p-2.5 rounded-xl border border-purple-100 bg-white shadow-2xs">
      <div className="space-y-0.5">
        <span className="text-xs font-bold text-purple-950">{label}</span>
        {description && <p className="text-[11px] text-purple-600/70">{description}</p>}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
          checked ? 'bg-purple-700' : 'bg-purple-200'
        }`}
      >
        <span
          className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
            checked ? 'translate-x-4' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );
}

export function SectionCard({
  title,
  subtitle,
  children,
  badge,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  badge?: string;
}) {
  return (
    <div className="bg-white rounded-xl border border-purple-100/90 p-4 shadow-2xs space-y-3.5">
      <div className="flex items-center justify-between border-b border-purple-50 pb-2.5">
        <div>
          <h3 className="text-sm font-bold text-purple-950 font-serif flex items-center gap-2">
            {title}
            {badge && (
              <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-purple-100 text-purple-800">
                {badge}
              </span>
            )}
          </h3>
          {subtitle && <p className="text-[11px] text-purple-600/75 mt-0.5">{subtitle}</p>}
        </div>
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}
