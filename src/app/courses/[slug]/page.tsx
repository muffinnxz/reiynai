"use client";
import useUser from "@/hooks/use-user";
import { courses } from "@/constants/courses";
import { ChapterType } from "@/interfaces/course";
import parse from "html-react-parser";
import { useRouter } from "@/lib/router-events";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
export default function App({
  params,
  searchParams
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { toggleChat, isOpenChat, addBotAction, messages } = useUser();

  const course = courses[params.slug];
  const [currentPage, setCurrentPage] = useState(0);
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    if (searchParams.page) {
      const pageIndex = parseInt(searchParams.page as string, 10);
      if (!isNaN(pageIndex) && pageIndex >= 0 && pageIndex < course.pages.length) {
        setCurrentPage(pageIndex);
      }
    }
  }, [searchParams.page]);
  useEffect(() => {
    router.push(`${pathname}?page=${currentPage}`);
  });
  const handleNext = () => {
    if (currentPage < course.pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
    const actions = course.pages[currentPage].actions;
    if (actions) {
      for (let i = 0; i < actions.length; i++) {
        const action = actions[i];
        if (action.sent) {
          return;
        }
        actions[i].sent = true;
        addBotAction(action);
        if (!isOpenChat) {
          toggleChat();
        }
      }
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };
  return (
    <article>
      {course.pages[currentPage].chapters.map((page, index) => (
        <div key={page.id} id={page.id}>
          {page.name && (
            <div className="text-4xl justify-between w-full align-center">
              <span className="inline-block align-baseline">{page.name}</span>
            </div>
          )}
          {page.type === ChapterType.TEXT && (
            <div className="text-lg w-full text-left mb-6 font-light mt-4">{parse(page.content as string)}</div>
          )}
          {page.type === ChapterType.INTERACTIVE && (
            <div className="text-lg w-full text-left mt-4 mb-6">{page.content}</div>
          )}
        </div>
      ))}

      <div className="flex justify-between mt-8">
        <Button onClick={handlePrev} disabled={currentPage === 0}>
          Previous
        </Button>
        <Button onClick={handleNext} disabled={currentPage === course.pages.length - 1}>
          Next
        </Button>
      </div>
    </article>
  );
}
