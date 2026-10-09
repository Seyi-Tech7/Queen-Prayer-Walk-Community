import React, { useState } from 'react';
import { useCMS } from '../../../cms/cmsContext';
import { TextInput, TextAreaField, SectionCard } from '../../../components/admin/FormField';
import { ImageField } from '../../../components/admin/ImageField';
import { Plus, Trash2, Edit3, BookOpen, ExternalLink } from 'lucide-react';
import type { BookItem } from '../../../cms/types';

export function BooksEditor() {
  const { content, updateSection } = useCMS();
  const { books } = content;

  const [editingBookId, setEditingBookId] = useState<string | null>(null);

  const updateBooksSection = (data: Partial<typeof books>) => {
    updateSection('books', data);
  };

  const updateHero = (data: Partial<typeof books.hero>) => {
    updateBooksSection({ hero: { ...books.hero, ...data } });
  };

  const updateEmptyState = (data: Partial<typeof books.emptyState>) => {
    updateBooksSection({ emptyState: { ...books.emptyState, ...data } });
  };

  const handleAddBook = () => {
    const newBook: BookItem = {
      id: `book-${Date.now()}`,
      title: 'A Gentle Walk in Grace',
      author: 'Author Name',
      description: 'A thoughtful book companion exploring prayer, silence, and companionship on the spiritual path.',
      coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
      link: 'https://books.google.com',
      linkText: 'Learn more / Read',
      tag: 'Spiritual Walk',
    };
    updateBooksSection({ books: [newBook, ...books.books] });
    setEditingBookId(newBook.id);
  };

  const handleUpdateBook = (id: string, updates: Partial<BookItem>) => {
    const updated = books.books.map((b) => (b.id === id ? { ...b, ...updates } : b));
    updateBooksSection({ books: updated });
  };

  const handleDeleteBook = (id: string) => {
    if (window.confirm('Delete this book recommendation?')) {
      updateBooksSection({ books: books.books.filter((b) => b.id !== id) });
      if (editingBookId === id) setEditingBookId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Hero */}
      <SectionCard title="1. Books Page Hero" subtitle="The top hero banner for reading and books">
        <TextInput
          label="Eyebrow"
          value={books.hero.eyebrow}
          onChange={(e) => updateHero({ eyebrow: e.target.value })}
          placeholder="For the journey"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <TextInput
            label="Heading Line 1"
            value={books.hero.headingLine1}
            onChange={(e) => updateHero({ headingLine1: e.target.value })}
            placeholder="A gentle space"
          />
          <TextInput
            label="Heading Emphasized"
            value={books.hero.headingEmphasized}
            onChange={(e) => updateHero({ headingEmphasized: e.target.value })}
            placeholder="for good words."
          />
        </div>
        <TextAreaField
          label="Intro"
          value={books.hero.intro}
          onChange={(e) => updateHero({ intro: e.target.value })}
          rows={2}
          placeholder="Books can meet us at just the right moment..."
        />
        <ImageField
          label="Optional Hero Background Image"
          value={books.hero.photo || ''}
          onChange={(url) => updateHero({ photo: url })}
          description="Hero photo background (optional)"
        />
      </SectionCard>

      {/* Featured Books Catalog Manager */}
      <SectionCard
        title={`2. Featured Books List (${books.books.length})`}
        subtitle="Add books, scripture reading guides, or community devotionals"
      >
        <div className="flex items-center justify-between">
          <p className="text-xs text-purple-700/80">
            {books.books.length === 0
              ? 'No books listed yet. The empty state card is currently shown.'
              : `${books.books.length} book(s) featured.`}
          </p>
          <button
            type="button"
            onClick={handleAddBook}
            className="py-1.5 px-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <Plus size={13} /> Add Featured Book
          </button>
        </div>

        <div className="space-y-3 pt-2">
          {books.books.map((book) => {
            const isEditing = editingBookId === book.id;
            return (
              <div
                key={book.id}
                className="border border-purple-100 rounded-xl bg-purple-50/40 overflow-hidden"
              >
                <div className="p-3.5 flex items-center justify-between gap-3 bg-white">
                  <div className="flex items-center gap-3 min-w-0">
                    {book.coverImage && (
                      <img
                        src={book.coverImage}
                        alt={book.title}
                        className="w-10 h-14 object-cover rounded shadow-sm shrink-0 border border-purple-100"
                      />
                    )}
                    <div className="min-w-0">
                      {book.tag && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-100 text-purple-800">
                          {book.tag}
                        </span>
                      )}
                      <h4 className="font-bold text-sm text-purple-950 truncate mt-0.5">
                        {book.title}
                      </h4>
                      <p className="text-xs text-purple-700/80 truncate">By {book.author}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => setEditingBookId(isEditing ? null : book.id)}
                      className="p-1.5 text-purple-700 hover:bg-purple-50 rounded-lg text-xs font-medium inline-flex items-center gap-1 cursor-pointer"
                    >
                      <Edit3 size={13} /> {isEditing ? 'Close' : 'Edit'}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteBook(book.id)}
                      className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg cursor-pointer"
                      title="Delete book"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>

                {isEditing && (
                  <div className="p-4 border-t border-purple-100 space-y-3 bg-purple-50/20">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <TextInput
                        label="Book Title"
                        value={book.title}
                        onChange={(e) => handleUpdateBook(book.id, { title: e.target.value })}
                        placeholder="Title of book"
                      />
                      <TextInput
                        label="Author"
                        value={book.author}
                        onChange={(e) => handleUpdateBook(book.id, { author: e.target.value })}
                        placeholder="Author name"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <TextInput
                        label="Category / Tag"
                        value={book.tag || ''}
                        onChange={(e) => handleUpdateBook(book.id, { tag: e.target.value })}
                        placeholder="Devotional / Faith / Walking"
                      />
                      <TextInput
                        label="Purchase / Read Link (Optional)"
                        value={book.link || ''}
                        onChange={(e) => handleUpdateBook(book.id, { link: e.target.value })}
                        placeholder="https://..."
                      />
                    </div>

                    <TextAreaField
                      label="Description / Reflection"
                      value={book.description}
                      onChange={(e) => handleUpdateBook(book.id, { description: e.target.value })}
                      rows={3}
                      placeholder="Why this book is meaningful for our community..."
                    />

                    <ImageField
                      label="Book Cover Photo"
                      value={book.coverImage || ''}
                      onChange={(url) => handleUpdateBook(book.id, { coverImage: url })}
                      description="Cover image of the book"
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
        subtitle="Displayed when there are no books listed yet"
      >
        <TextInput
          label="Empty State Eyebrow"
          value={books.emptyState.eyebrow}
          onChange={(e) => updateEmptyState({ eyebrow: e.target.value })}
          placeholder="Books & reading"
        />
        <TextInput
          label="Empty State Heading"
          value={books.emptyState.heading}
          onChange={(e) => updateEmptyState({ heading: e.target.value })}
          placeholder="Book details have not been shared yet."
        />
        <TextAreaField
          label="Empty State Description"
          value={books.emptyState.body}
          onChange={(e) => updateEmptyState({ body: e.target.value })}
          rows={2}
          placeholder="A book will be featured here when one is selected."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
          <TextInput
            label="Button Text"
            value={books.emptyState.ctaText}
            onChange={(e) => updateEmptyState({ ctaText: e.target.value })}
            placeholder="Explore the walking practice"
          />
          <TextInput
            label="Button Link"
            value={books.emptyState.ctaHref}
            onChange={(e) => updateEmptyState({ ctaHref: e.target.value })}
            placeholder="/practice"
          />
        </div>
      </SectionCard>
    </div>
  );
}

