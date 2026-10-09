import React from 'react';
import { useCMS } from '../../../cms/cmsContext';
import { TextInput, TextAreaField, SectionCard } from '../../../components/admin/FormField';
import { ImageField } from '../../../components/admin/ImageField';
import { DEFAULT_PHOTOS } from '../../../cms/mediaLibrary';
import { Plus, Trash2 } from 'lucide-react';

export function SisterhoodEditor() {
  const { content, updateSection } = useCMS();
  const { sisterhood } = content;

  const updateSisterhood = (data: Partial<typeof sisterhood>) => {
    updateSection('sisterhood', data);
  };

  const updateHero = (data: Partial<typeof sisterhood.hero>) => {
    updateSisterhood({ hero: { ...sisterhood.hero, ...data } });
  };

  const updateWalk = (data: Partial<typeof sisterhood.walkSection>) => {
    updateSisterhood({ walkSection: { ...sisterhood.walkSection, ...data } });
  };

  const updateIntro = (data: Partial<typeof sisterhood.pageIntro>) => {
    updateSisterhood({ pageIntro: { ...sisterhood.pageIntro, ...data } });
  };

  const handleParagraphChange = (index: number, val: string) => {
    const newParas = [...sisterhood.pageIntro.paragraphs];
    newParas[index] = val;
    updateIntro({ paragraphs: newParas });
  };

  const handleAddParagraph = () => {
    updateIntro({
      paragraphs: [...sisterhood.pageIntro.paragraphs, 'New paragraph content here...'],
    });
  };

  const handleDeleteParagraph = (index: number) => {
    updateIntro({
      paragraphs: sisterhood.pageIntro.paragraphs.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="space-y-6">
      {/* Hero */}
      <SectionCard title="1. Sisterhood Hero Banner" subtitle="The top hero banner for the sisterhood page">
        <ImageField
          label="Hero Background Photo"
          value={sisterhood.hero.photo}
          onChange={(url) => updateHero({ photo: url })}
          defaultFallback={DEFAULT_PHOTOS.prayer}
          description="Background image for the sisterhood hero banner"
        />
        <TextInput
          label="Eyebrow"
          value={sisterhood.hero.eyebrow}
          onChange={(e) => updateHero({ eyebrow: e.target.value })}
          placeholder="Sisterhood, without the pressure"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <TextInput
            label="Heading Line 1"
            value={sisterhood.hero.headingLine1}
            onChange={(e) => updateHero({ headingLine1: e.target.value })}
            placeholder="Not a race."
          />
          <TextInput
            label="Heading Line 2"
            value={sisterhood.hero.headingLine2}
            onChange={(e) => updateHero({ headingLine2: e.target.value })}
            placeholder="Not a performance."
          />
          <TextInput
            label="Heading Emphasized"
            value={sisterhood.hero.headingEmphasized}
            onChange={(e) => updateHero({ headingEmphasized: e.target.value })}
            placeholder="A shared way."
          />
        </div>
        <TextAreaField
          label="Intro"
          value={sisterhood.hero.intro}
          onChange={(e) => updateHero({ intro: e.target.value })}
          rows={2}
          placeholder="Some days we talk. Some days we let the quiet do its work..."
        />
      </SectionCard>

      {/* Walk Section */}
      <SectionCard
        title="2. Walk & Fellowship Feature Section"
        subtitle="Side-by-side photo with caption, narrative copy, and blockquote"
      >
        <ImageField
          label="Sisters Walk Photo"
          value={sisterhood.walkSection.photo}
          onChange={(url) => updateWalk({ photo: url })}
          defaultFallback={DEFAULT_PHOTOS.walking}
          description="Photo showing women walking together"
          altText={sisterhood.walkSection.photoAlt}
          onAltChange={(alt) => updateWalk({ photoAlt: alt })}
        />
        <TextInput
          label="Image Caption Badge"
          value={sisterhood.walkSection.imageCaption}
          onChange={(e) => updateWalk({ imageCaption: e.target.value })}
          placeholder="A circle with room for you"
        />
        <TextInput
          label="Eyebrow"
          value={sisterhood.walkSection.eyebrow}
          onChange={(e) => updateWalk({ eyebrow: e.target.value })}
          placeholder="Growing alongside one another"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <TextInput
            label="Heading Main"
            value={sisterhood.walkSection.headingMain}
            onChange={(e) => updateWalk({ headingMain: e.target.value })}
            placeholder="Make room for "
          />
          <TextInput
            label="Heading Emphasized"
            value={sisterhood.walkSection.headingEmphasized}
            onChange={(e) => updateWalk({ headingEmphasized: e.target.value })}
            placeholder="each other."
          />
        </div>
        <TextAreaField
          label="Body Copy"
          value={sisterhood.walkSection.body}
          onChange={(e) => updateWalk({ body: e.target.value })}
          rows={3}
          placeholder="We make space for joy, for honest prayer, and for each other..."
        />
        <TextInput
          label="Pull Quote Text"
          value={sisterhood.walkSection.quote}
          onChange={(e) => updateWalk({ quote: e.target.value })}
          placeholder="“We make space for joy, for honest prayer, and for each other.”"
        />
        <TextInput
          label="Quote Citation"
          value={sisterhood.walkSection.quoteCitation}
          onChange={(e) => updateWalk({ quoteCitation: e.target.value })}
          placeholder="The heart of our community"
        />
      </SectionCard>

      {/* Page Intro / Heart of Community */}
      <SectionCard title="3. Heart of Sisterhood Section" subtitle="Closing narrative section on sisterhood">
        <TextInput
          label="Eyebrow"
          value={sisterhood.pageIntro.eyebrow}
          onChange={(e) => updateIntro({ eyebrow: e.target.value })}
          placeholder="The heart of our community"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <TextInput
            label="Heading Main"
            value={sisterhood.pageIntro.headingMain}
            onChange={(e) => updateIntro({ headingMain: e.target.value })}
            placeholder="A circle where you can "
          />
          <TextInput
            label="Heading Emphasized"
            value={sisterhood.pageIntro.headingEmphasized}
            onChange={(e) => updateIntro({ headingEmphasized: e.target.value })}
            placeholder="show up as you are."
          />
        </div>

        <div className="space-y-2 pt-2">
          <span className="text-xs font-semibold text-purple-900 uppercase">Paragraphs</span>
          {sisterhood.pageIntro.paragraphs.map((p, idx) => (
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

