"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Course } from "@/interfaces/course";
import Link from "next/link";
interface ChapterProps {
  courses: Course;
  pathname: string;
}


const ChapterButton = ({ courses, pathname }: ChapterProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChapters = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="xl:hidden flex">
      <Button
        onClick={toggleChapters}
        className="fixed bottom-4 left-4 bg-primary text-primary-foreground p-4 rounded-lg shadow-lg z-50 flex items-center justify-center transform transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        style={{ width: "60px", height: "60px" }}
      >
        <img src="/icons/book.svg" alt="Chat" className="w-8 h-8 filter invert" />
      </Button>
      {isOpen ? (
        <div className="fixed bottom-[80px] left-4 w-full max-xl:max-w-xs bg-background rounded-2xl shadow-lg z-50">
          <div className="flex items-center justify-between border-b border-muted px-4 py-3 bg-primary text-primary-foreground">
            <h3 className="text-lg font-medium text-white">Chapters</h3>
            <Button variant="ghost" size="icon" className="rounded-full" onClick={toggleChapters}>
              <X className="w-4 h-4 text-white" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
          <ScrollArea className="h-[400px] max-h-[80vh] px-4 py-3">
            <div className="grid gap-4 h-[400px]">
              <div className="w-full p-2">
                <div className="space-y-2">
                  {courses.pages.map((page, pageIndex) =>
                    page.map((chapter) =>
                      chapter.name !== "Demo" ? (
                        <Link
                          key={chapter.id}
                          href={`${pathname}?page=${pageIndex}`}
                          className="flex items-center justify-between p-1.5 hover:bg-muted rounded-md"
                          prefetch={false}
                        >
                          <div className="flex items-center space-x-2">
                            <span>{chapter.name}</span>
                          </div>
                        </Link>
                      ) : null
                    )
                  )}
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
export default ChapterButton;
