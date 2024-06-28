"use client";
import { Button } from "@/components/ui/button";
import { signIn } from "@/lib/firebase-auth";
import Image from "next/image";
import React from "react";
import { useRouter,Link } from "@/lib/router-events"; // Use next/navigation for App Router
import useUser from "@/hooks/use-user";

const Page = () => {
  const router = useRouter();
  const { userData } = useUser();

  // Redirect to homepage if the user is already logged in
  React.useEffect(() => {
    if (userData) {
      router.push("/");
    }
  }, [userData, router]);

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-gray-900 text-white">
      <Link href="/">
        <Button variant="secondary" className="absolute top-4 left-4">
          กลับไปหน้าหลัก
        </Button>
      </Link>
      <div className="w-full max-w-md p-8 space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold">ยินดีต้อนรับเข้าสู่ Reiyn AI</h2>
          <p className="mt-2 text-center text-sm text-gray-400">กดลงชื่อเข้าใช้เพื่อเข้าสู่ระบบ</p>
        </div>
        <div className="mt-8 space-y-6">
          <div className="flex">
            <Button
              onClick={() => {
                signIn().then(() => {
                  router.push("/");
                });
              }}
              variant="secondary"
              className="w-full flex items-center justify-center"
            >
              <Image className="mr-2" src="/icons/google.svg" alt="Google Logo" width={24} height={24} />
              ลงชื่อเข้าใช้ด้วย Google
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
