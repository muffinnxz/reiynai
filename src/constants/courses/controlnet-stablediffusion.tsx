import SD15CannyEdge from "@/components/interactive/sd15-controlnet-cannyedge";
import SD15Depth from "@/components/interactive/sd15-controlnet-depth";
import SD15Pose from "@/components/interactive/sd15-controlnet-pose";
import SD15Scribble from "@/components/interactive/sd15-controlnet-scribble";
import SD15Segmentation from "@/components/interactive/sd15-controlnet-segmentation";
import { ChapterType, Course, CourseCategory, QuizType } from "@/interfaces/course";

export const course: Course = {
  id: "controlnet-stablediffusion",
  name: "พื้นฐานการใช้งาน ControlNet กับ Stable Diffusion",
  description: "คอร์สนี้จะเป็นการแนะนำการใช้งาน ControlNet สำหรับ Stable Diffusion",
  thumbnail: "/course-thumbnails/controlnet.webp",
  catergories: [CourseCategory.IMAGE_GENERATION],
  chapters: [
    {
      id: "what-is-controlnet",
      name: "ControlNet คืออะไร?",
      type: ChapterType.TEXT,
      content: `เป็นเครื่องมือที่ช่วยนำทาง AI ในการสร้างภาพให้ตรงกับที่คุณต้องการ คิดว่ามันเหมือนการให้โครงร่างหรือสเก็ตช์ แล้ว AI จะเติมเต็มรายละเอียดให้สวยงาม ทำให้ภาพสุดท้ายออกมาตามที่คุณต้องการ ช่วยให้ผลลัพธ์มีความสม่ำเสมอและแม่นยำ`
    },
    {
      id: "why-use-controlnet",
      name: "ทำไมต้องใช้ ControlNet?",
      type: ChapterType.TEXT,
      content: `แม้ว่า Stable Diffusion จะสามารถควบคุมการสร้างภาพได้ผ่านการใช้คำสั่ง (prompt) แต่การทำให้ภาพมีองค์ประกอบหรือท่าทางของคนในภาพตามที่เราต้องการโดยอาศัยการบรรยายเพียงอย่างเดียวอาจเป็นเรื่องยาก ด้วยเหตุนี้ เราจึงใช้ Control Image หรือภาพตัวอย่าง เพื่อให้ Stable Diffusion เข้าใจโครงสร้างและองค์ประกอบที่เราต้องการ
การใช้ ControlNet ช่วยให้คุณสามารถกำหนดลักษณะและรายละเอียดของภาพได้ง่ายขึ้น ไม่ว่าจะเป็นการจัดวางองค์ประกอบ การกำหนดท่าทาง หรือการสร้างภาพให้ตรงกับวิสัยทัศน์ของคุณมากที่สุด ทำให้ผลลัพธ์ออกมาตรงตามความต้องการและมีคุณภาพสูง`
    },
    {
      id: "types-of-controlnet",
      name: "ControlNet มีแบบไหนบ้าง?",
      type: ChapterType.TEXT,
      content: `ปัจจุบันมีการสร้าง ControlNet ออกมาหลากหลายรูปแบบเพื่อตอบโจทย์ความต้องการที่แตกต่างกันในโลกจริง อย่างไรก็ตาม ControlNet ขั้นพื้นฐานที่ใช้งานบ่อยและเป็นตัวแรก ๆ ที่ถูกพัฒนาขึ้น ได้แก่:
<ul style="margin-left: 10px;">
  <li><strong >Canny Edge</strong>: ควบคุมผลลัพธ์โดยการสร้างขอบของรูปต้นฉบับ เหมาะกับการสร้างรูปที่มีความละเอียดสูงและต้องการความคมชัดของเส้นขอบ</li>
  <li><strong>Scribbles</strong>: ควบคุมผลลัพธ์โดยการใช้รูปลายเส้นหรือสเก็ตช์ เหมาะกับการสร้างรูปจากงานร่างแบบหรือภาพดราฟท์</li>
  <li><strong>Human Pose</strong>: ควบคุมผลลัพธ์โดยการใช้ AI จับท่าทางของคนในรูปต้นฉบับ แล้วสร้างรูปในท่าเดียวกัน เหมาะสำหรับงานที่ต้องการความถูกต้องของท่าทางมนุษย์</li>
  <li><strong>Semantic Segmentation</strong>: ควบคุมผลลัพธ์โดยให้ AI แยกแยะส่วนต่าง ๆ ของรูป เช่น คน, ต้นไม้, สิ่งของ แล้วสร้างภาพใหม่ให้มีองค์ประกอบคล้ายเดิม</li>
  <li><strong>Depth</strong>: ควบคุมผลลัพธ์โดยให้ AI ประมาณ depth map (ความลึกของแต่ละส่วนในภาพ) แล้วสร้างภาพใหม่ที่มีองค์ประกอบความลึกคล้ายเดิม</li>
</ul>
การใช้ ControlNet แต่ละแบบช่วยให้การสร้างภาพด้วย AI มีความยืดหยุ่นและความแม่นยำสูงขึ้น ทำให้สามารถตอบโจทย์การใช้งานในด้านต่าง ๆ ได้อย่างมีประสิทธิภาพ`
    },
    {
      id: "canny-edge-demo",
      type: ChapterType.INTERACTIVE,
      content: <SD15CannyEdge />
    },
    {
      id: "scribbles-demo",
      type: ChapterType.INTERACTIVE,
      content: <SD15Scribble />
    },
    {
      id: "human-pose-demo",
      type: ChapterType.INTERACTIVE,
      content: <SD15Pose />
    },
    {
      id: "semantic-segmentation-demo",
      type: ChapterType.INTERACTIVE,
      content: <SD15Segmentation />
    },
    {
      id: "depth-demo",
      type: ChapterType.INTERACTIVE,
      content: <SD15Depth />
    }
  ],
  quizes: [
    {
      type: QuizType.MULTIPLE_CHOICE,
      question: "ControlNet ช่วยอะไรในกระบวนการสร้างภาพ?",
      options: [
        "ช่วยให้ AI สร้างภาพที่มีความละเอียดสูงขึ้น",
        "ช่วยให้ AI เข้าใจโครงสร้างและองค์ประกอบของภาพที่ต้องการ",
        "ช่วยให้ AI สร้างเสียงจากภาพ"
      ],
      correctAnswer: "ช่วยให้ AI เข้าใจโครงสร้างและองค์ประกอบของภาพที่ต้องการ"
    },
    {
      type: QuizType.TEXT,
      question: "อธิบายการใช้ ControlNet Human Pose ในการสร้างภาพ",
      correctAnswer:
        "ControlNet Human Pose ใช้ AI จับท่าทางของคนในรูปต้นฉบับ แล้วสร้างรูปในท่าเดียวกัน ทำให้การสร้างภาพที่มีท่าทางของมนุษย์มีความถูกต้องมากขึ้น"
    }
  ]
};
