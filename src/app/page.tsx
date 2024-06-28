import LandingLayout from "@/components/layouts/landing-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function Home() {
  return (
    <LandingLayout>
      <main className="flex min-h-screen flex-col items-center justify-between">
        {/* Hero Section */}
        <section className="w-full py-12 sm:py-16 md:py-24 lg:py-32 bg-primary text-primary-foreground border border-border flex flex-col items-center">
          <h1 className="text-3xl font-semibold sm:text-5xl xl:text-6xl text-center">
            สำรวจการใช้ AI อย่างสร้างสรรค์ได้อย่างง่ายดาย
          </h1>
          <p className="max-w-[600px] mx-auto text-muted-foreground md:text-xl text-center mt-4">
            เรียนรู้และทดลองใช้เครื่องมือ AI ที่ล้ำสมัยในที่เดียว
          </p>
          <div className="md:flex space-x-4">
            <Button variant="secondary" asChild className="mt-4">
              <Link href="/explore-courses">เริ่มสำรวจ</Link>
            </Button>
            <Button variant="secondary" asChild className="mt-4">
              <Link href="https://discord.gg/Invite_Link" target="_blank" rel="noopener noreferrer">
                เข้าร่วมชุมชน
              </Link>
            </Button>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">คุณสมบัติของเรา</div>
                <h2 className="text-3xl font-semibold sm:text-5xl">ค้นพบแพลตฟอร์มของเรา</h2>
                <p className="max-w-[900px] mx-auto text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed pb-4">
                  สำรวจประโยชน์ของการใช้แพลตฟอร์มของเราเพื่อเพิ่มประสบการณ์การเรียนรู้ของคุณ
                </p>
              </div>
            </div>
            <div className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
              <Card className="border border-border">
                <CardHeader>
                  <CardTitle>ใช้งานง่าย</CardTitle>
                  <CardDescription>นำทางและเรียนรู้ได้ง่ายด้วยอินเทอร์เฟซที่เข้าใจง่ายของเรา</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    แพลตฟอร์มของเราออกแบบโดยคำนึงถึงประสบการณ์ของผู้ใช้
                    ทำให้ง่ายต่อการค้นหาและเข้าถึงเครื่องมือและทรัพยากรที่คุณต้องการ
                  </p>
                </CardContent>
              </Card>
              <Card className="border border-border">
                <CardHeader>
                  <CardTitle>คุ้มค่า</CardTitle>
                  <CardDescription>เข้าถึงเครื่องมือ AI ที่ทรงพลังได้โดยไม่ต้องเสียค่าใช้จ่ายสูง</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    เรามีแผนการราคาที่แข่งขันได้เพื่อให้คุณสามารถใช้ประโยชน์จากพลังของ AI ได้โดยไม่ต้องเสียค่าใช้จ่ายสูง
                  </p>
                </CardContent>
              </Card>
              <Card className="border border-border">
                <CardHeader>
                  <CardTitle>การสนับสนุนที่ครอบคลุม</CardTitle>
                  <CardDescription>รับความช่วยเหลือเมื่อคุณต้องการด้วยทีมสนับสนุนของเรา</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>ทีมสนับสนุนของเราพร้อมที่จะช่วยเหลือคุณในทุกคำถามหรือปัญหาที่คุณอาจพบเจอ</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Proudly Open Source Section */}
        <section className="py-20 w-screen bg-gray-900 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Proudly Open Source</h2>
          <p className="text-lg mb-2">Reiyn AI is open source and powered by open source software.</p>
          <p className="text-lg">
            The code is available on{" "}
            <Link
              href="https://github.com/your-repo"
              className="underline hover:text-blue-400"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </Link>
            .
          </p>
        </section>
      </main>
    </LandingLayout>
  );
}
