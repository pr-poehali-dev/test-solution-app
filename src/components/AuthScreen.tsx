import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Icon from "@/components/ui/icon";

interface AuthScreenProps {
  onSelectRole: (role: "guest" | "admin") => void;
}

const AuthScreen = ({ onSelectRole }: AuthScreenProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <Card className="w-full max-w-md shadow-lg border-0 bg-white">
        <CardHeader className="text-center space-y-4 pb-6">
          <div className="w-16 h-16 mx-auto bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center">
            <Icon name="GraduationCap" size={32} className="text-white" />
          </div>
          <div>
            <CardTitle className="text-2xl font-semibold text-gray-900 mb-2">
              Добро пожаловать
            </CardTitle>
            <CardDescription className="text-gray-600">
              Выберите способ входа в систему тестирования
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-3">
          <Button
            onClick={() => onSelectRole("guest")}
            className="w-full h-12 bg-gray-100 hover:bg-gray-200 text-gray-900 border-0 font-medium transition-all"
            variant="outline"
          >
            <Icon name="User" size={20} className="mr-3" />
            Войти как гость
          </Button>

          <Button
            onClick={() => onSelectRole("admin")}
            className="w-full h-12 bg-purple-500 hover:bg-purple-600 text-white font-medium transition-all"
          >
            <Icon name="Settings" size={20} className="mr-3" />
            Войти как администратор
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthScreen;
