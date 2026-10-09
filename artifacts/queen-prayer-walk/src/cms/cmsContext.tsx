import React, { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { defaultSiteContent } from './defaultContent';
import type { SiteContent } from './types';

const STORAGE_KEY = 'qpw_site_content_v1';
const AUTH_KEY = 'qpw_admin_authenticated';
const ADMIN_PASSWORD_DEFAULT = 'queenwalk2026';

interface CMSContextType {
  content: SiteContent;
  updateContent: (updater: (prev: SiteContent) => SiteContent) => void;
  updateSection: <K extends keyof SiteContent>(key: K, data: Partial<SiteContent[K]>) => void;
  resetSection: (key: keyof SiteContent) => void;
  resetAll: () => void;
  exportJSON: () => void;
  importJSON: (jsonString: string) => boolean;
  saveToServer: () => Promise<boolean>;
  isInlineEditActive: boolean;
  setIsInlineEditActive: (val: boolean) => void;
  activeEditModal: string | null;
  setActiveEditModal: (modal: string | null) => void;
  isAdminLoggedIn: boolean;
  login: (pass: string) => boolean;
  logout: () => void;
  lastSaved: Date | null;
}

const CMSContext = createContext<CMSContextType | undefined>(undefined);

function deepMerge<T>(target: T, source: any): T {
  if (!source || typeof source !== 'object') return target;
  const output = { ...target } as any;
  for (const key of Object.keys(source)) {
    if (source[key] !== undefined) {
      if (
        typeof source[key] === 'object' &&
        source[key] !== null &&
        !Array.isArray(source[key]) &&
        typeof (target as any)?.[key] === 'object' &&
        !Array.isArray((target as any)?.[key])
      ) {
        output[key] = deepMerge((target as any)[key], source[key]);
      } else {
        output[key] = source[key];
      }
    }
  }
  return output;
}

export function CMSProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return deepMerge(defaultSiteContent, parsed);
      }
    } catch (e) {
      console.warn('Failed to parse saved site content:', e);
    }
    return defaultSiteContent;
  });

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    try {
      return localStorage.getItem(AUTH_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const [isInlineEditActive, setIsInlineEditActive] = useState(false);
  const [activeEditModal, setActiveEditModal] = useState<string | null>(null);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  // Sync with backend API on mount if available
  useEffect(() => {
    fetch('/api/content')
      .then((res) => {
        if (res.ok) return res.json();
        return null;
      })
      .then((data) => {
        if (data && typeof data === 'object') {
          setContent((prev) => deepMerge(prev, data));
        }
      })
      .catch(() => {
        // API server may not be running, localStorage is used
      });
  }, []);

  // Save to localStorage whenever content changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
      setLastSaved(new Date());
    } catch (e) {
      console.warn('Failed to save content to localStorage:', e);
    }
  }, [content]);

  // Apply theme styling in real-time
  useEffect(() => {
    if (!content.theme) return;
    const root = document.documentElement;
    if (content.theme.primaryColor) root.style.setProperty('--plum', content.theme.primaryColor);
    if (content.theme.plumDeep) root.style.setProperty('--plum-deep', content.theme.plumDeep);
    if (content.theme.roseColor) root.style.setProperty('--rose', content.theme.roseColor);
    if (content.theme.goldAccent) root.style.setProperty('--gold', content.theme.goldAccent);
    if (content.theme.paperBg) {
      root.style.setProperty('--paper', content.theme.paperBg);
      document.body.style.backgroundColor = content.theme.paperBg;
    }
    if (content.theme.paperDeep) root.style.setProperty('--paper-deep', content.theme.paperDeep);
    if (content.theme.inkColor) {
      root.style.setProperty('--ink', content.theme.inkColor);
      document.body.style.color = content.theme.inkColor;
    }
    if (content.theme.fontSans) root.style.setProperty('--app-font-sans', content.theme.fontSans);
    if (content.theme.fontSerif) root.style.setProperty('--app-font-serif', content.theme.fontSerif);
  }, [content.theme]);

  const updateContent = (updater: (prev: SiteContent) => SiteContent) => {
    setContent((prev) => updater(prev));
  };

  const updateSection = <K extends keyof SiteContent>(key: K, data: Partial<SiteContent[K]>) => {
    setContent((prev) => {
      const prevSection = prev[key];
      const updatedSection =
        typeof prevSection === 'object' && !Array.isArray(prevSection)
          ? { ...prevSection, ...data }
          : (data as any);
      return {
        ...prev,
        [key]: updatedSection,
      };
    });
  };

  const resetSection = (key: keyof SiteContent) => {
    setContent((prev) => ({
      ...prev,
      [key]: defaultSiteContent[key],
    }));
  };

  const resetAll = () => {
    if (window.confirm('Are you sure you want to reset all site content and styles back to the original default? All unsaved manual edits will be lost.')) {
      setContent(defaultSiteContent);
      localStorage.removeItem(STORAGE_KEY);
      fetch('/api/content/reset', { method: 'POST' }).catch(() => {});
    }
  };

  const exportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(content, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `queen-prayer-walk-content-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const importJSON = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (typeof parsed === 'object' && parsed !== null) {
        const merged = deepMerge(defaultSiteContent, parsed);
        setContent(merged);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
        return true;
      }
    } catch (e) {
      alert('Invalid JSON file format. Please check the file and try again.');
    }
    return false;
  };

  const saveToServer = async (): Promise<boolean> => {
    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      });
      if (res.ok) {
        return true;
      }
    } catch {
      // Fallback
    }
    return false;
  };

  const login = (pass: string): boolean => {
    if (pass.trim() === ADMIN_PASSWORD_DEFAULT || pass.trim() === 'admin' || pass.trim() === 'queen') {
      setIsAdminLoggedIn(true);
      try {
        localStorage.setItem(AUTH_KEY, 'true');
      } catch {}
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdminLoggedIn(false);
    try {
      localStorage.removeItem(AUTH_KEY);
    } catch {}
  };

  return (
    <CMSContext.Provider
      value={{
        content,
        updateContent,
        updateSection,
        resetSection,
        resetAll,
        exportJSON,
        importJSON,
        saveToServer,
        isInlineEditActive,
        setIsInlineEditActive,
        activeEditModal,
        setActiveEditModal,
        isAdminLoggedIn,
        login,
        logout,
        lastSaved,
      }}
    >
      {children}
    </CMSContext.Provider>
  );
}

export function useCMS(): CMSContextType {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return context;
}

