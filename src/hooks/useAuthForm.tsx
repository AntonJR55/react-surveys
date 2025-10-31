import { useState } from "react";
import type { UserName, Password } from "../types/auth";

interface IAuthFormState {
    userName: UserName;
    password: Password;
}

export const useAuthForm = () => {
    const [formState, setFormState] = useState<IAuthFormState>({
        userName: "",
        password: "",
    });

    const setUserName = (userName: UserName) => {
        setFormState((prev) => ({ ...prev, userName }));
    };

    const setPassword = (password: Password) => {
        setFormState((prev) => ({ ...prev, password }));
    };

    return {
        formState,
        setUserName,
        setPassword,
    };
};
