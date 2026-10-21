import React, { useState, useEffect } from 'react';
import { useCMS } from '../../cms/cmsContext';
import { Link, useLocation } from 'wouter';
import {
  Flower2,
  Home,
  BookOpen,
  Footprints,
  Heart,
  Calendar,
  Newspaper,
  Library,
  UserPlus,
  Palette,
  Image as ImageIcon,
  Compass,
  Search,
  Download,
  Upload,
  RotateCcw,
  Save,
  ArrowLeft,
  Check,
  Eye,
  Key,
  ShieldCheck,
  Lock,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';

import { HeaderFooterEditor } from './editors/HeaderFooterEditor';
import { HomeEditor } from './editors/HomeEditor';
import { AboutEditor } from './editors/AboutEditor';
import { PracticeEditor } from './editors/PracticeEditor';
import { SisterhoodEditor } from './editors/SisterhoodEditor';
import { MeetingsEditor } from './editors/MeetingsEditor';
import { NewsEditor } from './editors/NewsEditor';
import { BooksEditor } from './editors/BooksEditor';
import { JoinEditor } from './editors/JoinEditor';
import { ThemeEditor } from './editors/ThemeEditor';
import { MediaEditor } from './editors/MediaEditor';
import { SeoEditor } from './editors/SeoEditor';

interface NavSection {
  group: string;
  items: {
    id: string;
    label: string;
    icon: React.ComponentType<{ size?: number; className?: string }>;
    description?: string;
  }[];
}

const NAV_SECTIONS: NavSection[] = [
  {
    group: 'Website Pages (5 Pages)',
    items: [
      { id: 'home', label: '1. Home Page', icon: Home, description: 'Hero, manifesto & band' },
      { id: 'about', label: '2. Praying the Word', icon: BookOpen, description: 'Purpose, values & scripture' },
      { id: 'practice', label: '   ↳ Walking Practice', icon: Footprints, description: '3 walking prayer steps' },
      { id: 'sisterhood', label: '3. Queens Community', icon: Heart, description: 'Sisterhood story & photo' },
      { id: 'meetings', label: '   ↳ Meetings Schedule', icon: Calendar, description: 'Dates & gathering times' },
      { id: 'news', label: '4. Newsletter Page', icon: Newspaper, description: 'Subscribe box & feed' },
      { id: 'books', label: '5. Buy Our Books', icon: Library, description: 'Book catalog & buy links' },
      { id: 'join', label: 'Join / Invitation', icon: UserPlus, description: 'Invitation guide' },
    ],
  },
  {
    group: 'Navigation & Styling',
    items: [
      { id: 'header-footer', label: 'Hamburger Menu & Nav', icon: Compass, description: 'Menu items, logo & CTA' },
      { id: 'media', label: 'Photo Library', icon: ImageIcon, description: 'Swap & upload images' },
      { id: 'theme', label: 'Colors & Theme', icon: Palette, description: 'Brand palette & styles' },
      { id: 'seo', label: 'Page Titles & SEO', icon: Search, description: 'Browser titles' },
    ],
  },
];

function getTabUrl(tab: string): string {
  switch (tab) {
    case 'home':
    case 'header-footer':
    case 'theme':
    case 'media':
    case 'seo':
      return '/';
    case 'about':
    case 'practice':
      return '/praying-the-word';
    case 'sisterhood':
    case 'meetings':
      return '/community';
    case 'news':
      return '/newsletter';
    case 'books':
      return '/books';
    case 'join':
      return '/join';
    default:
      return '/';
  }
}

export function AdminDashboard() {
  const {
    content,
    resetAll,
    exportJSON,
    importJSON,
    saveToServer,
    isAdminLoggedIn,
    login,
    logout,
    lastSaved,
  } = useCMS();

  const [activeTab, setActiveTab] = useState('home');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);
  const [showImportModal, setShowImportModal] = useState(false);
  const [importJsonText, setImportJsonText] = useState('');
  const [showLivePreview, setShowLivePreview] = useState(false);

  // Read ?tab= from URL if present
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tabParam = urlParams.get('tab');
    if (tabParam) {
      const allItems = NAV_SECTIONS.flatMap((g) => g.items);
      if (allItems.some((i) => i.id === tabParam)) {
        setActiveTab(tabParam);
      }
    }
  }, []);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(passwordInput)) {
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  const handleSaveToServer = async () => {
    setSaveStatus('saving');
    const ok = await saveToServer();
    if (ok) {
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus(null), 3000);
    } else {
      setSaveStatus('saved-local');
      setTimeout(() => setSaveStatus(null), 3000);
    }
  };

  const handleImportSubmit = () => {
    if (!importJsonText.trim()) return;
    const success = importJSON(importJsonText);
    if (success) {
      setShowImportModal(false);
      setImportJsonText('');
      alert('Site content updated successfully from imported backup!');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (text) {
        const success = importJSON(text);
        if (success) {
          setShowImportModal(false);
          alert('Configuration imported successfully!');
        }
      }
    };
    reader.readAsText(file);
  };

  // Login Card
  if (!isAdminLoggedIn) {
    return (
      <div className="min-h-screen bg-[#3c2c4c] flex items-center justify-center p-4">
        <div className="max-w-sm w-full bg-white rounded-2xl shadow-xl p-6 border border-purple-100 text-center space-y-5">
          <div className="w-12 h-12 mx-auto rounded-xl bg-purple-100 text-purple-900 flex items-center justify-center shadow-2xs">
            <Flower2 size={28} strokeWidth={1.5} />
          </div>

          <div>
            <h1 className="text-xl font-bold font-serif text-purple-950">
              Queen Prayer Walking
            </h1>
            <p className="text-xs text-purple-700/75 mt-0.5">
              Client Admin Panel Login
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-3 text-left">
            <div>
              <label className="block text-[11px] font-semibold text-purple-900 uppercase tracking-wider mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter password..."
                value={passwordInput}
                onChange={(e) => {
                  setPasswordInput(e.target.value);
                  setLoginError(false);
                }}
                className="w-full px-3 py-2 text-sm bg-purple-50/40 border border-purple-200 rounded-xl text-purple-950 focus:outline-none focus:ring-1.5 focus:ring-purple-600"
                autoFocus
              />
              {loginError && (
                <p className="text-[11px] text-red-600 mt-1">
                  Incorrect password. Try <code className="font-mono bg-purple-50 px-1">queenwalk2026</code>.
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-purple-800 hover:bg-purple-900 text-white rounded-xl font-semibold text-xs shadow-sm transition cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Key size={13} /> Unlock Control Panel
            </button>
          </form>

          <div className="pt-2 border-t border-purple-50 flex items-center justify-between text-xs text-purple-600">
            <Link href="/" className="hover:text-purple-950 inline-flex items-center gap-1 text-[11px]">
              <ArrowLeft size={11} /> Return to website
            </Link>
            <button
              type="button"
              onClick={() => login('queenwalk2026')}
              className="text-purple-500 hover:underline cursor-pointer text-[11px]"
            >
              Quick Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentTabItem = NAV_SECTIONS.flatMap((g) => g.items).find((i) => i.id === activeTab);

  return (
    <div className="min-h-screen bg-[#faf7fc] text-[#34283f] flex flex-col font-sans">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-40 bg-white border-b border-purple-100/90 shadow-2xs px-4 sm:px-6 h-14 flex items-center">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-3">
          {/* Logo & Title */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-purple-800 text-amber-300 flex items-center justify-center shadow-2xs shrink-0">
              <Flower2 size={18} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm font-bold font-serif text-purple-950 leading-tight">
                  Control Panel
                </h1>
                <span className="text-[9px] font-mono px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800 font-semibold inline-flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Auto-Saved
                </span>
              </div>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-2">
            <Link
              href={activeTab === 'home' ? '/' : `/${activeTab}`}
              className="px-2.5 py-1.5 bg-purple-50 hover:bg-purple-100 text-purple-900 rounded-lg text-xs font-semibold inline-flex items-center gap-1.5 transition border border-purple-200 cursor-pointer"
              title="Open the live page in website"
            >
              <Eye size={12} />
              <span className="hidden sm:inline">View Website</span>
            </Link>

            <button
              type="button"
              onClick={() => setShowLivePreview(!showLivePreview)}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold inline-flex items-center gap-1 transition border cursor-pointer ${
                showLivePreview
                  ? 'bg-purple-800 text-white border-purple-800'
                  : 'bg-white text-purple-900 border-purple-200 hover:bg-purple-50'
              }`}
              title="Toggle split view live preview"
            >
              <span className="hidden sm:inline">{showLivePreview ? 'Hide Split Preview' : 'Split Preview'}</span>
              <span className="sm:hidden">Preview</span>
            </button>

            <button
              type="button"
              onClick={handleSaveToServer}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold inline-flex items-center gap-1.5 shadow-2xs transition cursor-pointer"
            >
              <Save size={12} />
              <span>
                {saveStatus === 'saving'
                  ? 'Saving...'
                  : saveStatus === 'saved'
                  ? 'Saved!'
                  : saveStatus === 'saved-local'
                  ? 'Saved Local!'
                  : 'Save All'}
              </span>
            </button>

            <div className="h-4 w-px bg-purple-100 mx-0.5 hidden md:block" />

            <button
              type="button"
              onClick={exportJSON}
              className="px-2 py-1 text-purple-700 hover:bg-purple-50 rounded-lg text-xs font-medium inline-flex items-center gap-1 cursor-pointer hidden md:inline-flex"
              title="Download backup file"
            >
              <Download size={12} /> Backup
            </button>

            <button
              type="button"
              onClick={() => setShowImportModal(true)}
              className="px-2 py-1 text-purple-700 hover:bg-purple-50 rounded-lg text-xs font-medium inline-flex items-center gap-1 cursor-pointer hidden md:inline-flex"
              title="Restore from backup file"
            >
              <Upload size={12} /> Restore
            </button>

            <button
              type="button"
              onClick={resetAll}
              className="px-2 py-1 text-red-600 hover:bg-red-50 rounded-lg text-xs font-medium inline-flex items-center gap-1 cursor-pointer"
              title="Reset everything to default"
            >
              <RotateCcw size={12} /> Reset
            </button>

            <button
              type="button"
              onClick={logout}
              className="p-1 text-purple-400 hover:text-purple-800 rounded-lg cursor-pointer"
              title="Lock Admin Panel"
            >
              <Lock size={13} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-5 grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Sidebar Navigation */}
        <aside className="lg:col-span-3 space-y-4">
          <div className="bg-white rounded-xl border border-purple-100/90 p-2 shadow-2xs space-y-3">
            {NAV_SECTIONS.map((section) => (
              <div key={section.group} className="space-y-0.5">
                <span className="text-[10px] font-mono uppercase tracking-wider text-purple-400 font-bold px-2 py-1 block">
                  {section.group}
                </span>

                {section.items.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer text-left ${
                        isActive
                          ? 'bg-purple-800 text-white font-semibold shadow-2xs'
                          : 'text-purple-950 hover:bg-purple-50'
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <Icon
                          size={14}
                          className={isActive ? 'text-amber-300' : 'text-purple-600 shrink-0'}
                        />
                        <span className="truncate">{tab.label}</span>
                      </div>
                      <ChevronRight
                        size={12}
                        className={`transition-opacity ${isActive ? 'opacity-80' : 'opacity-0'}`}
                      />
                    </button>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Quick Helper Note for the Client */}
          <div className="p-3 bg-purple-50/70 border border-purple-100 rounded-xl text-[11px] text-purple-900 space-y-1">
            <span className="font-bold flex items-center gap-1 text-purple-950">
              <ShieldCheck size={13} className="text-emerald-600" /> Changes Save Instantly
            </span>
            <p className="text-purple-700/80 leading-relaxed text-[10.5px]">
              You can safely edit text and images anytime. When ready, click <strong>View Website</strong> to check the live result.
            </p>
          </div>
        </aside>

        {/* Center Editor Area */}
        <main className={`${showLivePreview ? 'lg:col-span-5' : 'lg:col-span-9'} space-y-4`}>
          {/* Section Breadcrumb & Title */}
          <div className="bg-white rounded-xl border border-purple-100/90 p-3 shadow-2xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs text-purple-500 font-medium">Editing:</span>
              <h2 className="text-sm font-bold font-serif text-purple-950">
                {currentTabItem?.label}
              </h2>
              {currentTabItem?.description && (
                <span className="text-[11px] text-purple-600/70 hidden sm:inline">
                  — {currentTabItem.description}
                </span>
              )}
            </div>

            <Link
              href={getTabUrl(activeTab)}
              className="text-[11px] text-purple-700 hover:text-purple-950 font-semibold inline-flex items-center gap-1 bg-purple-50 hover:bg-purple-100 px-2.5 py-1 rounded-md border border-purple-200 transition"
            >
              <ExternalLink size={11} /> Open Page
            </Link>
          </div>

          {/* Active Tab Form */}
          {activeTab === 'header-footer' && <HeaderFooterEditor />}
          {activeTab === 'home' && <HomeEditor />}
          {activeTab === 'about' && <AboutEditor />}
          {activeTab === 'practice' && <PracticeEditor />}
          {activeTab === 'sisterhood' && <SisterhoodEditor />}
          {activeTab === 'meetings' && <MeetingsEditor />}
          {activeTab === 'news' && <NewsEditor />}
          {activeTab === 'books' && <BooksEditor />}
          {activeTab === 'join' && <JoinEditor />}
          {activeTab === 'media' && <MediaEditor />}
          {activeTab === 'theme' && <ThemeEditor />}
          {activeTab === 'seo' && <SeoEditor />}
        </main>

        {/* Split Live Preview (Optional toggle) */}
        {showLivePreview && (
          <aside className="lg:col-span-4 bg-white rounded-xl border border-purple-200 overflow-hidden shadow-md flex flex-col h-[750px] sticky top-16">
            <div className="px-3 py-2 bg-purple-900 text-white flex items-center justify-between text-xs">
              <span className="font-semibold text-[11px] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" /> Split Preview
              </span>
              <button
                type="button"
                onClick={() => setShowLivePreview(false)}
                className="text-purple-300 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>
            <iframe
              src={getTabUrl(activeTab)}
              title="Site Live Preview"
              className="w-full flex-1 border-0"
            />
          </aside>
        )}
      </div>

      {/* Import Modal */}
      {showImportModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-2xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 shadow-2xl border border-purple-100 space-y-3.5">
            <div className="flex items-center justify-between border-b border-purple-50 pb-2">
              <h3 className="font-bold font-serif text-base text-purple-950">
                Restore Content from Backup
              </h3>
              <button
                type="button"
                onClick={() => setShowImportModal(false)}
                className="text-purple-400 hover:text-purple-800"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-purple-700/80">
              Upload a previously exported JSON backup file or paste its contents below:
            </p>

            <div className="space-y-2.5">
              <label className="block p-3 border border-dashed border-purple-300 rounded-xl bg-purple-50/50 text-center cursor-pointer hover:bg-purple-50">
                <Upload size={16} className="mx-auto text-purple-600 mb-1" />
                <span className="text-xs font-semibold text-purple-900 block">
                  Select Backup File (.json)
                </span>
                <input
                  type="file"
                  accept=".json,application/json"
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </label>

              <div>
                <textarea
                  rows={4}
                  value={importJsonText}
                  onChange={(e) => setImportJsonText(e.target.value)}
                  placeholder="Or paste JSON text here..."
                  className="w-full p-2 text-xs font-mono bg-purple-50/30 border border-purple-200 rounded-lg text-purple-950"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-purple-50">
              <button
                type="button"
                onClick={() => setShowImportModal(false)}
                className="px-3 py-1.5 text-xs text-purple-600 hover:text-purple-900 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleImportSubmit}
                className="px-3 py-1.5 bg-purple-800 hover:bg-purple-900 text-white rounded-lg text-xs font-semibold cursor-pointer"
              >
                Restore Backup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
