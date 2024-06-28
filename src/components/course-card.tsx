import React from "react";
import { Button } from "@/components/ui/button";

const CourseCard = ({ title, description }: { title: string; description: string }) => {
  return (
    <div className="bg-white border border-gray-200 rounded drop-shadow p-5 flex flex-col">
      <div className="flex-grow">
        <div className="h-36 bg-gray-200 flex items-center justify-center mb-5 text-xl">IMAGE</div>
        <h3 className="mb-2 text-lg font-semibold">{title}</h3>
        <p className="mb-4 text-gray-600">{description}</p>
      </div>
      <Button className="px-4 py-2 bg-black text-white rounded w-28">Course Page</Button>
    </div>
  );
};

export default CourseCard;
