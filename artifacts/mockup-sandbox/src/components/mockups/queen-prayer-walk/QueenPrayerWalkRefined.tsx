import { useState, type ReactNode } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  BookOpen,
  Flower2,
  Footprints,
  Heart,
  HeartHandshake,
  Leaf,
  Menu,
  X,
} from "lucide-react";
import "./queenprayerwalkrefined.css";

const inviteUrl = "https://www.facebook.com/share/1Ed2ocvWNU/";

function QpMark() {
  return (
    <span className="qp-mark" aria-hidden="true">
      <Flower2 size={22} strokeWidth={1.45} />
    </span>
  );
}

function QpEyebrow({ children }: { children: ReactNode }) {
  return <span className="qp-eyebrow">{children}</span>;
}

function QpButton({
  href,
  children,
  secondary = false,
}: {
  href: string;
  children: ReactNode;
  secondary?: boolean;
}) {
  return (
    <a className={`qp-button${secondary ? " qp-button--secondary" : ""}`} href={href}>
      {children}
      <ArrowRight size={15} strokeWidth={1.8} aria-hidden="true" />
    </a>
  );
}

export function QueenPrayerWalkRefined() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="qp-page">
      <header className="qp-header">
        <a className="qp-brand" href="#top" aria-label="Queen Prayer Walking home" onClick={closeMenu}>
          <QpMark />
          <span className="qp-brand-copy">
            <strong>Queen Prayer Walking</strong>
            <small>Community · Faith in motion</small>
          </span>
        </a>

        <nav className="qp-nav" aria-label="Main navigation">
          <a href="#story">Our heart</a>
          <a href="#practice">The practice</a>
          <a href="#gathering">Gatherings</a>
          <a className="qp-nav-cta" href={inviteUrl} target="_blank" rel="noreferrer">
            Come as you are <ArrowRight size={14} />
          </a>
        </nav>

        <button
          className="qp-menu-toggle"
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        {menuOpen && (
          <nav className="qp-mobile-nav" aria-label="Mobile navigation">
            <a href="#story" onClick={closeMenu}>Our heart</a>
            <a href="#practice" onClick={closeMenu}>The practice</a>
            <a href="#gathering" onClick={closeMenu}>Gatherings</a>
            <a href={inviteUrl} target="_blank" rel="noreferrer" onClick={closeMenu}>Come as you are <ArrowRight size={14} /></a>
          </nav>
        )}
      </header>

      <main id="top">
        <section className="qp-hero">
          <div className="qp-hero-photo" role="img" aria-label="Women walking together on a sunlit park path" />
          <div className="qp-hero-shade" />
          <div className="qp-hero-inner">
            <div className="qp-hero-copy">
              <QpEyebrow>A community for women, in motion</QpEyebrow>
              <h1>
                Walk in faith.
                <br />
                Pray in <em>good company.</em>
              </h1>
              <p>
                A little fresh air. A little prayer. A circle of women reminding one
                another that hope is something we can walk toward, together.
              </p>
              <div className="qp-hero-actions">
                <QpButton href={inviteUrl}>Find your first step</QpButton>
                <a className="qp-text-link" href="#story">
                  Get to know us <ArrowDownRight size={16} />
                </a>
              </div>
            </div>
            <div className="qp-photo-caption">
              <span className="qp-caption-rule" />
              <span>A slower pace.<br />A fuller heart.</span>
            </div>
            <div className="qp-hero-index" aria-hidden="true">
              <span>01</span><i />A path we share
            </div>
          </div>
        </section>

        <div className="qp-ribbon" aria-label="Faith, fellowship, hope, a path we share">
          <div className="qp-ribbon-track">
            <span>Faith</span><b>·</b><span>Fellowship</span><b>·</b><span>Hope</span><b>·</b><span>A path we share</span><b>·</b>
            <span>Faith</span><b>·</b><span>Fellowship</span><b>·</b><span>Hope</span><b>·</b><span>A path we share</span>
          </div>
        </div>

        <section className="qp-story" id="story">
          <div className="qp-story-aside">
            <QpEyebrow>Why we walk</QpEyebrow>
            <blockquote>“Sometimes the prayer begins with simply showing up.”</blockquote>
            <span className="qp-story-aside-note">A thought for the road</span>
          </div>
          <div className="qp-story-copy">
            <span className="qp-section-number">01 <i /> OUR HEART</span>
            <h2>A place to bring your whole self — <em>and take the next step.</em></h2>
            <p>
              Queen Prayer Walking Community is a welcoming circle of women who
              make room for faith in the middle of real life. We walk side by
              side, lift one another in prayer, and leave space for the
              conversations that grow along the way.
            </p>
            <a className="qp-inline-link" href="#practice">Walk gently. Pray boldly. <ArrowRight size={15} /></a>
          </div>
        </section>

        <section className="qp-practice" id="practice">
          <div className="qp-practice-heading">
            <div>
              <QpEyebrow>A simple rhythm</QpEyebrow>
              <h2>Room to breathe.<br /><em>Room to believe.</em></h2>
            </div>
            <p>No perfect words or quick answers needed. Just a shared path, an open heart, and the grace to begin where you are.</p>
          </div>
          <div className="qp-steps">
            <article className="qp-step">
              <div className="qp-step-top"><span>01 / ARRIVE</span><Footprints size={21} strokeWidth={1.5} /></div>
              <h3>Come as you are</h3>
              <p>Bring your questions, your gratitude, your tiredness — or simply come to listen.</p>
            </article>
            <article className="qp-step">
              <div className="qp-step-top"><span>02 / WALK</span><HeartHandshake size={21} strokeWidth={1.5} /></div>
              <h3>Walk beside one another</h3>
              <p>We share the path at a human pace. Conversation and quiet both belong.</p>
            </article>
            <article className="qp-step">
              <div className="qp-step-top"><span>03 / PRAY</span><BookOpen size={21} strokeWidth={1.5} /></div>
              <h3>Carry hope forward</h3>
              <p>We hold one another in prayer, and go on with a little more courage.</p>
            </article>
          </div>
        </section>

        <section className="qp-gathering" id="gathering">
          <div className="qp-gathering-line">
            <span className="qp-gather-icon"><Leaf size={20} strokeWidth={1.4} /></span>
            <div className="qp-gather-copy">
              <QpEyebrow>A regular moment together</QpEyebrow>
              <h2>Make a little room<br /><em>in your month.</em></h2>
            </div>
            <div className="qp-gather-details">
              <span className="qp-detail-label">OUR SHARED RHYTHM</span>
              <strong>Every last Sunday</strong>
              <span>of the month · 9:00 AM</span>
              <QpButton href={inviteUrl} secondary>Ask about joining</QpButton>
            </div>
          </div>
        </section>
      </main>

      <footer className="qp-footer">
        <a className="qp-brand qp-footer-brand" href="#top">
          <QpMark />
          <span className="qp-brand-copy">
            <strong>Queen Prayer Walking</strong>
            <small>Community · Faith in motion</small>
          </span>
        </a>
        <p><Heart size={13} aria-hidden="true" /> Walk gently. Pray boldly.</p>
        <a className="qp-footer-link" href={inviteUrl} target="_blank" rel="noreferrer">Join the conversation <ArrowRight size={14} /></a>
      </footer>
    </div>
  );
}

export default QueenPrayerWalkRefined;