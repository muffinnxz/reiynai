"use client";

import { Button } from "@/components/ui/button";
import { courses } from "@/constants/courses";
import useUser from "@/hooks/use-user";
import { signIn, signOut } from "@/lib/firebase-auth";
import parse from "html-react-parser";

export default function Page() {
  const { userData } = useUser();
  return (
    <div>
      <h1>เรียนเอไอ: {userData?.name}</h1>
      {!userData && <Button onClick={signIn}>Login</Button>}
      {userData && <Button onClick={signOut}>Logout</Button>}
      {courses["introduction-to-stable-diffusion"].chapters.map((chapter) => (
        <div key={chapter.id}>
          {chapter.type === "text" && typeof chapter.content === "string" && (
            <div className="flex flex-col gap-2 mt-2">
              <h2 className="font-semibold text-lg">{chapter.name}</h2>
              <div>{parse(chapter.content)}</div>
            </div>
          )}
          {chapter.type === "interactive" && chapter.content}
        </div>
      ))}
    </div>
  );
}
