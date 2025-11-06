import { useHttp } from "./useHttp";

export const useAuthService = () => {
    const { request } = useHttp();

    const getSurveyData = async (surveyId: number) => {
        const data = await request(`/surveys/${surveyId}`, "GET");
        return data;
    };

    return {
        getSurveyData,
    };
};
