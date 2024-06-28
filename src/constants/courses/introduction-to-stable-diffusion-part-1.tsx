import StableDiffusion15 from "@/components/interactive/stable-diffusion-1-5";
import { Course } from "@/interfaces/course";

export const course: Course = {
  id: "introduction-to-stable-diffusion-part-1",
  name: "Introduction to Stable Diffusion, Part 1",
  description: "Learn the basics of stable diffusion.",
  thumbnail: "https://example.com/thumbnail.png",
  chapters: [
    {
      id: "what-is-stable-diffusion",
      name: "Stable Diffusion คืออะไร?",
      type: "text",
      content: `Stable Diffusion เป็น Generative AI Model ที่ใช้ในการสร้างรูปภาพจาก Input รูปแบบต่าง ๆ ปัจจุบันเทคนิคนี้ได้ถูกนำไปประยุกต์ใช้กับสื่อรูปแบบอื่น ๆ เช่น การสร้างวีดีโอ, 3D โมเดล, และแม้แต่เสียง โดยมีการพัฒนาโมเดลย่อยต่าง ๆ ที่ตอบโจทย์ความต้องการที่หลากหลาย`
    },
    {
      id: "how-does-stable-diffusion-work",
      name: "Stable Diffusion มีหลัการทำงานอย่างไร?",
      type: "text",
      content: `Stable Diffusion เป็นโมเดล AI ที่เริ่มต้นจากภาพที่มีสัญญาณรบกวน (noise) และใช้วิธีการที่เรียกว่า diffusion ในการลบสัญญาณรบกวนออกจากภาพ เพื่อทำให้ภาพนั้นค่อย ๆ ตรงกับคำบรรยายที่ผู้ใช้ป้อนเข้าไปมากขึ้น`
    },
    {
      id: "what-is-stable-diffusion-1-5",
      name: "Stable Diffusion 1.5 คืออะไร?",
      type: "text",
      content: `Stable Diffusion 1.5 เป็นหนึ่งในโมเดลที่ได้รับความนิยมมากที่สุดในตระกูล Stable Diffusion จุดเริ่มต้นของมันคือการแปลงคำบรรยายภาพให้กลายเป็นรูปภาพ และต่อมาได้มีการพัฒนาเพิ่มเติมเพื่อรองรับการใช้งานที่ซับซ้อนและหลากหลายมากยิ่งขึ้น ถูกนำไปใช้งานที่หลากหลายเช่น การสร้างโฆษณา, การสร้างภาพประกอบหนังสือ และอื่น ๆ อีกมากมาย`
    },
    {
      id: "how-to-generate-image-from-description",
      name: "เราจะสร้างภาพจากคำบรรยายด้วย Stable Diffusion 1.5 ได้อย่างไร?",
      type: "text",
      content: `ก่อนที่เราจะทดลองใช้งาน Stable Diffusion 1.5 เราจำเป็นต้องรู้จักตัวแปรที่สามารถปรับได้ และความหมายของค่าแต่ละค่า เราจะเริ่มจากโมเดลที่ง่ายที่สุดของ Stable Diffusion 1.5 นั่นก็คือ Text-to-Image`
    },
    {
      id: "basic-variables",
      name: "ตัวแปรพื้นฐานที่ควรรู้",
      type: "text",
      content: `<ul>
      <li>
          <strong>- Prompt (ข้อความนำ):</strong> ข้อความที่เราป้อนเข้าไปเพื่อให้ AI สร้างภาพตามข้อความนั้น ส่วนมากจะเป็นคำบรรยายของภาพ หรือประโยคสั้น ๆ เช่น “an astronaut riding a horse on Mars”
      </li>
      <li>
          <strong>- Height (ความสูง):</strong> ความสูงของภาพผลลัพธ์ที่เราต้องการ มีหน่วยเป็นพิกเซล
      </li>
      <li>
          <strong>- Width (ความกว้าง):</strong> ความกว้างของภาพผลลัพธ์ที่เราต้องการ มีหน่วยเป็นพิกเซล
      </li>
  </ul>`
    },
    {
      id: "additional-variables",
      name: "ตัวแปรเพิ่มเติมสำหรับผู้ใช้ขั้นสูง",
      type: "text",
      content: `<ul>
      <li>
          <strong>- Inference Steps / Sampling Steps (จำนวนขั้นตอนการสุ่ม):</strong> จำนวนขั้นตอนที่โมเดลใช้ในการสร้างภาพ ยิ่งมีจำนวนขั้นตอนมาก ภาพจะยิ่งมีรายละเอียดมากขึ้น แต่หากมากเกินไปจะทำให้ภาพมีลักษณะเบลอได้
      </li>
      <li>
          <strong>- Guidance Scale / CFG Scale (Classifier-Free Guidance):</strong> ค่าที่ใช้ในการควบคุมความสร้างสรรค์ของภาพ ค่าสูงจะทำให้ภาพตรงตามข้อความมากขึ้น
      </li>
      <li>
          <strong>- Negative Prompt (ข้อความนำเชิงลบ):</strong> ข้อความที่ป้อนเข้าไปเพื่อให้ AI รู้ว่าไม่ควรจะมีอะไรอยู่ในภาพ ใช้ในกรณีที่โมเดลสร้างภาพตามคำบรรยายแล้วแต่เราไม่ต้องการให้มีสิ่งของบางอย่างในรูป
      </li>
      <li>
          <strong>- Seed (เมล็ดสุ่ม):</strong> ค่าตัวเลขที่ใช้ในการกำหนดรูปแบบการสุ่มของภาพ เพื่อให้ได้ภาพที่แตกต่างกัน
      </li>
  </ul>`
    },
    {
      id: "interactive-demo",
      name: "Interactive Demo",
      type: "interactive",
      content: <StableDiffusion15 />
    }
  ]
};
