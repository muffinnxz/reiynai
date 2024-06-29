import React from "react";
import { Button } from "@/components/ui/button";
import { Course } from "@/interfaces/course";
import { useRouter } from "@/lib/router-events";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

const CourseCard = ({ course }: { course: Course }) => {
  const router = useRouter();

  return (
    <div className="bg-white border border-gray-200 rounded drop-shadow p-5 flex flex-col">
      <div className="flex-grow">
        <div className="relative h-36 bg-gray-200 flex items-center justify-center mb-5 text-xl rounded-md">
          <Image
            src={course.thumbnail}
            alt={course.name}
            fill
            className="h-full w-auto rounded-md"
            style={{ objectFit: "cover" }}
          />
        </div>
        <h3 className="mb-2 text-lg font-semibold">{course.name}</h3>
        <p className="mb-2 text-gray-600">{course.description}</p>
        {course.catergories.map((category, index) => (
          <Badge key={index} className="mb-2" variant="outline">
            {category}
          </Badge>
        ))}
      </div>
      <Button
        className="mt-2 px-4 py-2 bg-black text-white rounded w-28"
        onClick={() => {
          router.push(`/courses/${course.id}`);
        }}
      >
        เริ่มเรียน
      </Button>
    </div>
  );
};

export default CourseCard;
