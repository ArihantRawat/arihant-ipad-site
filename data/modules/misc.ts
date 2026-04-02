export const skills = {
  languages: [
    { name: "Python", level: 90, color: "#3776AB" },
    { name: "TypeScript", level: 88, color: "#3178C6" },
    { name: "Java", level: 78, color: "#E76F00" },
    { name: "JavaScript", level: 86, color: "#F7DF1E" },
    { name: "SQL", level: 82, color: "#336791" },
  ],
  frameworks: [
    { name: "React", level: 88, color: "#61DAFB" },
    { name: "Next.js", level: 84, color: "#000000" },
    { name: "Flutter", level: 86, color: "#02569B" },
    { name: "Node.js", level: 80, color: "#339933" },
    { name: "Tailwind CSS", level: 84, color: "#06B6D4" },
  ],
  tools: [
    { name: "Git", level: 92, color: "#F05032" },
    { name: "Cursor", level: 82, color: "#7C3AED" },
    { name: "Vercel", level: 86, color: "#000000" },
    { name: "PostgreSQL", level: 78, color: "#336791" },
  ],
  domains: [
    "Product Development",
    "AI Product Prototyping",
    "LLM Integration in Products",
    "Full-Stack Development",
    "Roadmapping",
    "User Research",
    "API Design",
  ],
};

export const personalSettings = [
  {
    section: "About Arihant",
    icon: "device",
    items: [
      { label: "Name", type: "info", detail: "Arihant Rawat" },
      { label: "Location", type: "info", detail: "Los Angeles, CA" },
      { label: "Current Program", type: "info", detail: "MBA (STEM), USC Marshall" },
      { label: "Focus", type: "info", detail: "Product + Engineering + AI" },
      { label: "Email", type: "info", detail: "arihantrawat@gmail.com" },
    ],
  },
];

export const photos = [
  {
    src: "/images/arihant-headshot.jpg",
    caption: "Arihant Rawat",
    date: "2026",
    location: "Los Angeles, CA",
    rotation: -1,
  },
];

export const organizations = [
  {
    id: "usc-marshall",
    name: "USC Marshall School of Business",
    shortName: "USC Marshall",
    role: "MBA Student",
    period: "2025 - Present",
    logo: "/assets/logos/usc.png",
    color: "#990000",
    description: "MBA (STEM) student focused on product, technology, and AI-driven business strategy.",
    link: "https://www.marshall.usc.edu/",
    category: "Education",
  },
];

export const music = {
  currentlyPlaying: {
    title: "",
    artist: "",
    spotifyEmbed: "",
  },
  favoriteNewAlbums: [
    { artist: "", album: "", embedUrl: "" },
  ],
  favoriteOldAlbums: [
    { artist: "", album: "", embedUrl: "" },
  ],
};
