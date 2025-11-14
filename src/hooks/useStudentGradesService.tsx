import { useHttp } from "./useHttp";

export const useStudentGradesService = () => {
    const { request } = useHttp();

    const saveStudentGrade = async (
        studentId: number,
        surveyId: number,
        grade: number
    ) => {
        const response = await request(
            "/student-grades",
            "POST",
            JSON.stringify({ studentId, surveyId, grade })
        );

        return response;
    };

    const getStudentsGradesBySurveyId = async (surveyId: number) => {
        const studentsGrades = await request(
            `/student-grades/survey/${surveyId}`
        );

        return studentsGrades;
    };

    return {
        saveStudentGrade,
        getStudentsGradesBySurveyId,
    };
};
