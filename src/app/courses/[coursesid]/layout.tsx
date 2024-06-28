import SideNav from "@/ui/courses-sidenav"
export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
    <div className="flex flex-col h-screen md:px-40">
      <header className="bg-gray-800 text-white pt-6 pb-2 h-[28vh] text-start flex items-end rounded-lg my-4">
        <div className="flex flex-col ml-4">
            <h1 className="text-5xl font-bold">Courses Name</h1>
            <p className="text-xl">Courses Descriptions</p>
        </div>
      </header>
      <div className="flex flex-1">
        <SideNav />
        <main className="flex-1 bg-gray-700 text-white p-8 rounded-lg ml-4">
          {children}
        </main>
      </div>
    </div>
    )
  }