import { ClipboardList, LogOut, User } from "lucide-react";
import { Button } from "../UI/Button";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
    isSimplified: boolean;
    isAuthUser: boolean;
    userRole: "student" | "teacher" | "admin";
    userName: string;
    onHandleLoginNavigate: () => void;
}

export function Header({
    isSimplified = false,
    isAuthUser = false,
    userRole,
    userName,
    onHandleLoginNavigate,
}: HeaderProps) {
    const navigate = useNavigate();

    const logout = () => {
        sessionStorage.removeItem("userData");
        navigate("/");
    };

    return (
        <header className="bg-white border-b sticky top-0 z-50">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                        <div className="h-8 w-8 rounded-lg bg-sky-500 flex items-center justify-center">
                            <ClipboardList className="h-5 w-5 text-white" />
                        </div>
                        <span className="text-gray-900">Система Опросов</span>
                    </div>
                    {!isSimplified && isAuthUser && (
                        <nav className="hidden md:flex items-center gap-6">
                            <div
                                className={
                                    "text-sm transition-colors text-sky-600"
                                }
                            >
                                {userRole === "student" && "Мои опросы"}
                                {userRole === "teacher" &&
                                    "Управление опросами"}
                                {userRole === "admin" &&
                                    "Панель администратора"}
                            </div>
                        </nav>
                    )}
                    <div className="flex items-center gap-4">
                        {isAuthUser ? (
                            <>
                                <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-100">
                                    <User className="h-4 w-4 text-gray-600" />
                                    <span className="text-sm text-gray-700">
                                        {userName}
                                    </span>
                                </div>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={logout}
                                    className="gap-2"
                                >
                                    <LogOut className="h-4 w-4" />
                                    Выйти
                                </Button>
                            </>
                        ) : (
                            !isSimplified && (
                                <Button
                                    onClick={onHandleLoginNavigate}
                                    size="sm"
                                    className="bg-sky-500 hover:bg-sky-600"
                                >
                                    Войти
                                </Button>
                            )
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
