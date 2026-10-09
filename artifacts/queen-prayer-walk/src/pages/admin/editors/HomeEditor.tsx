import React from 'react';
import { useCMS } from '../../../cms/cmsContext';
import { TextInput, TextAreaField, ToggleField, SectionCard } from '../../../components/admin/FormField';
import { ImageField } from '../../../components/admin/ImageField';
import { DEFAULT_PHOTOS } from '../../../cms/mediaLibrary';

export function HomeEditor() {
  const { content, updateSection } = useCMS();
  const { home } = content;

  const updateHome = (data: Partial<typeof home>) => {
    updateSection('home', data);
  };

  const updateHero = (data: Partial<typeof home.hero>) => {
    updateHome({ hero: { ...home.hero, ...data } });
  };

  const updateIntro = (data: Partial<typeof home.intro>) => {
    updateHome({ intro: { ...home.intro, ...data } });
  };

  const updateSplit = (data: Partial<typeof home.split>) => {
    updateHome({ split: { ...home.split, ...data } });
  };

  const updateMeetingBand = (data: Partial<typeof home.meetingBand>) => {
    updateHome({ meetingBand: { ...home.meetingBand, ...data } });
  };

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <SectionCard
        title="1. Hero Section"
        subtitle="The top header banner with background photo, headlines, actions, and badges"
        badge="Top Section"
      >
        <ImageField
          label="Hero Background Photo"
          value={home.hero.photo}
          onChange={(url) => updateHero({ photo: url })}
          defaultFallback={DEFAULT_PHOTOS.hero}
          description="High quality photo of sisters or outdoor walking path"
          altText={home.hero.photoAlt}
          onAltChange={(alt) => updateHero({ photoAlt: alt })}
        />

        <TextInput
          label="Eyebrow Tagline"
          value={home.hero.eyebrow}
          onChange={(e) => updateHero({ eyebrow: e.target.value })}
          placeholder="A community for women, in motion"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <TextInput
            label="Title Line 1"
            value={home.hero.titleLine1}
            onChange={(e) => updateHero({ titleLine1: e.target.value })}
            placeholder="Walk in faith."
          />
          <TextInput
            label="Title Line 2 Prefix"
            value={home.hero.titleLine2}
            onChange={(e) => updateHero({ titleLine2: e.target.value })}
            placeholder="Pray in "
          />
          <TextInput
            label="Emphasized / Italic Words"
            value={home.hero.titleEmphasized}
            onChange={(e) => updateHero({ titleEmphasized: e.target.value })}
            placeholder="good company."
          />
        </div>

        <TextAreaField
          label="Hero Lede / Intro Description"
          value={home.hero.lede}
          onChange={(e) => updateHero({ lede: e.target.value })}
          rows={3}
          placeholder="A little fresh air. A little prayer..."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-3 bg-purple-50/40 rounded-xl border border-purple-100">
          <div className="space-y-2">
            <span className="text-xs font-bold text-purple-900 uppercase">Primary Button</span>
            <TextInput
              label="Button Text"
              value={home.hero.primaryCtaText}
              onChange={(e) => updateHero({ primaryCtaText: e.target.value })}
              placeholder="Find your first step"
            />
            <TextInput
              label="Target Link"
              value={home.hero.primaryCtaHref}
              onChange={(e) => updateHero({ primaryCtaHref: e.target.value })}
              placeholder="/join"
            />
          </div>
          <div className="space-y-2">
            <span className="text-xs font-bold text-purple-900 uppercase">Secondary Link</span>
            <TextInput
              label="Link Text"
              value={home.hero.secondaryCtaText}
              onChange={(e) => updateHero({ secondaryCtaText: e.target.value })}
              placeholder="Get to know us"
            />
            <TextInput
              label="Target Link"
              value={home.hero.secondaryCtaHref}
              onChange={(e) => updateHero({ secondaryCtaHref: e.target.value })}
              placeholder="/about"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
          <TextInput
            label="Hero Seal Top Line"
            value={home.hero.sealTextTop}
            onChange={(e) => updateHero({ sealTextTop: e.target.value })}
            placeholder="Rooted in faith"
          />
          <TextInput
            label="Hero Seal Bottom Line"
            value={home.hero.sealTextBottom}
            onChange={(e) => updateHero({ sealTextBottom: e.target.value })}
            placeholder="Growing together"
          />
          <TextInput
            label="Hero Corner Note"
            value={home.hero.noteText}
            onChange={(e) => updateHero({ noteText: e.target.value })}
            placeholder="A slower pace. A fuller heart."
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <TextInput
            label="Index Badge Number"
            value={home.hero.indexBadgeNum}
            onChange={(e) => updateHero({ indexBadgeNum: e.target.value })}
            placeholder="01"
          />
          <TextInput
            label="Index Badge Label"
            value={home.hero.indexBadgeLabel}
            onChange={(e) => updateHero({ indexBadgeLabel: e.target.value })}
            placeholder="A path we share"
          />
        </div>
      </SectionCard>

      {/* Marquee Banner */}
      <SectionCard title="2. Marquee Ribbon" subtitle="The scrolling or highlight banner right below the hero">
        <ToggleField
          label="Enable Marquee Ribbon"
          description="Display the horizontal ribbon divider"
          checked={home.marqueeEnabled}
          onChange={(checked) => updateHome({ marqueeEnabled: checked })}
        />
        {home.marqueeEnabled && (
          <TextInput
            label="Ribbon Text"
            value={home.marqueeText}
            onChange={(e) => updateHome({ marqueeText: e.target.value })}
            placeholder="Faith · Fellowship · Hope · A path we share"
          />
        )}
      </SectionCard>

      {/* Intro Section ("Why we walk") */}
      <SectionCard
        title="3. Intro Section: Why We Walk"
        subtitle="The welcoming grid with side quote, main manifesto copy, and signature"
        badge="Section 02"
      >
        <div className="grid grid-cols-2 gap-3">
          <TextInput
            label="Section Marker Number"
            value={home.intro.sectionNum}
            onChange={(e) => updateIntro({ sectionNum: e.target.value })}
            placeholder="02"
          />
          <TextInput
            label="Section Marker Label"
            value={home.intro.sectionLabel}
            onChange={(e) => updateIntro({ sectionLabel: e.target.value })}
            placeholder="Why we walk"
          />
        </div>

        <TextInput
          label="Side Quote"
          value={home.intro.quote}
          onChange={(e) => updateIntro({ quote: e.target.value })}
          placeholder="“Sometimes the prayer begins with simply showing up.”"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <TextInput
            label="Main Heading Prefix"
            value={home.intro.headingMain}
            onChange={(e) => updateIntro({ headingMain: e.target.value })}
            placeholder="A place to bring your whole self — "
          />
          <TextInput
            label="Heading Emphasized Text"
            value={home.intro.headingEmphasized}
            onChange={(e) => updateIntro({ headingEmphasized: e.target.value })}
            placeholder="and take the next step."
          />
        </div>

        <TextAreaField
          label="Body Narrative"
          value={home.intro.body}
          onChange={(e) => updateIntro({ body: e.target.value })}
          rows={3}
          placeholder="Queen Prayer Walking Community is a welcoming circle..."
        />

        <TextInput
          label="Signature Line"
          value={home.intro.signature}
          onChange={(e) => updateIntro({ signature: e.target.value })}
          placeholder="Walk gently. Pray boldly."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
          <TextInput
            label="Button Text"
            value={home.intro.ctaText}
            onChange={(e) => updateIntro({ ctaText: e.target.value })}
            placeholder="Our heart and values"
          />
          <TextInput
            label="Button Destination"
            value={home.intro.ctaHref}
            onChange={(e) => updateIntro({ ctaHref: e.target.value })}
            placeholder="/about"
          />
        </div>
      </SectionCard>

      {/* Split Section ("A simple rhythm") */}
      <SectionCard
        title="4. Split Section: A Simple Rhythm"
        subtitle="Side-by-side feature block with image and rhythm copy"
        badge="Section 03"
      >
        <ImageField
          label="Feature Photo"
          value={home.split.photo}
          onChange={(url) => updateSplit({ photo: url })}
          defaultFallback={DEFAULT_PHOTOS.prayer}
          description="Photo depicting quiet fellowship, prayer, or nature"
          altText={home.split.photoAlt}
          onAltChange={(alt) => updateSplit({ photoAlt: alt })}
        />

        <div className="grid grid-cols-2 gap-3">
          <TextInput
            label="Section Number"
            value={home.split.sectionNum}
            onChange={(e) => updateSplit({ sectionNum: e.target.value })}
            placeholder="03"
          />
          <TextInput
            label="Section Label"
            value={home.split.sectionLabel}
            onChange={(e) => updateSplit({ sectionLabel: e.target.value })}
            placeholder="A simple rhythm"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <TextInput
            label="Heading Line 1"
            value={home.split.headingLine1}
            onChange={(e) => updateSplit({ headingLine1: e.target.value })}
            placeholder="Room to breathe."
          />
          <TextInput
            label="Heading Line 2"
            value={home.split.headingLine2}
            onChange={(e) => updateSplit({ headingLine2: e.target.value })}
            placeholder="Room to believe."
          />
        </div>

        <TextAreaField
          label="Description Text"
          value={home.split.body}
          onChange={(e) => updateSplit({ body: e.target.value })}
          rows={2}
          placeholder="No perfect words or quick answers needed..."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <TextInput
            label="CTA Button Text"
            value={home.split.ctaText}
            onChange={(e) => updateSplit({ ctaText: e.target.value })}
            placeholder="Explore the practice"
          />
          <TextInput
            label="CTA Button Link"
            value={home.split.ctaHref}
            onChange={(e) => updateSplit({ ctaHref: e.target.value })}
            placeholder="/practice"
          />
        </div>
      </SectionCard>

      {/* Meeting Band Section */}
      <SectionCard
        title="5. Meeting Announcement Band"
        subtitle="Highlighted schedule announcement block"
        badge="Section 04"
      >
        <div className="grid grid-cols-2 gap-3">
          <TextInput
            label="Section Number"
            value={home.meetingBand.sectionNum}
            onChange={(e) => updateMeetingBand({ sectionNum: e.target.value })}
            placeholder="04"
          />
          <TextInput
            label="Section Label"
            value={home.meetingBand.sectionLabel}
            onChange={(e) => updateMeetingBand({ sectionLabel: e.target.value })}
            placeholder="A regular moment together"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <TextInput
            label="Heading Line 1"
            value={home.meetingBand.headingLine1}
            onChange={(e) => updateMeetingBand({ headingLine1: e.target.value })}
            placeholder="Make a little room"
          />
          <TextInput
            label="Heading Line 2"
            value={home.meetingBand.headingLine2}
            onChange={(e) => updateMeetingBand({ headingLine2: e.target.value })}
            placeholder="in your month."
          />
        </div>

        <TextInput
          label="Meeting Schedule Highlight Text"
          value={home.meetingBand.scheduleText}
          onChange={(e) => updateMeetingBand({ scheduleText: e.target.value })}
          placeholder="Every last Sunday of the month at 9:00 AM."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <TextInput
            label="Button Text"
            value={home.meetingBand.ctaText}
            onChange={(e) => updateMeetingBand({ ctaText: e.target.value })}
            placeholder="Meeting details"
          />
          <TextInput
            label="Button Link"
            value={home.meetingBand.ctaHref}
            onChange={(e) => updateMeetingBand({ ctaHref: e.target.value })}
            placeholder="/meetings"
          />
        </div>
      </SectionCard>
    </div>
  );
}

