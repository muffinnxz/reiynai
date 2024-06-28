"use client";
import { Button } from "@/components/ui/button";
import { signIn } from "@/lib/firebase-auth";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-gray-900 text-white">
      <Link href="/" passHref>
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
                signIn();
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
