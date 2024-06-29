import SD15TextToImage from "@/components/interactive/sd15-text-to-image";
import { ChapterType, Course, CourseCategory, QuizType } from "@/interfaces/course";

export const course: Course = {
  id: "introduction-to-stable-diffusion",
  name: "พื้นฐานการใช้งาน Stable Diffusion",
  description: "คอร์สนี้จะเป็นการแนะนำการใช้งาน Stable Diffusion สำหรับมือใหม่",
  thumbnail: "/course-thumbnails/1.webp",
  catergories: [CourseCategory.IMAGE_GENERATION],
  chapters: [
    {
      id: "what-is-stable-diffusion",
      name: "Stable Diffusion คืออะไร?",
      type: ChapterType.TEXT,
      content: `Stable Diffusion เป็น Generative AI Model ที่ใช้ในการสร้างรูปภาพจาก Input รูปแบบต่าง ๆ ปัจจุบันเทคนิคนี้ได้ถูกนำไปประยุกต์ใช้กับสื่อรูปแบบอื่น ๆ เช่น การสร้างวีดีโอ, 3D โมเดล, และแม้แต่เสียง โดยมีการพัฒนาโมเดลย่อยต่าง ๆ ที่ตอบโจทย์ความต้องการที่หลากหลาย`
    },
    {
      id: "how-does-stable-diffusion-work",
      name: "Stable Diffusion มีหลัการทำงานอย่างไร?",
      type: ChapterType.TEXT,
      content: `Stable Diffusion เป็นโมเดล AI ที่เริ่มต้นจากภาพที่มีสัญญาณรบกวน (noise) และใช้วิธีการที่เรียกว่า diffusion ในการลบสัญญาณรบกวนออกจากภาพ เพื่อทำให้ภาพนั้นค่อย ๆ ตรงกับคำบรรยายที่ผู้ใช้ป้อนเข้าไปมากขึ้น`
    },
    {
      id: "what-is-stable-diffusion-1-5",
      name: "Stable Diffusion 1.5 คืออะไร?",
      type: ChapterType.TEXT,
      content: `Stable Diffusion 1.5 เป็นหนึ่งในโมเดลที่ได้รับความนิยมมากที่สุดในตระกูล Stable Diffusion จุดเริ่มต้นของมันคือการแปลงคำบรรยายภาพให้กลายเป็นรูปภาพ และต่อมาได้มีการพัฒนาเพิ่มเติมเพื่อรองรับการใช้งานที่ซับซ้อนและหลากหลายมากยิ่งขึ้น ถูกนำไปใช้งานที่หลากหลายเช่น การสร้างโฆษณา, การสร้างภาพประกอบหนังสือ และอื่น ๆ อีกมากมาย`
    },
    {
      id: "how-to-generate-image-from-description",
      name: "Stable Diffusion 1.5 Text To Image",
      type: ChapterType.TEXT,
      content: `โมเดลนี้ใช้เพื่อสร้างภาพจากคำบรรยายที่สามารถอธิบายได้ด้วยประโยคสั้น ๆ เช่น “an astronaut riding a horse on mars” หรือคำบรรยายที่มีคำคั่น (,) เช่น “astronaut riding a hourse, mars background, natural light” วิธีการเขียนคำบรรยายนี้มีความละเอียดสูง รวมถึงการเลือกใช้แสง โทนสีของภาพ และแม้กระทั่งชนิดของฟิล์มที่ใช้ถ่ายภาพได้ด้วย`
    },
    {
      id: "text-to-image-demo",
      name: "Stable Diffusion 1.5 Text To Image",
      type: ChapterType.INTERACTIVE,
      content: <SD15TextToImage />
    },
    {
      id: "how-to-generate-image-from-image",
      name: "Stable Diffusion 1.5 Image To Image",
      type: ChapterType.TEXT,
      content:
        "โมเดลนี้ทำงานคล้ายกับ Text To Image แต่แทนที่จะเริ่มจากคำบรรยาย เราสามารถใส่รูปเริ่มต้นเพื่อให้ AI ใช้เป็นแหล่งอ้างอิง หรือปรับแต่งเพื่อให้ได้ผลลัพธ์ตามที่ต้องการ"
    },
    {
      id: "image-to-image-demo",
      name: "Stable Diffusion 1.5 Image To Image",
      type: ChapterType.INTERACTIVE,
      content: <SD15TextToImage />
    },
    {
      id: "how-to-generate-change-in-image",
      name: "Stable Diffusion 1.5 Inpainting",
      type: ChapterType.TEXT,
      content: `โมเดลนี้เป็นโมเดลย่อยของ Image To Image โดยเพิ่มตัวแปรหนึ่งตัวคือ Mask ซึ่งเป็นรูปขาวดำที่มีขนาดเท่ากับรูปตั้งต้น ด้วย Inpainting เราสามารถควบคุมให้ AI แก้ไขเฉพาะบางส่วนของภาพได้ โดยใช้ Mask บอกบริเวณที่ต้องการแก้ไขและบริเวณที่ไม่ต้องการให้แก้ไข`
    },
    {
      id: "inpainting-demo",
      name: "Stable Diffusion 1.5 Inpainting",
      type: ChapterType.INTERACTIVE,
      content: <SD15TextToImage />
    }
  ],
  quizes: [
    {
      type: QuizType.MULTIPLE_CHOICE,
      question: "Stable Diffusion 1.5 คืออะไร?",
      options: [
        "โมเดล AI ที่ใช้ในการสร้างรูปภาพจากคำบรรยาย",
        "โมเดล AI ที่ใช้ในการสร้างวีดีโอ",
        "โมเดล AI ที่ใช้ในการสร้างเสียง"
      ],
      correctAnswer: "โมเดล AI ที่ใช้ในการสร้างรูปภาพจากคำบรรยาย"
    },
    {
      type: QuizType.TEXT,
      question: "อธิบายความต่างระหว่าง Stable Diffusion 1.5 Text To Image และ Stable Diffusion 1.5 Image To Image",
      correctAnswer:
        "Stable Diffusion 1.5 Text To Image ใช้คำบรรยายเพื่อสร้างภาพ แต่ Stable Diffusion 1.5 Image To Image ใช้ทั้งภาพ และเพื่อสร้างภาพ"
    }
  ]
};
