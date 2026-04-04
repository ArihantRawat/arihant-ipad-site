const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const withBasePath = (path: string) => `${basePath}${path}`;

export const profile = {
  name: "Arihant Rawat",
  tagline: "USC Marshall · MBA (STEM) · Product Builder",
  location: "Los Angeles, CA",
  email: "arihantrawat@gmail.com",
  photo: withBasePath("/assets/ArihantAtBeachUSCHoodie.jpg"),
  photoAlt: "Arihant Rawat",
  skills: [
    "Product Development",
    "AI Product Prototyping",
    "Full Stack Development",
    "LLM Integration",
    "Product Strategy",
    "Cross-functional Leadership",
  ],
  bio: "I build user-centric products from idea to launch across startup and enterprise environments. I studied engineering at NSIT (now NSUT), worked at Cult.fit and Salesforce, and now at USC Marshall I am deepening the product, business, and leadership side of building great technology.",
  roles: [
    "MBA Student at USC Marshall",
    "Product Builder",
    "Senior Product Developer (ex-Salesforce)",
    "Full Stack Engineer",
  ],
};

export const social = {
  github: "https://github.com/ArihantRawat",
  linkedin: "https://www.linkedin.com/in/arihantrawat",
  youtube: "https://www.youtube.com/@ArihantRawat",
  spotify: "",
  letterboxd: "",
  rateyourmusic: "",
  x: "https://x.com/arihantrawat",
};
