import React, { useState } from 'react';
import { useCMS } from '../../../cms/cmsContext';
import { TextInput, TextAreaField, ToggleField, SectionCard } from '../../../components/admin/FormField';
import { ImageField } from '../../../components/admin/ImageField';
import { Plus, Trash2, Edit3, Calendar, Tag, Check, Eye } from 'lucide-react';
import type { NewsArticle } from '../../../cms/types';

export function NewsEditor() {
  const { content, updateSection } = useCMS();
  const { news } = content;

  const [editingArticleId, setEditingArticleId] = useState<string | null>(null);

  const updateNews = (data: Partial<typeof news>) => {
    updateSection('news', data);
  };

  const updateHero = (data: Partial<typeof news.hero>) => {
    updateNews({ hero: { ...news.hero, ...data } });
  };

  const updateEmptyState = (data: Partial<typeof news.emptyState>) => {
    updateNews({ emptyState: { ...news.emptyState, ...data } });
  };

  const handleAddArticle = () => {
    const newArticle: NewsArticle = {
      id: `post-${Date.now()}`,
      title: 'New Community Gathering Update',
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      category: 'Community News',
      summary: 'A short summary of what sisters shared during this gathering...',
      content: 'Write the full news reflection or community message here...',
      image: '',
      author: 'Queen Prayer Walk Circle',
      published: true,
    };
    updateNews({ articles: [newArticle, ...news.articles] });
    setEditingArticleId(newArticle.id);
  };

  const handleUpdateArticle = (id: string, updates: Partial<NewsArticle>) => {
    const updated = news.articles.map((item) => (item.id === id ? { ...item, ...updates } : item));
    updateNews({ articles: updated });
  };

  const handleDeleteArticle = (id: string) => {
    if (window.confirm('Delete this news update?')) {
      updateNews({ articles: news.articles.filter((item) => item.id !== id) });
      if (editingArticleId === id) setEditingArticleId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Hero */}
      <SectionCard title="1. News Page Hero" subtitle="The top hero banner for community news and updates">
        <TextInput
          label="Eyebrow"
          value={news.hero.eyebrow}
          onChange={(e) => updateHero({ eyebrow: e.target.value })}
          placeholder="From the community"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <TextInput
            label="Heading Line 1"
            value={news.hero.headingLine1}
            onChange={(e) => updateHero({ headingLine1: e.target.value })}
            placeholder="A small note"
          />
          <TextInput
            label="Heading Emphasized"
            value={news.hero.headingEmphasized}
            onChange={(e) => updateHero({ headingEmphasized: e.target.value })}
            placeholder="from our path."
          />
        </div>
        <TextAreaField
          label="Intro"
          value={news.hero.intro}
          onChange={(e) => updateHero({ intro: e.target.value })}
          rows={2}
          placeholder="A quiet place for community news and shared updates."
        />
        <ImageField
          label="Optional Hero Background Image"
          value={news.hero.photo || ''}
          onChange={(url) => updateHero({ photo: url })}
          description="Hero photo background (optional)"
        />
      </SectionCard>

      {/* Live Community News Articles Manager */}
      <SectionCard
        title={`2. Live Community News Posts (${news.articles.length})`}
        subtitle="Publish news, updates, walk announcements, or reflections for the community"
      >
        <div className="flex items-center justify-between">
          <p className="text-xs text-purple-700/80">
            {news.articles.length === 0
              ? 'No articles published yet. The fallback empty state card will display until you add your first article.'
              : `${news.articles.length} news post(s) created.`}
          </p>
          <button
            type="button"
            onClick={handleAddArticle}
            className="py-1.5 px-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <Plus size={13} /> Create News Post
          </button>
        </div>

        <div className="space-y-3 pt-2">
          {news.articles.map((post) => {
            const isEditing = editingArticleId === post.id;
            return (
              <div
                key={post.id}
                className="border border-purple-100 rounded-xl bg-purple-50/40 overflow-hidden"
              >
                {/* Article Header Summary */}
                <div className="p-3.5 flex items-center justify-between gap-3 bg-white">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-100 text-purple-800">
                        {post.category}
                      </span>
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Calendar size={11} /> {post.date}
                      </span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                          post.published
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {post.published ? 'Published' : 'Draft'}
                      </span>
                    </div>
                    <h4 className="font-bold text-sm text-purple-950 truncate">{post.title}</h4>
                    <p className="text-xs text-purple-800/70 truncate mt-0.5">{post.summary}</p>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => setEditingArticleId(isEditing ? null : post.id)}
                      className="p-1.5 text-purple-700 hover:bg-purple-50 rounded-lg text-xs font-medium inline-flex items-center gap-1 cursor-pointer"
                    >
                      <Edit3 size={13} /> {isEditing ? 'Close' : 'Edit'}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteArticle(post.id)}
                      className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg cursor-pointer"
                      title="Delete post"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>

                {/* Edit Form */}
                {isEditing && (
                  <div className="p-4 border-t border-purple-100 space-y-3 bg-purple-50/20">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <TextInput
                        label="Article Title"
                        value={post.title}
                        onChange={(e) => handleUpdateArticle(post.id, { title: e.target.value })}
                        placeholder="Title of community news update"
                      />
                      <TextInput
                        label="Date"
                        value={post.date}
                        onChange={(e) => handleUpdateArticle(post.id, { date: e.target.value })}
                        placeholder="October 10, 2026"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <TextInput
                        label="Category / Tag"
                        value={post.category}
                        onChange={(e) => handleUpdateArticle(post.id, { category: e.target.value })}
                        placeholder="Community News / Upcoming Walk / Reflection"
                      />
                      <TextInput
                        label="Author / Attributed To"
                        value={post.author || ''}
                        onChange={(e) => handleUpdateArticle(post.id, { author: e.target.value })}
                        placeholder="Queen Prayer Walk Circle"
                      />
                    </div>

                    <TextAreaField
                      label="Brief Summary / Excerpt"
                      value={post.summary}
                      onChange={(e) => handleUpdateArticle(post.id, { summary: e.target.value })}
                      rows={2}
                      placeholder="Brief 1-2 sentence preview..."
                    />

                    <TextAreaField
                      label="Full Article Body"
                      value={post.content}
                      onChange={(e) => handleUpdateArticle(post.id, { content: e.target.value })}
                      rows={5}
                      placeholder="Full text of the update..."
                    />

                    <ImageField
                      label="Article Photo (Optional)"
                      value={post.image || ''}
                      onChange={(url) => handleUpdateArticle(post.id, { image: url })}
                      description="Optional featured image for this news article"
                    />

                    <ToggleField
                      label="Publish Post"
                      description="When enabled, this post appears publicly on the News page"
                      checked={post.published}
                      onChange={(checked) => handleUpdateArticle(post.id, { published: checked })}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </SectionCard>

      {/* Empty State Customizer */}
      <SectionCard
        title="3. Empty State Card"
        subtitle="Displayed when there are no news posts published yet"
      >
        <TextInput
          label="Empty State Eyebrow"
          value={news.emptyState.eyebrow}
          onChange={(e) => updateEmptyState({ eyebrow: e.target.value })}
          placeholder="News & updates"
        />
        <TextInput
          label="Empty State Heading"
          value={news.emptyState.heading}
          onChange={(e) => updateEmptyState({ heading: e.target.value })}
          placeholder="No community updates posted yet."
        />
        <TextAreaField
          label="Empty State Description"
          value={news.emptyState.body}
          onChange={(e) => updateEmptyState({ body: e.target.value })}
          rows={2}
          placeholder="When there is news to share, it will find a place here..."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
          <TextInput
            label="Button Text"
            value={news.emptyState.ctaText}
            onChange={(e) => updateEmptyState({ ctaText: e.target.value })}
            placeholder="Learn about our community"
          />
          <TextInput
            label="Button Link"
            value={news.emptyState.ctaHref}
            onChange={(e) => updateEmptyState({ ctaHref: e.target.value })}
            placeholder="/about"
          />
        </div>
      </SectionCard>
    </div>
  );
}

