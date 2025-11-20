import { useHttp } from "./useHttp";

interface IDiscipline {
    disciplineName: string;
    teachersIds: number[];
    groupsCodes: string[];
}

export const useDisciplinesService = () => {
    const { request } = useHttp();

    const createDiscipline = async (discipline: IDiscipline) => {
        const res = await request(
            "/disciplines",
            "POST",
            JSON.stringify(discipline)
        );

        return res;
    };

    const getAllDisciplinesDetailed = async () => {
        const disciplines = await request("/disciplines/detailed");
        return disciplines;
    };

    return {
        createDiscipline,
        getAllDisciplinesDetailed,
    };
};
