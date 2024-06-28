import React from "react";

export interface Course {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  chapters: Chapter[];
}

export interface Chapter {
  id: string;
  name: string;
  content: React.ReactNode | string;
}
