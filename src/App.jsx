import React from "react";
import Snowfall from "react-snowfall";
import {
  useTweaks, TweaksPanel, TweakSection,
  TweakColor, TweakSlider, TweakRadio,
} from "./tweaks-panel.jsx";

const { useState, useEffect } = React;

// app.jsx — Julemarch ’26 landing
// Single-page risograph-poster site for a Christmas march from Helsingør to
// København. 2026 fundraiser: Børnecancerfonden. All copy in Danish.


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

// ─────────── Content 2026 ───────────
// Everything that must match the Facebook event lives here.
// `null` = not known yet → rendered as a red "Mangler" tag on the page.
const FACEBOOK_EVENT_URL = "https://facebook.com/events/s/julemarch-2026/1832390217948235/";
const DONATION_URL = "https://indsamling.boernecancerfonden.dk/fundraisers/julemarch-2026";
const CONTACT_EMAIL = "Julemarchen@gmail.com";

const EVENT = {
  date: "Lørdag 12. december 2026",
  startTime: "09:00",
  startPlace: "Kuriosum",
  startAddress: "Stengade 48F, Helsingør",
  endTime: "19:00",
  endPlace: "Kompagnistræde 13, st. tv.",
  endAddress: "1208 København K",
  stops: [           // tidsplan med ca. ankomsttider følger → udfyld `time`
    { place: "Humlebæk Skole", address: "Gl. Strandvej 132, 3050 Humlebæk", time: null },
    { place: "Vedbæk Gamle Stationsbygning", address: "Vedbæk Stationsvej 20A, 2950 Vedbæk", time: null },
  ],
};

const FUNDRAISING = {
  lastYearAmount: "16.360 kr.",
  lastYearCharity: "SMILfonden",
  goalAmount: "20.000 kr.",
  charity: "Børnecancerfonden",
};

const SMIL_STATEMENT = null; // { text: "...", who: "Navn, titel, SMILfonden" }

const TESTIMONIALS = []; // [{ quote: "...", who: "Navn" }]

const SPONSOR_GROUPS = [
  {
    label: "Mad & forplejning",
    sponsors: [
      { name: "Restaurant Kaj", role: "Æbleskiver og gløgg" },
      { name: "Kuriosum", role: "Lokaler, kaffe og andet godt" },
      { name: "Graabæks Kagehus", role: "Morgenboller" },
      { name: "Enoteka", role: "Chokoladekugler" },
      { name: "Ærenlund, grønthandler i Humlebæk", role: "Frugt til turen" },
    ],
  },
  {
    label: "Gaver",
    sponsors: [
      { name: "Divino Restaurant, Espergærde", role: "Gavekort" },
    ],
  },
  {
    label: "Afslutning på turen",
    sponsors: [
      { name: "K13", role: "For at lægge rammer til en fantastisk afslutning" },
    ],
  },
  {
    label: "Økonomisk støtte",
    sponsors: [
      { name: "Butik Kayser", role: "Økonomisk støtte" },
      { name: "Humlebæk Mikromejeri", role: "Økonomisk støtte" },
      { name: "Ronning", role: "Økonomisk støtte" },
    ],
  },
];

// ─────────── Shared bits ───────────
function Pending({ children }) {
  return <span className="pending" title="Mangler information">Mangler · {children}</span>;
}

function orPending(value, label) {
  return value ?? <Pending>{label}</Pending>;
}

function SignupButton({ children = "Tilmeld dig på Facebook", style }) {
  return (
    <a className="btn-cta" href={FACEBOOK_EVENT_URL} target="_blank" rel="noopener noreferrer" style={style}>
      {children} <span className="arrow">↗</span>
    </a>);
}

function DonateButton({ className = "btn-cta", children = "Støt indsamlingen" }) {
  if (!DONATION_URL) {
    return (
      <span className={className + " is-disabled"} aria-disabled="true">
        {children} <Pending>link</Pending>
      </span>);
  }
  return (
    <a className={className} href={DONATION_URL} target="_blank" rel="noopener noreferrer">
      {children} <span className="arrow">↗</span>
    </a>);
}

function DonateLink() {
  if (!DONATION_URL) return <Pending>donationslink</Pending>;
  return <a href={DONATION_URL} target="_blank" rel="noopener noreferrer" style={{ color: "var(--green)" }}>Støt indsamlingen ↗</a>;
}

// ─────────── Section: Hero ───────────
function HeroCtas({ style }) {
  return (
    <div className="hero-ctas" style={style}>
      <SignupButton />
      <DonateButton className="btn-ghost" />
    </div>);
}

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
              <HeroCtas style={{ marginTop: 28 }} />
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
            <HeroCtas style={{ marginTop: 36 }} />
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
          <HeroCtas style={{ marginTop: 40, justifyContent: "center" }} />
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
        <div className="val">{orPending(EVENT.date, "dato")}</div>
      </div>
      <div>
        <div className="label">Start</div>
        <div className="val">
          {orPending(EVENT.startPlace, "startsted")}<br />
          <span className="small">Helsingør · kl. {orPending(EVENT.startTime, "starttid")}</span>
        </div>
      </div>
      <div className="hero-foot-last">
        <div className="label">Indsamling 2026</div>
        <div className="val">Mål: {FUNDRAISING.goalAmount}<br /><span className="small">til {FUNDRAISING.charity}</span></div>
      </div>
    </div>);

}

// ─────────── Section: Hvad er Julemarch + Indsamling ───────────
function What() {
  return (
    <section id="om">
      <div className="wrap">
        <div className="combined-grid">
          <div>
            <div className="eyebrow">Hvad er Julemarch</div>
            <h2 className="display" style={{ fontSize: "clamp(36px,5vw,56px)", margin: "10px 0 28px", fontStyle: "normal" }}>En gåtur langs kysten, for et godt formål.
            </h2>
            <p className="lead">Julemarch er en lille, lokalt organiseret julemarch fra Helsingør til København.
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

          <aside id="indsamling" className="smil-card">
            <div className="eyebrow">Indsamling · 2026</div>
            <h3 className="smil-card-title">
              I år går vi for <span className="accent">{FUNDRAISING.charity}</span>.
            </h3>
            <p>
              Sidste år samlede vi {FUNDRAISING.lastYearAmount} ind til {FUNDRAISING.lastYearCharity}. I år er målet {FUNDRAISING.goalAmount} til {FUNDRAISING.charity}. Du kan støtte indsamlingen, også selvom du ikke selv går med.
            </p>
            <div className="smil-card-stats" style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <div className="stat">
                <div className="n">{FUNDRAISING.lastYearAmount}</div>
                <div className="l">Indsamlet 2025 · {FUNDRAISING.lastYearCharity}</div>
              </div>
              <div className="stat">
                <div className="n">{FUNDRAISING.goalAmount}</div>
                <div className="l">Mål 2026 · {FUNDRAISING.charity}</div>
              </div>
            </div>
            <DonateButton />
          </aside>
        </div>
      </div>
    </section>);

}

// ─────────── Section: Praktisk info ───────────
function Praktisk() {
  const stepTag = (txt, accent) =>
  <span className={"step-tag" + (accent ? " accent" : "")}>{txt}</span>;

  return (
    <section id="praktisk">
      <div className="wrap">
        <div className="eyebrow">Praktisk · Julemarch 2026</div>
        <div className="praktisk-wrap" style={{ marginTop: 24 }}>
          <div>
            <div className="route-card">
              <h4>RUTEN</h4>
              <div className="route-step">
                <span className="step-num">01</span>
                <span className="step-name">
                  {orPending(EVENT.startPlace, "startsted")} {stepTag("start")}
                  {EVENT.startAddress && <span className="step-addr">{EVENT.startAddress}</span>}
                </span>
                <span className="step-time">{orPending(EVENT.startTime, "tid")}</span>
              </div>
              {EVENT.stops.map((stop, i) =>
              <div className="route-step" key={i}>
                  <span className="step-num">{String(i + 2).padStart(2, "0")}</span>
                  <span className="step-name">
                    {orPending(stop.place, `stop ${i + 1}`)} {stepTag("stop")}
                    {stop.address && <span className="step-addr">{stop.address}</span>}
                  </span>
                  <span className="step-time">{stop.time ?? "Tid følger"}</span>
                </div>
              )}
              <div className="route-step">
                <span className="step-num">{String(EVENT.stops.length + 2).padStart(2, "0")}</span>
                <span className="step-name">
                  {orPending(EVENT.endPlace, "slutdestination")} {stepTag("mål", true)}
                  {EVENT.endAddress && <span className="step-addr">{EVENT.endAddress}</span>}
                </span>
                <span className="step-time">{orPending(EVENT.endTime, "tid")}</span>
              </div>
            </div>
          </div>

          <FacebookNote />
        </div>
      </div>
    </section>);

}

function FacebookNote() {
  return (
    <div className="fb-note">
      <div className="eyebrow">Følg med på Facebook</div>
      <p>
        Vi bruger Facebook-begivenheden til løbende opdateringer og information om marchen. Følg begivenheden, så du altid er opdateret om eventuelle ændringer.
      </p>
      <a className="btn-ghost" href={FACEBOOK_EVENT_URL} target="_blank" rel="noopener noreferrer">
        Gå til Facebook-begivenheden ↗
      </a>
    </div>);
}

// ─────────── Section: Tilmelding ───────────
function Tilmelding() {
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
          <p style={{ fontFamily: "var(--sans)", fontSize: "clamp(16px,1.6vw,20px)", lineHeight: 1.6, maxWidth: 600, margin: "0 auto 36px", color: "color-mix(in oklab, var(--ink) 78%, transparent)" }}>
            Alle kan deltage — uanset om du vil gå en del af ruten eller hele vejen fra Helsingør til København. Tilmelding foregår via Facebook-begivenheden: tryk »Deltager«, så er du med.
          </p>
          <SignupButton style={{ fontSize: 14, padding: "22px 32px" }} />

          <div className="signup-note">
            <p>
              <b>Når du trykker »Deltager« på Facebook, regner vi med, at du møder op.</b> Det er vigtigt, fordi vi skal kunne planlægge og bestille den rette mængde mad og drikkevarer til deltagerne.
            </p>
            <p>
              Bliver du forhindret, må du meget gerne ændre dit svar på Facebook.
            </p>
          </div>

          <div style={{ marginTop: 28, fontFamily: "var(--mono)", fontSize: 10, letterSpacing: ".18em", textTransform: "uppercase", color: "color-mix(in oklab, var(--ink) 55%, transparent)" }}>
            Linket åbner Facebook i et nyt vindue
          </div>
        </div>
      </div>
    </section>);

}

// ─────────── Section: Udtalelse fra SMILfonden ───────────
function Udtalelse() {
  return (
    <section id="udtalelse" className="smil">
      <div className="wrap">
        <div>
          <div className="eyebrow">Sidste år · 2025</div>
          <h2>
            {FUNDRAISING.lastYearAmount} til <span className="accent italic">{FUNDRAISING.lastYearCharity}</span>.
          </h2>
          <img
            className="udtalelse-photo"
            src={`/photos/${encodeURIComponent("Afsløring af penge indsamlet.jpg")}`}
            alt="Afsløring af penge indsamlet" />
        </div>

        <div>
          <div className="eyebrow">Udtalelse fra SMILfonden</div>
          <div className="quote">
            {SMIL_STATEMENT ?
            <>“{SMIL_STATEMENT.text}”<span className="who">— {SMIL_STATEMENT.who}</span></> :
            <Pending>udtalelse fra SMILfonden</Pending>}
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
              <div className="meta">{String(i + 1).padStart(3, "0")} / {String(GALLERY_PHOTOS.length).padStart(2, "0")}</div>
              <div className="lbl">{p.file.replace(/\.[^.]+$/, "")}</div>
            </div>
          )}
        </div>
      </div>
    </section>);
}

// ─────────── Section: Feedback fra deltagerne ───────────
function Feedback() {
  return (
    <section id="feedback">
      <div className="wrap">
        <div className="eyebrow">Feedback fra deltagerne</div>
        <h2 className="display" style={{ fontSize: "clamp(36px,5vw,56px)", margin: "10px 0 32px", fontStyle: "normal" }}>
          Sådan var Julemarch 2025.
        </h2>
        {TESTIMONIALS.length ?
        <div className="testimonial-grid">
            {TESTIMONIALS.map((t, i) =>
          <figure className="testimonial" key={i}>
                <blockquote>“{t.quote}”</blockquote>
                <figcaption>— {t.who}</figcaption>
              </figure>
          )}
          </div> :
        <Pending>feedback fra deltagerne</Pending>}
      </div>
    </section>);
}

// ─────────── Section: FAQ ───────────
const FAQ_ITEMS = [
{
  q: "Hvem kan deltage?",
  a: "Alle. Vi har deltagere i alle aldre, familier, hunde, bedsteforældre og børn — det hele. Du kan gå hele vejen fra Helsingør til København eller kun en del af ruten. Ruten er flad og foregår på fortov, og vi går i et roligt fællestempo."
},
{
  q: "Hvordan tilmelder jeg mig?",
  a: <>Via <a href={FACEBOOK_EVENT_URL} target="_blank" rel="noopener noreferrer" style={{ color: "var(--green)" }}>Facebook-begivenheden</a> — tryk »Deltager«. Når du har trykket »Deltager«, regner vi med, at du møder op, så vi kan bestille den rette mængde mad og drikkevarer. Bliver du forhindret, må du meget gerne ændre dit svar på Facebook.</>
},
{
  q: "Hvor finder jeg de seneste opdateringer?",
  a: <>I <a href={FACEBOOK_EVENT_URL} target="_blank" rel="noopener noreferrer" style={{ color: "var(--green)" }}>Facebook-begivenheden</a>. Her deler vi løbende information og eventuelle ændringer, så følg begivenheden for at holde dig opdateret.</>
},
{
  q: "Hvad koster det?",
  a: <>Julemarch er gratis — det er en velgørenhedsmarch, ikke et betalt arrangement. Vil du støtte formålet, kan du donere til årets indsamling til {FUNDRAISING.charity}: <DonateLink />. Alle arrangører og hjælpere er frivillige.</>
},
{
  q: "Hvad skal jeg medbringe?",
  a: "Varmt tøj, gode sko, og evt. snacks til ruten. Vi sørger for forplejninger på ruten samt gløg og æbleskiver ved målet."
},
{
  q: "Kan jeg støtte uden at gå med?",
  a: <>Ja, meget gerne. Du kan støtte årets indsamling til {FUNDRAISING.charity} direkte: <DonateLink /></>
},
{
  q: "Hvem står bag?",
  a: "Vi er en lille gruppe venner, der er gået sammen om at lave Julemarch som et helt frivilligt initiativ. Skriv til os hvis du vil hjælpe — vi mangler altid hænder."
}];


function FAQ() {
  const [open, setOpen] = useState(-1);
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

// ─────────── Section: Tak til sidste års sponsorer ───────────
function Sponsors() {
  return (
    <section id="sponsorer">
      <div className="wrap">
        <div className="eyebrow">Sponsorer 2025</div>
        <h2 className="display" style={{ fontSize: "clamp(36px,5vw,56px)", margin: "10px 0 24px", fontStyle: "normal" }}>
          Tak til sidste års sponsorer.
        </h2>
        <p style={{ fontFamily: "var(--sans)", fontSize: 17, lineHeight: 1.6, maxWidth: 720, marginTop: 0, marginBottom: 48, color: "color-mix(in oklab, var(--ink) 75%, transparent)" }}>
          Julemarch 2025 blev muliggjort af lokale virksomheder, der støttede os. Tusind tak.
        </p>
        {SPONSOR_GROUPS.map((g) =>
        <div className="sponsor-group" key={g.label}>
            <h3>{g.label}</h3>
            <div className="sponsor-grid">
              {g.sponsors.map((s) =>
            <div className="sponsor" key={s.name}>
                  <div className="name">{s.name}</div>
                  <div className="role">{s.role}</div>
                </div>
            )}
            </div>
          </div>
        )}
        <p style={{ marginTop: 36 }}>
          <a className="btn-ghost" href="#samarbejde">Vil din virksomhed være med i år?</a>
        </p>
      </div>
    </section>);

}

// ─────────── Section: Kontakt for virksomheder ───────────
const SUPPORT_TYPES = [
  "Økonomiske bidrag.",
  "Donation af mad og drikkevarer.",
  "Snacks og forplejning til marchen.",
  "Gavekort eller andre produkter.",
  "Anden form for sponsorat eller samarbejde.",
];

function Samarbejde() {
  const [sent, setSent] = useState(false);

  function onSubmit(e) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const subject = `Sponsorat Julemarch 2026 – ${f.get("company")}`;
    const body = [
      `Virksomhed: ${f.get("company")}`,
      `Kontaktperson: ${f.get("contact")}`,
      `E-mail: ${f.get("email")}`,
      `Telefon: ${f.get("phone")}`,
      "",
      f.get("message"),
    ].join("\n");
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <section id="samarbejde">
      <div className="wrap samarbejde">
        <div>
          <div className="eyebrow">For virksomheder & sponsorer</div>
          <h2 className="display" style={{ fontSize: "clamp(36px,5vw,56px)", margin: "10px 0 24px", fontStyle: "normal" }}>
            Vil din virksomhed være med til at gøre en forskel?
          </h2>
          <p className="samarbejde-lead">
            Vi søger lokale virksomheder og samarbejdspartnere, der har lyst til at støtte vores march til fordel for {FUNDRAISING.charity}. Støtten kan være økonomisk eller i form af produkter og forplejning. Alle bidrag er med til at gøre en forskel.
          </p>
          <ul className="manifest" style={{ marginTop: 28 }}>
            {SUPPORT_TYPES.map((t) => <li key={t}><span className="txt">{t}</span></li>)}
          </ul>
        </div>

        <form className="contact-form" onSubmit={onSubmit}>
          <p className="samarbejde-lead" style={{ marginTop: 0 }}>Har din virksomhed lyst til at hjælpe, så kontakt os her.</p>
          <label>Virksomhedens navn<input name="company" required /></label>
          <label>Kontaktperson<input name="contact" required /></label>
          <div className="row">
            <label>E-mail<input name="email" type="email" required /></label>
            <label>Telefon<input name="phone" type="tel" /></label>
          </div>
          <label>Hvordan ønsker I at støtte?<textarea name="message" rows={5} required /></label>
          <button className="btn-cta" type="submit">Send henvendelse</button>
          <div className="form-hint">
            {sent ?
            <>Dit mailprogram åbner nu med beskeden. Sker der ikke noget, så skriv direkte til <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</> :
            <>Knappen åbner dit mailprogram. Du kan også skrive direkte til <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</>}
          </div>
        </form>
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
          <p style={{ fontFamily: "var(--sans)", fontSize: 13, lineHeight: 1.6, maxWidth: 280, marginTop: 14, color: "color-mix(in oklab, var(--ink) 70%, transparent)" }}>Et lille, frivilligt arrangement fra Helsingør til København. Til fordel for {FUNDRAISING.charity}.
          </p>
        </div>
        <div>
          <h5>Arrangement</h5>
          <ul>
            <li><a href="#om">Om Julemarch</a></li>
            <li><a href="#praktisk">Praktisk info</a></li>
            <li><a href="#tilmeld">Tilmelding</a></li>
            <li><a href="#galleri">Galleri</a></li>
            <li><a href="#faq">FAQ</a></li>
          </ul>
        </div>
        <div>
          <h5>Indsamlingen</h5>
          <ul>
            <li><a href="#indsamling">Årets indsamling</a></li>
            {DONATION_URL && <li><a href={DONATION_URL} target="_blank" rel="noopener noreferrer">Støt indsamlingen <span className="arrow">↗</span></a></li>}
            <li><a href="#udtalelse">Udtalelse fra SMILfonden</a></li>
            <li><a href="#sponsorer">Sponsorer</a></li>
          </ul>
        </div>
        <div>
          <h5>Kontakt</h5>
          <ul>
            <li><a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></li>
            <li><a href={FACEBOOK_EVENT_URL} target="_blank" rel="noopener noreferrer">Facebook-begivenhed <span className="arrow">↗</span></a></li>
            <li><a href="https://docs.google.com/forms/d/e/1FAIpQLSemTo-XoO1-MUVoGzJ0dqTRrRYgYAQZ5jnf8xRhBNlE-9Se-A/viewform" target="_blank" rel="noopener noreferrer">Bliv frivillig</a></li>
            <li><a href="#samarbejde">Bliv sponsor</a></li>
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
        <div className="reveal"><Tilmelding /></div>
        <div className="reveal"><Udtalelse /></div>
        <div className="reveal"><Gallery /></div>
        <div className="reveal"><Feedback /></div>
        <div className="reveal"><Sponsors /></div>
        <div className="reveal"><Samarbejde /></div>
        <div className="reveal"><FAQ /></div>
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
