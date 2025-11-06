import type { Password, UserName } from "../types/auth";
import { useHttp } from "./useHttp";

export const useAuthService = () => {
    const { request } = useHttp();

    const login = async (userName: UserName, password: Password) => {
        return await request(
            "/auth/login",
            "POST",
            JSON.stringify({ userName, password })
        );
    };

    const createPassword = async (userName: UserName, password: Password) => {
        return await request(
            "/auth/password",
            "POST",
            JSON.stringify({ userName, password })
        );
    };

    return {
        login,
        createPassword,
    };
};
