import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslations } from "next-intl";

export default function LoginPage() {
  const t = useTranslations("Auth");

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <Card className="w-full max-w-sm shadow-lg border-slate-200">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <div className="h-10 w-10 rounded bg-indigo-600 flex items-center justify-center text-white font-bold text-xl">C</div>
          </div>
          <CardTitle className="text-2xl font-bold text-center text-slate-900">{t("welcomeBack")}</CardTitle>
          <CardDescription className="text-center text-slate-500">
            {t("enterCredentials")}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email" className="text-slate-700">{t("email")}</Label>
            <Input id="email" type="email" placeholder="name@example.com" required className="border-slate-300 focus:ring-indigo-600" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password" className="text-slate-700">{t("password")}</Label>
            <Input id="password" type="password" required className="border-slate-300 focus:ring-indigo-600" />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">{t("signIn")}</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
