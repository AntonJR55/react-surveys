import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogIn, UserPlus } from "lucide-react";
import toast from "react-hot-toast";
import { useAuthService } from "../../hooks/useAuthService";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../UI/Card";
import { Button } from "../UI/Button";
import { Input } from "../UI/Input";
import { Label } from "../UI/Label";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../UI/Dialog";

export function AuthPage() {
    const [userName, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [newUsername, setNewUsername] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

    const navigate = useNavigate();

    const { login, createPassword } = useAuthService();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await login(userName, password);
            sessionStorage.setItem("userData", JSON.stringify(res.userData));

            setUsername("");
            setPassword("");

            if (res.userData.roleNameEn === "student") {
                navigate("/dashboard/student");
            } else if (res.userData.roleNameEn === "teacher") {
                navigate("/dashboard/teacher");
            } else if (res.userData.roleNameEn === "admin") {
                navigate("/dashboard/admin");
            }
        } catch (error) {
            if (error instanceof Error) {
                const parts = error.message.split(", ");
                let status = null;
                let message = null;

                for (const part of parts) {
                    if (part.startsWith("status: ")) {
                        status = parseInt(part.replace("status: ", ""));
                    } else if (part.startsWith("message: ")) {
                        message = part.replace("message: ", "");
                    }
                }

                if (status === 401) {
                    toast.error(
                        message || "Неверное имя пользователя или пароль",
                        {
                            duration: 3000,
                        }
                    );
                } else if (status === 412) {
                    toast.error(
                        message || "Пароль для пользователя не создан",
                        {
                            duration: 3000,
                        }
                    );
                } else {
                    toast.error("Ошибка при авторизации", {
                        duration: 3000,
                    });
                }
            } else {
                toast.error("Ошибка при авторизации", {
                    duration: 3000,
                });
            }

            setUsername("");
            setPassword("");
        }
    };

    const handleCreatePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createPassword(newUsername, newPassword);

            setIsCreateDialogOpen(false);
            setNewUsername("");
            setNewPassword("");

            toast.success("Пароль успешно создан", {
                duration: 3000,
            });
        } catch (error) {
            if (error instanceof Error) {
                const parts = error.message.split(", ");
                let status = null;
                let message = null;

                for (const part of parts) {
                    if (part.startsWith("status: ")) {
                        status = parseInt(part.replace("status: ", ""));
                    } else if (part.startsWith("message: ")) {
                        message = part.replace("message: ", "");
                    }
                }

                if (status === 404) {
                    toast.error(message || "Пользователь не найден", {
                        duration: 3000,
                    });
                } else if (status === 409) {
                    toast.error(
                        message || "Пароль для пользователя уже создан",
                        {
                            duration: 3000,
                        }
                    );
                } else {
                    toast.error("Ошибка при создании пароля", {
                        duration: 3000,
                    });
                }
            } else {
                toast.error("Ошибка при создании пароля", {
                    duration: 3000,
                });
            }

            setNewUsername("");
            setNewPassword("");
        }
    };

    return (
        <div className="min-h-[calc(100vh-theme(spacing.16)-theme(spacing.16))] bg-gradient-to-br from-sky-50 to-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <Card className="w-full max-w-md shadow-xl">
                <CardHeader className="space-y-1 text-center">
                    <div className="flex justify-center mb-4">
                        <div className="h-16 w-16 rounded-full bg-sky-100 flex items-center justify-center">
                            <LogIn className="h-8 w-8 text-sky-600" />
                        </div>
                    </div>
                    <CardTitle className="text-2xl">Вход в систему</CardTitle>
                    <CardDescription>
                        Введите свои учетные данные для доступа к системе
                        опросов
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="userName">Имя пользователя</Label>
                            <Input
                                id="userName"
                                type="text"
                                placeholder="Введите имя пользователя"
                                value={userName}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Пароль</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Введите пароль"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <Button
                            type="submit"
                            className="w-full bg-sky-500 hover:bg-sky-600"
                        >
                            Войти
                        </Button>
                    </form>
                    <div className="text-center text-sm text-gray-600 mt-4">
                        <Dialog
                            open={isCreateDialogOpen}
                            onOpenChange={setIsCreateDialogOpen}
                        >
                            <DialogTrigger asChild>
                                <button
                                    type="button"
                                    className="text-sky-600 hover:underline"
                                >
                                    Создать пароль
                                </button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle className="flex items-center gap-2">
                                        <UserPlus className="h-5 w-5 text-sky-600" />
                                        Создание пароля
                                    </DialogTitle>
                                    <DialogDescription>
                                        Введите логин и новый пароль для
                                        создания учетной записи
                                    </DialogDescription>
                                </DialogHeader>
                                <form
                                    onSubmit={handleCreatePassword}
                                    className="space-y-4"
                                >
                                    <div className="space-y-2">
                                        <Label htmlFor="new-userName">
                                            Логин
                                        </Label>
                                        <Input
                                            id="new-userName"
                                            type="text"
                                            placeholder="Введите логин"
                                            value={newUsername}
                                            onChange={(e) =>
                                                setNewUsername(e.target.value)
                                            }
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="new-password">
                                            Пароль
                                        </Label>
                                        <Input
                                            id="new-password"
                                            type="password"
                                            placeholder="Введите новый пароль"
                                            value={newPassword}
                                            onChange={(e) =>
                                                setNewPassword(e.target.value)
                                            }
                                            required
                                        />
                                    </div>
                                    <Button
                                        type="submit"
                                        className="w-full bg-sky-500 hover:bg-sky-600"
                                    >
                                        Создать пароль
                                    </Button>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
