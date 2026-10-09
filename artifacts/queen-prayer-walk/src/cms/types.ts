export interface NavItem {
  id: string;
  label: string;
  href: string;
  enabled: boolean;
  isCta?: boolean;
}

export interface HeaderConfig {
  brandName: string;
  brandTagline: string;
  showBrandIcon: boolean;
  navItems: NavItem[];
  ctaButton: {
    label: string;
    href: string;
    enabled: boolean;
  };
}

export interface FooterConfig {
  brandName: string;
  brandTagline: string;
  copyrightText: string;
  facebookUrl: string;
  instagramUrl?: string;
  emailContact?: string;
  showFacebook: boolean;
}

export interface BottomInviteConfig {
  enabled: boolean;
  eyebrow: string;
  headingMain: string;
  headingEmphasized: string;
  ctaText: string;
  ctaHref: string;
}

export interface ThemeConfig {
  primaryColor: string; // Plum #6e5388
  plumDeep: string; // Plum deep #3c2c4c
  roseColor: string; // Rose #7b579b
  goldAccent: string; // Gold #f19145
  paperBg: string; // Paper #f7f2fc
  paperDeep: string; // Paper deep #eee5f7
  inkColor: string; // Ink #34283f
  fontSans: string; // 'DM Sans', sans-serif
  fontSerif: string; // 'Playfair Display', Georgia, serif
  borderRadius: string; // 1rem
}

export interface HomeHeroConfig {
  photo: string;
  photoAlt: string;
  eyebrow: string;
  titleLine1: string;
  titleLine2: string;
  titleEmphasized: string;
  lede: string;
  primaryCtaText: string;
  primaryCtaHref: string;
  secondaryCtaText: string;
  secondaryCtaHref: string;
  sealTextTop: string;
  sealTextBottom: string;
  noteText: string;
  indexBadgeNum: string;
  indexBadgeLabel: string;
}

export interface HomeIntroConfig {
  sectionNum: string;
  sectionLabel: string;
  quote: string;
  headingMain: string;
  headingEmphasized: string;
  body: string;
  signature: string;
  ctaText: string;
  ctaHref: string;
}

export interface HomeSplitConfig {
  sectionNum: string;
  sectionLabel: string;
  headingLine1: string;
  headingLine2: string;
  body: string;
  ctaText: string;
  ctaHref: string;
  photo: string;
  photoAlt: string;
}

export interface HomeMeetingBandConfig {
  sectionNum: string;
  sectionLabel: string;
  headingLine1: string;
  headingLine2: string;
  scheduleText: string;
  ctaText: string;
  ctaHref: string;
}

export interface HomePageConfig {
  hero: HomeHeroConfig;
  marqueeText: string;
  marqueeEnabled: boolean;
  intro: HomeIntroConfig;
  split: HomeSplitConfig;
  meetingBand: HomeMeetingBandConfig;
}

export interface ValueItem {
  id: string;
  name: string;
  copy: string;
}

export interface AboutPageConfig {
  hero: {
    eyebrow: string;
    headingMain: string;
    headingEmphasized: string;
    intro: string;
    photo?: string;
  };
  purposeIntro: {
    eyebrow: string;
    headingLine1: string;
    headingEmphasized: string;
    paragraphs: string[];
  };
  values: {
    eyebrow: string;
    headingMain: string;
    headingEmphasized: string;
    items: ValueItem[];
    quote: string;
    citation: string;
  };
  scripture: {
    eyebrow: string;
    quote: string;
    citation: string;
    note: string;
  };
}

export interface PracticeStep {
  id: string;
  number: string;
  icon: 'footprints' | 'heart' | 'book' | 'leaf' | 'flower' | 'sparkles' | 'sun';
  heading: string;
  text: string;
}

export interface PracticePageConfig {
  hero: {
    eyebrow: string;
    headingLine1: string;
    headingEmphasized: string;
    intro: string;
    photo: string;
  };
  head: {
    eyebrow: string;
    heading: string;
    intro: string;
  };
  steps: PracticeStep[];
  promiseIntro: {
    eyebrow: string;
    quote: string;
    citation: string;
    note: string;
    ctaText: string;
    ctaHref: string;
  };
}

export interface SisterhoodPageConfig {
  hero: {
    eyebrow: string;
    headingLine1: string;
    headingLine2: string;
    headingEmphasized: string;
    intro: string;
    photo: string;
  };
  walkSection: {
    photo: string;
    photoAlt: string;
    imageCaption: string;
    eyebrow: string;
    headingMain: string;
    headingEmphasized: string;
    body: string;
    quote: string;
    quoteCitation: string;
  };
  pageIntro: {
    eyebrow: string;
    headingMain: string;
    headingEmphasized: string;
    paragraphs: string[];
  };
}

export interface MeetingsPageConfig {
  hero: {
    eyebrow: string;
    headingLine1: string;
    headingLine2: string;
    headingEmphasized: string;
    intro: string;
    photo?: string;
  };
  card: {
    eyebrow: string;
    scheduleHeading: string;
    body: string;
    ctaText: string;
    ctaHref: string;
  };
  pageIntro: {
    eyebrow: string;
    headingLine1: string;
    headingEmphasized: string;
    paragraphs: string[];
  };
}

export interface NewsArticle {
  id: string;
  title: string;
  date: string;
  category: string;
  summary: string;
  content: string;
  image?: string;
  author?: string;
  published: boolean;
}

export interface NewsPageConfig {
  hero: {
    eyebrow: string;
    headingLine1: string;
    headingEmphasized: string;
    intro: string;
    photo?: string;
  };
  emptyState: {
    eyebrow: string;
    heading: string;
    body: string;
    ctaText: string;
    ctaHref: string;
  };
  articles: NewsArticle[];
}

export interface BookItem {
  id: string;
  title: string;
  author: string;
  description: string;
  coverImage?: string;
  link?: string;
  linkText?: string;
  tag?: string;
}

export interface BooksPageConfig {
  hero: {
    eyebrow: string;
    headingLine1: string;
    headingEmphasized: string;
    intro: string;
    photo?: string;
  };
  emptyState: {
    eyebrow: string;
    heading: string;
    body: string;
    ctaText: string;
    ctaHref: string;
  };
  books: BookItem[];
}

export interface JoinPageConfig {
  hero: {
    eyebrow: string;
    headingLine1: string;
    headingEmphasized: string;
    intro: string;
    photo?: string;
  };
  stepIntro: {
    eyebrow: string;
    headingLine1: string;
    headingEmphasized: string;
    body: string;
  };
  stepPanel: {
    eyebrow: string;
    heading: string;
    body: string;
    buttonLabel: string;
    buttonUrl: string;
  };
  joinNote: {
    text: string;
  };
}

export interface PageMetaConfig {
  title: string;
  description: string;
}

export interface SiteContent {
  header: HeaderConfig;
  footer: FooterConfig;
  bottomInvite: BottomInviteConfig;
  theme: ThemeConfig;
  home: HomePageConfig;
  about: AboutPageConfig;
  practice: PracticePageConfig;
  sisterhood: SisterhoodPageConfig;
  meetings: MeetingsPageConfig;
  news: NewsPageConfig;
  books: BooksPageConfig;
  join: JoinPageConfig;
  meta: Record<string, PageMetaConfig>;
}

