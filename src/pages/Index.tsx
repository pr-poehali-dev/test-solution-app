import { useState } from "react";
import AuthScreen from "@/components/AuthScreen";
import TestSelection from "@/components/TestSelection";
import TestInterface from "@/components/TestInterface";

type AppState = "auth" | "test-selection" | "test-taking" | "admin";

interface Test {
  id: string;
  title: string;
  description: string;
  questions: Array<{
    id: string;
    text: string;
    type: "single" | "multiple" | "input";
    options?: string[];
    correctAnswer?: string | string[];
    points: number;
    image?: string;
  }>;
}

const Index = () => {
  const [currentState, setCurrentState] = useState<AppState>("auth");
  const [selectedTest, setSelectedTest] = useState<Test | null>(null);

  // Демо тест с вопросами
  const demoTest: Test = {
    id: "1",
    title: "Математика 9 класс",
    description: "Алгебра и геометрия: основные понятия и формулы",
    questions: [
      {
        id: "1",
        text: "Чему равен квадрат суммы двух чисел (a + b)²?",
        type: "single",
        options: ["a² + b²", "a² + 2ab + b²", "a² - 2ab + b²", "2a + 2b"],
        correctAnswer: "a² + 2ab + b²",
        points: 5,
      },
      {
        id: "2",
        text: "Выберите все правильные утверждения о треугольнике:",
        type: "multiple",
        options: [
          "Сумма углов треугольника равна 180°",
          "В прямоугольном треугольнике один угол равен 90°",
          "Все стороны равнобедренного треугольника равны",
          "Медиана делит треугольник на два равных треугольника",
        ],
        correctAnswer: [
          "Сумма углов треугольника равна 180°",
          "В прямоугольном треугольнике один угол равен 90°",
        ],
        points: 10,
      },
      {
        id: "3",
        text: "Решите уравнение: 2x + 5 = 13. Запишите значение x.",
        type: "input",
        correctAnswer: "4",
        points: 8,
      },
    ],
  };

  const handleRoleSelect = (role: "guest" | "admin") => {
    if (role === "guest") {
      setCurrentState("test-selection");
    } else {
      setCurrentState("admin");
    }
  };

  const handleTestSelect = (test: any) => {
    setSelectedTest(demoTest); // Используем демо тест
    setCurrentState("test-taking");
  };

  const handleTestComplete = (answers: Record<string, string | string[]>) => {
    console.log("Ответы:", answers);
    alert("Тест завершен! Результаты будут показаны здесь.");
    setCurrentState("auth");
  };

  const handleBack = () => {
    if (currentState === "test-selection") {
      setCurrentState("auth");
    } else if (currentState === "test-taking") {
      setCurrentState("test-selection");
    } else if (currentState === "admin") {
      setCurrentState("auth");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {currentState === "auth" && (
        <AuthScreen onSelectRole={handleRoleSelect} />
      )}

      {currentState === "test-selection" && (
        <TestSelection onSelectTest={handleTestSelect} onBack={handleBack} />
      )}

      {currentState === "test-taking" && selectedTest && (
        <TestInterface
          test={selectedTest}
          onComplete={handleTestComplete}
          onBack={handleBack}
        />
      )}

      {currentState === "admin" && (
        <div className="min-h-screen flex items-center justify-center bg-white p-4">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-gray-900 mb-4">
              Панель администратора
            </h1>
            <p className="text-gray-600 mb-4">
              Здесь будет интерфейс управления тестами
            </p>
            <button
              onClick={handleBack}
              className="text-purple-500 hover:text-purple-600"
            >
              ← Назад
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
