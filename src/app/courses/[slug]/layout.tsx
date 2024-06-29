import SideNav from "@/components/courses-sidenav";
import Navbar from "@/components/NavBar";
import { courses } from "@/constants/courses";

export default function DashboardLayout({ children, params }: { children: React.ReactNode; params: { slug: string } }) {
  return (
    <>
      <Navbar />
      <div className="flex flex-col h-screen lg:px-40 max-sm:px-10 sm:px-10">
        <header className="bg-gradient-to-t from-slate-950 text-white pt-6 pb-2 h-[680px] text-start flex items-end rounded-lg mb-4 mt-8">
          <div className="flex flex-col ml-4 h-[24vh]">
            <div className="h-full"></div>
            <h1 className="text-5xl font-bold">{courses[params.slug].name}</h1>
            <p className="text-xl">{courses[params.slug].description}</p>
          </div>
        </header>
        <div className="flex flex-1">
          <SideNav courses={courses[params.slug]} />
          <main className="flex-1 bg-white text-black p-8 border rounded-lg ml-4 max-sm:ml-0 sm:ml-0 lg:ml-4 mb-4">
            {children}
          </main>
        </div>
      </div>
    </>
  );
}
