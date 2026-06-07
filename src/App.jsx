import React from "react";
import Snowfall from "react-snowfall";
import {
  useTweaks, TweaksPanel, TweakSection,
  TweakColor, TweakSlider, TweakRadio,
} from "./tweaks-panel.jsx";

const { useState, useEffect, useRef } = React;

// app.jsx — Julemarch ’26 landing
// Single-page risograph-poster site for a Copenhagen Christmas march
// supporting Smilfonden. All copy in Danish.


// ─────────── Tweak defaults (host rewrites this block on disk) ───────────
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": ["#ece2c8", "#1a1f1a", "#c54a3b", "#4f6b3c", "#c98a2a"],
  "grain": 0.32,
  "heroLayout": "stacked",
  "heroBg": "green",
  "showMisreg": true
} /*EDITMODE-END*/;

// Each palette: [paper, ink, red, green, ochre]
const PALETTE_OPTIONS = [
["#ece2c8", "#1a1f1a", "#c54a3b", "#4f6b3c", "#c98a2a"], // Cream + brick & forest
["#f1e4d6", "#2a1f1a", "#a8472f", "#8a6a3a", "#3a5a4a"], // Faded sienna
["#e6dec3", "#142226", "#d9624a", "#2e5b6e", "#d9a04a"], // Cold paper, teal
["#efe1cf", "#1e1a14", "#c45a3a", "#5a4a3a", "#8e6a3a"] // Warm umber & rust
];

// ─────────── Section: Hero ───────────
function Hero({ layout, bg }) {
  const heroClass = "hero" + (bg && bg !== "paper" ? " tinted" : "");
  if (layout === "split") {
    return (
      <section className={heroClass} data-bg={bg}>
        <div className="wrap">
          <div className="hero-core" style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 56, alignItems: "end" }}>
            <h1 className="display hero-title" style={{ fontSize: "clamp(72px,12vw,200px)" }}>
              Jule<br />march<span className="ink-red">.</span>
            </h1>
            <div>
              <p className="hero-sub" style={{ marginTop: 0 }}>
                En vinteraften med lanterner, gode naboer og et godt formål. Vi går for de børn, der tilbringer julen på hospitalet.
              </p>
              <div style={{ marginTop: 28, display: "flex", gap: 14, flexWrap: "wrap" }}>
                <a className="btn-cta" href="https://docs.google.com/forms/d/e/1FAIpQLScRoKDZJKjOlKac_N18NlOi39Z_lklvyIanbLS7bl1wRYJ5eg/viewform">Tilmeld dig <span className="arrow">↗</span></a>
                <a className="btn-ghost" href="#smilfonden">Læs om formålet</a>
              </div>
            </div>
          </div>
          <HeroFoot />
        </div>
      </section>);

  }

  if (layout === "left") {
    return (
      <section className={heroClass} data-bg={bg}>
        <div className="wrap">
          <div className="hero-core" style={{ maxWidth: 1100 }}>
            <h1 className="display hero-title" style={{ textAlign: "left" }}>
              Jule­march<span className="ink-red">.</span>
            </h1>
            <p className="hero-sub">
              En vinteraften med lanterner, gode naboer og et godt formål.<br />
              Vi går for de børn, der tilbringer julen på hospitalet.
            </p>
            <div style={{ marginTop: 36, display: "flex", gap: 14, flexWrap: "wrap" }}>
              <a className="btn-cta" href="https://docs.google.com/forms/d/e/1FAIpQLScRoKDZJKjOlKac_N18NlOi39Z_lklvyIanbLS7bl1wRYJ5eg/viewform">Tilmeld dig — 150 kr. <span className="arrow">↗</span></a>
              <a className="btn-ghost" href="#smilfonden">Om Smilfonden</a>
            </div>
          </div>
          <HeroFoot />
        </div>
      </section>);

  }

  // stacked (default, poster-y)
  return (
    <section className={heroClass} data-bg={bg}>
      <div className="wrap" style={{ textAlign: "center" }}>
        <div className="hero-core">
          <h1 className="display hero-title" style={{ textAlign: "center" }}>
            Julemarch
          </h1>
          <p className="hero-sub" style={{ margin: "32px auto 0" }}>
            Ikke alle kan fejre jul derhjemme.<br />
            Vi går for dem, der ikke kan.
          </p>
          <div style={{ marginTop: 40, display: "inline-flex", gap: 14, flexWrap: "wrap", justifyContent: "center", alignSelf: "center" }}>
            <a className="btn-cta" href="https://docs.google.com/forms/d/e/1FAIpQLScRoKDZJKjOlKac_N18NlOi39Z_lklvyIanbLS7bl1wRYJ5eg/viewform">Tilmeld dig nu <span className="arrow">↗</span></a>
            <a className="btn-ghost" href="#smilfonden">Læs om formålet</a>
          </div>
        </div>
        <HeroFoot />
      </div>
    </section>);

}

function HeroFoot() {
  return (
    <div className="hero-foot">
      <div>
        <div className="label">Dato</div>
        <div className="val">Søndag<br />20. december 2026</div>
      </div>
      <div>
        <div className="label">Mødested</div>
        <div className="val">Kuriosum<br /><span className="small">Helsingør · kl. 08:00</span></div>
      </div>
      <div className="hero-foot-last">
        <div className="label">Rute</div>
        <div className="val">~ 50 km<br /><span className="small">til Rigshospitalet</span></div>
      </div>
    </div>);

}

// ─────────── Section: Hvad er Julemarch ───────────
function What() {
  return (
    <section id="om">
      <div className="wrap">
        <div className="combined-grid">
          <div>
            <div className="eyebrow">Hvad er Julemarch</div>
            <h2 className="display" style={{ fontSize: "clamp(36px,5vw,56px)", margin: "10px 0 28px", fontStyle: "normal" }}>En gåtur langs kysten, for et godt formål.

            </h2>
            <p className="lead">Julemarch er en lille, lokalt organiseret julemarch fra Helsingør til København 

            </p>
            <p>Vi går for de børn, der skal tilbringe tiden indlagt - og som fortjener varme glæde og et øjeblik af magi i en svær tid. Det er en ca. 50 km vandretur langs kysten, hvor alle kan være med. Du kan gå med hele ruten, hoppe på undervejs eller bare komme og heppe.

            </p>
            <ul className="manifest" style={{ marginTop: 28 }}>
              <li>
                <span className="txt"><b>Ingen tidtagning.</b> Vi går sammen, i flok, i roligt fællestempo.</span>
              </li>
              <li>
                <span className="txt"><b>Familievenligt.</b> Børn, barnevogne, hunde — alle er velkomne.</span>
              </li>
            </ul>
          </div>

          <aside id="smilfonden" className="smil-card">
            <div className="eyebrow">Formålet</div>
            <h3 className="smil-card-title">
              Hver krone går til <span className="accent">Smilfonden</span>.
            </h3>
            <p>
              Smilfonden støtter børn med alvorlige og kroniske sygdomme på alle 21 danske børnehospitaler. Til jul bringer de julestemning ind på afdelingerne — gennem aktiviteter, gaver og nærvær — så børnene får noget at glæde sig over midt i en svær tid.
            </p>
            <div className="smil-card-stats">
              <div className="stat">
                <div className="n">21</div>
                <div className="l">Børnehospitaler</div>
              </div>
              <div className="stat">
                <div className="n">100+</div>
                <div className="l">Aktiviteter / år</div>
              </div>
              <div className="stat">
                <div className="n">2014</div>
                <div className="l">Grundlagt</div>
              </div>
            </div>
            <a className="linkout" href="https://smilfonden.dk" target="_blank" rel="noopener noreferrer">smilfonden.dk ↗</a>
          </aside>
        </div>
      </div>
    </section>);

}

// ─────────── Section: Praktisk info ───────────
function Praktisk() {
  return (
    <section id="praktisk">
      <div className="wrap">
        <div className="eyebrow">Praktisk</div>
        <div className="praktisk-wrap" style={{ marginTop: 24 }}>
          <div>
            <div className="route-card">
              <h4>RUTEN</h4>
              <div className="route-step">
                <span className="step-num">01</span>
                <span className="step-name">Kurisom <span style={{ fontStyle: "normal", fontSize: 12, fontFamily: "var(--mono)", color: "color-mix(in oklab, var(--ink) 55%, transparent)", letterSpacing: ".1em", textTransform: "uppercase", marginLeft: 6 }}>start</span></span>
                <span className="step-time">08:00</span>
              </div>
              <div className="route-step">
                <span className="step-num">02</span>
                <span className="step-name">Humlebæk</span>
                <span className="step-time">16:15</span>
              </div>
              <div className="route-step">
                <span className="step-num">03</span>
                <span className="step-name">Humlebæk</span>
                <span className="step-time">16:45</span>
              </div>
              <div className="route-step">
                <span className="step-num">04</span>
                <span className="step-name">Humlebæk <span style={{ fontStyle: "normal", fontSize: 12, fontFamily: "var(--mono)", color: "color-mix(in oklab, var(--ink) 55%, transparent)", letterSpacing: ".1em", textTransform: "uppercase", marginLeft: 6 }}>PAUSE</span></span>
                <span className="step-time">17:15</span>
              </div>
              <div className="route-step">
                <span className="step-num">05</span>
                <span className="step-name">Rigshospitalet</span>
                <span className="step-time">17:40</span>
              </div>
              <div className="route-step">
                <span className="step-num">06</span>
                <span className="step-name">Terminal 13 <span style={{ fontStyle: "normal", fontSize: 12, fontFamily: "var(--mono)", color: "var(--red)", letterSpacing: ".1em", textTransform: "uppercase", marginLeft: 6 }}>mål</span></span>
                <span className="step-time">18:15</span>
              </div>
            </div>

            <div style={{ marginTop: 22, fontFamily: "var(--mono)", fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase", color: "color-mix(in oklab, var(--ink) 60%, transparent)" }}>
              Under hele marchen bærer vi en GPS-tracker, så det bliver nemt at følge os live. Her kan man se præcis, hvor vi befinder os, sende opmuntringer og tilslutte sig turen, hvis man har lyst til at gå et kortere stykke.
            </div>
          </div>
        </div>
      </div>
    </section>);

}

// ─────────── Section: Smilfonden ───────────
function Smilfonden() {
  return (
    <section id="smilfonden" className="smil">
      <div className="wrap">
        <div>
          <div className="eyebrow">Formålet</div>
          <h2>
            Hver krone går til <span className="accent italic">Smilfonden</span>.
          </h2>
          <p style={{ marginTop: 28 }}>
            Smilfonden blev grundlagt i 2014 af tidligere tv-vært Sisse Fisker. Fonden er til stede på alle 21 danske hospitaler med børneafdelinger og skaber pauser fra sygdommen for indlagte børn og deres familier.
          </p>
          <p>
            Det handler om kreative værksteder på sengestuen. Sommerlejre med andre familier i samme situation. Netværksture, fællesskab, og et øjeblik hvor det hele ikke kun handler om diagnosen.
          </p>
          <p>
            Smilfonden driver <em>SMILET</em> — et bemandet kreativt værksted — på Rigshospitalet og Aarhus Universitetshospital.
          </p>
          <p>
            <a className="linkout" href="https://smilfonden.dk" target="_blank" rel="noopener noreferrer">smilfonden.dk ↗</a>
          </p>
        </div>

        <div>
          <div className="stat-grid">
            <div className="stat">
              <div className="n italic">21</div>
              <div className="l">Danske børnehospitaler</div>
            </div>
            <div className="stat">
              <div className="n italic">100+</div>
              <div className="l">Aktiviteter om året</div>
            </div>
            <div className="stat">
              <div className="n italic">2014</div>
              <div className="l">Grundlagt af Sisse Fisker</div>
            </div>
            <div className="stat">
              <div className="n italic">2</div>
              <div className="l">Faste SMILET-værksteder</div>
            </div>
          </div>

          <div className="quote">
            “At være alvorligt syg som barn betyder ofte uger og måneder på et hospital. Smilfondens arbejde gør, at de børn — og deres familier — får lov at være andet end patienter, bare for en stund.”
            <span className="who">— Smilfonden, om formålet</span>
          </div>
        </div>
      </div>
    </section>);

}

// ─────────── Section: Galleri ───────────
const GALLERY_PHOTOS = [
  { file: "Morgenmad og briefing.jpg", cls: "g-wide", tint: "t-green" },
  { file: "Der marcheres.jpg",         cls: "g-tall", tint: "t-red"   },
  { file: "Avisartikel.png",           cls: "g-tall", tint: "t-slate", imgStyle: { objectPosition: "center 15%" } },
  { file: "Frugtpause.jpg",            cls: "g-wide", tint: "t-ochre" },
  { file: "Afsløring af penge indsamlet.jpg", cls: "g-half", tint: "t-ochre" },
  { file: "De gik alle 50 km.jpg",     cls: "g-half", tint: "t-red"   },
];

function Gallery() {
  return (
    <section id="galleri">
      <div className="wrap">
        <div className="eyebrow">Galleri 2025</div>
        <div className="gallery-grid" style={{ marginTop: 24 }}>
          {GALLERY_PHOTOS.map((p, i) =>
            <div key={i} className={`photo ${p.cls} ${p.tint}`}>
              <img src={`/photos/${encodeURIComponent(p.file)}`} alt={p.file.replace(/\.[^.]+$/, "")} style={p.imgStyle} />
              <div className="meta">{String(i + 1).padStart(3, "0")} / 06</div>
              <div className="lbl">{p.file.replace(/\.[^.]+$/, "")}</div>
            </div>
          )}
        </div>
      </div>
    </section>);
}

// ─────────── Section: FAQ ───────────
const FAQ_ITEMS = [
{
  q: "Hvem kan deltage?",
  a: "Alle. Vi har deltagere i alle aldre, familier, hunde, bedsteforældre og børn — det hele. Ruten er flad og foregår på fortov, og vi går i et roligt fællestempo."
},
{
  q: "Hvad koster det?",
  a: <>Julemarch er gratis — det er en velgørenhedsmarch, ikke et betalt arrangement. Vil du støtte formålet, kan du donere direkte til Smilfonden via <a href="https://smil.smilfonden.dk/fundraisers/julemarch-2025" target="_blank" rel="noopener noreferrer" style={{ color: "var(--green)" }}>smil.smilfonden.dk/fundraisers/julemarch-2025</a>. Alle arrangører og hjælpere er frivillige.</>
},
{
  q: "Hvad skal jeg medbringe?",
  a: "Varmt tøj, gode sko, og evt. snacks til ruten. Vi sørger for forplejninger på ruten samt gløg og æbleskiver ved målet."
},
{
  q: "Kan jeg støtte uden at gå med?",
  a: <>Ja, meget gerne. Du kan donere direkte til Smilfondens indsamling for Julemarch på <a href="https://smil.smilfonden.dk/fundraisers/julemarch-2025" target="_blank" rel="noopener noreferrer" style={{ color: "var(--green)" }}>smil.smilfonden.dk/fundraisers/julemarch-2025</a>. Alle bidrag går ubeskåret til Smilfonden.</>
},
{
  q: "Hvem står bag?",
  a: "Vi er en lille gruppe venner, der er gået sammen om at lave Julemarch som et helt frivilligt initiativ. Skriv til os hvis du vil hjælpe — vi mangler altid hænder."
}];


function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq">
      <div className="wrap">
        <div className="eyebrow">FAQ</div>
        <div className="faq-list" style={{ marginTop: 24 }}>
          {FAQ_ITEMS.map((item, i) =>
          <div key={i} className={`faq-item ${open === i ? "open" : ""}`}>
              <button className="faq-q" onClick={() => setOpen(open === i ? -1 : i)}>
                <span className="qnum">{String(i + 1).padStart(2, "0")}</span>
                <span>{item.q}</span>
                <span className="tog">+</span>
              </button>
              <div className="faq-a"><div style={{ paddingTop: 4 }}>{item.a}</div></div>
            </div>
          )}
        </div>
      </div>
    </section>);

}

// ─────────── Section: Sponsorer ───────────
function Sponsors() {
  const list = [
  { name: "Ærenlunds blomster, frugt og grønt", role: "Frugt og grønt undervejs" },
  { name: "Din virksomhed?", role: "Julemarchen@gmail.com" }];

  return (
    <section id="sponsorer">
      <div className="wrap">
        <div className="eyebrow">Støttet af</div>
        <h2 className="display" style={{ fontSize: "clamp(36px,5vw,56px)", margin: "10px 0 24px", fontStyle: "normal" }}>
          Tak til vores partnere.
        </h2>
        <p style={{ fontFamily: "var(--sans)", fontSize: 17, lineHeight: 1.6, maxWidth: 720, marginTop: 0, marginBottom: 48, color: "color-mix(in oklab, var(--ink) 75%, transparent)" }}>
          Julemarch er muliggjort af lokale virksomheder og organisationer, der tror på fællesskab og et godt formål.
        </p>
        <div className="sponsor-grid">
          {list.map((s, i) =>
          <div className="sponsor" key={i}>
              <div className="name">{s.name}</div>
              <div className="role">{s.role}</div>
            </div>
          )}
        </div>
      </div>
    </section>);

}

// ─────────── Section: Final tilmeld CTA ───────────
function FinalCTA() {
  return (
    <section id="tilmeld" style={{ paddingTop: 72, paddingBottom: 96 }}>
      <div className="wrap" style={{ textAlign: "center" }}>
        <div style={{
          border: "1px solid var(--ink)",
          padding: "72px 36px",
          background: "color-mix(in oklab, var(--paper) 50%, white 0%)",
          position: "relative"
        }}>
          <div className="eyebrow">Tilmelding · Julemarch ’26</div>
          <h2 className="display" style={{ fontSize: "clamp(48px,8vw,110px)", margin: "12px 0 12px" }}>
            Gå med os.
          </h2>
          <p style={{ fontFamily: "var(--sans)", fontSize: "clamp(16px,1.6vw,20px)", lineHeight: 1.6, maxWidth: 560, margin: "0 auto 36px", color: "color-mix(in oklab, var(--ink) 78%, transparent)" }}>
            Søndag 20. december 2026 · kl. 08:00 · Kuriosum Helsingør.
          </p>
          <a className="btn-cta" href="https://docs.google.com/forms/d/e/1FAIpQLScRoKDZJKjOlKac_N18NlOi39Z_lklvyIanbLS7bl1wRYJ5eg/viewform" target="_blank" rel="noopener noreferrer" style={{ fontSize: 14, padding: "22px 32px" }}>
            Til tilmelding <span className="arrow">↗</span>
          </a>
          <div style={{ marginTop: 28, fontFamily: "var(--mono)", fontSize: 10, letterSpacing: ".18em", textTransform: "uppercase", color: "color-mix(in oklab, var(--ink) 55%, transparent)" }}>
            Tilmeldingslink åbner i nyt vindue
          </div>
        </div>
      </div>
    </section>);

}

// ─────────── Footer ───────────
function Foot() {
  return (
    <footer>
      <div className="wrap">
        <div>
          <div className="mark">Julemarch ’26</div>
          <p style={{ fontFamily: "var(--sans)", fontSize: 13, lineHeight: 1.6, maxWidth: 280, marginTop: 14, color: "color-mix(in oklab, var(--ink) 70%, transparent)" }}>Et lille, frivilligt arrangement i Helsingør. Til fordel for Smilfonden.

          </p>
        </div>
        <div>
          <h5>Arrangement</h5>
          <ul>
            <li><a href="#om">Om Julemarch</a></li>
            <li><a href="#praktisk">Praktisk info</a></li>
            <li><a href="#galleri">Galleri</a></li>
            <li><a href="#faq">FAQ</a></li>
          </ul>
        </div>
        <div>
          <h5>Formålet</h5>
          <ul>
            <li><a href="#smilfonden">Om Smilfonden</a></li>
            <li><a href="https://smilfonden.dk" target="_blank" rel="noopener noreferrer">smilfonden.dk ↗</a></li>
            <li><a href="#sponsorer">Sponsorer</a></li>
          </ul>
        </div>
        <div>
          <h5>Kontakt</h5>
          <ul>
            <li><a href="mailto:Julemarchen@gmail.com">Julemarchen@gmail.com</a></li>
            <li><a href="https://docs.google.com/forms/d/e/1FAIpQLSemTo-XoO1-MUVoGzJ0dqTRrRYgYAQZ5jnf8xRhBNlE-9Se-A/viewform" target="_blank" rel="noopener noreferrer">Bliv frivillig</a></li>
            <li><a href="#">Bliv sponsor</a></li>
          </ul>
        </div>
        <div className="colophon">
        </div>
      </div>
    </footer>);

}

// ─────────── Reveal-on-scroll hook ───────────
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -10% 0px" });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

// ─────────── Apply palette to :root ───────────
function applyPalette(p) {
  const root = document.documentElement;
  root.style.setProperty("--paper", p[0]);
  root.style.setProperty("--ink", p[1]);
  root.style.setProperty("--red", p[2]);
  root.style.setProperty("--green", p[3]);
  root.style.setProperty("--ochre", p[4]);
}

// ─────────── App ───────────
function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  useReveal();

  useEffect(() => {applyPalette(t.palette);}, [t.palette]);
  useEffect(() => {
    document.documentElement.style.setProperty("--grain", String(t.grain));
  }, [t.grain]);

  return (
    <>
      <Snowfall
        color="rgba(236,226,200,0.7)"
        snowflakeCount={80}
        radius={[0.5, 2.5]}
        speed={[0.5, 1.5]}
        wind={[-0.3, 0.8]}
        style={{ position: 'fixed', zIndex: 9999, pointerEvents: 'none' }}
      />
      <main>
        <Hero layout={t.heroLayout} bg={t.heroBg} />
        <div className="reveal"><What /></div>
        <div className="reveal"><Praktisk /></div>
        <div className="reveal"><Gallery /></div>
        <div className="reveal"><FAQ /></div>
        <div className="reveal"><Sponsors /></div>
        <div className="reveal"><FinalCTA /></div>
      </main>
      <Foot />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Palette" />
        <TweakColor
          label="Riso-palette"
          value={t.palette}
          options={PALETTE_OPTIONS}
          onChange={(v) => setTweak("palette", v)} />
        
        <TweakSection label="Tekstur" />
        <TweakSlider
          label="Papirgrain"
          value={Math.round(t.grain * 100)}
          min={0} max={100} unit="%"
          onChange={(v) => setTweak("grain", v / 100)} />
        
        <TweakSection label="Hero" />
        <TweakRadio
          label="Layout"
          value={t.heroLayout}
          options={["stacked", "left", "split"]}
          onChange={(v) => setTweak("heroLayout", v)} />
        <TweakRadio
          label="Baggrund"
          value={t.heroBg}
          options={["paper", "green", "slate", "ink"]}
          onChange={(v) => setTweak("heroBg", v)} />
        
      </TweaksPanel>
    </>);

}

export default App;