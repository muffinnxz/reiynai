"use client";

import useUser from "@/hooks/use-user";
import { useEffect } from "react";
import { useRouter } from "@/lib/router-events";

export default function IsOnboardLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isLoading, userData } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && userData) {
      let answer = userData.answers;
      if (!answer || !answer["onboarding"]) {
        router.push("/onboarding");
        return;
      }
    }
  }, [userData, isLoading]);

  return <>{children}</>;
}
