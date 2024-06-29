import { course as introductionToStableDiffusion } from "@/constants/courses/introduction-to-stable-diffusion";
import { course as controlnetStableDiffusion } from "@/constants/courses/controlnet-stablediffusion";
import { Course } from "@/interfaces/course";

export const courses: { [key: string]: Course } = {
  "introduction-to-stable-diffusion": introductionToStableDiffusion,
  "controlnet-stablediffusion": controlnetStableDiffusion
};
