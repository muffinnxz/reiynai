import ICLight from "@/components/interactive/ic-light";
import ICLightBackground from "@/components/interactive/ic-light-background";
import SDInpaint from "@/components/interactive/sd-inpaint";
import TyphoonInstruct from "@/components/interactive/typhoon15-instruct";
import { ChapterType, Course, CourseCategory } from "@/interfaces/course";

export const course: Course = {
  id: "ai-for-online-marketing",
  name: "การใช้ AI ในการช่วยขายสินค้าสำหรับคนขายของออนไลน์",
  description: "คอร์สที่เหมาะกับพ่อค้าแม่ค้าออนไลน์",
  thumbnail: "/course-thumbnails/controlnet-stablediffusion-course-logo.webp",
  catergories: [CourseCategory.IMAGE_GENERATION],
  pages: [
    {
      chapters: [
        {
          id: "how-ai-will-help",
          name: "คนขายออนไลน์จะใช้ AI เข้ามาช่วยได้อย่างไร?",
          type: ChapterType.TEXT,
          content: `ในการขายของออนไลน์ การเลือกรูปภาพปกสินค้า ชื่อสินค้า และคำบรรยาย เป็นสิ่งที่ต้องคิดอย่างรอบคอบ เพราะมีผลต่อการตัดสินใจของลูกค้า เนื่องจากลูกค้าไม่สามารถสัมผัสสินค้าจริง ๆ ได้ การมีรูปภาพที่ชัดเจนและคำบรรยายที่น่าสนใจจึงสำคัญมากในการดึงดูดและกระตุ้นให้ลูกค้าตัดสินใจซื้อสินค้า ซึ่งถ้าเราทำรูปให้ดูดีและคำบรรยายที่ปัง ยอดขายก็พุ่งขึ้นตาม!  `
        },
        {
          id: "use-ai-to-generated",
          name: "การใช้ AI สร้างภาพสินค้า",
          type: ChapterType.TEXT,
          content: `เมื่อขายของออนไลน์ ลูกค้าไม่สามารถสัมผัสสินค้าจริง ๆ ได้ ดังนั้น รูปภาพสินค้าจึงเป็นสิ่งสำคัญในการให้ลูกค้าเห็นและตัดสินใจซื้อ ร้านค้าจึงต้องมีรูปสินค้าที่สวยงามและมีคุณภาพสูง ซึ่งอาจต้องลงทุนซื้ออุปกรณ์ถ่ายรูปหรือเช่าสตูดิโอในการถ่ายภาพ

แต่ AI สามารถช่วยผู้ประกอบการลดค่าใช้จ่ายในส่วนนี้ได้ โดยใช้ AI คุณสามารถทำให้ภาพสินค้าดูดีและเป็นมืออาชีพได้ง่าย ๆ ไม่ต้องเสียเวลาและค่าใช้จ่ายในการถ่ายรูปใหม่`
        }
      ]
    },
    {
      chapters: [
        {
          id: "stable-diffusion-inpainting",
          name: "Stable Diffusion Inpainting",
          type: ChapterType.TEXT,
          content: `เมื่อขายของออนไลน์ ลูกค้าไม่สามารถสัมผัสสินค้าจริง ๆ ได้ ดังนั้นรูปภาพประกอบของสินค้าจึงเป็นช่องทางสำคัญในการให้ลูกค้าเห็นสินค้าและตัดสินใจซื้อ ร้านค้าจึงจำเป็นต้องมีรูปสินค้าที่ดึงดูดและมีคุณภาพสูง ซึ่งอาจต้องซื้ออุปกรณ์ถ่ายรูปหรือเช่าสตูดิโอในการถ่ายภาพ การใช้ AI สามารถช่วยผู้ประกอบการลดค่าใช้จ่ายในส่วนนี้ได้ เทคโนโลยีช่วยประหยัด รูปสินค้าดูดี มีโอกาสขายมากขึ้น!

การใช้งานควรใช้รูปแบบ prompt ดังนี้ <br />“<span className="font-bold text-xl">masterpiece, realistic, best quality, [รูปร่างของสินค้า], [พื้นหลัง หรือ สถานที่], [แสง และบรรยากาศ]</span>”
<br />เช่น “masterpiece, realistic, bottle, mossy stone, natural light”

<br />“masterpiece, realistic, bottle, wooden table, warm light”

<br />“masterpiece, realistic, bottle, white sand beach, bright sunlight”`
        },
        {
          id: "stablediffusion-inpaint-demo",
          type: ChapterType.INTERACTIVE,
          content: <SDInpaint />
        }
      ]
    },
    {
      chapters: [
        {
          id: "ic-Light",
          name: "IC-Light",
          type: ChapterType.TEXT,
          content: `IC-Light เป็นเครื่องมือ AI ที่เก่งในการจัดแสง สามารถทำให้วัตถุดูเข้ากับแสงรอบ ๆ ตัวได้ดี โดยใช้หลักการคล้ายกับการเติมภาพ (Inpainting) คือ การสร้างพื้นหลังใหม่ และทำให้แสงจากพื้นหลังมีผลกับตัวสินค้า เช่น การให้สินค้าอยู่กลางแสงสีฟ้า-ม่วง ทำให้ภาพดูสมจริงและน่าสนใจมากขึ้น

วิธีการใช้งาน IC-Light จะคล้ายกับ Stable Diffusion Inpainting แต่สามารถบรรยายแสงและบรรยากาศได้แม่นยำมากขึ้น

เช่น <br/> <div className="text-xl font-bold">“bottle, mossy stone, natural light”, <br/>“masterpiece, realistic, bottle, wooden table, warm light” <br/>หรือ “ bottle, lying on a beach, natural sunlight”, <br/>“bottle, cyberpunk street, blue and purple RGB glowing neon light”</div>`
        },
        {
          id: "stablediffusion-inpaint-demo",
          type: ChapterType.INTERACTIVE,
          content: <ICLight />
        }
      ]
    },
    {
      chapters: [
        {
          id: "ic-Light-background",
          name: "IC-Light background",
          type: ChapterType.TEXT,
          content: `IC-Light เป็นเครื่องมือ AI ที่เก่งในการจัดแสง ทำให้สินค้าดูกลมกลืนกับแสงรอบ ๆ ตัวได้ดี โดยใช้หลักการคล้ายกับการเติมภาพ (Inpainting) นอกจากจะสร้างพื้นหลังใหม่แล้ว ยังทำให้แสงจากพื้นหลังมีผลกับตัวสินค้าได้อย่างสมจริง เช่น การให้สินค้าอยู่กลางแสงสีฟ้า-ม่วง

เช่น <div className="text-xl font-bold">“bottle, mossy stone, natural light”, <br/>“masterpiece, realistic, bottle, wooden table, warm light” หรือ <br/>“ bottle, lying on a beach, natural sunlight”, <br/>“bottle, cyberpunk street, blue and purple RGB glowing neon light”</div>`
        },
        {
          id: "stablediffusion-inpaint-demo",
          type: ChapterType.INTERACTIVE,
          content: <ICLightBackground />
        }
      ]
    },
    {
      chapters: [
        {
          id: "ai-to-help-with-name",
          name: "การใช้ AI ช่วยคิดชื่อ หรือ คำบรรยายสินค้า",
          type: ChapterType.TEXT,
          content: `การคิดชื่อสินค้ามีส่วนช่วยให้ลูกค้าสามารถค้นหาสินค้าของคุณเจอได้ง่ายขึ้น 
        โดยการตั้งชื่อในแต่ละแพล็ตฟอร์มจะแตกต่างกันออกไป 
        จึงแนะนำให้ใช้ท่าที่ใช้ตัวอย่าง 
        ใช้ชื่อจากร้าน หรือ สินค้าที่ขายดี 
        ที่ใกล้เคียงกับสินค้าของคุณ โดย 
        prompt ที่เราจะใช้คือ 
        <div className="font-bold text-xl">“Write me a name for my product 
        listing on e-commerce website. 
        The name should be clear 
        and give high conversion rate and easy to appear on search. Here is some example name 1. [ชื่อที่ 1] 2. [ชื่อที่ 2] 3. [ชื่อที่ 3] \n My Product Name: ”</div>`
        },
        {
          id: "stablediffusion-inpaint-demo",
          type: ChapterType.INTERACTIVE,
          content: <TyphoonInstruct />
        }
      ]
    }
  ]
};
