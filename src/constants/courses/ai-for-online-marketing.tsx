import ICLight from "@/components/interactive/ic-light";
import ICLightBackground from "@/components/interactive/ic-light-background";
import SDInpaint from "@/components/interactive/sd-inpaint";
import TyphoonInstruct from "@/components/interactive/typhoon15-instruct";
import { ChapterType, Course, CourseCategory, QuizType } from "@/interfaces/course";
import { ActionType } from "@/interfaces/bot";

export const course: Course = {
  id: "ai-for-online-marketing",
  name: "การใช้ AI ในการช่วยขายสินค้าสำหรับคนขายของออนไลน์",
  description: "คอร์สที่เหมาะกับพ่อค้าแม่ค้าออนไลน์",
  thumbnail: "/course-thumbnails/replicate-prediction-yjanxdpbcdrgm0cgcpkaw0jv28.webp",
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

การใช้งานควรใช้รูปแบบ prompt ดังนี้ <br />“<span className="font-medium text-xl">masterpiece, realistic, best quality, [รูปร่างของสินค้า], [พื้นหลัง หรือ สถานที่], [แสง และบรรยากาศ]</span>”
<br />เช่น “masterpiece, realistic, bottle, mossy stone, natural light”

<br />“masterpiece, realistic, bottle, wooden table, warm light”

<br />“masterpiece, realistic, bottle, white sand beach, bright sunlight”`
        },
        {
          id: "stablediffusion-inpaint-demo",
          type: ChapterType.INTERACTIVE,
          content: (
            <SDInpaint
              i={
                "https://images-ext-1.discordapp.net/external/a37aqSgs06Gu9uVWdz1TFIuL0a1Yy2TKp6CHxcI0Www/%3Falt%3Dmedia%26token%3Da2a84e26-5311-4546-8deb-a265606b564d/https/firebasestorage.googleapis.com/v0/b/reiynai.appspot.com/o/Examples%252Fexample-image.webp?format=webp&width=996&height=1076"
              }
              p={"masterpiece, realistic, bottle, white sand beach, bright sunlight"}
              quest="ขวดน้ำหอมบนชายหาดที่มีไฟนีออนสีเขียว"
            />
          )
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

เช่น <br/> <div className="text-xl font-medium">“bottle, mossy stone, natural light”, <br/>“masterpiece, realistic, bottle, wooden table, warm light” <br/>หรือ “ bottle, lying on a beach, natural sunlight”, <br/>“bottle, cyberpunk street, blue and purple RGB glowing neon light”</div>`
        },
        {
          id: "stablediffusion-inpaint-demo",
          type: ChapterType.INTERACTIVE,
          content: (
            <ICLight
              i={
                "https://images-ext-1.discordapp.net/external/a37aqSgs06Gu9uVWdz1TFIuL0a1Yy2TKp6CHxcI0Www/%3Falt%3Dmedia%26token%3Da2a84e26-5311-4546-8deb-a265606b564d/https/firebasestorage.googleapis.com/v0/b/reiynai.appspot.com/o/Examples%252Fexample-image.webp?format=webp&width=996&height=1076"
              }
              p={"masterpiece, realistic, bottle, wooden table, warm light"}
            />
          )
        }
      ],
      actions: [
        {
          id: "ic-light-quiz",
          type: ActionType.SEND_QUIZ,
          content: {
            type: QuizType.MULTIPLE_CHOICE,
            question: "IC-Light สามารถทำอะไรได้บ้าง?",
            options: [
              "สร้างพื้นหลังใหม่",
              "ทำให้แสงจากพื้นหลังมีผลกับตัวสินค้า",
              "ทำให้วัตถุดูเข้ากับแสงรอบ ๆ ตัวได้ดี",
              "ถูกทุกข้อ"
            ],
            correctAnswer: "ถูกทุกข้อ"
          }
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

เช่น <div className="text-xl font-medium">“bottle, mossy stone, natural light”, <br/>“masterpiece, realistic, bottle, wooden table, warm light” หรือ <br/>“ bottle, lying on a beach, natural sunlight”, <br/>“bottle, cyberpunk street, blue and purple RGB glowing neon light”</div>`
        },
        {
          id: "stablediffusion-inpaint-demo",
          type: ChapterType.INTERACTIVE,
          content: (
            <ICLightBackground
              i={
                "https://images-ext-1.discordapp.net/external/a37aqSgs06Gu9uVWdz1TFIuL0a1Yy2TKp6CHxcI0Www/%3Falt%3Dmedia%26token%3Da2a84e26-5311-4546-8deb-a265606b564d/https/firebasestorage.googleapis.com/v0/b/reiynai.appspot.com/o/Examples%252Fexample-image.webp?format=webp&width=996&height=1076"
              }
              bg={
                "https://images-ext-1.discordapp.net/external/CCTayqnG7LlhENHJRi71iEsyalxhOiPQsRyJSJoOnNY/%3Falt%3Dmedia%26token%3Df4b630c1-1286-4bbd-9d8a-043f2873e68f/https/firebasestorage.googleapis.com/v0/b/reiynai.appspot.com/o/Examples%252Fexample-background.jpg?format=webp&width=1200&height=632"
              }
              p={"bottle, deep blue, aquatic, lying on ocean floor, cold light"}
            />
          )
        }
      ],
      actions: [
        {
          id: "ic-light-background-quiz",
          type: ActionType.SEND_QUIZ,
          content: {
            type: QuizType.MULTIPLE_CHOICE,
            question: "การประยุกต์ใช้ IC-Light กับภาพพื้นหลังใหม่ ทำให้ภาพดูดีขึ้นอย่างไร?",
            options: [
              "สร้างพื้นหลังใหม่",
              "ทำให้แสงจากพื้นหลังมีผลกับตัวสินค้า",
              "ทำให้วัตถุดูเข้ากับแสงรอบ ๆ ตัวได้ดี",
              "ถูกทุกข้อ"
            ],
            correctAnswer: "ถูกทุกข้อ"
          }
        },
        {
          id: "ic-light-background-quiz-2",
          type: ActionType.SEND_QUIZ,
          content: {
            type: QuizType.TEXT,
            question: "การใช้ IC-Light สามารถทำได้โดยวิธีใดบ้าง?",
            correctAnswer: "การใช้รูปแบบ prompt ที่เหมาะสม และเลือกภาพพื้นหลังที่เหมาะสม"
          }
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
        <div className="font-medium text-xl">“Write me a name for my product 
        listing on e-commerce website. 
        The name should be clear 
        and give high conversion rate and easy to appear on search. Here is some example name 1. [ชื่อที่ 1] 2. [ชื่อที่ 2] 3. [ชื่อที่ 3] \n My Product Name: ”</div>
        <h2 className="text-2xl font-medium pt-8">วิธีค้นหาชื่อสินค้าในแพลตฟอร์มออนไลน์ช้อปปิ้ง</h2>
        <ul>
          <li>- เข้าสู่แพลตฟอร์มออนไลน์ช้อปปิ้งต่างๆ เช่น Shopee, Lazada, TiktokShop</li>
          <li>- ค้นหาสินค้าที่คุณต้องการขาย</li>
          <li>- กดเลือกสินค้าที่ขายดีหรือสินค้ายอดนิยม</li>
          <li>- ดูชื่อสินค้าที่มีการขายดีและได้รับความนิยม</li>
          <li>- ใช้ชื่อสินค้าเหล่านั้นไว้เป็นตัวอย่าง</li>
        </ul>`
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
