import { useHttp } from "./useHttp";

export const useRolesService = () => {
    const { request } = useHttp();

    const getAllRoles = async () => {
        const roles = await request("/roles");
        return roles;
    };

    return {
        getAllRoles,
    };
};
