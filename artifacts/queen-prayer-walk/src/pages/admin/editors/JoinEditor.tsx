import React from 'react';
import { useCMS } from '../../../cms/cmsContext';
import { TextInput, TextAreaField, SectionCard } from '../../../components/admin/FormField';
import { ImageField } from '../../../components/admin/ImageField';

export function JoinEditor() {
  const { content, updateSection } = useCMS();
  const { join } = content;

  const updateJoin = (data: Partial<typeof join>) => {
    updateSection('join', data);
  };

  const updateHero = (data: Partial<typeof join.hero>) => {
    updateJoin({ hero: { ...join.hero, ...data } });
  };

  const updateStepIntro = (data: Partial<typeof join.stepIntro>) => {
    updateJoin({ stepIntro: { ...join.stepIntro, ...data } });
  };

  const updateStepPanel = (data: Partial<typeof join.stepPanel>) => {
    updateJoin({ stepPanel: { ...join.stepPanel, ...data } });
  };

  const updateJoinNote = (data: Partial<typeof join.joinNote>) => {
    updateJoin({ joinNote: { ...join.joinNote, ...data } });
  };

  return (
    <div className="space-y-6">
      {/* Hero */}
      <SectionCard title="1. Join Page Hero" subtitle="The top hero banner for invitation and joining">
        <TextInput
          label="Eyebrow"
          value={join.hero.eyebrow}
          onChange={(e) => updateHero({ eyebrow: e.target.value })}
          placeholder="A gentle invitation"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <TextInput
            label="Heading Line 1"
            value={join.hero.headingLine1}
            onChange={(e) => updateHero({ headingLine1: e.target.value })}
            placeholder="Let curiosity"
          />
          <TextInput
            label="Heading Emphasized"
            value={join.hero.headingEmphasized}
            onChange={(e) => updateHero({ headingEmphasized: e.target.value })}
            placeholder="be your beginning."
          />
        </div>
        <TextAreaField
          label="Intro"
          value={join.hero.intro}
          onChange={(e) => updateHero({ intro: e.target.value })}
          rows={2}
          placeholder="You do not need a polished introduction or a perfect prayer..."
        />
        <ImageField
          label="Optional Hero Background Image"
          value={join.hero.photo || ''}
          onChange={(url) => updateHero({ photo: url })}
          description="Hero photo background (optional)"
        />
      </SectionCard>

      {/* Step Intro */}
      <SectionCard
        title="2. First Step Reflection (Left Column)"
        subtitle="The reflective introduction encouraging curiosity and intentions"
      >
        <TextInput
          label="Eyebrow"
          value={join.stepIntro.eyebrow}
          onChange={(e) => updateStepIntro({ eyebrow: e.target.value })}
          placeholder="Your next step can be small"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <TextInput
            label="Heading Line 1"
            value={join.stepIntro.headingLine1}
            onChange={(e) => updateStepIntro({ headingLine1: e.target.value })}
            placeholder="A breath."
          />
          <TextInput
            label="Heading Emphasized"
            value={join.stepIntro.headingEmphasized}
            onChange={(e) => updateStepIntro({ headingEmphasized: e.target.value })}
            placeholder="An intention."
          />
        </div>
        <TextAreaField
          label="Body Copy"
          value={join.stepIntro.body}
          onChange={(e) => updateStepIntro({ body: e.target.value })}
          rows={3}
          placeholder="What would you like to carry into your next walk?..."
        />
      </SectionCard>

      {/* Step Panel */}
      <SectionCard
        title="3. Invitation Callout Panel (Right Column)"
        subtitle="The invitation notice and Facebook link button"
      >
        <TextInput
          label="Panel Eyebrow"
          value={join.stepPanel.eyebrow}
          onChange={(e) => updateStepPanel({ eyebrow: e.target.value })}
          placeholder="Joining the community"
        />
        <TextInput
          label="Panel Heading"
          value={join.stepPanel.heading}
          onChange={(e) => updateStepPanel({ heading: e.target.value })}
          placeholder="Joining is by invitation."
        />
        <TextAreaField
          label="Panel Description"
          value={join.stepPanel.body}
          onChange={(e) => updateStepPanel({ body: e.target.value })}
          rows={3}
          placeholder="If you would like to ask about joining, please use our Facebook page..."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
          <TextInput
            label="Button Label"
            value={join.stepPanel.buttonLabel}
            onChange={(e) => updateStepPanel({ buttonLabel: e.target.value })}
            placeholder="Ask about joining on Facebook"
          />
          <TextInput
            label="Facebook URL"
            value={join.stepPanel.buttonUrl}
            onChange={(e) => updateStepPanel({ buttonUrl: e.target.value })}
            placeholder="https://www.facebook.com/share/..."
          />
        </div>
      </SectionCard>

      {/* Join Note */}
      <SectionCard title="4. Bottom Heart Note" subtitle="The gentle encouraging closing banner">
        <TextAreaField
          label="Closing Heart Note Text"
          value={join.joinNote.text}
          onChange={(e) => updateJoinNote({ text: e.target.value })}
          rows={2}
          placeholder="Come as you are. There is space for you to take the next step at your own pace."
        />
      </SectionCard>
    </div>
  );
}

