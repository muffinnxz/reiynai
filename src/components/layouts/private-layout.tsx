// src/components/layouts/private-layout.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "@/lib/router-events";
import useUser from "@/hooks/use-user";

const PrivateLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { isLoading, userData } = useUser();

  useEffect(() => {
    if (!isLoading && !userData) {
      router.push("/login");
    }
  }, [userData, isLoading, router]);

  if (!isLoading && !userData) {
    return null; // Optionally, you can return a loading indicator here
  }

  return <>{children}</>;
};

export default PrivateLayout;
