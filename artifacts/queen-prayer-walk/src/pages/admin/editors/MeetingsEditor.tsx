import React from 'react';
import { useCMS } from '../../../cms/cmsContext';
import { TextInput, TextAreaField, SectionCard } from '../../../components/admin/FormField';
import { ImageField } from '../../../components/admin/ImageField';
import { Plus, Trash2 } from 'lucide-react';

export function MeetingsEditor() {
  const { content, updateSection } = useCMS();
  const { meetings } = content;

  const updateMeetings = (data: Partial<typeof meetings>) => {
    updateSection('meetings', data);
  };

  const updateHero = (data: Partial<typeof meetings.hero>) => {
    updateMeetings({ hero: { ...meetings.hero, ...data } });
  };

  const updateCard = (data: Partial<typeof meetings.card>) => {
    updateMeetings({ card: { ...meetings.card, ...data } });
  };

  const updateIntro = (data: Partial<typeof meetings.pageIntro>) => {
    updateMeetings({ pageIntro: { ...meetings.pageIntro, ...data } });
  };

  const handleParagraphChange = (index: number, val: string) => {
    const newParas = [...meetings.pageIntro.paragraphs];
    newParas[index] = val;
    updateIntro({ paragraphs: newParas });
  };

  const handleAddParagraph = () => {
    updateIntro({
      paragraphs: [...meetings.pageIntro.paragraphs, 'New meeting detail note...'],
    });
  };

  const handleDeleteParagraph = (index: number) => {
    updateIntro({
      paragraphs: meetings.pageIntro.paragraphs.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="space-y-6">
      {/* Hero */}
      <SectionCard title="1. Meetings Page Hero" subtitle="The top hero banner for the meetings schedule page">
        <TextInput
          label="Eyebrow"
          value={meetings.hero.eyebrow}
          onChange={(e) => updateHero({ eyebrow: e.target.value })}
          placeholder="A moment to gather"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <TextInput
            label="Heading Line 1"
            value={meetings.hero.headingLine1}
            onChange={(e) => updateHero({ headingLine1: e.target.value })}
            placeholder="A little time"
          />
          <TextInput
            label="Heading Line 2"
            value={meetings.hero.headingLine2}
            onChange={(e) => updateHero({ headingLine2: e.target.value })}
            placeholder="to walk "
          />
          <TextInput
            label="Heading Emphasized"
            value={meetings.hero.headingEmphasized}
            onChange={(e) => updateHero({ headingEmphasized: e.target.value })}
            placeholder="together."
          />
        </div>
        <TextAreaField
          label="Intro"
          value={meetings.hero.intro}
          onChange={(e) => updateHero({ intro: e.target.value })}
          rows={2}
          placeholder="A regular rhythm gives us a chance to step away from the rush..."
        />
        <ImageField
          label="Optional Hero Background Image"
          value={meetings.hero.photo || ''}
          onChange={(url) => updateHero({ photo: url })}
          description="Leave empty for solid background or pick an image"
        />
      </SectionCard>

      {/* Meeting Card */}
      <SectionCard
        title="2. Meeting Details Card"
        subtitle="The highlighted schedule card showing monthly dates and invitation details"
      >
        <TextInput
          label="Card Eyebrow"
          value={meetings.card.eyebrow}
          onChange={(e) => updateCard({ eyebrow: e.target.value })}
          placeholder="Our meeting schedule"
        />
        <TextInput
          label="Schedule Heading"
          value={meetings.card.scheduleHeading}
          onChange={(e) => updateCard({ scheduleHeading: e.target.value })}
          placeholder="Every last Sunday of the month at 9:00 AM."
        />
        <TextAreaField
          label="Schedule Description / Guidelines"
          value={meetings.card.body}
          onChange={(e) => updateCard({ body: e.target.value })}
          rows={3}
          placeholder="We gather for a shared walk, prayer, and fellowship..."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
          <TextInput
            label="CTA Button Text"
            value={meetings.card.ctaText}
            onChange={(e) => updateCard({ ctaText: e.target.value })}
            placeholder="Ask about joining"
          />
          <TextInput
            label="CTA Button Link"
            value={meetings.card.ctaHref}
            onChange={(e) => updateCard({ ctaHref: e.target.value })}
            placeholder="/join"
          />
        </div>
      </SectionCard>

      {/* Page Intro / Rhythm */}
      <SectionCard title="3. Meeting Rhythm Reflection" subtitle="Closing encouragement note on the meetings page">
        <TextInput
          label="Eyebrow"
          value={meetings.pageIntro.eyebrow}
          onChange={(e) => updateIntro({ eyebrow: e.target.value })}
          placeholder="A shared rhythm"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <TextInput
            label="Heading Line 1"
            value={meetings.pageIntro.headingLine1}
            onChange={(e) => updateIntro({ headingLine1: e.target.value })}
            placeholder="Come with an open heart."
          />
          <TextInput
            label="Heading Emphasized"
            value={meetings.pageIntro.headingEmphasized}
            onChange={(e) => updateIntro({ headingEmphasized: e.target.value })}
            placeholder="That is enough."
          />
        </div>

        <div className="space-y-2 pt-2">
          <span className="text-xs font-semibold text-purple-900 uppercase">Paragraphs</span>
          {meetings.pageIntro.paragraphs.map((p, idx) => (
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
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg cursor-pointer"
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
    </div>
  );
}

