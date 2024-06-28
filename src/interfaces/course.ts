import { ReactNode } from "react";

export enum CourseCategory {
  IMAGE_GENERATION = "Image Generation",
  TEXT_GENERATION = "Text Generation",
  MUSIC_GENERATION = "Music Generation",
  VIDEO_GENERATION = "Video Generation",
  USE_CASES = "Use Cases"
}

export interface Chapter {
  id: string;
  name: string;
  type: "text" | "interactive";
  content: string | ReactNode;
}

export interface Course {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  chapters: Chapter[];
  catergories: CourseCategory[];
}
