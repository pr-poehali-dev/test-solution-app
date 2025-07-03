import { useState } from "react";
import AuthScreen from "@/components/AuthScreen";
import TestSelection from "@/components/TestSelection";
import TestInterface from "@/components/TestInterface";
import AdminLogin from "@/components/AdminLogin";
import AdminPanel from "@/components/AdminPanel";
import TestEditor from "@/components/TestEditor";

type AppState =
  | "auth"
  | "test-selection"
  | "test-taking"
  | "admin-login"
  | "admin-panel"
  | "test-editor";

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
  const [editingTest, setEditingTest] = useState<any | null>(null);

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
      setCurrentState("admin-login");
    }
  };

  const handleAdminLogin = () => {
    setCurrentState("admin-panel");
  };

  const handleCreateTest = () => {
    setEditingTest(null);
    setCurrentState("test-editor");
  };

  const handleEditTest = (test: any) => {
    setEditingTest(test);
    setCurrentState("test-editor");
  };

  const handleSaveTest = (testData: any) => {
    console.log("Сохранение теста:", testData);
    alert("Тест сохранен!");
    setCurrentState("admin-panel");
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
    } else if (currentState === "admin-login") {
      setCurrentState("auth");
    } else if (currentState === "admin-panel") {
      setCurrentState("auth");
    } else if (currentState === "test-editor") {
      setCurrentState("admin-panel");
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

      {currentState === "admin-login" && (
        <AdminLogin onLogin={handleAdminLogin} onBack={handleBack} />
      )}

      {currentState === "admin-panel" && (
        <AdminPanel
          onCreateTest={handleCreateTest}
          onEditTest={handleEditTest}
          onBack={handleBack}
        />
      )}

      {currentState === "test-editor" && (
        <TestEditor
          test={editingTest}
          onSave={handleSaveTest}
          onBack={handleBack}
        />
      )}
    </div>
  );
};

export default Index;
