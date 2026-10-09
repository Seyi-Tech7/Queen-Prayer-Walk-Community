import React from 'react';
import { useCMS } from '../../../cms/cmsContext';
import { TextInput, TextAreaField, SectionCard } from '../../../components/admin/FormField';
import { ImageField } from '../../../components/admin/ImageField';
import { DEFAULT_PHOTOS } from '../../../cms/mediaLibrary';
import { Plus, Trash2 } from 'lucide-react';
import type { PracticeStep } from '../../../cms/types';

export function PracticeEditor() {
  const { content, updateSection } = useCMS();
  const { practice } = content;

  const updatePractice = (data: Partial<typeof practice>) => {
    updateSection('practice', data);
  };

  const updateHero = (data: Partial<typeof practice.hero>) => {
    updatePractice({ hero: { ...practice.hero, ...data } });
  };

  const updateHead = (data: Partial<typeof practice.head>) => {
    updatePractice({ head: { ...practice.head, ...data } });
  };

  const updatePromise = (data: Partial<typeof practice.promiseIntro>) => {
    updatePractice({ promiseIntro: { ...practice.promiseIntro, ...data } });
  };

  const handleStepChange = (index: number, field: keyof PracticeStep, val: any) => {
    const newSteps = [...practice.steps];
    newSteps[index] = { ...newSteps[index], [field]: val };
    updatePractice({ steps: newSteps });
  };

  const handleAddStep = () => {
    const stepNum = practice.steps.length + 1;
    const formattedNum = stepNum < 10 ? `0${stepNum}` : `${stepNum}`;
    updatePractice({
      steps: [
        ...practice.steps,
        {
          id: `step-${Date.now()}`,
          number: `${formattedNum} / STEP`,
          icon: 'leaf',
          heading: 'New Step Title',
          text: 'Describe what sisters do during this step of the prayer walk...',
        },
      ],
    });
  };

  const handleDeleteStep = (index: number) => {
    updatePractice({
      steps: practice.steps.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="space-y-6">
      {/* Hero */}
      <SectionCard title="1. Practice Page Hero" subtitle="Hero banner with background image and headline">
        <ImageField
          label="Hero Background Photo"
          value={practice.hero.photo}
          onChange={(url) => updateHero({ photo: url })}
          defaultFallback={DEFAULT_PHOTOS.walking}
          description="Background image for the practice hero banner"
        />
        <TextInput
          label="Eyebrow"
          value={practice.hero.eyebrow}
          onChange={(e) => updateHero({ eyebrow: e.target.value })}
          placeholder="A simple rhythm"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <TextInput
            label="Heading Line 1"
            value={practice.hero.headingLine1}
            onChange={(e) => updateHero({ headingLine1: e.target.value })}
            placeholder="Room to breathe."
          />
          <TextInput
            label="Heading Emphasized"
            value={practice.hero.headingEmphasized}
            onChange={(e) => updateHero({ headingEmphasized: e.target.value })}
            placeholder="Room to believe."
          />
        </div>
        <TextAreaField
          label="Intro Narrative"
          value={practice.hero.intro}
          onChange={(e) => updateHero({ intro: e.target.value })}
          rows={2}
          placeholder="No perfect words or quick answers needed..."
        />
      </SectionCard>

      {/* Head */}
      <SectionCard title="2. Steps Grid Header" subtitle="The introduction text above the practice steps cards">
        <TextInput
          label="Section Eyebrow"
          value={practice.head.eyebrow}
          onChange={(e) => updateHead({ eyebrow: e.target.value })}
          placeholder="A gentle way to begin"
        />
        <TextInput
          label="Main Heading"
          value={practice.head.heading}
          onChange={(e) => updateHead({ heading: e.target.value })}
          placeholder="There is no perfect pace."
        />
        <TextInput
          label="Intro Subtitle"
          value={practice.head.intro}
          onChange={(e) => updateHead({ intro: e.target.value })}
          placeholder="Walking prayer can be quiet, spoken, shared, or simply carried in your heart."
        />
      </SectionCard>

      {/* Practice Steps */}
      <SectionCard
        title={`3. Practice Steps Cards (${practice.steps.length})`}
        subtitle="Manage the 3 steps of the prayer walk: Arrive, Walk, Pray, or add custom steps"
      >
        <div className="space-y-3">
          {practice.steps.map((step, idx) => (
            <div
              key={step.id}
              className="p-3.5 bg-purple-50/50 border border-purple-100 rounded-xl space-y-2.5"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 flex-1">
                  <input
                    type="text"
                    value={step.number}
                    onChange={(e) => handleStepChange(idx, 'number', e.target.value)}
                    placeholder="01 / ARRIVE"
                    className="font-mono text-xs font-bold px-2 py-1 bg-white border border-purple-200 rounded-lg text-purple-900"
                  />
                  <input
                    type="text"
                    value={step.heading}
                    onChange={(e) => handleStepChange(idx, 'heading', e.target.value)}
                    placeholder="Step Title"
                    className="font-semibold text-xs px-2 py-1 bg-white border border-purple-200 rounded-lg text-purple-950 sm:col-span-2"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={step.icon}
                    onChange={(e) => handleStepChange(idx, 'icon', e.target.value as any)}
                    className="text-xs bg-white border border-purple-200 rounded-lg px-2 py-1 text-purple-900"
                  >
                    <option value="footprints">Footprints</option>
                    <option value="heart">Heart</option>
                    <option value="book">Book</option>
                    <option value="leaf">Leaf</option>
                    <option value="flower">Flower</option>
                    <option value="sparkles">Sparkles</option>
                    <option value="sun">Sun</option>
                  </select>

                  <button
                    type="button"
                    onClick={() => handleDeleteStep(idx)}
                    className="p-1 text-red-500 hover:bg-red-50 rounded-lg cursor-pointer"
                    title="Delete step"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>

              <textarea
                value={step.text}
                onChange={(e) => handleStepChange(idx, 'text', e.target.value)}
                rows={2}
                className="w-full p-2 text-xs bg-white border border-purple-200 rounded-lg text-purple-950"
                placeholder="Step description..."
              />
            </div>
          ))}

          <button
            type="button"
            onClick={handleAddStep}
            className="w-full py-2 border-2 border-dashed border-purple-200 hover:border-purple-400 text-purple-700 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer"
          >
            <Plus size={14} /> Add Another Practice Step
          </button>
        </div>
      </SectionCard>

      {/* Promise Scripture Section */}
      <SectionCard title="4. Scripture Promise & CTA" subtitle="Callout box at the bottom of the practice page">
        <TextInput
          label="Eyebrow"
          value={practice.promiseIntro.eyebrow}
          onChange={(e) => updatePromise({ eyebrow: e.target.value })}
          placeholder="A promise for the journey"
        />
        <TextInput
          label="Scripture Quote"
          value={practice.promiseIntro.quote}
          onChange={(e) => updatePromise({ quote: e.target.value })}
          placeholder="“For where two or three gather in my name, there am I with them.”"
        />
        <TextInput
          label="Citation"
          value={practice.promiseIntro.citation}
          onChange={(e) => updatePromise({ citation: e.target.value })}
          placeholder="Matthew 18:20 · NIV"
        />
        <TextInput
          label="Note"
          value={practice.promiseIntro.note}
          onChange={(e) => updatePromise({ note: e.target.value })}
          placeholder="A quiet reminder: even the smallest gathering can hold a holy kind of strength."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
          <TextInput
            label="Button Text"
            value={practice.promiseIntro.ctaText}
            onChange={(e) => updatePromise({ ctaText: e.target.value })}
            placeholder="See meeting details"
          />
          <TextInput
            label="Button Link"
            value={practice.promiseIntro.ctaHref}
            onChange={(e) => updatePromise({ ctaHref: e.target.value })}
            placeholder="/meetings"
          />
        </div>
      </SectionCard>
    </div>
  );
}

