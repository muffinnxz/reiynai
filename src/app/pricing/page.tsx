"use client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import LandingLayout from "@/components/layouts/landing-layout";
import { Link } from "@/lib/router-events";
import useUser from "@/hooks/use-user";

export default function Component() {
  const { userData } = useUser();

  return (
    <LandingLayout>
      <section className="w-full py-6 md:py-12 lg:py-16">
        <div className="container grid gap-12 px-4 md:px-6">
          <div className="grid gap-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">แผนการใช้งาน</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              เลือกแผนที่เหมาะสมกับคุณ ไม่มีค่าธรรมเนียมแอบแฝงใด ๆ
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
            <Card className="flex flex-col justify-between rounded-lg border bg-background p-8 shadow-sm transition-shadow hover:shadow-md">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold">บุคคลธรรมดา</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold">ฟรี</span>
                </div>
                <p className="text-muted-foreground">เหมาะสำหรับการใช้งานส่วนบุคคล</p>
                <ul className="list-disc list-inside text-muted-foreground">
                  <li>เข้าถึงคอร์สหลักทั้งหมด</li>
                  <li>ใช้งาน AI ได้ไม่จำกัดครั้ง</li>
                  <li>เข้าถึง Learning Copilot ผู้ช่วยคอยปรึกษาปัญหาต่างๆ</li>
                </ul>
              </div>
              {userData ? (
                <Button variant="ghost" className="mt-6">
                  คุณอยู่ในแผนนี้
                </Button>
              ) : (
                <Button asChild className="mt-6">
                  <Link href="/login">สมัครใช้งาน</Link>
                </Button>
              )}
            </Card>
            <Card className="flex flex-col justify-between rounded-lg border bg-background p-8 shadow-sm transition-shadow hover:shadow-md">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold">องค์กร</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold">ติดต่อเรา</span>
                </div>
                <p className="text-muted-foreground">ออกแบบสำหรับทีมและธุรกิจขนาดใหญ่</p>
                <ul className="list-disc list-inside text-muted-foreground">
                  <li>เข้าถึงคอร์สหลักทั้งหมด</li>
                  <li>ใช้งาน AI ได้ไม่จำกัดครั้ง</li>
                  <li>เข้าถึง Learning Copilot ผู้ช่วยคอยปรึกษาปัญหาต่างๆ</li>
                  <li>การฝึกอบรมองค์กรแบบกำหนดเอง</li>
                  <li>รายงานการวิเคราะห์และความคืบหน้า</li>
                  <li>การสนับสนุนจากทีมมืออาชีพ</li>
                </ul>
              </div>
              <Button asChild className="mt-6">
                <Link href="https://forms.gle/MJ3bgmArSSLg6dKE8" target="_blank" rel="noopener noreferrer">
                  ติดต่อเรา
                </Link>
              </Button>
            </Card>
          </div>
        </div>
      </section>
    </LandingLayout>
  );
}
