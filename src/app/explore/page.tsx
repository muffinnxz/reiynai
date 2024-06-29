"use client";
import React, { useState } from "react";
import CourseCard from "@/components/course-card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CourseCategory } from "@/interfaces/course";
import { courses } from "@/constants/courses";
import Navbar from "@/components/NavBar";

const DEFAULT_CATEGORY = "All Categories";

const ExplorePage = () => {
  const [searchInput, setSearchInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(DEFAULT_CATEGORY);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto p-6">
        <header className="mb-10">
          <h1 className="text-4xl text-center font-bold mb-6">คอร์สเรียนของเรา</h1>
          <div className="flex flex-col sm:flex-row w-full mb-4">
            <Input
              type="text"
              placeholder="ค้นหาคอร์สเรียน..."
              className="px-4 py-2 border border-gray-300 rounded mb-2 sm:mb-0 sm:mr-2 flex-grow"
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <Select onValueChange={(e) => setSelectedCategory(e)} defaultValue={DEFAULT_CATEGORY}>
              <SelectTrigger className="px-4 py-2 border border-gray-300 rounded flex-grow sm:flex-grow-0 sm:w-auto min-w-[200px]">
                <SelectValue placeholder={DEFAULT_CATEGORY} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem key={0} value={DEFAULT_CATEGORY}>
                  {DEFAULT_CATEGORY}
                </SelectItem>
                {Object.values(CourseCategory)
                  .filter((item) => {
                    return isNaN(Number(item));
                  })
                  .map((category, index) => (
                    <SelectItem key={index} value={category}>
                      {category}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
        </header>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.values(courses)
            .filter(
              (course) =>
                searchInput == "" ||
                course.name.toLowerCase().includes(searchInput.toLowerCase()) ||
                course.description.toLowerCase().includes(searchInput.toLowerCase())
            )
            .filter(
              (course) =>
                selectedCategory == DEFAULT_CATEGORY || course.catergories.includes(selectedCategory as CourseCategory)
            )
            .map((course, index) => (
              <CourseCard key={index} course={course} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;
