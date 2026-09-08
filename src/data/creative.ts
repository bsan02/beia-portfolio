export type CreativeBlock = {
  id: string;
  title: string;
  hue: number;
  image?: string;
  caption: string;
};

export const CREATIVE_INTRO =
  "Outside of systems and pipelines, I'm behind a camera, a sewing machine, or a reselling rack. This is the version of me that doesn't show up on a resume.";

export const CREATIVE_BLOCKS: CreativeBlock[] = [
  {
    id: "photography",
    title: "Photography",
    hue: 340,
    caption:
      "Event and creator photography — covering tech conferences, launches, and community activations around the Bay Area.",
  },
  {
    id: "fashion-reselling",
    title: "Fashion & Reselling",
    hue: 300,
    caption:
      "Sourcing, styling, and reselling — an eye for fashion that doubles as a small, hands-on business.",
  },
  {
    id: "sewing",
    title: "Sewing",
    hue: 20,
    caption: "Making and altering my own pieces — a hands-on creative counterweight to hardware and code.",
  },
  {
    id: "interior-design",
    title: "Interior Design",
    hue: 30,
    caption: "Planning and rendering my own space, room by room — currently extending a kitchen render into a dining area and hallway.",
  },
  {
    id: "outdoors",
    title: "Outdoors",
    hue: 150,
    caption: "Getting outside — hiking and exploring the Bay Area when I'm not at a desk or a workbench.",
  },
  {
    id: "content",
    title: "Digital Content",
    hue: 210,
    caption: "Creating content that sits at the intersection of tech, fashion, and everyday life.",
  },
];
