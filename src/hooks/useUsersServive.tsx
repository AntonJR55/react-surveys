import { useHttp } from "./useHttp";

export const useUsersService = () => {
    const { request } = useHttp();

    const getAllUsersDetailed = async () => {
        const users = await request("/users/detailed");
        return users;
    };

    const getAllTeachers = async () => {
        const teachers = await request("/users/teachers");
        return teachers;
    };

    const createStudent = async (
        userName: string,
        roleNameEn: string,
        groupCode: string
    ) => {
        const res = await request(
            "/users/student",
            "POST",
            JSON.stringify({ userName, roleNameEn, groupCode })
        );
        return res;
    };

    const createEmployee = async (userName: string, roleNameEn: string) => {
        const res = await request(
            "/users/employee",
            "POST",
            JSON.stringify({ userName, roleNameEn })
        );
        return res;
    };

    return {
        getAllUsersDetailed,
        getAllTeachers,
        createStudent,
        createEmployee,
    };
};
