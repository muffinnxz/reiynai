"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import useUser from "@/hooks/use-user";
import axios from "@/lib/axios";
import { useRouter } from "@/lib/router-events";
import Image from "next/image";
import Link from "next/link";
import { DISCORD_INVITE_LINK } from "@/constants/link";

const OTHER_OPTION = "อื่นๆ (โปรดระบุ)";

const questions: Array<{
  question: string;
  options: string[];
  multiple?: boolean;
}> = [
  {
    question: "คุณมีประสบการณ์ด้าน AI และ Machine Learning ในระดับใด",
    options: ["ระดับเริ่มต้น (ไม่มีประสบการณ์มาก่อน)", "ระดับกลาง (มีประสบการณ์บ้าง)", "ระดับสูง (มีประสบการณ์มาก)"]
  },
  {
    question: "ทำไมคุณถึงสนใจในเทคโนโลยี AI?",
    options: ["พัฒนาทักษะส่วนตัว", "ความสามารถในการแก้ปัญหา", "ความสามารถในการพัฒนา", OTHER_OPTION],
    multiple: true
  },
  {
    question: "จุดประสงค์หลักของคุณในการใช้ AI คืออะไร?",
    options: ["การเรียนรู้ และการศึกษา", "การเพิ่มประสิทธิภาพทางธุรกิจ", "การวิจัยและ การพัฒนา", OTHER_OPTION],
    multiple: true
  }
];

export default function Onboarding() {
  const { userData } = useUser();
  const router = useRouter();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Array<string[]>>(Array(questions.length).fill([]));
  const [additionalAnswer, setAdditionalAnswer] = useState<string>("");
  const [additionalAnswers, setAdditionalAnswers] = useState<Array<string>>(Array(questions.length).fill(""));
  const [isFinished, setIsFinished] = useState(false);

  const handleOptionSelect = (option: string) => {
    if (!answers[currentQuestionIndex].includes(OTHER_OPTION)) {
      setAdditionalAnswers((prev) => {
        let newAdditionalAnswers = [...prev];
        newAdditionalAnswers[currentQuestionIndex] = "";
        setAdditionalAnswer("");
        return newAdditionalAnswers;
      });
    }
    setAnswers((prev) => {
      let newAnswers = [...prev];
      let currentAnswers = newAnswers[currentQuestionIndex];

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
        let newAdditionalAnswers = [...prev];
        newAdditionalAnswers[currentQuestionIndex] = additionalAnswer.trim();
        return newAdditionalAnswers;
      });
    }
    setAdditionalAnswer(additionalAnswers[currentQuestionIndex + 1] ?? "");
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsFinished(true);
      let newAnswers = [];
      for (let i = 0; i < answers.length; i++) {
        newAnswers[i] = answers[i];
        for (let j = 0; j < answers[i].length; j++) {
          if (answers[i][j] === OTHER_OPTION) {
            newAnswers[i][j] = additionalAnswers[i];
          }
        }
      }

      axios
        .post("/user/onboarding", {
          answers: answers
        })
        .then(() => {
          setIsFinished(true);
        });
    }
  };

  const handleBack = () => {
    if (questions[currentQuestionIndex].options.includes(OTHER_OPTION)) {
      setAdditionalAnswers((prev) => {
        let newAdditionalAnswers = [...prev];
        newAdditionalAnswers[currentQuestionIndex] = additionalAnswer.trim();
        return newAdditionalAnswers;
      });
    }
    setAdditionalAnswer(additionalAnswers[currentQuestionIndex - 1] ?? "");
    setCurrentQuestionIndex(currentQuestionIndex - 1);
  };

  useEffect(() => {
    if (!userData) {
      router.push("/");
    }
  }, [userData]);

  return (
    <div>
      {isFinished ? (
        <div className="flex flex-col justify-between min-h-screen">
          <div className="flex-grow flex items-center justify-center">
            <div className="text-center space-y-4">
              <h2 className="text-xl font-semibold">ยินดีด้วย!</h2>
              <p>คุณพร้อมที่จะใช้งานแล้ว ทดลองใช้ฟรีเลย!</p>
              <Button
                variant="default"
                onClick={() => {
                  router.push("/explore");
                }}
              >
                เริ่มใช้งาน
              </Button>
            </div>
          </div>
          <div className="text-center pb-8">
            <Button variant="secondary" className="inline-flex items-center justify-center">
              <Image className={"mr-2"} src="/icons/discord.svg" alt="Discord Logo" width={24} height={24} />
              <Link href={DISCORD_INVITE_LINK} target="_blank" rel="noopener noreferrer">
                เข้าร่วมดิสคอร์ด
              </Link>
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center min-h-screen bg-background">
          <div className="max-w-md w-full space-y-6">
            <h1 className="text-3xl font-bold text-center">Onboarding</h1>
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
                    อื่นๆ
                  </label>
                  <input
                    id="additional-info"
                    type="text"
                    value={additionalAnswer}
                    onChange={(e) => {
                      setAdditionalAnswer(e.target.value);
                    }}
                    className="block w-full rounded-lg border border-input bg-background px-4 py-3 text-sm shadow-sm transition-colors focus:outline-none focus:ring-1 focus:ring-ring"
                    placeholder="โปรดระบุ"
                  />
                </div>
              )}
            </div>
            <div className="flex justify-between mt-4 w-full">
              {currentQuestionIndex > 0 ? (
                <Button variant="outline" onClick={handleBack}>
                  กลับ
                </Button>
              ) : (
                <div></div>
              )}
              <Button
                variant="default"
                disabled={
                  answers[currentQuestionIndex].length == 0 ||
                  (answers[currentQuestionIndex].includes(OTHER_OPTION) && additionalAnswer.trim() == "")
                }
                onClick={handleNext}
              >
                {currentQuestionIndex < questions.length - 1 ? "ถัดไป" : "เสร็จสิ้น"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
