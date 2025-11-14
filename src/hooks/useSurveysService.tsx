import { useHttp } from "./useHttp";

type UserId = number;
type DisciplineId = number;
type SurveyName = string;
type SurveyEndDate = string;
type QuestionText = string;
type QuestionPoints = number;
type OptionText = string;
type IsAnswer = boolean;

interface ICreateQuestionOption {
    optionText: OptionText;
    isAnswer: IsAnswer;
}

interface ICreateQuestion {
    questionText: QuestionText;
    questionPoints: QuestionPoints;
    questionOptions: ICreateQuestionOption[];
}

interface ICreateSurvey {
    surveyName: SurveyName;
    surveyEndDate: SurveyEndDate;
    surveyCreatedByTeacherID: UserId;
    disciplineId: DisciplineId;
    questions: ICreateQuestion[];
}

export const useSurveysService = () => {
    const { request } = useHttp();

    const getSurveyData = async (surveyId: number) => {
        const data = await request(`/surveys/${surveyId}`);
        return data;
    };

    const createSurvey = async (newSurvey: ICreateSurvey) => {
        const res = await request(
            "/surveys",
            "POST",
            JSON.stringify(newSurvey)
        );
        return res;
    };

    return {
        getSurveyData,
        createSurvey,
    };
};
