import SideNav from "@/ui/courses-sidenav"
import { Button } from "@/components/ui/button"
export default function App({params,searchParams,} : {
        params: { slug: string }
        searchParams: { [key: string]: string | string[] | undefined }
      }){
    return (
        <article>
          <div className="text-4xl justify-between w-full flex align-center">
            <span className="inline-block align-baseline">BABA</span>
            <Button variant="outline" className="place-self-end md:flex space-x-2 items-center bg-accentDark">Chapter</Button>
          </div>
        </article>
    )
}