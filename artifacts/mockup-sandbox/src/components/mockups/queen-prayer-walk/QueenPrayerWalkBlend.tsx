import { useState } from "react";
import { ArrowRight, BookOpen, Flower2, Footprints, Heart, HeartHandshake, Menu, X } from "lucide-react";
import "./queenprayerwalkblend.css";

const inviteUrl = "https://www.facebook.com/share/1Ed2ocvWNU/";
const sections = [
  { label: "Our heart", href: "#story" },
  { label: "The practice", href: "#practice" },
  { label: "Meetings", href: "#gathering" },
];

function BrandMark() {
  return <span className="qpb-mark" aria-hidden="true"><Flower2 size={21} strokeWidth={1.45} /></span>;
}

export function QueenPrayerWalkBlend() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="qpb-page" id="top">
      <header className="qpb-header">
        <a className="qpb-brand" href="#top" aria-label="Queen Prayer Walking home" onClick={closeMenu}>
          <BrandMark />
          <span className="qpb-brand-copy">
            <strong>Queen Prayer Walking</strong>
            <small>Community · Faith in motion</small>
          </span>
        </a>

        <nav className="qpb-nav" aria-label="Main navigation">
          {sections.map((section) => <a key={section.href} href={section.href}>{section.label}</a>)}
          <a className="qpb-nav-cta" href={inviteUrl} target="_blank" rel="noreferrer">
            Come as you are <ArrowRight size={14} aria-hidden="true" />
          </a>
        </nav>

        <button
          className="qpb-menu-toggle"
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
        {menuOpen && (
          <nav className="qpb-mobile-nav" aria-label="Mobile navigation">
            {sections.map((section) => <a key={section.href} href={section.href} onClick={closeMenu}>{section.label}</a>)}
            <a href={inviteUrl} target="_blank" rel="noreferrer" onClick={closeMenu}>
              Come as you are <ArrowRight size={14} aria-hidden="true" />
            </a>
          </nav>
        )}
      </header>

      <main>
        <section className="qpb-hero" aria-labelledby="qpb-hero-title">
          <div className="qpb-hero-photo" role="img" aria-label="Women walking together along a sunlit path" />
          <div className="qpb-hero-shade" />
          <div className="qpb-hero-inner">
            <div className="qpb-hero-copy">
              <span className="qpb-eyebrow">A community for women, in motion</span>
              <h1 id="qpb-hero-title">Walk in faith.<br />Pray in <em>good company.</em></h1>
              <p>A little fresh air. A little prayer. A circle of women reminding one another that hope is something we can walk toward, together.</p>
              <div className="qpb-hero-actions">
                <a className="qpb-button" href={inviteUrl} target="_blank" rel="noreferrer">Find your first step <ArrowRight size={15} aria-hidden="true" /></a>
                <a className="qpb-text-link" href="#story">Get to know us <ArrowRight size={15} aria-hidden="true" /></a>
              </div>
            </div>
            <div className="qpb-hero-seal" aria-label="Rooted in faith, growing together">
              <span>Rooted in faith</span>
              <BrandMark />
              <span>Growing together</span>
            </div>
            <div className="qpb-hero-note"><i />A slower pace. A fuller heart.</div>
            <div className="qpb-hero-index"><span>01</span><i />A path we share</div>
          </div>
        </section>

        <div className="qpb-ribbon" aria-label="Faith, fellowship, hope, and a path we share">
          <div className="qpb-ribbon-track">
            <span>Faith</span><b>·</b><span>Fellowship</span><b>·</b><span>Hope</span><b>·</b><span>A path we share</span><b>·</b>
            <span>Faith</span><b>·</b><span>Fellowship</span><b>·</b><span>Hope</span><b>·</b><span>A path we share</span>
          </div>
        </div>

        <section className="qpb-story" id="story">
          <aside className="qpb-story-aside">
            <span className="qpb-index">01 <i /> WHY WE WALK</span>
            <blockquote>“Sometimes the prayer begins with simply showing up.”</blockquote>
            <span className="qpb-aside-note">A thought for the road</span>
          </aside>
          <div className="qpb-story-copy">
            <span className="qpb-eyebrow qpb-eyebrow--dark">Our heart</span>
            <h2>A place to bring your whole self — <em>and take the next step.</em></h2>
            <p>Queen Prayer Walking Community is a welcoming circle of women who make room for faith in the middle of real life. We walk side by side, lift one another in prayer, and leave space for the conversations that grow along the way.</p>
            <a className="qpb-inline-link" href="#practice">Walk gently. Pray boldly. <ArrowRight size={15} aria-hidden="true" /></a>
          </div>
        </section>

        <section className="qpb-practice" id="practice">
          <div className="qpb-practice-heading">
            <div>
              <span className="qpb-eyebrow qpb-eyebrow--dark">A simple rhythm</span>
              <h2>Room to breathe.<br /><em>Room to believe.</em></h2>
            </div>
            <p>No perfect words or quick answers needed. Just a shared path, an open heart, and the grace to begin where you are.</p>
          </div>
          <div className="qpb-steps">
            <article className="qpb-step">
              <div className="qpb-step-top"><span>01 / ARRIVE</span><Footprints size={21} strokeWidth={1.5} aria-hidden="true" /></div>
              <h3>Come as you are</h3>
              <p>Bring your questions, your gratitude, your tiredness — or simply come to listen.</p>
            </article>
            <article className="qpb-step">
              <div className="qpb-step-top"><span>02 / WALK</span><HeartHandshake size={21} strokeWidth={1.5} aria-hidden="true" /></div>
              <h3>Walk beside one another</h3>
              <p>We share the path at a human pace. Conversation and quiet both belong.</p>
            </article>
            <article className="qpb-step">
              <div className="qpb-step-top"><span>03 / PRAY</span><BookOpen size={21} strokeWidth={1.5} aria-hidden="true" /></div>
              <h3>Carry hope forward</h3>
              <p>We hold one another in prayer, and go on with a little more courage.</p>
            </article>
          </div>
        </section>

        <section className="qpb-gathering" id="gathering">
          <span className="qpb-gather-icon"><Heart size={20} strokeWidth={1.4} aria-hidden="true" /></span>
          <div className="qpb-gather-copy">
            <span className="qpb-eyebrow">A regular moment together</span>
            <h2>Make a little room<br /><em>in your month.</em></h2>
          </div>
          <div className="qpb-gather-details">
            <span className="qpb-detail-label">OUR SHARED RHYTHM</span>
            <strong>Every last Sunday</strong>
            <span>of the month · 9:00 AM</span>
            <a className="qpb-button qpb-button--outline" href={inviteUrl} target="_blank" rel="noreferrer">Ask about joining <ArrowRight size={14} aria-hidden="true" /></a>
          </div>
        </section>

        <section className="qpb-invite" aria-labelledby="qpb-invite-title">
          <div className="qpb-invite-card">
            <div>
              <span className="qpb-eyebrow qpb-eyebrow--dark">The path is better together</span>
              <h2 id="qpb-invite-title">There is a little more <em>light</em> when we walk side by side.</h2>
            </div>
            <a className="qpb-button" href={inviteUrl} target="_blank" rel="noreferrer">Take a first step <ArrowRight size={15} aria-hidden="true" /></a>
          </div>
        </section>
      </main>

      <footer className="qpb-footer">
        <a className="qpb-brand qpb-footer-brand" href="#top">
          <BrandMark />
          <span className="qpb-brand-copy"><strong>Queen Prayer Walking</strong><small>Community · Faith in motion</small></span>
        </a>
        <p><Heart size={13} aria-hidden="true" /> Walk gently. Pray boldly.</p>
        <a className="qpb-footer-link" href={inviteUrl} target="_blank" rel="noreferrer">Join the conversation <ArrowRight size={14} aria-hidden="true" /></a>
      </footer>
    </div>
  );
}

export default QueenPrayerWalkBlend;