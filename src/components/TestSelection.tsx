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
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

interface Test {
  id: string;
  title: string;
  description: string;
  questions: number;
  duration: number;
  category: string;
  isActive: boolean;
}

interface TestSelectionProps {
  onSelectTest: (test: Test) => void;
  onBack: () => void;
}

const TestSelection = ({ onSelectTest, onBack }: TestSelectionProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Демо данные тестов
  const tests: Test[] = [
    {
      id: "1",
      title: "Математика 9 класс",
      description: "Алгебра и геометрия: основные понятия и формулы",
      questions: 15,
      duration: 30,
      category: "Математика",
      isActive: true,
    },
    {
      id: "2",
      title: "История России",
      description: "От древней Руси до современности",
      questions: 20,
      duration: 45,
      category: "История",
      isActive: true,
    },
    {
      id: "3",
      title: "Английский язык",
      description: "Грамматика и лексика уровня B1",
      questions: 25,
      duration: 40,
      category: "Языки",
      isActive: false,
    },
  ];

  const activeTests = tests.filter((test) => test.isActive);
  const filteredTests = activeTests.filter(
    (test) =>
      test.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      test.category.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            onClick={onBack}
            className="p-2 hover:bg-gray-100"
          >
            <Icon name="ArrowLeft" size={20} />
          </Button>
          <h1 className="text-2xl font-semibold text-gray-900">Выбор теста</h1>
          <div className="w-10" />
        </div>

        {/* Search */}
        <div className="relative mb-8">
          <Icon
            name="Search"
            size={20}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
          <Input
            placeholder="Поиск тестов..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12 border-gray-200 focus:border-purple-500"
          />
        </div>

        {/* Tests Grid */}
        {filteredTests.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredTests.map((test) => (
              <Card
                key={test.id}
                className="cursor-pointer hover:shadow-md transition-all border-gray-200 hover:border-purple-300"
                onClick={() => onSelectTest(test)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <Badge
                      variant="secondary"
                      className="bg-purple-100 text-purple-700 mb-2"
                    >
                      {test.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg text-gray-900">
                    {test.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    {test.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <Icon name="FileText" size={16} className="mr-1" />
                      {test.questions} вопросов
                    </div>
                    <div className="flex items-center">
                      <Icon name="Clock" size={16} className="mr-1" />
                      {test.duration} мин
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <Icon name="FileX" size={32} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchQuery ? "Тесты не найдены" : "Активных тестирований нет"}
            </h3>
            <p className="text-gray-600">
              {searchQuery
                ? "Попробуйте изменить поисковый запрос"
                : "Обратитесь к администратору для создания тестов"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestSelection;
