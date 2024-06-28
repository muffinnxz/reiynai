import { Course } from "@/interfaces/course";
import Link from "next/link";
interface SideNavProps {
  courses: Course;
}
export default function SideNav({ courses }: SideNavProps) {
  return (
    <nav className="w-64 bg-gray-300 p-4 overflow-y-auto rounded-lg hidden lg:flex mb-4 h-fit sticky top-0">
      <ul className="my-5 space-y-8">
        {courses.chapters.map((chapter) => (
          <li key={chapter.id}>
            <Link href={`#${chapter.id}`}>{chapter.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
