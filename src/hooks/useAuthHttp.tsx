import type { Password, UserName } from "../types/auth";
import { useAppHttp } from "./useAppHttp";

export const useAuthHttp = () => {
    const { request } = useAppHttp();

    const login = async (username: UserName, password: Password) => {
        return await request(
            "/auth/login",
            "POST",
            JSON.stringify({ username, password })
        );
    };

    const createPassword = async (username: UserName, password: Password) => {
        return await request(
            "/auth/password",
            "POST",
            JSON.stringify({ username, password })
        );
    };

    return {
        login,
        createPassword,
    };
};
