// import StableDiffusion15 from "@/components/interactive/stable-diffusion-1-5";
import { Course, CourseCategory,ChapterType } from "@/interfaces/course";
import Test from '@/components/interactive/sd-15'
export const course: Course = {
  id: "advance-stable-diffusion-part-1",
  name: "Advance Stable Diffusion Part 1",
  description: "Learn the advance usage of stable diffusion.",
  thumbnail: "https://example.com/thumbnail.png",
  catergories: [CourseCategory.IMAGE_GENERATION],
  chapters: [
    {
      id: "interactive-demo",
      name: "Interactive Demo",
      type: ChapterType.INTERACTIVE,
      content: <Test />
    },
  ]
}