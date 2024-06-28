import { ReactNode } from "react";

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
}
