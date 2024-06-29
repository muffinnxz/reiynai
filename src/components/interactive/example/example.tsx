import Image from "next/image"
interface exampleProps {
    src : string;
}
export default function Examples({src} :exampleProps){
    return (
        <div className="flex mt-4 space-x-2 justify-center items-center">
        <Image
          src={
            src
        } 
          width={800}
          height={400}
          alt={"Examples1"}
          className="border"
        />
      </div>
    )
}