import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import Icon from "@/components/ui/icon";

interface Question {
  id: string;
  text: string;
  type: "single" | "multiple" | "input";
  options?: string[];
  correctAnswer?: string | string[];
  points: number;
  image?: string;
}

interface Test {
  id: string;
  title: string;
  questions: Question[];
}

interface TestInterfaceProps {
  test: Test;
  onComplete: (answers: Record<string, string | string[]>) => void;
  onBack: () => void;
}

const TestInterface = ({ test, onComplete, onBack }: TestInterfaceProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [totalTime, setTotalTime] = useState(0);
  const [questionTime, setQuestionTime] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState("");

  const currentQuestion = test.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === test.questions.length - 1;
  const progress = ((currentQuestionIndex + 1) / test.questions.length) * 100;

  // Таймеры
  useEffect(() => {
    const interval = setInterval(() => {
      setTotalTime((prev) => prev + 1);
      setQuestionTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Сброс времени вопроса при переходе
  useEffect(() => {
    setQuestionTime(0);

    // Загрузка сохраненных ответов
    const savedAnswer = answers[currentQuestion.id];
    if (savedAnswer) {
      if (currentQuestion.type === "input") {
        setInputValue(savedAnswer as string);
      } else if (currentQuestion.type === "multiple") {
        setSelectedOptions(savedAnswer as string[]);
      } else {
        setSelectedOption(savedAnswer as string);
      }
    } else {
      setInputValue("");
      setSelectedOptions([]);
      setSelectedOption("");
    }
  }, [currentQuestionIndex, currentQuestion.id, answers]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleNext = () => {
    // Сохранение ответа
    let answer: string | string[];
    if (currentQuestion.type === "input") {
      answer = inputValue;
    } else if (currentQuestion.type === "multiple") {
      answer = selectedOptions;
    } else {
      answer = selectedOption;
    }

    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: answer,
    }));

    if (isLastQuestion) {
      onComplete({
        ...answers,
        [currentQuestion.id]: answer,
      });
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handleMultipleChoice = (option: string, checked: boolean) => {
    if (checked) {
      setSelectedOptions((prev) => [...prev, option]);
    } else {
      setSelectedOptions((prev) => prev.filter((opt) => opt !== option));
    }
  };

  const canProceed = () => {
    if (currentQuestion.type === "input") {
      return inputValue.trim() !== "";
    } else if (currentQuestion.type === "multiple") {
      return selectedOptions.length > 0;
    } else {
      return selectedOption !== "";
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={onBack}
            className="p-2 hover:bg-gray-100"
          >
            <Icon name="ArrowLeft" size={20} />
          </Button>
          <div className="text-center">
            <h1 className="text-lg font-semibold text-gray-900">
              {test.title}
            </h1>
            <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
              <span>
                Вопрос {currentQuestionIndex + 1} из {test.questions.length}
              </span>
              <span>•</span>
              <span>Общее время: {formatTime(totalTime)}</span>
            </div>
          </div>
          <div className="w-10" />
        </div>
        <div className="max-w-4xl mx-auto mt-4">
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto p-4">
        {/* Question */}
        <Card className="mb-8 border-gray-200">
          <CardHeader>
            <CardTitle className="text-xl text-gray-900">
              {currentQuestion.text}
            </CardTitle>
            {currentQuestion.image && (
              <div className="mt-4">
                <img
                  src={currentQuestion.image}
                  alt="Вопрос"
                  className="max-w-full h-auto rounded-lg"
                />
              </div>
            )}
          </CardHeader>
        </Card>

        {/* Answer Options */}
        <div className="mb-8">
          {currentQuestion.type === "input" && (
            <div className="space-y-4">
              <Textarea
                placeholder="Введите ваш ответ..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="min-h-[120px] border-gray-200 focus:border-purple-500"
              />
            </div>
          )}

          {currentQuestion.type === "single" && currentQuestion.options && (
            <RadioGroup
              value={selectedOption}
              onValueChange={setSelectedOption}
            >
              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
                  >
                    <RadioGroupItem value={option} id={`option-${index}`} />
                    <Label
                      htmlFor={`option-${index}`}
                      className="flex-1 cursor-pointer"
                    >
                      {option}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          )}

          {currentQuestion.type === "multiple" && currentQuestion.options && (
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  <Checkbox
                    id={`option-${index}`}
                    checked={selectedOptions.includes(option)}
                    onCheckedChange={(checked) =>
                      handleMultipleChoice(option, checked as boolean)
                    }
                  />
                  <Label
                    htmlFor={`option-${index}`}
                    className="flex-1 cursor-pointer"
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">
            Время на вопрос: {formatTime(questionTime)}
          </div>
          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            className="bg-purple-500 hover:bg-purple-600 text-white px-8"
          >
            {isLastQuestion ? "Завершить тест" : "Далее"}
            <Icon name="ArrowRight" size={16} className="ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TestInterface;
