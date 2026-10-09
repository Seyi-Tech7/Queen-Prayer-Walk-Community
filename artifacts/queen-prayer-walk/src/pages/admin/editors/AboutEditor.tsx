import React from 'react';
import { useCMS } from '../../../cms/cmsContext';
import { TextInput, TextAreaField, SectionCard } from '../../../components/admin/FormField';
import { ImageField } from '../../../components/admin/ImageField';
import { Plus, Trash2 } from 'lucide-react';

export function AboutEditor() {
  const { content, updateSection } = useCMS();
  const { about } = content;

  const updateAbout = (data: Partial<typeof about>) => {
    updateSection('about', data);
  };

  const updateHero = (data: Partial<typeof about.hero>) => {
    updateAbout({ hero: { ...about.hero, ...data } });
  };

  const updatePurpose = (data: Partial<typeof about.purposeIntro>) => {
    updateAbout({ purposeIntro: { ...about.purposeIntro, ...data } });
  };

  const updateValues = (data: Partial<typeof about.values>) => {
    updateAbout({ values: { ...about.values, ...data } });
  };

  const updateScripture = (data: Partial<typeof about.scripture>) => {
    updateAbout({ scripture: { ...about.scripture, ...data } });
  };

  const handleParagraphChange = (index: number, val: string) => {
    const newParas = [...about.purposeIntro.paragraphs];
    newParas[index] = val;
    updatePurpose({ paragraphs: newParas });
  };

  const handleAddParagraph = () => {
    updatePurpose({
      paragraphs: [...about.purposeIntro.paragraphs, 'New paragraph content here...'],
    });
  };

  const handleDeleteParagraph = (index: number) => {
    updatePurpose({
      paragraphs: about.purposeIntro.paragraphs.filter((_, i) => i !== index),
    });
  };

  const handleValueChange = (index: number, field: 'name' | 'copy', val: string) => {
    const newItems = [...about.values.items];
    newItems[index] = { ...newItems[index], [field]: val };
    updateValues({ items: newItems });
  };

  const handleAddValue = () => {
    updateValues({
      items: [
        ...about.values.items,
        {
          id: `val-${Date.now()}`,
          name: 'New Value',
          copy: 'Describe this core value here...',
        },
      ],
    });
  };

  const handleDeleteValue = (index: number) => {
    updateValues({
      items: about.values.items.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="space-y-6">
      {/* Hero */}
      <SectionCard title="1. Page Hero Banner" subtitle="The top hero banner introducing the About page">
        <TextInput
          label="Eyebrow"
          value={about.hero.eyebrow}
          onChange={(e) => updateHero({ eyebrow: e.target.value })}
          placeholder="Why we walk"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <TextInput
            label="Heading Main"
            value={about.hero.headingMain}
            onChange={(e) => updateHero({ headingMain: e.target.value })}
            placeholder="A place to bring your whole self — "
          />
          <TextInput
            label="Heading Emphasized"
            value={about.hero.headingEmphasized}
            onChange={(e) => updateHero({ headingEmphasized: e.target.value })}
            placeholder="and take the next step."
          />
        </div>
        <TextAreaField
          label="Hero Intro"
          value={about.hero.intro}
          onChange={(e) => updateHero({ intro: e.target.value })}
          rows={2}
          placeholder="Queen Prayer Walking Community is a welcoming circle..."
        />
        <ImageField
          label="Optional Hero Background Image"
          value={about.hero.photo || ''}
          onChange={(url) => updateHero({ photo: url })}
          description="Leave blank for pure colored gradient or select a photo"
        />
      </SectionCard>

      {/* Purpose Intro */}
      <SectionCard title="2. Purpose Intro Section" subtitle="Walk gently, pray boldly narrative text">
        <TextInput
          label="Eyebrow"
          value={about.purposeIntro.eyebrow}
          onChange={(e) => updatePurpose({ eyebrow: e.target.value })}
          placeholder="Our purpose"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <TextInput
            label="Heading Line 1"
            value={about.purposeIntro.headingLine1}
            onChange={(e) => updatePurpose({ headingLine1: e.target.value })}
            placeholder="Walk gently."
          />
          <TextInput
            label="Heading Emphasized"
            value={about.purposeIntro.headingEmphasized}
            onChange={(e) => updatePurpose({ headingEmphasized: e.target.value })}
            placeholder="Pray boldly."
          />
        </div>

        <div className="space-y-2 pt-2">
          <span className="text-xs font-semibold text-purple-900 uppercase">Paragraphs</span>
          {about.purposeIntro.paragraphs.map((p, idx) => (
            <div key={idx} className="flex gap-2 items-start">
              <textarea
                value={p}
                onChange={(e) => handleParagraphChange(idx, e.target.value)}
                rows={2}
                className="flex-1 p-2.5 text-xs bg-white border border-purple-200 rounded-lg text-purple-950"
              />
              <button
                type="button"
                onClick={() => handleDeleteParagraph(idx)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition cursor-pointer"
                title="Delete paragraph"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddParagraph}
            className="py-1.5 px-3 border border-dashed border-purple-300 text-purple-700 hover:bg-purple-50 rounded-lg text-xs font-medium inline-flex items-center gap-1 cursor-pointer"
          >
            <Plus size={13} /> Add Paragraph
          </button>
        </div>
      </SectionCard>

      {/* Values Section */}
      <SectionCard title="3. Values Section" subtitle="What we hold close & core values list">
        <TextInput
          label="Eyebrow"
          value={about.values.eyebrow}
          onChange={(e) => updateValues({ eyebrow: e.target.value })}
          placeholder="What we hold close"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <TextInput
            label="Heading Main"
            value={about.values.headingMain}
            onChange={(e) => updateValues({ headingMain: e.target.value })}
            placeholder="A faith that feels like "
          />
          <TextInput
            label="Heading Emphasized"
            value={about.values.headingEmphasized}
            onChange={(e) => updateValues({ headingEmphasized: e.target.value })}
            placeholder="an open door."
          />
        </div>

        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-purple-900 uppercase">
              Core Values ({about.values.items.length})
            </span>
            <button
              type="button"
              onClick={handleAddValue}
              className="py-1 px-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-medium inline-flex items-center gap-1 cursor-pointer"
            >
              <Plus size={12} /> Add Value
            </button>
          </div>

          {about.values.items.map((val, idx) => (
            <div
              key={val.id}
              className="p-3 bg-purple-50/50 border border-purple-100 rounded-xl space-y-2 relative"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-purple-700">0{idx + 1}</span>
                  <input
                    type="text"
                    value={val.name}
                    onChange={(e) => handleValueChange(idx, 'name', e.target.value)}
                    className="font-semibold text-sm px-2 py-1 bg-white border border-purple-200 rounded-lg text-purple-950"
                    placeholder="Value Name"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleDeleteValue(idx)}
                  className="p-1 text-red-500 hover:bg-red-50 rounded-lg cursor-pointer"
                  title="Delete Value"
                >
                  <Trash2 size={13} />
                </button>
              </div>
              <textarea
                value={val.copy}
                onChange={(e) => handleValueChange(idx, 'copy', e.target.value)}
                rows={2}
                className="w-full p-2 text-xs bg-white border border-purple-200 rounded-lg text-purple-950"
                placeholder="Description of this value..."
              />
            </div>
          ))}
        </div>

        <div className="pt-3 border-t border-purple-100 space-y-3">
          <TextInput
            label="Side Note Quote"
            value={about.values.quote}
            onChange={(e) => updateValues({ quote: e.target.value })}
            placeholder="“Let us consider how we may spur one another on toward love and good deeds.”"
          />
          <TextInput
            label="Side Note Citation"
            value={about.values.citation}
            onChange={(e) => updateValues({ citation: e.target.value })}
            placeholder="Hebrews 10:24 · A verse for the road"
          />
        </div>
      </SectionCard>

      {/* Scripture Banner */}
      <SectionCard title="4. Scripture Banner" subtitle="The closing scripture reflection section">
        <TextInput
          label="Eyebrow"
          value={about.scripture.eyebrow}
          onChange={(e) => updateScripture({ eyebrow: e.target.value })}
          placeholder="A promise for the journey"
        />
        <TextInput
          label="Scripture Verse Text"
          value={about.scripture.quote}
          onChange={(e) => updateScripture({ quote: e.target.value })}
          placeholder="“For where two or three gather in my name, there am I with them.”"
        />
        <TextInput
          label="Citation"
          value={about.scripture.citation}
          onChange={(e) => updateScripture({ citation: e.target.value })}
          placeholder="Matthew 18:20 · NIV"
        />
        <TextInput
          label="Reflective Note"
          value={about.scripture.note}
          onChange={(e) => updateScripture({ note: e.target.value })}
          placeholder="A quiet reminder: even the smallest gathering can hold a holy kind of strength."
        />
      </SectionCard>
    </div>
  );
}

