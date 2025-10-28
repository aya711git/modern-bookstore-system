import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Alert, AlertDescription } from "./ui/alert";
import { Lock, AlertCircle } from "lucide-react";
import { Language, getTranslation } from "../utils/translations";

interface AdminLoginProps {
  language: Language;
  onLogin: (username: string, password: string) => boolean;
}

export function AdminLogin({ language, onLogin }: AdminLoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const t = (key: Parameters<typeof getTranslation>[1]) => getTranslation(language, key);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = onLogin(username, password);
    if (!success) {
      setError(true);
      setPassword("");
    } else {
      setError(false);
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Lock className="w-8 h-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-center">{t('loginToAdmin')}</CardTitle>
          <CardDescription className="text-center">
            {t('enterCredentials')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{t('invalidCredentials')}</AlertDescription>
              </Alert>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="username">{t('username')}</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder={t('username')}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">{t('password')}</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder={t('password')}
              />
            </div>
            
            <Button type="submit" className="w-full">
              {t('login')}
            </Button>
            
            <div className="mt-4 p-3 bg-muted rounded-lg text-sm text-muted-foreground">
              <p className="text-center">
                {language === 'en' ? 'Demo credentials:' : 'بيانات تجريبية:'}
              </p>
              <p className="text-center">
                {language === 'en' ? 'Username: admin | Password: admin123' : 'المستخدم: admin | كلمة المرور: admin123'}
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
