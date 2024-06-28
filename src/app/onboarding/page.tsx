"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const OTHER_OPTION = "Other (please specify)";

const questions: Array<{
  question: string;
  options: string[];
  multiple?: boolean;
}> = [
  {
    question: "What is your level of experience with AI and machine learning?",
    options: ["Beginner (no prior experience)", "Intermediate (some experience)", "Advanced (extensive experience)"]
  },
  {
    question: "What is your primary goal for using AI?",
    options: [
      "Learning and Education",
      "Business Optimization",
      "Research and Development",
      "Creative Projects",
      OTHER_OPTION
    ],
    multiple: true
  },
  {
    question: "What programming languages are you familiar with?",
    options: ["Python", "JavaScript", "Java", "C++", OTHER_OPTION],
    multiple: true
  },
  {
    question: "What is your preferred development environment?",
    options: ["Jupyter Notebook", "Visual Studio Code", "PyCharm", OTHER_OPTION]
  }
];

export default function Onboarding() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Array<string[]>>(Array(questions.length).fill([]));
  const [additionalAnswer, setAdditionalAnswer] = useState<string>("");
  const [additionalAnswers, setAdditionalAnswers] = useState<Array<string>>(Array(questions.length).fill(""));
  const [isFinished, setIsFinished] = useState(false);

  const handleOptionSelect = (option: string) => {
    if (!answers[currentQuestionIndex].includes(OTHER_OPTION)) {
      setAdditionalAnswers((prev) => {
        const newAdditionalAnswers = [...prev];
        newAdditionalAnswers[currentQuestionIndex] = "";
        setAdditionalAnswer("");
        return newAdditionalAnswers;
      });
    }
    setAnswers((prev) => {
      const newAnswers = [...prev];
      const currentAnswers = newAnswers[currentQuestionIndex];

      if (questions[currentQuestionIndex].multiple) {
        if (currentAnswers.includes(option)) {
          newAnswers[currentQuestionIndex] = currentAnswers.filter((item) => item !== option);
        } else {
          newAnswers[currentQuestionIndex] = [...currentAnswers, option];
        }
      } else {
        newAnswers[currentQuestionIndex] = [option];
      }

      return newAnswers;
    });
  };

  const handleNext = () => {
    if (questions[currentQuestionIndex].options.includes(OTHER_OPTION)) {
      setAdditionalAnswers((prev) => {
        const newAdditionalAnswers = [...prev];
        newAdditionalAnswers[currentQuestionIndex] = additionalAnswer.trim();
        return newAdditionalAnswers;
      });
    }
    setAdditionalAnswer(additionalAnswers[currentQuestionIndex + 1] ?? "");
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsFinished(true);
      console.log("Onboarding complete:", answers, additionalAnswers);
      // Handle completion (e.g., send data to server or move to the next step)
    }
  };

  const handleBack = () => {
    if (questions[currentQuestionIndex].options.includes(OTHER_OPTION)) {
      setAdditionalAnswers((prev) => {
        const newAdditionalAnswers = [...prev];
        newAdditionalAnswers[currentQuestionIndex] = additionalAnswer.trim();
        return newAdditionalAnswers;
      });
    }
    setAdditionalAnswer(additionalAnswers[currentQuestionIndex - 1] ?? "");
    setCurrentQuestionIndex(currentQuestionIndex - 1);
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-background">
      <div className="max-w-md w-full space-y-6">
        <h1 className="text-3xl font-bold text-center">Onboarding</h1>
        {isFinished ? (
          <div className="text-center space-y-4">
            <h2 className="text-xl font-semibold">Congratulations!</h2>
            <p>You have completed the onboarding process. You got a free trial!</p>
            <Button variant="default" className="mt-4">
              Start Exploring
            </Button>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-semibold">{questions[currentQuestionIndex].question}</h2>
                <div className="grid grid-cols-1 gap-4 mt-4">
                  {questions[currentQuestionIndex].options.map((option) => (
                    <Button
                      key={option}
                      variant={answers[currentQuestionIndex].includes(option) ? "default" : "outline"}
                      className="rounded-lg border px-6 py-4 transition-colors"
                      onClick={() => handleOptionSelect(option)}
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              </div>
              {answers[currentQuestionIndex].includes(OTHER_OPTION) && (
                <div>
                  <label htmlFor="additional-info" className="block mb-2 text-muted-foreground">
                    Other Information
                  </label>
                  <input
                    id="additional-info"
                    type="text"
                    value={additionalAnswer}
                    onChange={(e) => {
                      setAdditionalAnswer(e.target.value);
                    }}
                    className="block w-full rounded-lg border border-input bg-background px-4 py-3 text-sm shadow-sm transition-colors focus:outline-none focus:ring-1 focus:ring-ring"
                    placeholder="Enter other information"
                  />
                </div>
              )}
            </div>
            <div className="flex justify-between mt-4">
              {currentQuestionIndex > 0 && (
                <Button variant="outline" onClick={handleBack}>
                  Back
                </Button>
              )}
              {(answers[currentQuestionIndex].length > 0 && !answers[currentQuestionIndex].includes(OTHER_OPTION)) ||
              (answers[currentQuestionIndex].includes(OTHER_OPTION) && additionalAnswer.trim() != "") ? (
                <Button variant="default" onClick={handleNext}>
                  {currentQuestionIndex < questions.length - 1 ? "Next" : "Finish"}
                </Button>
              ) : (
                <Button variant="destructive">{currentQuestionIndex < questions.length - 1 ? "Next" : "Finish"}</Button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
