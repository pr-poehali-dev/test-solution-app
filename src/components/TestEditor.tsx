import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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

interface GradingCriteria {
  minPoints: number;
  maxPoints: number;
  grade: string;
  description: string;
}

interface TestData {
  id?: string;
  title: string;
  description: string;
  category: string;
  duration: number;
  questions: Question[];
  gradingCriteria: GradingCriteria[];
  isActive: boolean;
}

interface TestEditorProps {
  test?: TestData;
  onSave: (test: TestData) => void;
  onBack: () => void;
}

const TestEditor = ({ test, onSave, onBack }: TestEditorProps) => {
  const [testData, setTestData] = useState<TestData>(
    test || {
      title: "",
      description: "",
      category: "",
      duration: 30,
      questions: [],
      gradingCriteria: [
        { minPoints: 85, maxPoints: 100, grade: "5", description: "Отлично" },
        { minPoints: 70, maxPoints: 84, grade: "4", description: "Хорошо" },
        {
          minPoints: 50,
          maxPoints: 69,
          grade: "3",
          description: "Удовлетворительно",
        },
        {
          minPoints: 0,
          maxPoints: 49,
          grade: "2",
          description: "Неудовлетворительно",
        },
      ],
      isActive: true,
    },
  );

  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [newQuestion, setNewQuestion] = useState<Partial<Question>>({
    text: "",
    type: "single",
    options: [""],
    points: 1,
  });

  const handleAddQuestion = () => {
    if (!newQuestion.text || !newQuestion.type) return;

    const question: Question = {
      id: Date.now().toString(),
      text: newQuestion.text,
      type: newQuestion.type,
      points: newQuestion.points || 1,
      ...(newQuestion.type !== "input" && {
        options: newQuestion.options?.filter((opt) => opt.trim()) || [],
      }),
    };

    setTestData((prev) => ({
      ...prev,
      questions: [...prev.questions, question],
    }));

    setNewQuestion({
      text: "",
      type: "single",
      options: [""],
      points: 1,
    });
  };

  const handleDeleteQuestion = (questionId: string) => {
    setTestData((prev) => ({
      ...prev,
      questions: prev.questions.filter((q) => q.id !== questionId),
    }));
  };

  const handleSaveTest = () => {
    if (
      !testData.title ||
      !testData.category ||
      testData.questions.length === 0
    ) {
      alert("Заполните все обязательные поля и добавьте хотя бы один вопрос");
      return;
    }

    onSave(testData);
  };

  const addOption = () => {
    setNewQuestion((prev) => ({
      ...prev,
      options: [...(prev.options || []), ""],
    }));
  };

  const updateOption = (index: number, value: string) => {
    setNewQuestion((prev) => ({
      ...prev,
      options: prev.options?.map((opt, i) => (i === index ? value : opt)) || [],
    }));
  };

  const removeOption = (index: number) => {
    setNewQuestion((prev) => ({
      ...prev,
      options: prev.options?.filter((_, i) => i !== index) || [],
    }));
  };

  const totalPoints = testData.questions.reduce((sum, q) => sum + q.points, 0);
  const isEditing = !!test?.id;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={onBack}
              className="p-2 hover:bg-gray-100"
            >
              <Icon name="ArrowLeft" size={20} />
            </Button>
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                {isEditing ? "Редактирование теста" : "Создание теста"}
              </h1>
              <p className="text-gray-600">
                {isEditing
                  ? "Измените параметры теста и вопросы"
                  : "Создайте новый тест для учащихся"}
              </p>
            </div>
          </div>
          <Button
            onClick={handleSaveTest}
            className="bg-purple-500 hover:bg-purple-600 text-white"
          >
            <Icon name="Save" size={20} className="mr-2" />
            Сохранить тест
          </Button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4 space-y-6">
        {/* Test Info */}
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="text-lg">Информация о тесте</CardTitle>
            <CardDescription>Основные параметры тестирования</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Название теста *</Label>
                <Input
                  id="title"
                  value={testData.title}
                  onChange={(e) =>
                    setTestData((prev) => ({ ...prev, title: e.target.value }))
                  }
                  placeholder="Введите название теста"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="category">Категория *</Label>
                <Input
                  id="category"
                  value={testData.category}
                  onChange={(e) =>
                    setTestData((prev) => ({
                      ...prev,
                      category: e.target.value,
                    }))
                  }
                  placeholder="Математика, История, etc."
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description">Описание</Label>
              <Textarea
                id="description"
                value={testData.description}
                onChange={(e) =>
                  setTestData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="Краткое описание теста"
                className="mt-1"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="duration">Длительность (минуты)</Label>
                <Input
                  id="duration"
                  type="number"
                  value={testData.duration}
                  onChange={(e) =>
                    setTestData((prev) => ({
                      ...prev,
                      duration: Number(e.target.value),
                    }))
                  }
                  min="1"
                  className="mt-1"
                />
              </div>
              <div className="flex items-center space-x-4 pt-6">
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="text-gray-600">
                    {testData.questions.length} вопросов
                  </Badge>
                  <Badge variant="outline" className="text-gray-600">
                    {totalPoints} баллов
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Questions */}
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="text-lg">Вопросы теста</CardTitle>
            <CardDescription>Создайте вопросы для тестирования</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Existing Questions */}
            {testData.questions.length > 0 && (
              <div className="space-y-4 mb-6">
                {testData.questions.map((question, index) => (
                  <div
                    key={question.id}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge variant="outline" className="text-xs">
                            Вопрос {index + 1}
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            {question.type === "single"
                              ? "Одиночный выбор"
                              : question.type === "multiple"
                                ? "Множественный выбор"
                                : "Ввод текста"}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {question.points} баллов
                          </Badge>
                        </div>
                        <p className="text-gray-900 mb-2">{question.text}</p>
                        {question.options && (
                          <div className="text-sm text-gray-600">
                            Варианты: {question.options.join(", ")}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setEditingQuestion(question)}
                          className="text-purple-600 hover:text-purple-700"
                        >
                          <Icon name="Edit" size={16} />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-600 hover:text-red-700"
                            >
                              <Icon name="Trash2" size={16} />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Удалить вопрос?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Это действие нельзя отменить.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Отмена</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() =>
                                  handleDeleteQuestion(question.id)
                                }
                                className="bg-red-500 hover:bg-red-600"
                              >
                                Удалить
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <Separator className="my-6" />

            {/* Add New Question */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Добавить новый вопрос</h3>

              <div>
                <Label htmlFor="questionText">Текст вопроса</Label>
                <Textarea
                  id="questionText"
                  value={newQuestion.text}
                  onChange={(e) =>
                    setNewQuestion((prev) => ({
                      ...prev,
                      text: e.target.value,
                    }))
                  }
                  placeholder="Введите текст вопроса"
                  className="mt-1"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="questionType">Тип вопроса</Label>
                  <Select
                    value={newQuestion.type}
                    onValueChange={(value: "single" | "multiple" | "input") =>
                      setNewQuestion((prev) => ({
                        ...prev,
                        type: value,
                        options: value === "input" ? undefined : [""],
                      }))
                    }
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single">Одиночный выбор</SelectItem>
                      <SelectItem value="multiple">
                        Множественный выбор
                      </SelectItem>
                      <SelectItem value="input">Ввод текста</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="questionPoints">Баллы за вопрос</Label>
                  <Input
                    id="questionPoints"
                    type="number"
                    value={newQuestion.points}
                    onChange={(e) =>
                      setNewQuestion((prev) => ({
                        ...prev,
                        points: Number(e.target.value),
                      }))
                    }
                    min="1"
                    className="mt-1"
                  />
                </div>
              </div>

              {newQuestion.type !== "input" && (
                <div>
                  <Label>Варианты ответов</Label>
                  <div className="space-y-2 mt-2">
                    {newQuestion.options?.map((option, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Input
                          value={option}
                          onChange={(e) => updateOption(index, e.target.value)}
                          placeholder={`Вариант ${index + 1}`}
                          className="flex-1"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeOption(index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Icon name="X" size={16} />
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={addOption}
                      className="text-purple-600 hover:text-purple-700"
                    >
                      <Icon name="Plus" size={16} className="mr-2" />
                      Добавить вариант
                    </Button>
                  </div>
                </div>
              )}

              <Button
                onClick={handleAddQuestion}
                disabled={!newQuestion.text || !newQuestion.type}
                className="bg-purple-500 hover:bg-purple-600 text-white"
              >
                <Icon name="Plus" size={20} className="mr-2" />
                Добавить вопрос
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Grading Criteria */}
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="text-lg">Критерии оценивания</CardTitle>
            <CardDescription>Настройте шкалу оценок для теста</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {testData.gradingCriteria.map((criteria, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 p-3 border border-gray-200 rounded-lg"
                >
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-lg font-bold">
                      {criteria.grade}
                    </Badge>
                    <span className="text-sm text-gray-600">
                      {criteria.description}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <span>
                      {criteria.minPoints}-{criteria.maxPoints}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TestEditor;
