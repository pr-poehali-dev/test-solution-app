import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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

interface Test {
  id: string;
  title: string;
  description: string;
  questions: number;
  duration: number;
  category: string;
  isActive: boolean;
  createdAt: string;
}

interface AdminPanelProps {
  onCreateTest: () => void;
  onEditTest: (test: Test) => void;
  onBack: () => void;
}

const AdminPanel = ({ onCreateTest, onEditTest, onBack }: AdminPanelProps) => {
  const [tests, setTests] = useState<Test[]>([
    {
      id: "1",
      title: "Математика 9 класс",
      description: "Алгебра и геометрия: основные понятия и формулы",
      questions: 15,
      duration: 30,
      category: "Математика",
      isActive: true,
      createdAt: "2025-01-01",
    },
    {
      id: "2",
      title: "История России",
      description: "От древней Руси до современности",
      questions: 20,
      duration: 45,
      category: "История",
      isActive: true,
      createdAt: "2025-01-02",
    },
    {
      id: "3",
      title: "Английский язык",
      description: "Грамматика и лексика уровня B1",
      questions: 25,
      duration: 40,
      category: "Языки",
      isActive: false,
      createdAt: "2025-01-03",
    },
  ]);

  const handleDeleteTest = (testId: string) => {
    setTests(tests.filter((test) => test.id !== testId));
  };

  const handleToggleActive = (testId: string) => {
    setTests(
      tests.map((test) =>
        test.id === testId ? { ...test, isActive: !test.isActive } : test,
      ),
    );
  };

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
                Панель администратора
              </h1>
              <p className="text-gray-600">Управление тестами и вопросами</p>
            </div>
          </div>
          <Button
            onClick={onCreateTest}
            className="bg-purple-500 hover:bg-purple-600 text-white"
          >
            <Icon name="Plus" size={20} className="mr-2" />
            Создать тест
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto p-4">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Всего тестов</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {tests.length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Icon name="FileText" size={24} className="text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Активных тестов</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {tests.filter((t) => t.isActive).length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Icon
                    name="CheckCircle"
                    size={24}
                    className="text-green-600"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Всего вопросов</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {tests.reduce((sum, test) => sum + test.questions, 0)}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Icon name="HelpCircle" size={24} className="text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tests List */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Список тестов
          </h2>

          {tests.map((test) => (
            <Card
              key={test.id}
              className="border-gray-200 hover:shadow-md transition-all"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-medium text-gray-900">
                        {test.title}
                      </h3>
                      <Badge
                        variant={test.isActive ? "default" : "secondary"}
                        className={
                          test.isActive
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-600"
                        }
                      >
                        {test.isActive ? "Активен" : "Неактивен"}
                      </Badge>
                      <Badge
                        variant="outline"
                        className="border-purple-200 text-purple-700"
                      >
                        {test.category}
                      </Badge>
                    </div>
                    <p className="text-gray-600 mb-3">{test.description}</p>
                    <div className="flex items-center space-x-6 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Icon name="FileText" size={16} className="mr-1" />
                        {test.questions} вопросов
                      </div>
                      <div className="flex items-center">
                        <Icon name="Clock" size={16} className="mr-1" />
                        {test.duration} мин
                      </div>
                      <div className="flex items-center">
                        <Icon name="Calendar" size={16} className="mr-1" />
                        {new Date(test.createdAt).toLocaleDateString("ru-RU")}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleToggleActive(test.id)}
                      className="text-gray-600 hover:text-gray-900"
                    >
                      <Icon
                        name={test.isActive ? "EyeOff" : "Eye"}
                        size={16}
                        className="mr-2"
                      />
                      {test.isActive ? "Скрыть" : "Показать"}
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEditTest(test)}
                      className="text-purple-600 hover:text-purple-700 hover:bg-purple-50"
                    >
                      <Icon name="Edit" size={16} className="mr-2" />
                      Редактировать
                    </Button>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Icon name="Trash2" size={16} className="mr-2" />
                          Удалить
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Удалить тест?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Вы уверены, что хотите удалить тест "{test.title}"?
                            Это действие нельзя отменить.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Отмена</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDeleteTest(test.id)}
                            className="bg-red-500 hover:bg-red-600"
                          >
                            Удалить
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
