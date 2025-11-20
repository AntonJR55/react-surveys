import { useHttp } from "./useHttp";

export const useGroupsService = () => {
    const { request } = useHttp();

    const createGroup = async (groupCode: string) => {
        const res = await request(
            "/groups",
            "POST",
            JSON.stringify({ groupCode })
        );
        return res;
    };

    const getAllGroups = async () => {
        const groups = await request("/groups");
        return groups;
    };

    return {
        createGroup,
        getAllGroups,
    };
};
