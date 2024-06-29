import React from "react";
import { Button } from "@/components/ui/button";
import { Course } from "@/interfaces/course";
import { useRouter } from "@/lib/router-events";

const CourseCard = ({ course }: { course: Course }) => {
  const router = useRouter();

  return (
    <div className="bg-white border border-gray-200 rounded drop-shadow p-5 flex flex-col">
      <div className="flex-grow">
        <div className="h-36 bg-gray-200 flex items-center justify-center mb-5 text-xl">
          <img src={course.thumbnail} className="h-full w-auto" />
        </div>
        <h3 className="mb-2 text-lg font-semibold">{course.name}</h3>
        <p className="mb-4 text-gray-600">{course.description}</p>
      </div>
      <Button
        className="px-4 py-2 bg-black text-white rounded w-28"
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
