"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Course, QuizType } from "@/interfaces/course";

const Quiz = ({ course }: { course: Course }) => {
  const [answers, setAnswers] = useState<{ [key: number]: string | string[] }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [results, setResults] = useState<{ [key: number]: boolean }>({});
  const [interactionStates, setInteractionStates] = useState<{ [key: number]: boolean }>({});

  const handleCheckboxChange = (quizIndex: number, option: string) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [quizIndex]: option
    }));
    setInteractionStates((prevStates) => ({
      ...prevStates,
      [quizIndex]: true
    }));
  };

  const handleInputChange = (quizIndex: number, value: string) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [quizIndex]: value
    }));
    setInteractionStates((prevStates) => ({
      ...prevStates,
      [quizIndex]: true
    }));
  };

  const allQuestionsAnswered = () => {
    return course.quizes?.every(
      (quiz, quizIndex) => answers[quizIndex] !== undefined && answers[quizIndex].toString().trim() !== ""
    );
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const newResults: { [key: number]: boolean } = {};

    if (course.quizes) {
      course.quizes.forEach((quiz, quizIndex) => {
        if (quiz.type === QuizType.MULTIPLE_CHOICE) {
          newResults[quizIndex] = answers[quizIndex] === quiz.correctAnswer;
        } else if (quiz.type === QuizType.TEXT) {
          newResults[quizIndex] =
            answers[quizIndex]?.toString().trim().toLowerCase() === quiz.correctAnswer?.toString().trim().toLowerCase();
        }
      });
    }

    setResults(newResults);
    setIsSubmitted(true);
    setInteractionStates({});
    console.log("Submitted Answers:", answers);
    console.log("Results:", newResults);
  };

  return (
    <div className="container mx-auto max-w-3xl py-12 px-4 md:px-6">
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">บททดสอบความรู้ประจำคอร์ส</h1>
        </div>
        <form className="space-y-8" onSubmit={handleSubmit}>
          <div className="grid gap-6">
            {course.quizes?.map((quiz, quizIndex) => (
              <div key={quizIndex}>
                <h2 className="text-xl font-semibold">{quiz.question}</h2>
                <div className="mt-4 space-y-2">
                  {quiz.type === QuizType.MULTIPLE_CHOICE ? (
                    quiz.options?.map((option, optionIndex) => (
                      <div key={optionIndex} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name={`q${quizIndex}`}
                          value={option}
                          onChange={() => handleCheckboxChange(quizIndex, option)}
                          checked={answers[quizIndex] === option}
                          className={`form-radio`}
                        />
                        <span
                          className={`${
                            interactionStates[quizIndex]
                              ? "text-gray-700"
                              : isSubmitted && option === quiz.correctAnswer && results[quizIndex]
                                ? "text-green-500"
                                : isSubmitted && answers[quizIndex] === option
                                  ? "text-red-500"
                                  : "text-gray-700"
                          }`}
                        >
                          {option}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="mt-4">
                      <Input
                        className={`w-full p-2 border ${
                          interactionStates[quizIndex]
                            ? "border-gray-300"
                            : isSubmitted && !results[quizIndex]
                              ? "border-red-500"
                              : "border-gray-300"
                        } rounded`}
                        placeholder="คำตอบ..."
                        value={(answers[quizIndex] as string) || ""}
                        onChange={(e) => handleInputChange(quizIndex, e.target.value)}
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-end">
            <Button type="submit" disabled={!allQuestionsAnswered()}>
              เสร็จสิ้น
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Quiz;
