import SideNav from "@/ui/courses-sidenav";
import { Button } from "@/components/ui/button";
import { courses } from "@/constants/courses";
export default function App({
  params,
  searchParams
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  console.log(params.slug);
  return (
    <article>
      <div className="text-4xl justify-between w-full flex align-center">
        <span className="inline-block align-baseline " id={courses[params.slug].chapters[0].id}>
          {courses[params.slug].chapters[0].name}
        </span>
        <Button variant="outline" className="place-self-end max-lg:flex space-x-2 items-center bg-accentDark hidden">
          Chapter
        </Button>
      </div>
      <p className="text-lg w-[90%] text-justify mb-6 font-light mt-4">{courses[params.slug].chapters[0].content}</p>
      {courses[params.slug].chapters.slice(1).map((chapter) => (
        <>
          <div className="text-4xl w-[90%] justify-between w-full align-center">
            <span className="inline-block align-baseline" id={chapter.id}>
              {chapter.name}
            </span>
          </div>
          {chapter && chapter.type === "text" ? (
            <div
              className="text-lg w-[90%] text-justify mb-6 font-light mt-4"
              dangerouslySetInnerHTML={{ __html: chapter.content! }}
            ></div>
          ) : (
            <div className="text-lg w-full text-justify mb-6">{chapter.content}</div>
          )}
        </>
      ))}
    </article>
  );
}
