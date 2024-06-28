"use client";

import StableDiffusion15 from "@/components/interactive/stable-diffusion-1-5";
import { Button } from "@/components/ui/button";
import useUser from "@/hooks/use-user";
import { signIn, signOut } from "@/lib/firebase-auth";

export default function Page() {
  const { userData } = useUser();
  return (
    <div>
      <h1>เรียนเอไอ: {userData?.name}</h1>
      {!userData && <Button onClick={signIn}>Login</Button>}
      {userData && <Button onClick={signOut}>Logout</Button>}
      <StableDiffusion15 />
    </div>
  );
}
