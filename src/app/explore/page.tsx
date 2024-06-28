"use client";
import React, { useState } from "react";
import CourseCard from "@/components/course-card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const DEFAULT_CATEGORY = "All Categories";

const categories = [
  DEFAULT_CATEGORY,
  "AI Fundamentals",
  "Machine Learning",
  "Natural Language Processing",
  "Computer Vision",
  "Deep Learning",
  "Data Science"
];
const courses = [
  {
    title: "Introduction to AI",
    description: "Learn the basics of artificial intelligence and its applications.",
    category: "AI Fundamentals"
  },
  {
    title: "Machine Learning Fundamentals",
    description: "Dive into the core concepts of machine learning algorithms.",
    category: "Machine Learning"
  },
  {
    title: "Natural Language Processing",
    description: "Explore how AI understands and generates human language.",
    category: "Natural Language Processing"
  },
  {
    title: "Computer Vision",
    description: "Understand how machines interpret visual data and images.",
    category: "Computer Vision"
  },
  {
    title: "Deep Learning",
    description: "Master deep learning techniques and neural networks.",
    category: "Deep Learning"
  },
  {
    title: "Data Science",
    description: "Explore data science methodologies and tools.",
    category: "Data Science"
  },
  {
    title: "AI Ethics",
    description: "Learn about the ethical implications of AI technologies.",
    category: "AI Fundamentals"
  },
  {
    title: "Reinforcement Learning",
    description: "Discover how machines learn through trial and error.",
    category: "Machine Learning"
  }
];

const ExplorePage = () => {
  const [searchInput, setSearchInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(DEFAULT_CATEGORY);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <header className="mb-10">
        <h1 className="text-4xl text-center font-bold mb-6">Explore Our Courses</h1>
        <div className="flex flex-col sm:flex-row w-full mb-4">
          <Input
            type="text"
            placeholder="Search for courses..."
            className="px-4 py-2 border border-gray-300 rounded mb-2 sm:mb-0 sm:mr-2 bg-gray-200 flex-grow"
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <Select onValueChange={(e) => setSelectedCategory(e)} defaultValue={DEFAULT_CATEGORY}>
            <SelectTrigger className="px-4 py-2 border border-gray-300 rounded bg-gray-200 flex-grow sm:flex-grow-0 sm:w-auto min-w-[200px]">
              <SelectValue placeholder={DEFAULT_CATEGORY} />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category, index) => (
                <SelectItem key={index} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses
          .filter(
            (course) =>
              searchInput == "" ||
              course.title.toLowerCase().includes(searchInput.toLowerCase()) ||
              course.description.toLowerCase().includes(searchInput.toLowerCase())
          )
          .filter((course) => selectedCategory == DEFAULT_CATEGORY || course.category == selectedCategory)
          .map((course, index) => (
            <CourseCard key={index} title={course.title} description={course.description} />
          ))}
      </div>
    </div>
  );
};

export default ExplorePage;
