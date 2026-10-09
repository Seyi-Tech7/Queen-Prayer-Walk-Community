import React from 'react';
import { useCMS } from '../../../cms/cmsContext';
import { SectionCard } from '../../../components/admin/FormField';
import { Sparkles, RotateCcw } from 'lucide-react';
import { defaultSiteContent } from '../../../cms/defaultContent';

const PRESETS = [
  {
    name: 'Original Royal Plum',
    theme: {
      primaryColor: '#6e5388',
      plumDeep: '#3c2c4c',
      roseColor: '#7b579b',
      goldAccent: '#f19145',
      paperBg: '#f7f2fc',
      paperDeep: '#eee5f7',
      inkColor: '#34283f',
    },
  },
  {
    name: 'Lilac Blossom & Lavender',
    theme: {
      primaryColor: '#7e6498',
      plumDeep: '#2f233f',
      roseColor: '#9674b8',
      goldAccent: '#e5853b',
      paperBg: '#f9f6fd',
      paperDeep: '#f2eaf9',
      inkColor: '#2b2135',
    },
  },
  {
    name: 'Soft Rose & Warm Sand',
    theme: {
      primaryColor: '#8a586e',
      plumDeep: '#3d2230',
      roseColor: '#a86c87',
      goldAccent: '#d97d4c',
      paperBg: '#fbf5f5',
      paperDeep: '#f5e8e8',
      inkColor: '#38222c',
    },
  },
  {
    name: 'Sage & Olive Serenity',
    theme: {
      primaryColor: '#5c6e5e',
      plumDeep: '#29352a',
      roseColor: '#758877',
      goldAccent: '#d48842',
      paperBg: '#f4f7f4',
      paperDeep: '#e7ede7',
      inkColor: '#253026',
    },
  },
];

export function ThemeEditor() {
  const { content, updateSection } = useCMS();
  const { theme } = content;

  const updateColor = (key: keyof typeof theme, value: string) => {
    updateSection('theme', { [key]: value });
  };

  const applyPreset = (presetTheme: any) => {
    updateSection('theme', presetTheme);
  };

  const resetTheme = () => {
    updateSection('theme', defaultSiteContent.theme);
  };

  return (
    <div className="space-y-6">
      {/* Quick Color Presets */}
      <SectionCard
        title="1. Curated Palette Presets"
        subtitle="1-click harmonious color palettes matching the feminine, spiritual aesthetic"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {PRESETS.map((p) => (
            <button
              key={p.name}
              type="button"
              onClick={() => applyPreset(p.theme)}
              className="p-3 rounded-xl border border-purple-200 hover:border-purple-500 bg-white shadow-sm flex items-center justify-between text-left group transition cursor-pointer"
            >
              <div>
                <h4 className="text-xs font-bold text-purple-950 group-hover:text-purple-700">
                  {p.name}
                </h4>
                <div className="flex gap-1.5 mt-2">
                  <span
                    className="w-4 h-4 rounded-full border border-black/10 shadow-xs"
                    style={{ backgroundColor: p.theme.primaryColor }}
                  />
                  <span
                    className="w-4 h-4 rounded-full border border-black/10 shadow-xs"
                    style={{ backgroundColor: p.theme.plumDeep }}
                  />
                  <span
                    className="w-4 h-4 rounded-full border border-black/10 shadow-xs"
                    style={{ backgroundColor: p.theme.roseColor }}
                  />
                  <span
                    className="w-4 h-4 rounded-full border border-black/10 shadow-xs"
                    style={{ backgroundColor: p.theme.goldAccent }}
                  />
                  <span
                    className="w-4 h-4 rounded-full border border-black/10 shadow-xs"
                    style={{ backgroundColor: p.theme.paperBg }}
                  />
                </div>
              </div>
              <Sparkles size={16} className="text-purple-300 group-hover:text-purple-600 transition" />
            </button>
          ))}
        </div>
      </SectionCard>

      {/* Custom Color Controls */}
      <SectionCard
        title="2. Custom Color Palette"
        subtitle="Fine-tune brand colors, background paper tints, and text colors"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {/* Primary Color */}
          <div className="p-3 bg-purple-50/50 rounded-xl border border-purple-100 space-y-1.5">
            <span className="text-xs font-semibold text-purple-900">Primary Plum Color</span>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={theme.primaryColor}
                onChange={(e) => updateColor('primaryColor', e.target.value)}
                className="w-8 h-8 rounded-lg cursor-pointer border border-purple-200"
              />
              <input
                type="text"
                value={theme.primaryColor}
                onChange={(e) => updateColor('primaryColor', e.target.value)}
                className="w-full text-xs font-mono px-2 py-1 bg-white border border-purple-200 rounded-lg text-purple-950 uppercase"
              />
            </div>
            <p className="text-[10px] text-purple-600">Used for brand headers, icons, and primary elements</p>
          </div>

          {/* Plum Deep */}
          <div className="p-3 bg-purple-50/50 rounded-xl border border-purple-100 space-y-1.5">
            <span className="text-xs font-semibold text-purple-900">Deep Plum (Headlines)</span>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={theme.plumDeep}
                onChange={(e) => updateColor('plumDeep', e.target.value)}
                className="w-8 h-8 rounded-lg cursor-pointer border border-purple-200"
              />
              <input
                type="text"
                value={theme.plumDeep}
                onChange={(e) => updateColor('plumDeep', e.target.value)}
                className="w-full text-xs font-mono px-2 py-1 bg-white border border-purple-200 rounded-lg text-purple-950 uppercase"
              />
            </div>
            <p className="text-[10px] text-purple-600">Used for page titles, headings, and deep contrast</p>
          </div>

          {/* Rose Accent */}
          <div className="p-3 bg-purple-50/50 rounded-xl border border-purple-100 space-y-1.5">
            <span className="text-xs font-semibold text-purple-900">Rose Accent</span>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={theme.roseColor}
                onChange={(e) => updateColor('roseColor', e.target.value)}
                className="w-8 h-8 rounded-lg cursor-pointer border border-purple-200"
              />
              <input
                type="text"
                value={theme.roseColor}
                onChange={(e) => updateColor('roseColor', e.target.value)}
                className="w-full text-xs font-mono px-2 py-1 bg-white border border-purple-200 rounded-lg text-purple-950 uppercase"
              />
            </div>
            <p className="text-[10px] text-purple-600">Used for section markers and soft tags</p>
          </div>

          {/* Gold Accent */}
          <div className="p-3 bg-purple-50/50 rounded-xl border border-purple-100 space-y-1.5">
            <span className="text-xs font-semibold text-purple-900">Gold / Warm Amber Accent</span>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={theme.goldAccent}
                onChange={(e) => updateColor('goldAccent', e.target.value)}
                className="w-8 h-8 rounded-lg cursor-pointer border border-purple-200"
              />
              <input
                type="text"
                value={theme.goldAccent}
                onChange={(e) => updateColor('goldAccent', e.target.value)}
                className="w-full text-xs font-mono px-2 py-1 bg-white border border-purple-200 rounded-lg text-purple-950 uppercase"
              />
            </div>
            <p className="text-[10px] text-purple-600">Used for highlights, buttons, and callout dots</p>
          </div>

          {/* Paper Background */}
          <div className="p-3 bg-purple-50/50 rounded-xl border border-purple-100 space-y-1.5">
            <span className="text-xs font-semibold text-purple-900">Paper Canvas Background</span>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={theme.paperBg}
                onChange={(e) => updateColor('paperBg', e.target.value)}
                className="w-8 h-8 rounded-lg cursor-pointer border border-purple-200"
              />
              <input
                type="text"
                value={theme.paperBg}
                onChange={(e) => updateColor('paperBg', e.target.value)}
                className="w-full text-xs font-mono px-2 py-1 bg-white border border-purple-200 rounded-lg text-purple-950 uppercase"
              />
            </div>
            <p className="text-[10px] text-purple-600">The overall site body backdrop</p>
          </div>

          {/* Ink Text */}
          <div className="p-3 bg-purple-50/50 rounded-xl border border-purple-100 space-y-1.5">
            <span className="text-xs font-semibold text-purple-900">Dark Ink Text</span>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={theme.inkColor}
                onChange={(e) => updateColor('inkColor', e.target.value)}
                className="w-8 h-8 rounded-lg cursor-pointer border border-purple-200"
              />
              <input
                type="text"
                value={theme.inkColor}
                onChange={(e) => updateColor('inkColor', e.target.value)}
                className="w-full text-xs font-mono px-2 py-1 bg-white border border-purple-200 rounded-lg text-purple-950 uppercase"
              />
            </div>
            <p className="text-[10px] text-purple-600">Body text and paragraph color</p>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="button"
            onClick={resetTheme}
            className="text-xs text-purple-600 hover:text-purple-800 inline-flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw size={12} /> Reset to original theme colors
          </button>
        </div>
      </SectionCard>
    </div>
  );
}

