import React, { useState, useRef } from 'react';
import { useCMS } from '../../../cms/cmsContext';
import { SectionCard } from '../../../components/admin/FormField';
import { ImageField } from '../../../components/admin/ImageField';
import { CURATED_LIBRARY, readFileAsDataUrl, DEFAULT_PHOTOS } from '../../../cms/mediaLibrary';
import { Upload, Check, Copy, ExternalLink, Image as ImageIcon } from 'lucide-react';

export function MediaEditor() {
  const { content, updateSection } = useCMS();
  const { home, practice, sisterhood } = content;

  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadError(null);
    try {
      const dataUrl = await readFileAsDataUrl(file, 4);
      setUploadedImageUrl(dataUrl);
    } catch (err: any) {
      setUploadError(err.message || 'Failed to read image file');
    }
  };

  const copyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Active Site Images Manager */}
      <SectionCard
        title="1. Active Images Across Website"
        subtitle="Review and swap any image displayed on the site with 1 click"
      >
        <div className="space-y-4">
          <ImageField
            label="Home Page Hero Photo"
            value={home.hero.photo}
            onChange={(url) =>
              updateSection('home', { hero: { ...home.hero, photo: url } })
            }
            defaultFallback={DEFAULT_PHOTOS.hero}
            description="Main banner image on the homepage"
          />

          <ImageField
            label="Home Page Split Section Photo"
            value={home.split.photo}
            onChange={(url) =>
              updateSection('home', { split: { ...home.split, photo: url } })
            }
            defaultFallback={DEFAULT_PHOTOS.prayer}
            description="Side photo next to 'Room to breathe, Room to believe'"
          />

          <ImageField
            label="The Practice Page Hero Photo"
            value={practice.hero.photo}
            onChange={(url) =>
              updateSection('practice', { hero: { ...practice.hero, photo: url } })
            }
            defaultFallback={DEFAULT_PHOTOS.walking}
            description="Banner photo on the practice guide page"
          />

          <ImageField
            label="Sisterhood Page Hero Photo"
            value={sisterhood.hero.photo}
            onChange={(url) =>
              updateSection('sisterhood', { hero: { ...sisterhood.hero, photo: url } })
            }
            defaultFallback={DEFAULT_PHOTOS.prayer}
            description="Banner photo on the Sisterhood page"
          />

          <ImageField
            label="Sisterhood Page Walk Feature Photo"
            value={sisterhood.walkSection.photo}
            onChange={(url) =>
              updateSection('sisterhood', {
                walkSection: { ...sisterhood.walkSection, photo: url },
              })
            }
            defaultFallback={DEFAULT_PHOTOS.walking}
            description="Feature photo next to 'Make room for each other'"
          />
        </div>
      </SectionCard>

      {/* Quick Upload Tool */}
      <SectionCard
        title="2. Quick Image Uploader"
        subtitle="Upload any image from your computer to use on buttons, cards, or banners"
      >
        <div className="flex flex-col sm:flex-row items-center gap-4 p-4 border border-purple-200 rounded-xl bg-purple-50/30">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-semibold inline-flex items-center gap-2 cursor-pointer shadow-sm shrink-0"
          >
            <Upload size={14} /> Upload Image from Computer
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileUpload}
          />
          <p className="text-xs text-purple-700/80">
            Select a JPG, PNG, or WebP photo up to 4MB. The photo is instantly converted to a reusable web image.
          </p>
        </div>

        {uploadError && <p className="text-xs text-red-600 mt-2">{uploadError}</p>}

        {uploadedImageUrl && (
          <div className="mt-3 p-3 bg-white rounded-xl border border-purple-200 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <img
                src={uploadedImageUrl}
                alt="Uploaded preview"
                className="w-14 h-14 object-cover rounded-lg border border-purple-100 shrink-0"
              />
              <div className="min-w-0">
                <span className="text-xs font-semibold text-purple-950 block">Upload Ready!</span>
                <span className="text-[11px] text-purple-600 truncate block">
                  Copy this data URL or apply it to any section above.
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => copyUrl(uploadedImageUrl, 'uploaded')}
              className="px-3 py-1.5 bg-purple-100 hover:bg-purple-200 text-purple-900 rounded-lg text-xs font-medium inline-flex items-center gap-1.5 shrink-0 cursor-pointer"
            >
              {copiedId === 'uploaded' ? <Check size={13} /> : <Copy size={13} />}
              {copiedId === 'uploaded' ? 'Copied!' : 'Copy URL'}
            </button>
          </div>
        )}
      </SectionCard>

      {/* Curated Royalty-Free Photo Library */}
      <SectionCard
        title="3. Curated Royalty-Free Photo Library"
        subtitle="High resolution photography selected specifically for prayer walking, community, and nature"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {CURATED_LIBRARY.map((item) => (
            <div
              key={item.id}
              className="rounded-xl overflow-hidden border border-purple-100 bg-white shadow-xs group"
            >
              <div className="relative h-32 overflow-hidden bg-purple-50">
                <img
                  src={item.url}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 bg-black/60 backdrop-blur-xs text-white text-[10px] rounded-full uppercase tracking-wider font-mono">
                  {item.category}
                </span>
              </div>
              <div className="p-3 space-y-1.5">
                <h4 className="text-xs font-bold text-purple-950 truncate">{item.name}</h4>
                <p className="text-[11px] text-purple-700/70 line-clamp-1">{item.description}</p>
                <button
                  type="button"
                  onClick={() => copyUrl(item.url, item.id)}
                  className="w-full mt-1 py-1 px-2 bg-purple-50 hover:bg-purple-100 text-purple-800 rounded text-xs font-medium inline-flex items-center justify-center gap-1.5 transition cursor-pointer"
                >
                  {copiedId === item.id ? <Check size={12} /> : <Copy size={12} />}
                  {copiedId === item.id ? 'Copied link!' : 'Copy Photo URL'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}

