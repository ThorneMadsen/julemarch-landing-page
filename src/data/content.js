export const navContent = {
  brand: 'Julemarch',
  links: [
    { label: 'Om os', href: '#om' },
    { label: 'Program', href: '#program' },
    { label: 'Indsamling', href: '#indsamling' },
    { label: 'Galleri', href: '#galleri' },
    { label: 'Sponsorer', href: '#sponsorer' },
  ],
  ctaText: 'Tilmeld dig nu',
  ctaHref: '#tilmelding',
  skipToContentText: 'Spring til indhold',
};

export const heroContent = {
  heading: 'Gå med for hospitalsbørn denne jul',
  subheading:
    'Hvert år tilbringer tusindvis af børn julen på hospitalet. Sammen kan vi bringe dem julegaver, varme og glæde. Deltag i Københavns største juleoptog.',
  ctaText: 'Tilmeld dig nu',
  ctaHref: '#tilmelding',
  eventDate: '2026-12-14T10:00:00',
  countdownLabel: 'Tid til Julemarch 2026',
  countdownUnits: {
    days: 'Dage',
    hours: 'Timer',
    minutes: 'Min',
    seconds: 'Sek',
  },
};

export const aboutContent = {
  sectionId: 'om',
  heading: 'Om Julemarch',
  description:
    'Julemarch er Københavns årlige juleoptog, hvor tusindvis af mennesker går sammen for at samle ind til børn, der tilbringer julen på hospitalet. Siden 2014 har vi bragt glæde, gaver og varme til de børn, der har allermest brug for det.',
  stats: [
    { value: '5.000+', label: 'Deltagere' },
    { value: '2M DKK', label: 'Indsamlet' },
    { value: '12 År', label: 'Tradition' },
  ],
  imagePlaceholder: 'Foto: Deltagere går med lanterner gennem København',
};

export const eventDetailsContent = {
  sectionId: 'program',
  heading: 'Praktisk Information',
  cards: [
    {
      icon: 'calendar',
      title: 'Dato og Tid',
      description: 'Søndag den 14. december 2026, kl. 10:00',
    },
    {
      icon: 'location',
      title: 'Rute',
      description: 'Start og slut ved Rådhuspladsen, København',
    },
    {
      icon: 'route',
      title: 'Distancer',
      description: '3km Familie · 7km Standard · 15km Udfordring',
    },
    {
      icon: 'backpack',
      title: 'Medbring',
      description: 'Varmt tøj, godt humør og evt. en lanterne',
    },
    {
      icon: 'party',
      title: 'Efterfest',
      description: 'Varm kakao, gløgg og live musik på Rådhuspladsen',
    },
  ],
};

export const fundraisingContent = {
  sectionId: 'indsamling',
  heading: 'Indsamling',
  currentAmount: 327450,
  goalAmount: 500000,
  currency: 'DKK',
  donorCount: 843,
  donorLabel: 'Donorer',
  goalLabel: 'Mål',
  raisedLabel: 'Indsamlet',
};

export const howItWorksContent = {
  heading: 'Sådan deltager du',
  steps: [
    {
      number: 1,
      title: 'Tilmeld dig',
      description: 'Udfyld tilmeldingsformularen og vælg din distance.',
    },
    {
      number: 2,
      title: 'Indsaml & Del',
      description: 'Del din side med venner og familie og saml ind til sagen.',
    },
    {
      number: 3,
      title: 'Gå marchen',
      description: 'Mød op den 14. december og gå med i Københavns juleoptog.',
    },
  ],
};

export const testimonialsContent = {
  heading: 'Det siger deltagerne',
  testimonials: [
    {
      quote:
        'At gå Julemarchen med min familie er blevet en fast tradition. Det varmer hjertet at vide, at vi gør en forskel for børn på hospitalet.',
      name: 'Sofie Nielsen',
      year: '2024',
    },
    {
      quote:
        'Stemningen er helt magisk – lanterner, julesange og fællesskab. Man kan mærke, at alle er der for den gode sag.',
      name: 'Lars Petersen',
      year: '2023',
    },
    {
      quote:
        'Vores hold fra arbejdet har deltaget tre år i træk. Det er det bedste teambuilding-event vi har – og det giver mening.',
      name: 'Maria Christensen',
      year: '2025',
    },
  ],
};

export const galleryContent = {
  sectionId: 'galleri',
  heading: 'Billeder fra tidligere år',
  images: [
    { label: 'Foto: Familier der går med lanterner', color: '#8B1A1A' },
    { label: 'Foto: Børn modtager julegaver', color: '#1B4332' },
    { label: 'Foto: Optog gennem Strøget', color: '#D4A843' },
    { label: 'Foto: Gløgg og kakao på Rådhuspladsen', color: '#2D6A4F' },
    { label: 'Foto: Frivillige pakker gaver', color: '#C41E3A' },
    { label: 'Foto: Julestemning i København', color: '#6B5B4F' },
  ],
};

export const registrationContent = {
  sectionId: 'tilmelding',
  heading: 'Tilmeld dig',
  fields: {
    name: { label: 'Navn', placeholder: 'Dit fulde navn' },
    email: { label: 'E-mail', placeholder: 'din@email.dk' },
    distance: {
      label: 'Distance',
      options: [
        { value: '', label: 'Vælg distance' },
        { value: '3km', label: '3km – Familie' },
        { value: '7km', label: '7km – Standard' },
        { value: '15km', label: '15km – Udfordring' },
      ],
    },
    team: { label: 'Holdnavn (valgfrit)', placeholder: 'Dit holdnavn' },
  },
  submitText: 'Tilmeld',
  successMessage: 'Tak for din tilmelding! Vi glæder os til at se dig den 14. december.',
};

export const sponsorsContent = {
  sectionId: 'sponsorer',
  heading: 'Vores sponsorer',
  sponsors: [
    { name: 'Nordea Fonden' },
    { name: 'Carlsberg' },
    { name: 'Dansk Supermarked' },
    { name: 'TDC' },
    { name: 'Novo Nordisk Fonden' },
    { name: 'Københavns Kommune' },
  ],
};

export const footerContent = {
  orgName: 'Foreningen Julemarch',
  description: 'Julegaver og glæde til børn der tilbringer julen på hospitalet.',
  email: 'kontakt@julemarch.dk',
  socialLinks: [
    { platform: 'Facebook', href: '#' },
    { platform: 'Instagram', href: '#' },
    { platform: 'LinkedIn', href: '#' },
  ],
  copyright: `© ${new Date().getFullYear()} Foreningen Julemarch. Alle rettigheder forbeholdes.`,
};
