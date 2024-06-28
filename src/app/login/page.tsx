import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

function page() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-900 text-white">
            <div className="w-full max-w-md p-8 space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-bold">
                        ยินดีต้อนรับเข้าสู่ Reiyn AI
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-400">
                        กดลงชื่อเข้าใช้เพื่อเข้าสู่ระบบ
                    </p>
                </div>
                <div className="mt-8 space-y-6">
                    <div className="flex">
                        <Button
                            variant="outline"
                            className="w-full bg-white text-black hover:bg-gray-100"
                        >
                            <Image
                                className="mr-2"
                                src="/icons/google.svg"
                                alt="ReiynAI Logo"
                                width={24}
                                height={24}
                            />
                            ลงชื่อเข้าใช้ด้วย Google
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default page;
