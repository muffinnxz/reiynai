import StableDiffusion15 from "@/components/interactive/stable-diffusion-1-5";
import { Course, CourseCategory } from "@/interfaces/course";

export const course: Course = {
  id: "how-to-use-ai-for-product-photoshoot",
  name: "How to use AI for Product Photoshoot",
  description: "Learn how to use ai for product photoshoot",
  thumbnail: "https://example.com/thumbnail.png",
  catergories: [CourseCategory.IMAGE_GENERATION],
  chapters: [
    {
      id: "advantage-of-ai-photoshoot",
      name: "การใช้ AI สร้างภาพถ่ายสินค้ามีประโยชน์อย่างไร?",
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
      content: `การใช้ AI เพื่อถ่ายภาพสินค้าช่วยให้ผู้ประกอบการออนไลน์สามารถผลิตภาพคุณภาพสูงได้ด้วยความเรียบง่ายและคุ้มค่า:
            <ul>
            <li>
              <strong>ลดต้นทุนการผลิต: </strong> AI ช่วยให้คุณสร้างภาพถ่ายสินค้าได้โดยไม่ต้องเช่าสตูดิโอหรือจ้างช่างภาพมืออาชีพ ทำให้คุณประหยัดได้ทั้งเวลาและเงิน.
            </li>
            <li>
              <strong>ปรับแต่งภาพอย่างมืออาชีพ: </strong> AI มีความสามารถในการปรับแต่งแสงและสีให้เหมาะสมกับภาพ และแก้ไขบกพร่องได้อย่างรวดเร็ว ทำให้ภาพสินค้าดูน่าสนใจยิ่งขึ้น.
            </li>
            <li>
              <strong>เพิ่มความรวดเร็วในการผลิต: </strong> ด้วย AI คุณสามารถผลิตภาพถ่ายได้เร็วขึ้น ช่วยให้คุณสามารถนำเสนอสินค้าใหม่และอัปเดตรูปภาพในเว็บไซต์ของคุณได้อย่างต่อเนื่อง.
            </li>
            </ul>
            การนำ AI มาใช้ในการถ่ายภาพสินค้าไม่เพียงแต่เพิ่มประสิทธิภาพในการทำงานเท่านั้น แต่ยังช่วยให้คุณสามารถแข่งขันในตลาดได้ดียิ่งขึ้น ด้วยการเสนอภาพถ่ายที่มีคุณภาพและน่าดึงดูด.
            `
    },
    {
      id: "ai-to-remove-bg",
      name: "การใช้ AI ลบพื้นหลังภาพ",
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
