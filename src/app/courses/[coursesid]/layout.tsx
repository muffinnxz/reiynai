import SideNav from "@/ui/courses-sidenav"
import Navbar from "@/components/NavBar"
export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
    <>
    <Navbar />
    <div className="flex flex-col h-screen lg:px-40 max-sm:px-10 sm:px-10">
      <header className="bg-gradient-to-t from-slate-950 text-white pt-6 pb-2 h-[35vh] text-start flex items-end rounded-lg my-4">
        <div className="flex flex-col ml-4">
            <h1 className="text-5xl font-bold">Courses Name</h1>
            <p className="text-xl">Courses Descriptions</p>
        </div>
      </header>
      <div className="flex flex-1">
        <SideNav />
        <main className="flex-1 bg-slate-950 text-white p-8 rounded-lg ml-4 max-sm:ml-0 sm:ml-0 lg:ml-4">
          {children}
        </main>
      </div>
    </div>
    </>
    )
  }