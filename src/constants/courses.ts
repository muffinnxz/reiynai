import { course as introductionToStableDiffusionPart1, } from "@/constants/courses/introduction-to-stable-diffusion-part-1";
import { course as howtouseaiforproductphotoshot} from "@/constants/courses/how-to-use-ai-for-product-photoshoot";
import { course as advanceStableDiffusionPart1} from "@/constants/courses/advance-stable-diffusion-part-1";

import { Course } from "@/interfaces/course";

export const courses: { [key: string]: Course } = {
  "introduction-to-stable-diffusion-part-1": introductionToStableDiffusionPart1,
  "advance-stable-diffusion-part-1": advanceStableDiffusionPart1,
  "how-to-use-ai-for-product-photoshoot" : howtouseaiforproductphotoshot,
};
