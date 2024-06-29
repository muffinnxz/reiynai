import SideNav from "@/components/courses-sidenav";
import Navbar from "@/components/NavBar";
import { courses } from "@/constants/courses";
import ChatButton from "@/components/chat-ui";
import ChapterButton from "@/components/chapterbutton";
export default function DashboardLayout({ children, params }: { children: React.ReactNode; params: { slug: string } }) {
  console.log("test", params.slug);
  return (
    <>
      <Navbar />
      <div className="flex flex-col h-screen lg:px-40 max-sm:px-2 sm:px-10">
        <header
          className="bg-gradient-to-t from-slate-950 text-white h-[700px] text-start flex items-end rounded-lg mb-4 mt-8"
          style={{
            backgroundImage: `url(${courses[params.slug].thumbnail})`,
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        >
          <div className="flex flex-col w-full h-[30vh] bg-gradient-to-t from-slate-950 rounded-lg">
            <div className="h-full pt-6 pb-2"></div>
            <h1 className="text-5xl font-bold ml-4 max-md:text-3xl max-sm:text-xl">{courses[params.slug].name}</h1>
            <p className="text-xl mt-2 ml-4 mb-2 max-md:text-sm max-sm:text-xs">{courses[params.slug].description}</p>
          </div>
        </header>
        <div className="flex flex-1">
          <SideNav courses={courses[params.slug]} pathname={params.slug} />
          <div className="flex-1">
            <main className="bg-white text-black p-8 border rounded-lg ml-4 max-xl:ml-0 xl:ml-4 mb-4">
              {children}
              <ChapterButton courses={courses[params.slug]} pathname={params.slug} />
              <ChatButton slug={params.slug} courseName={courses[params.slug].name} />
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
