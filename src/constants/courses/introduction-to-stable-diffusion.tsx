import SD21ImageToImage from "@/components/interactive/sd21-image-to-image";
import SD21TextToImage from "@/components/interactive/sd21-text-to-image";
import SD21Inpainting from "@/components/interactive/sd21-inpainting";
import { ChapterType, Course, CourseCategory, QuizType } from "@/interfaces/course";
import { ActionType } from "@/interfaces/bot";

export const course: Course = {
  id: "introduction-to-stable-diffusion",
  name: "พื้นฐานการใช้งาน Stable Diffusion",
  description: "คอร์สนี้จะเป็นการแนะนำการใช้งาน Stable Diffusion สำหรับมือใหม่",
  thumbnail: "/course-thumbnails/1.webp",
  catergories: [CourseCategory.IMAGE_GENERATION],
  pages: [
    {
      chapters: [
        {
          id: "what-is-stable-diffusion",
          name: "Stable Diffusion คืออะไร?",
          type: ChapterType.TEXT,
          content: `Stable Diffusion เป็น Generative AI Model ที่ใช้ในการสร้างรูปภาพจาก Input รูปแบบต่าง ๆ ปัจจุบันเทคนิคนี้ได้ถูกนำไปประยุกต์ใช้กับสื่อรูปแบบอื่น ๆ เช่น การสร้างวีดีโอ, 3D โมเดล, และแม้แต่เสียง โดยมีการพัฒนาโมเดลย่อยต่าง ๆ ที่ตอบโจทย์ความต้องการที่หลากหลาย`
        }
      ],
      actions: [
        {
          id: "what-is-stable-diffusion-quiz",
          type: ActionType.SEND_QUIZ,
          content: {
            type: QuizType.MULTIPLE_CHOICE,
            question: "Stable Diffusion คืออะไร?",
            options: ["Generative AI Model", "Classification AI Model", "Regression AI Model", "Clustering AI Model"],
            correctAnswer: "Generative AI Model"
          }
        }
      ]
    },
    {
      chapters: [
        {
          id: "how-does-stable-diffusion-work",
          name: "Stable Diffusion มีหลัการทำงานอย่างไร?",
          type: ChapterType.TEXT,
          content: `Stable Diffusion เป็นโมเดล AI ที่เริ่มต้นจากภาพที่มีสัญญาณรบกวน (noise) และใช้วิธีการที่เรียกว่า diffusion ในการลบสัญญาณรบกวนออกจากภาพ เพื่อทำให้ภาพนั้นค่อย ๆ ตรงกับคำบรรยายที่ผู้ใช้ป้อนเข้าไปมากขึ้น`
        }
      ],
      actions: [
        {
          id: "how-does-stable-diffusion-work-quiz",
          type: ActionType.SEND_QUIZ,
          content: {
            type: QuizType.TEXT,
            question: "Stable Diffusion มีหลัการทำงานอย่างไร?",
            correctAnswer: "ใช้วิธีการที่เรียกว่า diffusion ในการลบสัญญาณรบกวนออกจากภาพ"
          }
        }
      ]
    },
    {
      chapters: [
        {
          id: "what-is-stable-diffusion-1-5",
          name: "Stable Diffusion 2.1 คืออะไร?",
          type: ChapterType.TEXT,
          content: `Stable Diffusion 2.1 เป็นหนึ่งในโมเดลที่ได้รับความนิยมมากที่สุดในตระกูล Stable Diffusion จุดเริ่มต้นของมันคือการแปลงคำบรรยายภาพให้กลายเป็นรูปภาพ และต่อมาได้มีการพัฒนาเพิ่มเติมเพื่อรองรับการใช้งานที่ซับซ้อนและหลากหลายมากยิ่งขึ้น ถูกนำไปใช้งานที่หลากหลายเช่น การสร้างโฆษณา, การสร้างภาพประกอบหนังสือ และอื่น ๆ อีกมากมาย`
        }
      ],
      actions: [
        {
          id: "what-is-stable-diffusion-1-5-quiz",
          type: ActionType.SEND_MESSAGE,
          content: "เริ่มจากการใส่คำบรรยายแล้วกดปุ่ม Generate เพื่อดูผลลัพธ์"
        }
      ]
    },
    {
      chapters: [
        {
          id: "how-to-generate-image-from-description",
          name: "Stable Diffusion 2.1 Text To Image",
          type: ChapterType.TEXT,
          content: `โมเดลนี้ใช้เพื่อสร้างภาพจากคำบรรยายที่สามารถอธิบายได้ด้วยประโยคสั้น ๆ เช่น “an astronaut riding a horse on mars” หรือคำบรรยายที่มีคำคั่น (,) เช่น “astronaut riding a hourse, mars background, natural light” วิธีการเขียนคำบรรยายนี้มีความละเอียดสูง รวมถึงการเลือกใช้แสง โทนสีของภาพ และแม้กระทั่งชนิดของฟิล์มที่ใช้ถ่ายภาพได้ด้วย`
        },
        {
          id: "text-to-image-demo",
          name: "Demo",
          type: ChapterType.INTERACTIVE,
          content: <SD21TextToImage p={""} w={"768"} h={"768"} />
        }
      ],
      actions: [
        {
          id: "text-to-image-demo-quiz",
          type: ActionType.SEND_MESSAGE,
          content: "เริ่มจากการใส่คำบรรยายแล้วกดปุ่ม Generate เพื่อดูผลลัพธ์"
        }
      ]
    },
    {
      chapters: [
        {
          id: "how-to-generate-image-from-image",
          name: "Stable Diffusion 2.1 Image To Image",
          type: ChapterType.TEXT,
          content:
            "โมเดลนี้ทำงานคล้ายกับ Text To Image แต่แทนที่จะเริ่มจากคำบรรยาย เราสามารถใส่รูปเริ่มต้นเพื่อให�� AI ใช้เป็นแหล่งอ้างอิง หรือปรับแต่งเ���ื่อให้ได้ผลลัพธ์ตามที่ต้องการ"
        },
        {
          id: "image-to-image-demo",
          name: "Demo",
          type: ChapterType.INTERACTIVE,
          content: <SD21ImageToImage />
        }
      ],
      actions: [
        {
          id: "image-to-image-demo-quiz",
          type: ActionType.SEND_MESSAGE,
          content: "เริ่มจากการใส่คำบรรยายแล้วกดปุ่ม Generate เพื่อดูผลลัพธ์"
        }
      ]
    },
    {
      chapters: [
        {
          id: "how-to-generate-change-in-image",
          name: "Stable Diffusion 2.1 Inpainting",
          type: ChapterType.TEXT,
          content: `โมเดลนี้เป็นโมเดลย่อยของ Image To Image โดยเพิ่มตัวแปรหนึ่งตัวคือ Mask ซึ่งเป็นรูปขาวดำที่มีขนาดเท่ากับรูปตั้งต้น ด้วย Inpainting เราสามารถควบคุมให้ AI แก้ไขเฉพาะบางส่วนของภาพได้ โดยใช้ Mask บอกบริเวณที่ต้องการแก้ไขแล��บริเวณที่ไม่ต้องการให้แก้ไข`
        },
        {
          id: "inpainting-demo",
          name: "Demo",
          type: ChapterType.INTERACTIVE,
          content: <SD21Inpainting />
        }
      ]
    }
  ]
};
