import { Course } from "@/interfaces/course";
import Link from "next/link";

interface SideNavProps {
  courses: Course;
}

export default function SideNav({ courses }: SideNavProps) {
  return (
    <div className="w-64 p-4 border rounded-md h-fit">
      <div className="space-y-2">
        {courses.chapters.map((chapter) => (
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
        ))}
      </div>
    </div>
  );
}
