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
import { Alert, AlertDescription } from "@/components/ui/alert";
import Icon from "@/components/ui/icon";

interface AdminLoginProps {
  onLogin: () => void;
  onBack: () => void;
}

const AdminLogin = ({ onLogin, onBack }: AdminLoginProps) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "12345") {
      onLogin();
    } else {
      setError("Неверный пароль");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <Card className="w-full max-w-md shadow-lg border-0 bg-white">
        <CardHeader className="text-center space-y-4 pb-6">
          <Button
            variant="ghost"
            onClick={onBack}
            className="absolute top-4 left-4 p-2 hover:bg-gray-100"
          >
            <Icon name="ArrowLeft" size={20} />
          </Button>

          <div className="w-16 h-16 mx-auto bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center">
            <Icon name="Shield" size={32} className="text-white" />
          </div>
          <div>
            <CardTitle className="text-2xl font-semibold text-gray-900 mb-2">
              Панель администратора
            </CardTitle>
            <CardDescription className="text-gray-600">
              Введите пароль для доступа к управлению тестами
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label
                htmlFor="password"
                className="text-sm font-medium text-gray-700 mb-2 block"
              >
                Пароль
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                placeholder="Введите пароль"
                className="h-12 border-gray-200 focus:border-purple-500"
                autoFocus
              />
            </div>

            {error && (
              <Alert variant="destructive" className="border-red-200 bg-red-50">
                <Icon name="AlertCircle" size={16} />
                <AlertDescription className="text-red-700">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            <Button
              type="submit"
              className="w-full h-12 bg-purple-500 hover:bg-purple-600 text-white font-medium transition-all"
            >
              Войти
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
