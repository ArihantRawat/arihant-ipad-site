import { z } from "zod";
import { profile, social } from "./modules/profile";
import { experience } from "./modules/experience";
import { projects } from "./modules/projects";
import { education } from "./modules/education";
import { skills, personalSettings, photos, organizations, music } from "./modules/misc";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const withBasePath = (path: string) => `${basePath}${path}`;

export { profile, social, experience, projects, education, skills, personalSettings, photos, organizations, music };

export type AppId =
  | "work"
  | "projects"
  | "education"
  | "files"
  | "photos"
  | "contact"
  | "settings"
  | "youtube"
  | "github"
  | "linkedin"
  | "spotify"
  | "letterboxd"
  | "rateyourmusic"
  | "x"
  | "substack"
  | "arihantgpt"
  | "bible";

export interface AppDef {
  id: AppId;
  name: string;
  emoji: string;
  icon?: string;
  gradient: [string, string];
  external?: string;
}

const allApps: AppDef[] = [
  { id: "settings", name: "About", emoji: "S", icon: withBasePath("/assets/icons/settingsapp.png"), gradient: ["#8E8E93", "#636366"] },
  { id: "work", name: "Work", emoji: "W", gradient: ["#AF52DE", "#7B2D8B"] },
  { id: "projects", name: "Projects", emoji: "P", icon: withBasePath("/assets/icons/ideas.png"), gradient: ["#FF9500", "#FF5E00"], external: "https://github.com/ArihantRawat" },
  { id: "education", name: "Education", emoji: "E", icon: withBasePath("/assets/icons/notes.png"), gradient: ["#FF3B30", "#C0392B"] },
  { id: "files", name: "Organizations", emoji: "F", icon: withBasePath("/assets/icons/organizations.png"), gradient: ["#007AFF", "#5AC8FA"] },
  { id: "photos", name: "Photos", emoji: "P", icon: withBasePath("/assets/icons/photos.webp"), gradient: ["#A855F7", "#6D28D9"] },
  { id: "contact", name: "Mail", emoji: "C", icon: withBasePath("/assets/icons/mailapp.png"), gradient: ["#5AC8FA", "#007AFF"] },
  { id: "arihantgpt", name: "ArihantGPT", emoji: "A", icon: withBasePath("/assets/icons/chatgpt.png"), gradient: ["#8B5CF6", "#6D28D9"] },
  { id: "youtube", name: "YouTube", emoji: "Y", icon: withBasePath("/assets/icons/youtubeapplogo.png"), gradient: ["#FF0000", "#C0392B"], external: social.youtube },
  { id: "github", name: "GitHub", emoji: "G", icon: withBasePath("/assets/icons/github.webp"), gradient: ["#24292E", "#000000"], external: social.github },
  { id: "linkedin", name: "LinkedIn", emoji: "L", icon: withBasePath("/assets/icons/linkedin.jpg"), gradient: ["#0A66C2", "#004182"], external: social.linkedin },
  { id: "spotify", name: "Spotify", emoji: "S", icon: withBasePath("/assets/icons/spotify.png"), gradient: ["#9333EA", "#6B21A8"], external: social.spotify },
  { id: "letterboxd", name: "Letterboxd", emoji: "L", icon: withBasePath("/assets/icons/letterboxd.png"), gradient: ["#FF8000", "#E55C00"], external: social.letterboxd },
  { id: "rateyourmusic", name: "RYM", emoji: "R", icon: withBasePath("/assets/icons/rym.png"), gradient: ["#ED1C24", "#A8001B"], external: social.rateyourmusic },
  { id: "x", name: "X", emoji: "X", icon: withBasePath("/assets/icons/x.jpg"), gradient: ["#000000", "#14171A"], external: social.x },
  { id: "substack", name: "Blog", emoji: "B", icon: withBasePath("/assets/icons/substack.png"), gradient: ["#FF6719", "#E05C0A"], external: "https://github.com/ArihantRawat/arihant-portfolio" },
];

const conditionalExternalApps = new Set<AppId>(["spotify", "letterboxd", "rateyourmusic"]);
export const apps: AppDef[] = allApps.filter((app) => {
  if (!conditionalExternalApps.has(app.id)) return true;
  return Boolean(app.external && app.external.trim().length > 0);
});

export const dockApps: AppId[] = ["projects", "linkedin", "github", "youtube", "substack", "x"];

// Build-time content integrity checks
const socialSchema = z.object({
  github: z.string().url(),
  linkedin: z.string().url(),
  youtube: z.string().url(),
  spotify: z.string(),
  letterboxd: z.string(),
  rateyourmusic: z.string(),
  x: z.string().url(),
});

const profileSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  photo: z.string().min(1),
  bio: z.string().min(10),
});

profileSchema.parse(profile);
socialSchema.parse(social);
