import { Fragment, type FormEvent } from "react";
import { NavLink } from "react-router-dom";
import { useAuthForm } from "../../hooks/useAuthForm";
import { useAuthHttp } from "../../hooks/useAuthHttp";
import { usePopupMsg } from "../../hooks/usePopupMsg";
// import { authService } from "../../services/AuthService";
import TextInput from "../UI/TextInput";
import PasswordInput from "../UI/PasswordInput";
import BtnWithoutIcon from "../UI/BtnWithoutIcon";
import PopupMessage from "../UI/PopupMessage";
// import logoDark from "../../assets/img/logoDark.png";

const CreatingPasswordForm = () => {
    const { formState, setUserName, setPassword } = useAuthForm();
    const { createPassword } = useAuthHttp();
    const { popupMsg, displaySuccessMsg, displayErrorMsg, closePopupMsg } =
        usePopupMsg();

    async function handleCreatePassword(e: FormEvent) {
        try {
            e.preventDefault();

            if (!formState.userName || !formState.password) {
                displayErrorMsg("Все поля обязательны для заполнения");

                return;
            }

            await createPassword(formState.userName, formState.password);

            displaySuccessMsg("Пароль успешно создан");
        } catch (error: any) {
            const { statusCode, message } = error.response?.data || {};

            if (statusCode === 404 || statusCode === 409) {
                displayErrorMsg(message || "Не удалось создать пароль");
                return;
            }

            displayErrorMsg("Не удалось создать пароль");
        }
    }

    return (
        <Fragment>
            <form className="w-[268px]" onSubmit={handleCreatePassword}>
                <h1 className="mt-4 text-center text-3xl">Создание пароля</h1>
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
                    <BtnWithoutIcon text="Создать" type="submit" />
                </div>
                <div className="mt-2 text-blue-700 text-center">
                    <NavLink to="/login">Авторизация</NavLink>
                </div>
            </form>
            {popupMsg.isOpen && (
                <PopupMessage
                    popupMsg={popupMsg}
                    closePopupMsg={closePopupMsg}
                />
            )}
        </Fragment>
    );
};

export default CreatingPasswordForm;
