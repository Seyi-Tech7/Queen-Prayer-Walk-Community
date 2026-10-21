import { useEffect, useState, type ReactNode } from 'react';
import { Link, Route, Switch, useLocation } from 'wouter';
import {
  ArrowRight,
  BookOpen,
  Calendar,
  Flower2,
  Footprints,
  Heart,
  HeartHandshake,
  Leaf,
  Menu,
  Sparkles,
  Sun,
  X,
  ExternalLink,
  Lock,
  Check,
} from 'lucide-react';
import { CMSProvider, useCMS } from './cms/cmsContext';
import { InlineEditWrapper } from './components/admin/InlineEditWrapper';
import { AdminFloatingToolbar } from './components/admin/AdminFloatingToolbar';
import { AdminDashboard } from './pages/admin/AdminDashboard';

function Brand({ footer = false }: { footer?: boolean }) {
  const { content } = useCMS();
  const { header, footer: footerConfig } = content;
  const brandName = footer ? footerConfig.brandName : header.brandName;
  const brandTagline = footer ? footerConfig.brandTagline : header.brandTagline;
  const showIcon = footer ? true : header.showBrandIcon;

  return (
    <Link
      className={`brand${footer ? ' footer-brand' : ''}`}
      href="/"
      aria-label={`${brandName}, home`}
      data-testid={footer ? 'link-footer-brand' : 'link-brand'}
    >
      {showIcon && (
        <span className="brand-mark">
          <Flower2 aria-hidden="true" strokeWidth={1.45} />
        </span>
      )}
      <span className="brand-copy">
        <span className="brand-name">{brandName}</span>
        <span className="brand-sub">{brandTagline}</span>
      </span>
    </Link>
  );
}

function Header() {
  const { content } = useCMS();
  const { header } = content;
  const [menuOpen, setMenuOpen] = useState(false);
  const [location] = useLocation();

  // Close drawer on page navigation
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  // Prevent background body scroll when drawer is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const activeNavItems = header.navItems.filter((item) => item.enabled);

  return (
    <InlineEditWrapper sectionKey="header" sectionName="Header & Nav" adminTabTarget="header-footer">
      <header className="topbar">
        <div className="wrap nav-inner">
          <Brand />

          {/* Action area: CTA button + Hamburger button */}
          <div className="nav-actions">
            {header.ctaButton.enabled && (
              <Link
                className="nav-cta"
                href={header.ctaButton.href}
                data-testid="nav-join"
              >
                <span>{header.ctaButton.label}</span>
                <ArrowRight size={13} aria-hidden="true" />
              </Link>
            )}

            {/* Hamburger Button accessible across phones, tablets & laptops */}
            <button
              className="hamburger-btn"
              type="button"
              aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={menuOpen}
              aria-controls="site-navigation-drawer"
              onClick={() => setMenuOpen((open) => !open)}
              data-testid="button-hamburger-menu"
            >
              <span className="hamburger-icon-box">
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </span>
              <span className="hamburger-text">
                {menuOpen ? 'Close' : 'Menu'}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Backdrop overlay */}
      {menuOpen && (
        <div
          className="menu-drawer-backdrop"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Hamburger Navigation Drawer */}
      <aside
        id="site-navigation-drawer"
        className={`menu-drawer ${menuOpen ? 'is-open' : ''}`}
        aria-label="Site navigation menu"
        aria-hidden={!menuOpen}
      >
        <div className="menu-drawer-inner">
          {/* Drawer Header */}
          <div className="menu-drawer-header">
            <Brand />
            <button
              type="button"
              className="drawer-close-btn"
              onClick={() => setMenuOpen(false)}
              aria-label="Close navigation menu"
              data-testid="button-close-drawer"
            >
              <X size={20} />
            </button>
          </div>

          <div className="menu-drawer-eyebrow">
            <span className="eyebrow">Menu · 5 Main Pages</span>
          </div>

          {/* 5 Menu Links in exact requested order */}
          <nav className="menu-drawer-nav" aria-label="Main navigation directory">
            {activeNavItems.map((item, index) => {
              const isActive = location === item.href;
              const formattedIndex = String(index + 1).padStart(2, '0');
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={`menu-drawer-link ${isActive ? 'is-active' : ''}`}
                  data-testid={`drawer-nav-${item.href === '/' ? 'home' : item.href.replace(/^\//, '')}`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span className="menu-link-num">{formattedIndex}</span>
                  <span className="menu-link-label">{item.label}</span>
                  <ArrowRight size={15} className="menu-link-arrow" />
                </Link>
              );
            })}
          </nav>

          {/* Drawer Footer */}
          <div className="menu-drawer-footer">
            {header.ctaButton.enabled && (
              <Link
                className="button button-primary w-full justify-center"
                href={header.ctaButton.href}
                onClick={() => setMenuOpen(false)}
                data-testid="drawer-cta-join"
              >
                <span>{header.ctaButton.label}</span>
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
            )}

            <div className="drawer-footer-meta">
              <span className="drawer-tagline">Faith in motion · Walk gently</span>
              {content.footer.showFacebook && (
                <a
                  href={content.footer.facebookUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="drawer-social-link"
                >
                  Facebook <ExternalLink size={11} />
                </a>
              )}
            </div>
          </div>
        </div>
      </aside>
    </InlineEditWrapper>
  );
}

function Eyebrow({ children }: { children: ReactNode }) {
  return <span className="eyebrow">{children}</span>;
}

function SectionMarker({ number, label }: { number: string; label: string }) {
  return (
    <span className="section-marker" aria-label={`Section ${number}: ${label}`}>
      <span className="section-marker-number" aria-hidden="true">
        {number}
      </span>
      <i aria-hidden="true" />
      <span>{label}</span>
    </span>
  );
}

function PageHero({
  eyebrow,
  title,
  intro,
  image,
}: {
  eyebrow: string;
  title: ReactNode;
  intro: string;
  image?: string;
}) {
  return (
    <section
      className={`page-hero${image ? ' page-hero-image' : ''}`}
      style={
        image
          ? {
              backgroundImage: `linear-gradient(90deg, rgba(60,44,76,.94), rgba(60,44,76,.54)), url("${image}")`,
            }
          : undefined
      }
    >
      <div className="wrap page-hero-inner">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1>{title}</h1>
        <p>{intro}</p>
      </div>
    </section>
  );
}

function PageIntro({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="page-intro">
      <div className="wrap page-intro-inner">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2>{title}</h2>
        <div className="page-body-copy">{children}</div>
      </div>
    </section>
  );
}

function PageLink({
  href,
  children,
  secondary = false,
  testId,
}: {
  href: string;
  children: ReactNode;
  secondary?: boolean;
  testId?: string;
}) {
  return (
    <Link
      className={`button ${secondary ? 'button-outline' : 'button-primary'}`}
      href={href}
      data-testid={testId}
    >
      {children}
      <ArrowRight size={15} aria-hidden="true" />
    </Link>
  );
}

function HomePage() {
  const { content } = useCMS();
  const { home } = content;
  const { hero, marqueeEnabled, marqueeText, intro, split, meetingBand } = home;

  return (
    <>
      <InlineEditWrapper sectionKey="home.hero" sectionName="Hero Section" adminTabTarget="home">
        <section className="hero" aria-labelledby="hero-title">
          <div
            className="hero-photo"
            style={{ backgroundImage: `url("${hero.photo}")` }}
            role="img"
            aria-label={hero.photoAlt}
            data-testid="img-home-walking"
          />
          <div className="wrap hero-content">
            <div className="hero-copy">
              <Eyebrow>{hero.eyebrow}</Eyebrow>
              <h1 id="hero-title">
                {hero.titleLine1}
                <br />
                {hero.titleLine2}
                <em>{hero.titleEmphasized}</em>
              </h1>
              <p className="hero-lede">{hero.lede}</p>
              <div className="hero-actions">
                <PageLink href={hero.primaryCtaHref} testId="cta-home-join">
                  {hero.primaryCtaText}
                </PageLink>
                <Link className="text-link" href={hero.secondaryCtaHref} data-testid="cta-home-about">
                  {hero.secondaryCtaText} <ArrowRight size={15} aria-hidden="true" />
                </Link>
              </div>
            </div>
            <div className="hero-seal" aria-hidden="true">
              {hero.sealTextTop} <Flower2 />
              <br />
              {hero.sealTextBottom}
            </div>
            <div className="hero-note">
              <span /> {hero.noteText}
            </div>
            <div className="hero-index">
              <span>{hero.indexBadgeNum}</span>
              <i aria-hidden="true" />
              {hero.indexBadgeLabel}
            </div>
          </div>
        </section>
      </InlineEditWrapper>

      {marqueeEnabled && (
        <InlineEditWrapper sectionKey="home.marquee" sectionName="Marquee Ribbon" adminTabTarget="home">
          <div className="marquee-band">
            <div className="wrap marquee-line" aria-label={marqueeText}>
              <span>{marqueeText}</span>
            </div>
          </div>
        </InlineEditWrapper>
      )}

      <InlineEditWrapper sectionKey="home.intro" sectionName="Intro (Why We Walk)" adminTabTarget="home">
        <section className="intro-section">
          <div className="wrap intro-grid">
            <aside className="intro-aside">
              <SectionMarker number={intro.sectionNum} label={intro.sectionLabel} />
              <p>{intro.quote}</p>
            </aside>
            <div className="intro-copy">
              <h2>
                {intro.headingMain}
                <em>{intro.headingEmphasized}</em>
              </h2>
              <p>{intro.body}</p>
              <div className="signature">
                <span className="signature-rule" />
                <span>{intro.signature}</span>
              </div>
              <PageLink href={intro.ctaHref} testId="cta-home-purpose">
                {intro.ctaText}
              </PageLink>
            </div>
          </div>
        </section>
      </InlineEditWrapper>

      <InlineEditWrapper sectionKey="home.split" sectionName="Split Section (A Simple Rhythm)" adminTabTarget="home">
        <section className="home-split">
          <div className="wrap home-split-inner">
            <div>
              <SectionMarker number={split.sectionNum} label={split.sectionLabel} />
              <h2>
                {split.headingLine1}
                <br />
                {split.headingLine2}
              </h2>
              <p>{split.body}</p>
              <PageLink href={split.ctaHref} secondary testId="cta-home-practice">
                {split.ctaText}
              </PageLink>
            </div>
            <img src={split.photo} alt={split.photoAlt} data-testid="img-home-prayer" />
          </div>
        </section>
      </InlineEditWrapper>

      <InlineEditWrapper sectionKey="home.meetingBand" sectionName="Meeting Band" adminTabTarget="home">
        <section className="home-meeting">
          <div className="wrap meeting-band">
            <div>
              <SectionMarker number={meetingBand.sectionNum} label={meetingBand.sectionLabel} />
              <h2>
                {meetingBand.headingLine1}
                <br />
                {meetingBand.headingLine2}
              </h2>
            </div>
            <div>
              <p data-testid="text-meeting-schedule">{meetingBand.scheduleText}</p>
              <PageLink href={meetingBand.ctaHref} testId="cta-home-meetings">
                {meetingBand.ctaText}
              </PageLink>
            </div>
          </div>
        </section>
      </InlineEditWrapper>
    </>
  );
}

function Scripture() {
  const { content } = useCMS();
  const { scripture } = content.about;
  return (
    <InlineEditWrapper sectionKey="about.scripture" sectionName="Scripture Reflection" adminTabTarget="about">
      <section className="scripture-section" aria-label="A scripture for the journey">
        <div className="wrap scripture-inner">
          <span className="scripture-mark">
            <Leaf aria-hidden="true" />
          </span>
          <Eyebrow>{scripture.eyebrow}</Eyebrow>
          <blockquote>{scripture.quote}</blockquote>
          <cite>{scripture.citation}</cite>
          <p className="scripture-note">{scripture.note}</p>
        </div>
      </section>
    </InlineEditWrapper>
  );
}

function renderStepIcon(icon: string) {
  switch (icon) {
    case 'footprints':
      return <Footprints aria-hidden="true" />;
    case 'heart':
      return <HeartHandshake aria-hidden="true" />;
    case 'book':
      return <BookOpen aria-hidden="true" />;
    case 'leaf':
      return <Leaf aria-hidden="true" />;
    case 'flower':
      return <Flower2 aria-hidden="true" />;
    case 'sparkles':
      return <Sparkles aria-hidden="true" />;
    case 'sun':
      return <Sun aria-hidden="true" />;
    default:
      return <Footprints aria-hidden="true" />;
  }
}

function PrayingTheWordPage() {
  const { content } = useCMS();
  const { about, practice } = content;
  const { hero, purposeIntro, values } = about;
  const { head, steps, promiseIntro } = practice;

  return (
    <>
      <InlineEditWrapper sectionKey="about.hero" sectionName="Praying the Word Hero" adminTabTarget="about">
        <PageHero
          eyebrow="Praying the Word · Foundation & Practice"
          title={
            <>
              Praying the Word with <br />
              <em>QueenJudith</em>
            </>
          }
          intro={hero.intro || 'A sacred rhythm of scripture, walking, quiet listening, and heartfelt fellowship founded by QueenJudith.'}
          image={practice.hero.photo || hero.photo || undefined}
        />
      </InlineEditWrapper>

      <InlineEditWrapper sectionKey="about.purposeIntro" sectionName="Purpose Story" adminTabTarget="about">
        <PageIntro
          eyebrow={purposeIntro.eyebrow}
          title={
            <>
              {purposeIntro.headingLine1}
              <br />
              <em>{purposeIntro.headingEmphasized}</em>
            </>
          }
        >
          {purposeIntro.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </PageIntro>
      </InlineEditWrapper>

      <InlineEditWrapper sectionKey="about.values" sectionName="Values Section" adminTabTarget="about">
        <section className="values-section">
          <div className="wrap">
            <div className="values-heading">
              <Eyebrow>{values.eyebrow}</Eyebrow>
              <h2>
                {values.headingMain}
                <em>{values.headingEmphasized}</em>
              </h2>
            </div>
            <div className="values-layout">
              <div className="value-list">
                {values.items.map((item, i) => (
                  <article
                    className="value-row"
                    key={item.id}
                    data-testid={`value-${item.name.toLowerCase()}`}
                  >
                    <span className="value-index">0{i + 1}</span>
                    <div>
                      <h3>{item.name}</h3>
                      <p>{item.copy}</p>
                    </div>
                  </article>
                ))}
              </div>
              <aside className="values-note">
                <blockquote>{values.quote}</blockquote>
                <p>{values.citation}</p>
              </aside>
            </div>
          </div>
        </section>
      </InlineEditWrapper>

      <Scripture />

      <InlineEditWrapper sectionKey="practice.steps" sectionName="Practice Steps Grid" adminTabTarget="practice">
        <section className="practice-section">
          <div className="wrap">
            <div className="practice-head">
              <div>
                <Eyebrow>{head.eyebrow}</Eyebrow>
                <h2>{head.heading}</h2>
              </div>
              <p>{head.intro}</p>
            </div>
            <div className="practice-grid">
              {steps.map((step) => (
                <article className="practice-item" key={step.id}>
                  <span className="practice-number">{step.number}</span>
                  <span className="practice-icon">{renderStepIcon(step.icon)}</span>
                  <h3>{step.heading}</h3>
                  <p>{step.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </InlineEditWrapper>

      <InlineEditWrapper sectionKey="practice.promise" sectionName="Promise Callout" adminTabTarget="practice">
        <PageIntro
          eyebrow={promiseIntro.eyebrow}
          title={<>{promiseIntro.quote}</>}
        >
          <p>{promiseIntro.citation}</p>
          <p>{promiseIntro.note}</p>
          <PageLink href="/community" testId="cta-practice-community">
            Explore Queens Community
          </PageLink>
        </PageIntro>
      </InlineEditWrapper>
    </>
  );
}

function QueensCommunityPage() {
  const { content } = useCMS();
  const { sisterhood, meetings } = content;
  const { hero, walkSection, pageIntro: sisterIntro } = sisterhood;
  const { card, pageIntro: meetingIntro } = meetings;

  return (
    <>
      <InlineEditWrapper sectionKey="sisterhood.hero" sectionName="Community Hero" adminTabTarget="sisterhood">
        <PageHero
          eyebrow="Queens Prayer Walking Community · Faith in Motion"
          title={
            <>
              Queens Prayer Walking <br />
              <em>Community</em>
            </>
          }
          intro={hero.intro || 'A welcoming sisterhood making room for prayer, health, mutual support, and regular monthly walks.'}
          image={hero.photo || undefined}
        />
      </InlineEditWrapper>

      <InlineEditWrapper sectionKey="sisterhood.walk" sectionName="Walk Feature Section" adminTabTarget="sisterhood">
        <section className="walk-section">
          <div className="wrap walk-grid">
            <div className="walk-image-wrap">
              <img
                className="walk-image"
                src={walkSection.photo}
                alt={walkSection.photoAlt}
                data-testid="img-sisterhood-walk"
              />
              <span className="image-caption">{walkSection.imageCaption}</span>
            </div>
            <div className="walk-copy">
              <Eyebrow>{walkSection.eyebrow}</Eyebrow>
              <h2>
                {walkSection.headingMain}
                <em>{walkSection.headingEmphasized}</em>
              </h2>
              <p>{walkSection.body}</p>
              <blockquote className="walk-quote">
                “{walkSection.quote.replace(/^“|”$/g, '')}”
                <cite>{walkSection.quoteCitation}</cite>
              </blockquote>
            </div>
          </div>
        </section>
      </InlineEditWrapper>

      <InlineEditWrapper sectionKey="sisterhood.intro" sectionName="Heart of Sisterhood" adminTabTarget="sisterhood">
        <PageIntro
          eyebrow={sisterIntro.eyebrow}
          title={
            <>
              {sisterIntro.headingMain}
              <em>{sisterIntro.headingEmphasized}</em>
            </>
          }
        >
          {sisterIntro.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </PageIntro>
      </InlineEditWrapper>

      <InlineEditWrapper sectionKey="meetings.card" sectionName="Meeting Schedule Card" adminTabTarget="meetings">
        <section className="meeting-page">
          <div className="wrap meeting-card">
            <span className="meeting-icon">
              <Leaf aria-hidden="true" />
            </span>
            <Eyebrow>{card.eyebrow}</Eyebrow>
            <h2 data-testid="text-meeting-schedule">{card.scheduleHeading}</h2>
            <p>{card.body}</p>
            <PageLink href={card.ctaHref} testId="cta-meetings-join">
              {card.ctaText}
            </PageLink>
          </div>
        </section>
      </InlineEditWrapper>

      <InlineEditWrapper sectionKey="meetings.intro" sectionName="Meeting Rhythm Reflection" adminTabTarget="meetings">
        <PageIntro
          eyebrow={meetingIntro.eyebrow}
          title={
            <>
              {meetingIntro.headingLine1}
              <br />
              <em>{meetingIntro.headingEmphasized}</em>
            </>
          }
        >
          {meetingIntro.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </PageIntro>
      </InlineEditWrapper>
    </>
  );
}

function NewsletterPage() {
  const { content } = useCMS();
  const { news } = content;
  const { hero, emptyState, articles } = news;

  const [subscriberName, setSubscriberName] = useState('');
  const [subscriberEmail, setSubscriberEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subscriberEmail.trim()) return;
    try {
      const existing = JSON.parse(localStorage.getItem('queen_walk_subscribers') || '[]');
      existing.push({ name: subscriberName, email: subscriberEmail, date: new Date().toISOString() });
      localStorage.setItem('queen_walk_subscribers', JSON.stringify(existing));
    } catch {
      // storage exception ignored
    }
    setSubscribed(true);
  };

  const publishedArticles = articles.filter((a) => a.published);

  return (
    <>
      <InlineEditWrapper sectionKey="news.hero" sectionName="Newsletter Hero" adminTabTarget="news">
        <PageHero
          eyebrow={hero.eyebrow || 'Stay Nourished & Connected'}
          title={
            <>
              {hero.headingLine1 || 'Community Newsletter &'}
              <br />
              <em>{hero.headingEmphasized || 'Walk Reflections'}</em>
            </>
          }
          intro={hero.intro || 'Gentle devotionals, walking reflections, meeting announcements, and updates delivered straight to your heart.'}
          image={hero.photo || undefined}
        />
      </InlineEditWrapper>

      {/* Interactive Newsletter Subscription Box */}
      <section className="newsletter-subscribe-section">
        <div className="wrap">
          <div className="newsletter-box">
            <div className="newsletter-box-copy">
              <span className="eyebrow">Stay Connected With Us</span>
              <h2>Subscribe to Our Monthly Walk & Word</h2>
              <p>
                Receive QueenJudith's prayer guides, scripture meditations, and community gathering notices delivered directly to your inbox.
              </p>
            </div>

            {subscribed ? (
              <div className="newsletter-success">
                <Check size={28} className="text-emerald-600 shrink-0" />
                <div>
                  <h3 className="font-serif text-lg text-purple-950 font-bold m-0 mb-1">You are subscribed!</h3>
                  <p className="text-xs text-purple-800 m-0 leading-relaxed">
                    Thank you for joining our prayer newsletter circle. May each walk bring renewed grace.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="newsletter-form">
                <div className="newsletter-inputs">
                  <input
                    type="text"
                    placeholder="Your first name (optional)"
                    value={subscriberName}
                    onChange={(e) => setSubscriberName(e.target.value)}
                    className="newsletter-input"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={subscriberEmail}
                    onChange={(e) => setSubscriberEmail(e.target.value)}
                    className="newsletter-input"
                  />
                </div>
                <button type="submit" className="button button-primary newsletter-submit">
                  <span>Subscribe to Newsletter</span>
                  <ArrowRight size={14} aria-hidden="true" />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {publishedArticles.length > 0 ? (
        <InlineEditWrapper sectionKey="news.articles" sectionName="Articles Feed" adminTabTarget="news">
          <section className="articles-section">
            <div className="wrap">
              <div className="articles-grid">
                {publishedArticles.map((article) => (
                  <article key={article.id} className="article-card">
                    {article.image && (
                      <img
                        src={article.image}
                        alt={article.title}
                        className="article-card-image"
                      />
                    )}
                    <div className="article-card-body">
                      <div className="article-card-meta">
                        <span>{article.category}</span>
                        <span>·</span>
                        <span>{article.date}</span>
                      </div>
                      <h3 className="article-card-title">{article.title}</h3>
                      <p className="article-card-summary">{article.summary}</p>
                      {article.content && (
                        <p className="text-xs text-purple-900/80 mt-auto leading-relaxed border-t border-purple-50 pt-3">
                          {article.content}
                        </p>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        </InlineEditWrapper>
      ) : (
        <InlineEditWrapper sectionKey="news.emptyState" sectionName="Empty State Message" adminTabTarget="news">
          <section className="empty-state-section">
            <div className="empty-state" data-testid="status-news-empty">
              <span className="empty-icon">
                <Leaf aria-hidden="true" />
              </span>
              <Eyebrow>{emptyState.eyebrow}</Eyebrow>
              <h2>{emptyState.heading}</h2>
              <p>{emptyState.body}</p>
              <PageLink href={emptyState.ctaHref} secondary testId="cta-news-about">
                {emptyState.ctaText}
              </PageLink>
            </div>
          </section>
        </InlineEditWrapper>
      )}
    </>
  );
}

function BuyOurBooksPage() {
  const { content } = useCMS();
  const { books } = content;
  const { hero, emptyState, books: bookList } = books;

  return (
    <>
      <InlineEditWrapper sectionKey="books.hero" sectionName="Books Hero" adminTabTarget="books">
        <PageHero
          eyebrow={hero.eyebrow || 'Faith in Print · Companion Guides'}
          title={
            <>
              {hero.headingLine1 || 'Buy Our Books &'}
              <br />
              <em>{hero.headingEmphasized || 'Prayer Journals'}</em>
            </>
          }
          intro={hero.intro || 'Deepen your prayer journey with devotionals, prayer journals, and walking guides written to accompany your stride.'}
          image={hero.photo || undefined}
        />
      </InlineEditWrapper>

      {bookList.length > 0 ? (
        <InlineEditWrapper sectionKey="books.list" sectionName="Featured Books Catalog" adminTabTarget="books">
          <section className="books-section">
            <div className="wrap">
              <div className="books-grid">
                {bookList.map((book) => (
                  <article key={book.id} className="book-card">
                    {book.coverImage && (
                      <img
                        src={book.coverImage}
                        alt={book.title}
                        className="book-card-cover"
                      />
                    )}
                    <div className="book-card-content">
                      {book.tag && <span className="book-card-tag">{book.tag}</span>}
                      <h3 className="book-card-title">{book.title}</h3>
                      <p className="book-card-author">By {book.author}</p>
                      <p className="book-card-desc">{book.description}</p>
                      {book.link && (
                        <a
                          href={book.link}
                          target="_blank"
                          rel="noreferrer"
                          className="button button-primary book-buy-btn"
                        >
                          <span>{book.linkText || 'Order / Buy Book'}</span>
                          <ExternalLink size={12} />
                        </a>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        </InlineEditWrapper>
      ) : (
        <InlineEditWrapper sectionKey="books.emptyState" sectionName="Empty State Message" adminTabTarget="books">
          <section className="empty-state-section book-empty">
            <div className="empty-state" data-testid="status-books-empty">
              <span className="empty-icon">
                <BookOpen aria-hidden="true" />
              </span>
              <Eyebrow>{emptyState.eyebrow}</Eyebrow>
              <h2>{emptyState.heading}</h2>
              <p>{emptyState.body}</p>
              <PageLink href={emptyState.ctaHref} secondary testId="cta-books-practice">
                {emptyState.ctaText}
              </PageLink>
            </div>
          </section>
        </InlineEditWrapper>
      )}
    </>
  );
}

// Backward-compatibility aliases so previous components/routes continue working
const AboutPage = PrayingTheWordPage;
const PracticePage = PrayingTheWordPage;
const SisterhoodPage = QueensCommunityPage;
const MeetingsPage = QueensCommunityPage;
const NewsPage = NewsletterPage;
const BooksPage = BuyOurBooksPage;

function JoinPage() {
  const { content } = useCMS();
  const { join } = content;
  const { hero, stepIntro, stepPanel, joinNote } = join;

  return (
    <>
      <InlineEditWrapper sectionKey="join.hero" sectionName="Join Hero" adminTabTarget="join">
        <PageHero
          eyebrow={hero.eyebrow}
          title={
            <>
              {hero.headingLine1}
              <br />
              <em>{hero.headingEmphasized}</em>
            </>
          }
          intro={hero.intro}
          image={hero.photo || undefined}
        />
      </InlineEditWrapper>

      <InlineEditWrapper sectionKey="join.steps" sectionName="Invitation Steps" adminTabTarget="join">
        <section className="first-step">
          <div className="wrap step-grid">
            <div className="step-intro">
              <Eyebrow>{stepIntro.eyebrow}</Eyebrow>
              <h2>
                {stepIntro.headingLine1}
                <br />
                <em>{stepIntro.headingEmphasized}</em>
              </h2>
              <p>{stepIntro.body}</p>
            </div>
            <div className="step-panel">
              <Eyebrow>{stepPanel.eyebrow}</Eyebrow>
              <h3>{stepPanel.heading}</h3>
              <p>{stepPanel.body}</p>
              <a
                className="button button-primary"
                href={stepPanel.buttonUrl}
                target="_blank"
                rel="noreferrer"
                data-testid="link-join-facebook"
              >
                {stepPanel.buttonLabel} <ArrowRight size={15} aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>
      </InlineEditWrapper>

      <InlineEditWrapper sectionKey="join.note" sectionName="Closing Heart Note" adminTabTarget="join">
        <div className="join-note">
          <div className="wrap">
            <Heart aria-hidden="true" />
            <p>{joinNote.text}</p>
          </div>
        </div>
      </InlineEditWrapper>
    </>
  );
}

function BottomInvite() {
  const { content } = useCMS();
  const { bottomInvite } = content;

  if (!bottomInvite.enabled) return null;

  return (
    <InlineEditWrapper sectionKey="bottomInvite" sectionName="Bottom Invitation Banner" adminTabTarget="header-footer">
      <section className="bottom-invite">
        <div className="wrap bottom-invite-inner">
          <div>
            <Eyebrow>{bottomInvite.eyebrow}</Eyebrow>
            <h2>
              {bottomInvite.headingMain.includes(bottomInvite.headingEmphasized) ? (
                <>
                  {bottomInvite.headingMain.split(bottomInvite.headingEmphasized)[0]}
                  <em>{bottomInvite.headingEmphasized}</em>
                  {bottomInvite.headingMain.split(bottomInvite.headingEmphasized)[1]}
                </>
              ) : (
                bottomInvite.headingMain
              )}
            </h2>
          </div>
          <PageLink href={bottomInvite.ctaHref} testId="cta-bottom-join">
            {bottomInvite.ctaText}
          </PageLink>
        </div>
      </section>
    </InlineEditWrapper>
  );
}

function NotFound() {
  return (
    <section className="empty-state-section">
      <div className="empty-state">
        <Eyebrow>A path not found</Eyebrow>
        <h1>Let’s find our way back.</h1>
        <p>That page is not part of this path. You can return to the community home.</p>
        <PageLink href="/" testId="cta-not-found-home">
          Back to home
        </PageLink>
      </div>
    </section>
  );
}

function Footer() {
  const { content } = useCMS();
  const { header, footer } = content;
  const links = header.navItems.filter((item) => item.enabled);

  return (
    <InlineEditWrapper sectionKey="footer" sectionName="Footer & Links" adminTabTarget="header-footer">
      <footer className="closing">
        <div className="wrap">
          <div className="footer-bottom">
            <Brand footer />
            <nav className="footer-nav" aria-label="Footer navigation">
              {links.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  data-testid={`footer-${item.href === '/' ? 'home' : item.href.replace(/^\//, '')}`}
                >
                  {item.label}
                </Link>
              ))}
              {footer.showFacebook && (
                <a
                  href={footer.facebookUrl}
                  target="_blank"
                  rel="noreferrer"
                  data-testid="footer-facebook"
                >
                  Facebook
                </a>
              )}
              {footer.instagramUrl && (
                <a
                  href={footer.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  data-testid="footer-instagram"
                >
                  Instagram
                </a>
              )}
              {footer.emailContact && (
                <a href={`mailto:${footer.emailContact}`}>Email</a>
              )}
            </nav>
            <span className="copyright">
              {footer.copyrightText}
              <Link href="/admin" className="ml-2 opacity-30 hover:opacity-100 transition inline-flex items-center" title="Admin Portal" aria-label="Admin Portal">
                <Lock size={10} style={{ display: 'inline', verticalAlign: '-1px' }} />
              </Link>
            </span>
          </div>
        </div>
      </footer>
    </InlineEditWrapper>
  );
}

function MainSiteLayout() {
  const { content } = useCMS();
  const [location] = useLocation();

  useEffect(() => {
    const metaConfig = content.meta[location];
    const defaultTitle = 'Queen Prayer Walking Community';
    const defaultDesc = 'A welcoming circle of women making room for faith, prayer, and fellowship on a shared path.';

    const title = metaConfig?.title || defaultTitle;
    const description = metaConfig?.description || defaultDesc;

    document.title = title;
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', description);
  }, [location, content.meta]);

  return (
    <div className="site-shell">
      <Header />
      <main>
        <Switch>
          <Route path="/" component={HomePage} />

          {/* 5 Core Website Pages */}
          <Route path="/praying-the-word" component={PrayingTheWordPage} />
          <Route path="/community" component={QueensCommunityPage} />
          <Route path="/newsletter" component={NewsletterPage} />
          <Route path="/books" component={BuyOurBooksPage} />
          <Route path="/buy-our-books" component={BuyOurBooksPage} />

          {/* Seamless backward compatibility routes */}
          <Route path="/about" component={PrayingTheWordPage} />
          <Route path="/practice" component={PrayingTheWordPage} />
          <Route path="/sisterhood" component={QueensCommunityPage} />
          <Route path="/meetings" component={QueensCommunityPage} />
          <Route path="/news" component={NewsletterPage} />

          <Route path="/join" component={JoinPage} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <BottomInvite />
      <Footer />
      <AdminFloatingToolbar />
    </div>
  );
}

function App() {
  return (
    <CMSProvider>
      <Switch>
        <Route path="/admin" component={AdminDashboard} />
        <Route path="/admin/*" component={AdminDashboard} />
        <Route path="/cms" component={AdminDashboard} />
        <Route component={MainSiteLayout} />
      </Switch>
    </CMSProvider>
  );
}

export default App;