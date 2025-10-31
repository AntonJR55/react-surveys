import { NavLink } from "react-router-dom";
import { useAuthForm } from "../../hooks/useAuthForm";
import { useAuthHttp } from "../../hooks/useAuthHttp";
import TextInput from "../UI/TextInput";
import PasswordInput from "../UI/PasswordInput";
import BtnWithoutIcon from "../UI/BtnWithoutIcon";
import type { FormEvent } from "react";

const LoginForm = () => {
    const { formState, setUserName, setPassword } = useAuthForm();
    const { login } = useAuthHttp();

    const handleLogin = (e: FormEvent) => {
        e.preventDefault();
        login(formState.userName, formState.password);
    };

    return (
        <form className="w-[268px]" onSubmit={handleLogin}>
            <h1 className="mt-4 text-center text-4xl">Авторизация</h1>
            <div className="flex flex-col items-center">
                <div className="w-full mt-3">
                    <TextInput
                        label="Имя пользователя"
                        value={formState.userName}
                        onChange={(value) => setUserName(value)}
                    />
                </div>
                <div className="w-full mt-2">
                    <PasswordInput
                        label="Пароль"
                        value={formState.password}
                        onChange={(value) => setPassword(value)}
                    />
                </div>
            </div>
            <div className="mt-3 text-center">
                <BtnWithoutIcon text="Войти" type="submit" />
            </div>
            <div className="mt-2 text-blue-700 text-center">
                <NavLink to="/creating_password">Создание пароля</NavLink>
            </div>
        </form>
    );
};

export default LoginForm;
