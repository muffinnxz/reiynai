import SideNav from "@/ui/courses-sidenav"
export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
    <div className="flex flex-col h-screen px-40">
      <header className="bg-gray-800 text-white py-6 h-[25vh] text-start flex items-end">
        <h1 className="text-3xl font-bold">Courses Name</h1>
        <p className="text-xl">Courses Descriptions</p>
      </header>
      <div className="flex flex-1">
        <SideNav />
        <main className="flex-1 bg-gray-700 text-white p-8">
          {children}
        </main>
      </div>
    </div>
    )
  }