export type GalleryItem = {
  id: string;
  title: string;
  org: string;
  period: string;
  tags: string[];
  blurb: string;
  hue: number;
  x: number;
  y: number;
};

export const TAGS = [
  "Leadership",
  "Mentorship",
  "Conferences",
  "Networking",
  "Community",
  "Teaching",
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "internship-partnership-cohort",
    title: "Partnership Leadership Cohort",
    org: "Intern Ship",
    period: "May 2026 – Present",
    tags: ["Leadership", "Networking", "Community"],
    blurb:
      "Building relationships with startups, founders, and student communities to expand Intern Ship's Bay Area partnership ecosystem — identifying collaboration opportunities across organizations, universities, and student leaders.",
    hue: 18,
    x: 12,
    y: 20,
  },
  {
    id: "internship-events",
    title: "Sponsored Events, Panels & Socials",
    org: "Intern Ship",
    period: "May 2026 – Present",
    tags: ["Conferences", "Networking", "Community"],
    blurb:
      "Outreach and coordination for company-sponsored events, panels, socials, and community activations for early-career talent across the tech ecosystem.",
    hue: 28,
    x: 70,
    y: 12,
  },
  {
    id: "nsf-edge-cohort-1",
    title: "NSF Fellow — Cohort I",
    org: "Epixego x The Edge Consortium",
    period: "Nov 2025 – March 2026",
    tags: ["Mentorship", "Leadership"],
    blurb:
      "Selected for the EDGE x Epixego near-peer mentoring program, built on Social Cognitive Career Theory — an NSF-backed initiative pairing ambitious students with engineering mentors.",
    hue: 200,
    x: 35,
    y: 55,
  },
  {
    id: "nsf-edge-cohort-2",
    title: "NSF Fellow — Cohort II",
    org: "Epixego x The Edge Consortium",
    period: "Nov 2025 – March 2026",
    tags: ["Mentorship", "Leadership", "Networking"],
    blurb:
      "Selected for a second consecutive cohort; earned an official NSF certificate and built a cross-institutional network of peer mentors and industry professionals spanning 7 universities.",
    hue: 210,
    x: 82,
    y: 45,
  },
  {
    id: "stem-teaching-buenos-aires",
    title: "STEM Teaching, Buenos Aires",
    org: "UTK",
    period: "Community program",
    tags: ["Teaching", "Community"],
    blurb: "Taught STEM concepts to students in Buenos Aires through a UTK community program.",
    hue: 150,
    x: 20,
    y: 82,
  },
  {
    id: "prettycoded-events",
    title: "Event Media Coverage",
    org: "@prettycoded",
    period: "Ongoing",
    tags: ["Conferences", "Networking"],
    blurb:
      "Photographing tech events and creative activations across the Bay Area as @prettycoded — building community roots through a camera lens.",
    hue: 340,
    x: 55,
    y: 75,
  },
  {
    id: "berkeley-eecs-community",
    title: "Berkeley EECS Community",
    org: "UC Berkeley",
    period: "2021 – 2025",
    tags: ["Community", "Teaching"],
    blurb:
      "Four years of showing up for the Berkeley EECS community — coursework, project teams, and the everyday work of being part of a cohort.",
    hue: 45,
    x: 88,
    y: 80,
  },
  {
    id: "bay-area-founder-network",
    title: "Bay Area Founder & Startup Circles",
    org: "Independent",
    period: "Ongoing",
    tags: ["Networking", "Community"],
    blurb:
      "Active in Bay Area founder and startup meetups, growing a network that spans engineering, product, and early-stage teams.",
    hue: 265,
    x: 45,
    y: 30,
  },
];
