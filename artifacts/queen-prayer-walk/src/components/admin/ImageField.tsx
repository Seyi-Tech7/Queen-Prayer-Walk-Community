import React, { useState, useRef } from 'react';
import { CURATED_LIBRARY, readFileAsDataUrl } from '../../cms/mediaLibrary';
import { Image as ImageIcon, Upload, Library, X, Check, RotateCcw } from 'lucide-react';

interface ImageFieldProps {
  label: string;
  value: string;
  onChange: (newUrl: string) => void;
  description?: string;
  defaultFallback?: string;
  altText?: string;
  onAltChange?: (newAlt: string) => void;
}

export function ImageField({
  label,
  value,
  onChange,
  description,
  defaultFallback,
  altText,
  onAltChange,
}: ImageFieldProps) {
  const [showPicker, setShowPicker] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadError(null);
    try {
      const dataUrl = await readFileAsDataUrl(file, 4);
      onChange(dataUrl);
      setShowPicker(false);
    } catch (err: any) {
      setUploadError(err.message || 'Failed to read image file');
    }
  };

  return (
    <div className="border border-purple-100 rounded-xl p-3 bg-white shadow-2xs space-y-2">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-purple-950">{label}</span>
          {description && <p className="text-[11px] text-purple-600/70">{description}</p>}
        </div>

        {defaultFallback && value !== defaultFallback && (
          <button
            type="button"
            onClick={() => onChange(defaultFallback)}
            className="text-[11px] text-purple-600 hover:text-purple-900 inline-flex items-center gap-1 cursor-pointer"
            title="Restore original image"
          >
            <RotateCcw size={11} /> Reset
          </button>
        )}
      </div>

      <div className="flex items-center gap-3">
        {/* Compact Thumbnail Preview */}
        <div className="relative w-20 h-14 rounded-lg overflow-hidden border border-purple-200 bg-purple-50 shrink-0 shadow-2xs flex items-center justify-center">
          {value ? (
            <img
              src={value}
              alt={altText || label}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://placehold.co/160x100?text=No+Photo';
              }}
            />
          ) : (
            <div className="flex flex-col items-center text-purple-300">
              <ImageIcon size={16} />
              <span className="text-[9px] mt-0.5">Empty</span>
            </div>
          )}
        </div>

        {/* Compact Action Buttons */}
        <div className="flex-1 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setShowPicker(!showPicker)}
            className="px-2.5 py-1.5 bg-purple-700 hover:bg-purple-800 text-white text-xs font-medium rounded-lg shadow-2xs transition inline-flex items-center gap-1.5 cursor-pointer"
          >
            <Library size={12} />
            {showPicker ? 'Close Gallery' : 'Choose Photo'}
          </button>

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="px-2.5 py-1.5 bg-white border border-purple-200 hover:bg-purple-50 text-purple-900 text-xs font-medium rounded-lg shadow-2xs transition inline-flex items-center gap-1.5 cursor-pointer"
          >
            <Upload size={12} />
            Upload Photo
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileUpload}
          />

          <button
            type="button"
            onClick={() => setShowUrlInput(!showUrlInput)}
            className="text-[11px] text-purple-600 hover:text-purple-900 underline transition cursor-pointer px-1"
          >
            {showUrlInput ? 'Hide URL' : 'Paste Link'}
          </button>

          {value && (
            <button
              type="button"
              onClick={() => onChange('')}
              className="text-red-500 hover:text-red-700 p-1 text-xs cursor-pointer ml-auto"
              title="Remove image"
            >
              <X size={13} />
            </button>
          )}
        </div>
      </div>

      {/* Paste URL Input (Collapsed by default for simplicity) */}
      {showUrlInput && (
        <div className="pt-1">
          <input
            type="url"
            placeholder="Paste image web address (https://...)"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-2.5 py-1.5 text-xs bg-purple-50/40 border border-purple-200 rounded-lg text-purple-950 placeholder-purple-300 focus:outline-none focus:ring-1 focus:ring-purple-400 font-mono"
          />
        </div>
      )}

      {/* Alt Text if enabled */}
      {onAltChange && (
        <div className="flex items-center gap-2 pt-1 border-t border-purple-50">
          <span className="text-[10px] text-purple-600 font-medium shrink-0">Alt Text:</span>
          <input
            type="text"
            placeholder="Brief description of photo for accessibility"
            value={altText || ''}
            onChange={(e) => onAltChange(e.target.value)}
            className="w-full px-2 py-0.5 text-xs bg-white border border-purple-100 rounded text-purple-950"
          />
        </div>
      )}

      {uploadError && <p className="text-xs text-red-600">{uploadError}</p>}

      {/* Clean Curated Photo Picker Modal / Drawer */}
      {showPicker && (
        <div className="mt-2 p-3 bg-purple-50/60 border border-purple-200 rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-purple-950">
              Select Curated High-Resolution Photo
            </span>
            <button
              type="button"
              onClick={() => setShowPicker(false)}
              className="text-purple-400 hover:text-purple-700 p-0.5 cursor-pointer"
            >
              <X size={13} />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-52 overflow-y-auto pr-1">
            {CURATED_LIBRARY.map((item) => {
              const isSelected = value === item.url;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    onChange(item.url);
                    setShowPicker(false);
                  }}
                  className={`group relative rounded-lg overflow-hidden border cursor-pointer transition ${
                    isSelected
                      ? 'border-purple-600 ring-2 ring-purple-500'
                      : 'border-purple-200 hover:border-purple-400'
                  }`}
                >
                  <img
                    src={item.url}
                    alt={item.name}
                    className="w-full h-16 object-cover group-hover:scale-105 transition-transform duration-150"
                  />
                  <div className="p-1 bg-white text-[10px] font-medium text-purple-950 truncate">
                    {item.name}
                  </div>
                  {isSelected && (
                    <div className="absolute top-1 right-1 bg-purple-600 text-white rounded-full p-0.5 shadow">
                      <Check size={10} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
