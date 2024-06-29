import { courses } from "@/constants/courses";
import { ChapterType } from "@/interfaces/course";
import parse from "html-react-parser";
import { Button } from "@/components/ui/button";
export default function App({
  params,
  searchParams
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <article>
      {courses[params.slug].chapters.map((chapter) => (
        <div key={chapter.id} id={chapter.id}>
          {chapter.name && (
            <div className="text-4xl justify-between w-full align-center max-md:text-2xl">
              <span className="inline-block align-baseline">{chapter.name}</span>
            </div>
          )}
          {chapter && chapter.type === ChapterType.TEXT && (
            <div className="text-lg w-full text-left mb-6 font-light mt-4 max-md:text-base">{parse(chapter.content as string)}</div>
          )}
          {chapter && chapter.type === ChapterType.INTERACTIVE && (
            <div className="text-lg w-full text-left mt-4 mb-6">{chapter.content}</div>
          )}
        </div>
      ))}
    </article>
  );
}
