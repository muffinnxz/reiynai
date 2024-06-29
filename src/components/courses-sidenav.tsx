import { Course } from "@/interfaces/course";
import Link from "next/link";
import { Separator } from "@/components/ui/separator"

interface SideNavProps {
  courses: Course;
}

export default function SideNav({ courses }: SideNavProps) {
  return (
    <div className="sticky top-0 w-64 p-4 border rounded-md h-fit max-xl:hidden xl:flex">
      <div className="space-y-2">
      <span className="text-2xl ml-2 font-bold">สารบัญ</span>
      <Separator />
        {courses.chapters.map((chapter) => (
          chapter.name? (
          <Link
            key={chapter.id}
            href={`#${chapter.id}`}
            className="flex items-center justify-between p-2 hover:bg-muted rounded-md"
            prefetch={false}
          >
            <div className="flex items-center space-x-2">
              <span>{chapter.name}</span>
            </div>
          </Link>
          ) :null
        ))}
      </div>
    </div>
  );
}
