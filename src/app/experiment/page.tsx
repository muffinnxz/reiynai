"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "@/lib/firebase-auth";

export default function Page() {
  return (
    <div>
      <h1>เรียนเอไอ</h1>
      <Button onClick={signIn}>Login</Button>
    </div>
  );
}
