import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft, ChevronRight, Check, Loader2 } from "lucide-react";
import { useSurveysService } from "../../hooks/useSurveysService";
import { useStudentGradesService } from "../../hooks/useStudentGradesService";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../UI/Card";
import { Button } from "../UI/Button";
import { Progress } from "../UI/Progress";
import { RadioGroup, RadioGroupItem } from "../UI/RadioGroup";
import { Label } from "../UI/Label";

interface Question {
    questionId: number;
    questionText: string;
    questionPoints: number;
    questionOptions: QuestionOption[];
}

interface QuestionOption {
    questionOptionId: number;
    optionText: string;
    isAnswer: boolean;
}

interface SurveyData {
    surveyId: number;
    surveyName: string;
    questions: Question[];
}

interface ISurveyCompletionPageProps {
    studentId: number;
}

export function SurveyCompletionPage({
    studentId,
}: ISurveyCompletionPageProps) {
    const [surveyData, setSurveyData] = useState<SurveyData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<Record<number, any>>({});
    const [isCompleted, setIsCompleted] = useState(false);
    const [finalGrade, setFinalGrade] = useState(0);

    const navigate = useNavigate();

    const { surveyId } = useParams<{ surveyId: string }>();
    const numericSurveyId = surveyId ? parseInt(surveyId, 10) : 0;

    const { getSurveyData } = useSurveysService();
    const { saveStudentGrade } = useStudentGradesService();

    if (!surveyData && !loading && !error) {
        setLoading(true);
        getSurveyData(numericSurveyId)
            .then(setSurveyData)
            .catch((err) => {
                setError("Ошибка при загрузке опроса");
                console.error("Error fetching survey data:", err);
            })
            .finally(() => setLoading(false));
    }

    if (loading) {
        return (
            <div className="min-h-[calc(100vh-theme(spacing.16)-theme(spacing.16))] bg-gradient-to-br from-sky-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
                <Card className="max-w-2xl w-full shadow-xl">
                    <CardContent className="pt-12 pb-12 text-center">
                        <div className="flex flex-col items-center justify-center">
                            <Loader2 className="h-8 w-8 animate-spin text-sky-600 mb-4" />
                            <p className="text-gray-600">Загрузка опроса...</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-[calc(100vh-theme(spacing.16)-theme(spacing.16))] bg-gradient-to-br from-sky-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
                <Card className="max-w-2xl w-full shadow-xl">
                    <CardContent className="pt-12 pb-12 text-center">
                        <div className="text-red-600 mb-4">
                            <p>{error}</p>
                        </div>
                        <Button onClick={() => window.location.reload()}>
                            Попробовать снова
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (!surveyData) {
        return null;
    }

    const totalQuestions = surveyData.questions.length;

    const calculateProgress = () => {
        const answeredCount = Object.keys(answers).length;
        return totalQuestions > 0 ? (answeredCount / totalQuestions) * 100 : 0;
    };

    const progress = calculateProgress();
    const question = surveyData.questions[currentQuestion];

    const handleNext = () => {
        if (currentQuestion < totalQuestions - 1) {
            setCurrentQuestion(currentQuestion + 1);
        }
    };

    const handlePrevious = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        }
    };

    const handleAnswer = (value: string) => {
        setAnswers({ ...answers, [question.questionId]: value });
    };

    const handleComplete = async () => {
        const finalGrade = calculateGrade(surveyData, answers);

        try {
            await saveStudentGrade(studentId, numericSurveyId, finalGrade);
            updateUserSurveysInStorage(surveyData.surveyId, finalGrade);
            setFinalGrade(finalGrade);
            setIsCompleted(true);
        } catch (error) {
            console.error("Ошибка сохранения оценки:", error);
        }
    };

    const calculateGrade = (
        surveyData: SurveyData,
        studentAnswers: Record<number, string>
    ): number => {
        let totalGrade = 0;

        surveyData.questions.forEach((question) => {
            const studentAnswer = studentAnswers[question.questionId];
            if (studentAnswer) {
                const correctOption = question.questionOptions.find(
                    (option) => option.isAnswer
                );

                if (
                    correctOption &&
                    studentAnswer === correctOption.optionText
                ) {
                    totalGrade += question.questionPoints;
                }
            }
        });

        return totalGrade;
    };

    const updateUserSurveysInStorage = (
        completedSurveyId: number,
        grade: number
    ) => {
        const storedUserData = sessionStorage.getItem("userData");
        if (!storedUserData) {
            console.warn("User data not found in sessionStorage");
            return;
        }

        const userData = JSON.parse(storedUserData);

        const alreadyCompleted = userData.studentGrades?.some(
            (gradeEntry: any) =>
                gradeEntry.survey.surveyId === completedSurveyId
        );

        if (alreadyCompleted) {
            console.warn(`Survey ${completedSurveyId} already completed`);
            return;
        }

        const completedSurvey = userData.availableSurveys?.find(
            (survey: any) => survey.surveyId === completedSurveyId
        );

        if (!completedSurvey) {
            console.warn(
                `Survey ${completedSurveyId} not found in available surveys`
            );
            return;
        }

        const newGradeEntry = {
            survey: {
                surveyId: completedSurvey.surveyId,
                surveyName: completedSurvey.surveyName,
                surveyCreatedDate: completedSurvey.surveyCreatedDate,
                surveyEndDate: completedSurvey.surveyEndDate,
                surveyCreatedBy: completedSurvey.surveyCreatedBy,
                surveyOnDiscipline: completedSurvey.surveyOnDiscipline,
            },
            grade: grade,
        };

        const updatedStudentGrades = [
            ...(userData.studentGrades || []),
            newGradeEntry,
        ];

        const updatedAvailableSurveys = (
            userData.availableSurveys || []
        ).filter((survey: any) => survey.surveyId !== completedSurveyId);

        const updatedUserData = {
            ...userData,
            studentGrades: updatedStudentGrades,
            availableSurveys: updatedAvailableSurveys,
        };

        sessionStorage.setItem("userData", JSON.stringify(updatedUserData));
    };

    const handleReturnToDashboard = () => {
        navigate("/dashboard/student");
    };

    const isAnswered =
        answers[question.questionId] !== undefined &&
        (question.questionOptions.length === 0 ||
            (question.questionOptions.length > 0 &&
                answers[question.questionId] &&
                (Array.isArray(answers[question.questionId])
                    ? answers[question.questionId].length > 0
                    : true)));

    if (isCompleted) {
        return (
            <div className="min-h-[calc(100vh-theme(spacing.16)-theme(spacing.16))] bg-gradient-to-br from-sky-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
                <Card className="max-w-2xl w-full shadow-xl">
                    <CardContent className="pt-12 pb-12 text-center">
                        <div className="mb-6">
                            <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                                <Check className="h-10 w-10 text-green-600" />
                            </div>
                            <h2 className="text-gray-900 mb-2">
                                Опрос завершен!
                            </h2>
                            <p className="text-gray-600">
                                Спасибо за участие в опросе
                            </p>
                        </div>
                        <div className="mb-8 p-6 bg-sky-50 rounded-lg border-2 border-sky-200">
                            <p className="text-sm text-gray-600 mb-2">
                                Ваша оценка
                            </p>
                            <p className="text-5xl text-sky-600 mb-2">
                                {finalGrade}
                            </p>
                            <div className="mt-4 w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-sky-500 rounded-full transition-all duration-1000"
                                    style={{ width: `${finalGrade}%` }}
                                />
                            </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-6">
                            Вы можете просмотреть свои результаты в личном
                            кабинете.
                        </p>
                        <Button
                            onClick={handleReturnToDashboard}
                            className="bg-sky-500 hover:bg-sky-600"
                        >
                            Вернуться в личный кабинет
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-[calc(100vh-theme(spacing.16)-theme(spacing.16))] bg-gradient-to-br from-sky-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-sm text-gray-600">
                            Вопрос {currentQuestion + 1} из {totalQuestions}
                        </p>
                        <p className="text-sm text-gray-600">
                            {Math.round(progress)}% завершено
                        </p>
                    </div>
                    <Progress value={progress} className="h-2" />
                </div>
                <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle>{surveyData.surveyName}</CardTitle>
                        <CardDescription>
                            Пожалуйста, ответьте на все вопросы опроса
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-4">
                            <h3 className="text-gray-900">
                                {currentQuestion + 1}. {question.questionText}
                            </h3>
                            <RadioGroup
                                value={answers[question.questionId]}
                                onValueChange={handleAnswer}
                                className="space-y-3"
                            >
                                {question.questionOptions.map((option) => (
                                    <div
                                        key={option.questionOptionId}
                                        className="flex items-center space-x-2"
                                    >
                                        <RadioGroupItem
                                            id={`q${question.questionId}-${option.questionOptionId}`}
                                            value={option.optionText}
                                            className="border-gray-300"
                                        />
                                        <Label
                                            htmlFor={`q${question.questionId}-${option.questionOptionId}`}
                                            className="cursor-pointer text-gray-700"
                                        >
                                            {option.optionText}
                                        </Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </div>
                        <div className="flex items-center justify-between pt-6 border-t">
                            <Button
                                variant="outline"
                                onClick={handlePrevious}
                                disabled={currentQuestion === 0}
                                className="gap-2"
                            >
                                <ChevronLeft className="h-4 w-4" />
                                Назад
                            </Button>
                            {currentQuestion < totalQuestions - 1 ? (
                                <Button
                                    onClick={handleNext}
                                    disabled={!isAnswered}
                                    className="gap-2 bg-sky-500 hover:bg-sky-600"
                                >
                                    Далее
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                            ) : (
                                <Button
                                    onClick={handleComplete}
                                    disabled={!isAnswered}
                                    className="gap-2 bg-green-500 hover:bg-green-600"
                                >
                                    <Check className="h-4 w-4" />
                                    Завершить опрос
                                </Button>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
