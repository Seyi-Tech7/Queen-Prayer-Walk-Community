import React from 'react';
import { useCMS } from '../../../cms/cmsContext';
import { TextInput, TextAreaField, SectionCard } from '../../../components/admin/FormField';

const PAGE_KEYS = [
  { path: '/', label: 'Home Page' },
  { path: '/about', label: 'About Us Page' },
  { path: '/practice', label: 'The Practice Page' },
  { path: '/sisterhood', label: 'Sisterhood Page' },
  { path: '/meetings', label: 'Meetings Schedule Page' },
  { path: '/news', label: 'Community News Page' },
  { path: '/books', label: 'Books & Reading Page' },
  { path: '/join', label: 'Join / Invitation Page' },
];

export function SeoEditor() {
  const { content, updateSection } = useCMS();
  const { meta } = content;

  const handleMetaChange = (path: string, field: 'title' | 'description', val: string) => {
    const prev = meta[path] || { title: '', description: '' };
    updateSection('meta', {
      ...meta,
      [path]: { ...prev, [field]: val },
    });
  };

  return (
    <div className="space-y-6">
      <SectionCard
        title="Page Browser Titles & Search Meta Descriptions"
        subtitle="Control what shows in browser tabs and search engine results for each page"
      >
        <div className="space-y-4">
          {PAGE_KEYS.map(({ path, label }) => {
            const current = meta[path] || { title: '', description: '' };
            return (
              <div
                key={path}
                className="p-3.5 bg-purple-50/40 border border-purple-100 rounded-xl space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-purple-950 font-serif">{label}</span>
                  <span className="text-[11px] font-mono text-purple-600 bg-purple-100 px-2 py-0.5 rounded">
                    {path}
                  </span>
                </div>
                <TextInput
                  label="Browser Tab Title"
                  value={current.title}
                  onChange={(e) => handleMetaChange(path, 'title', e.target.value)}
                  placeholder="Page title | Queen Prayer Walking"
                />
                <TextAreaField
                  label="Search / Social Meta Description"
                  value={current.description}
                  onChange={(e) => handleMetaChange(path, 'description', e.target.value)}
                  rows={2}
                  placeholder="Brief description for search previews..."
                />
              </div>
            );
          })}
        </div>
      </SectionCard>
    </div>
  );
}

