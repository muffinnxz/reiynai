import { courses } from "@/constants/courses";
import { ChapterType } from "@/interfaces/course";
import parse from "html-react-parser";
import { Separator } from "@/components/ui/separator";
import Quiz from "@/components/quiz";

export default function App({
  params,
  searchParams
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const course = courses[params.slug];

  return (
    <article>
      {course.chapters.map((chapter) => (
        <div key={chapter.id} id={chapter.id}>
          {chapter.name && (
            <div className="text-4xl justify-between w-full align-center">
              <span className="inline-block align-baseline">{chapter.name}</span>
            </div>
          )}
          {chapter && chapter.type === ChapterType.TEXT && (
            <div className="text-lg w-[90%] text-justify mb-6 font-light mt-4">{parse(chapter.content as string)}</div>
          )}
          {chapter && chapter.type === ChapterType.INTERACTIVE && (
            <div className="text-lg w-full text-justify mt-4 mb-6">{chapter.content}</div>
          )}
        </div>
      ))}
      <Separator className={"mt-16"}></Separator>
      <Quiz course={course}></Quiz>
    </article>
  );
}
