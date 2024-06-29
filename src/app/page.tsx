"use client";
import { useEffect, useState } from "react";
import LandingLayout from "@/components/layouts/landing-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { courses } from "@/constants/courses";
import CourseCard from "@/components/course-card";
import { Course } from "@/interfaces/course";
import { DISCORD_INVITE_LINK } from "@/constants/links";

// function to get random courses
const getRandomCourses = (courses: Course[], count: number): Course[] => {
  const shuffled = courses.slice().sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const coursesArray = Object.values(courses);
export default function Home() {
  const [randomCourses, setRandomCourses] = useState<Course[]>([]);

  useEffect(() => {
    setRandomCourses(getRandomCourses(coursesArray, 3));
  }, []);

  return (
    <LandingLayout>
      <main className="flex min-h-screen flex-col items-center justify-between">
        {/* Hero Section */}
        <section className="w-full py-12 sm:py-16 md:py-24 lg:py-32 bg-primary text-primary-foreground flex flex-col items-center">
          <h1 className="text-3xl font-semibold sm:text-5xl xl:text-6xl text-center">
            เริ่มต้นเข้าใจ AI ได้อย่างง่ายดาย
          </h1>
          <p className="max-w-[600px] mx-auto text-muted-foreground md:text-xl text-center mt-4">
            บนแพลตฟอร์มของเรา คุณสามารถเข้าถึงและทดลองใช้ AI หลายๆ ตัวได้อย่างอิสระ
            เพื่อค้นหาโซลูชันที่เหมาะสมที่สุดสำหรับคุณ
          </p>
          <div className="flex space-x-4 mt-4">
            <Button variant="secondary" asChild className="w-40">
              <Link href="/explore">เริ่มสำรวจ</Link>
            </Button>
            <Button variant="secondary" asChild className="w-40">
              <Link href={DISCORD_INVITE_LINK} target="_blank" rel="noopener noreferrer">
                <div className="flex items-center justify-center">
                  <Image src="/icons/discord.svg" alt="Discord" width={24} height={24} className="mr-2" />
                  เข้าร่วมดิสคอร์ด
                </div>
              </Link>
            </Button>
          </div>
        </section>

        {/* Features Section */}
        <section className="pt-20 bg-background">
          <div className="container mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">คุณสมบัติของเรา</div>
                <h2 className="text-3xl font-semibold sm:text-5xl">จุดเด่นของเรา</h2>
                <p className="max-w-[900px] mx-auto text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed pb-4">
                  เรียนรู้เพิ่มเติมเกี่ยวกับแพลตฟอร์มของเรา
                </p>
              </div>
            </div>
            <div className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
              <Card className="border border-border flex flex-col h-full">
                <CardHeader>
                  <CardTitle>ใช้งานง่าย</CardTitle>
                  <CardDescription>เข้าถึงการเรียนรู้ได้ง่ายด้วยอินเทอร์เฟซที่เข้าใจง่ายของเรา</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p>
                    ให้คุณสามารถเริ่มต้นและเรียนรู้ได้ในทันทีด้วยอินเทอร์เฟซที่เรียบง่ายและได้ทดลองใช้งานจริงได้ทันทีในคอร์สเรียน
                  </p>
                </CardContent>
              </Card>
              <Card className="border border-border flex flex-col h-full">
                <CardHeader>
                  <CardTitle>ราคาเข้าถึงได้ง่าย</CardTitle>
                  <CardDescription>
                    เข้าถึงเครื่องมือ AI ที่หลากหลายได้โดยไม่ต้องเสียค่าใช้จ่ายสูงและสามารถควบคุมค่าใช้จ่ายได้
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p>
                    ให้บริการเทคโนโลยี AI ชั้นนำที่ราคาที่เหมาะสม
                    พร้อมให้ทุกคนเข้าถึงและใช้ประโยชน์จากการพัฒนาทักษะและขยายความสามารถด้าน AI ได้อย่างเต็มประสิทธิภาพ
                    โดยไม่ต้องกังวลเรื่องต้นทุน
                  </p>
                </CardContent>
              </Card>
              <Card className="border border-border flex flex-col h-full">
                <CardHeader>
                  <CardTitle>AI ถามอะไรตอบได้</CardTitle>
                  <CardDescription>แชทบอทที่สามารถามตอบข้อสงสับเกี่ยวกับเนื้อหาได้</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p>
                    แพลตฟอร์มของเรามาพร้อมกับแชทบอทอัจฉริยะที่พร้อมตอบทุกข้อสงสัยเกี่ยวกับเนื้อหาการเรียนรู้
                    ให้คุณค้นหาข้อมูลและแก้ไขปัญหาได้ทันท่วงที
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Example Course Section */}
        <section className="w-full py-12 bg-background">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">ตัวอย่างคอร์สเรียน</h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {randomCourses.map((course: Course, index: number) => (
                <CourseCard key={index} course={course} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </LandingLayout>
  );
}
