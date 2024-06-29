import { ReactNode } from "react";

export enum CourseCategory {
  IMAGE_GENERATION = "Image Generation",
  TEXT_GENERATION = "Text Generation",
  EXAMPLE_USE_CASES = "Example Use-cases"
}

export enum ChapterType {
  TEXT = "text",
  INTERACTIVE = "interactive",
  AI_CONTEXT = "ai-context"
}

export interface Chapter {
  id: string;
  name?: string;
  type: ChapterType;
  content: string | ReactNode;
}

export enum QuizType {
  MULTIPLE_CHOICE = "multiple-choice",
  TEXT = "text"
}

export interface Quiz {
  type: QuizType;
  question: string;
  options?: string[];
  correctAnswer?: string;
}

export interface Course {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  pages: Array<Chapter[]>;
  catergories: CourseCategory[];
}
