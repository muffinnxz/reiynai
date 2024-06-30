import { Course } from "@/interfaces/course";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

interface SideNavProps {
  courses: Course;
  pathname: string;
}

export default function SideNav({ courses, pathname }: SideNavProps) {
  return (
    <div className="sticky top-0 w-64 p-4 border rounded-md h-fit max-xl:hidden xl:flex">
      <div className="space-y-2">
        <span className="text-2xl ml-2 font-bold">สารบัญ</span>
        <Separator />
        {courses.pages.map((page, pageIndex) =>
          page.chapters.map((chapter) =>
            chapter.type !== "interactive" ? (
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
  );
}
