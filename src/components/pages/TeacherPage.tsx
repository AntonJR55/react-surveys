import { useState } from "react";
import { Plus, Eye, Clock, BookOpen } from "lucide-react";
import { Card, CardContent } from "../UI/Card";
import { Button } from "../UI/Button";
import { Badge } from "../UI/Badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../UI/Tabs";
import { useNavigate } from "react-router-dom";

interface ITeacherSurveyResults {
    surveyId: number;
    surveyName: string;
}

interface ITeacherPageProps {
    onUpdateSurveyResults: (surveyData: ITeacherSurveyResults) => void;
}

export function TeacherPage({ onUpdateSurveyResults }: ITeacherPageProps) {
    const [activeTab, setActiveTab] = useState("all");

    const navigate = useNavigate();

    const storedData = sessionStorage.getItem("userData");
    const teacherData = storedData ? JSON.parse(storedData) : null;

    if (!teacherData) {
        return (
            <div className="min-h-[calc(100vh-theme(spacing.16)-theme(spacing.16))] bg-gray-50 py-8 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-600">Данные не найдены</p>
                </div>
            </div>
        );
    }

    const { userName, availableSurveys } = teacherData;

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("ru-RU");
    };

    const surveys = availableSurveys.map((survey: any) => ({
        id: survey.surveyId,
        title: survey.surveyName,
        discipline: survey.surveyOnDiscipline.disciplineName,
        status:
            new Date(survey.surveyEndDate) > new Date()
                ? "active"
                : "completed",
        deadline: formatDate(survey.surveyEndDate),
        createdDate: formatDate(survey.surveyCreatedDate),
    }));

    const activeSurveys = surveys.filter(
        (survey: any) => survey.status === "active"
    );
    const completedSurveys = surveys.filter(
        (survey: any) => survey.status === "completed"
    );

    const handleSurveyCreateNavigate = () => {
        navigate(`/dashboard/teacher/survey-create`);
    };

    const handleSurveyResultsNavigate = (
        surveyId: number,
        surveyName: string
    ) => {
        onUpdateSurveyResults({ surveyId, surveyName });
        navigate(`/dashboard/teacher/survey-results/${surveyId}`);
    };

    const EmptyState = ({ message }: { message: string }) => (
        <Card>
            <CardContent className="pt-6">
                <div className="text-center py-8">
                    <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">{message}</p>
                </div>
            </CardContent>
        </Card>
    );

    return (
        <div className="min-h-[calc(100vh-theme(spacing.16)-theme(spacing.16))] bg-gray-50 py-8">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                        Здравствуйте, {userName}!
                    </h1>
                    <p className="text-gray-600">
                        Личный кабинет преподавателя
                    </p>
                </div>
                <div className="grid md:grid-cols-3 gap-4 mb-8">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-lg bg-sky-100 flex items-center justify-center">
                                    <BookOpen className="h-6 w-6 text-sky-600" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-gray-900">
                                        {surveys.length}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        Всего опросов
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center">
                                    <BookOpen className="h-6 w-6 text-green-600" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-gray-900">
                                        {activeSurveys.length}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        Активных опросов
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center">
                                    <Clock className="h-6 w-6 text-purple-600" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-gray-900">
                                        {completedSurveys.length}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        Завершено
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div className="mb-6">
                    <Button
                        className="gap-2 bg-sky-500 hover:bg-sky-600"
                        onClick={handleSurveyCreateNavigate}
                    >
                        <Plus className="h-4 w-4" />
                        Создать новый опрос
                    </Button>
                </div>
                <Tabs
                    value={activeTab}
                    onValueChange={setActiveTab}
                    className="space-y-6"
                >
                    <TabsList>
                        <TabsTrigger value="all">
                            Все опросы ({surveys.length})
                        </TabsTrigger>
                        <TabsTrigger value="active">
                            Активные ({activeSurveys.length})
                        </TabsTrigger>
                        <TabsTrigger value="completed">
                            Завершенные ({completedSurveys.length})
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="all" className="space-y-4">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">
                            Все опросы
                        </h2>
                        <div className="space-y-4">
                            {surveys.length === 0 ? (
                                <EmptyState message="У Вас пока нет созданных опросов. Вы можете создать свой первый опрос." />
                            ) : (
                                surveys.map((survey: any) => (
                                    <Card
                                        key={survey.id}
                                        className="hover:shadow-md transition-shadow"
                                    >
                                        <CardContent className="pt-6">
                                            <div className="flex items-center justify-between">
                                                <div className="flex-1">
                                                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                                                        {survey.title}
                                                    </h3>
                                                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                                                        <div className="flex items-center gap-1">
                                                            <BookOpen className="h-4 w-4" />
                                                            <span>
                                                                {
                                                                    survey.discipline
                                                                }
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-4 text-sm text-gray-600">
                                                        <div className="flex items-center gap-1">
                                                            <Clock className="h-4 w-4" />
                                                            <span>
                                                                {survey.status ===
                                                                "active"
                                                                    ? `До ${survey.deadline}`
                                                                    : `Завершен ${survey.deadline}`}
                                                            </span>
                                                        </div>
                                                        <Badge
                                                            variant="outline"
                                                            className={
                                                                survey.status ===
                                                                "active"
                                                                    ? "bg-green-50 text-green-700 border-green-200"
                                                                    : "bg-gray-50 text-gray-700 border-gray-200"
                                                            }
                                                        >
                                                            {survey.status ===
                                                            "active"
                                                                ? "Активен"
                                                                : "Завершен"}
                                                        </Badge>
                                                    </div>
                                                </div>
                                                <div className="flex gap-2">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="gap-2"
                                                        onClick={() =>
                                                            handleSurveyResultsNavigate(
                                                                survey.id,
                                                                survey.title
                                                            )
                                                        }
                                                    >
                                                        <Eye className="h-4 w-4" />
                                                        Результаты
                                                    </Button>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))
                            )}
                        </div>
                    </TabsContent>
                    <TabsContent value="active" className="space-y-4">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">
                            Активные опросы
                        </h2>
                        <div className="space-y-4">
                            {activeSurveys.length === 0 ? (
                                <EmptyState message="На данный момент у Вас нет активных опросов. Вы можете создать новый опрос или проверить завершенные." />
                            ) : (
                                activeSurveys.map((survey: any) => (
                                    <Card
                                        key={survey.id}
                                        className="hover:shadow-md transition-shadow"
                                    >
                                        <CardContent className="pt-6">
                                            <div className="flex items-center justify-between">
                                                <div className="flex-1">
                                                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                                                        {survey.title}
                                                    </h3>
                                                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                                                        <div className="flex items-center gap-1">
                                                            <BookOpen className="h-4 w-4" />
                                                            <span>
                                                                {
                                                                    survey.discipline
                                                                }
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-4 text-sm text-gray-600">
                                                        <div className="flex items-center gap-1">
                                                            <Clock className="h-4 w-4" />
                                                            <span>
                                                                До{" "}
                                                                {
                                                                    survey.deadline
                                                                }
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex gap-2">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="gap-2"
                                                        onClick={() =>
                                                            handleSurveyResultsNavigate(
                                                                survey.id,
                                                                survey.title
                                                            )
                                                        }
                                                    >
                                                        <Eye className="h-4 w-4" />
                                                        Результаты
                                                    </Button>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))
                            )}
                        </div>
                    </TabsContent>
                    <TabsContent value="completed" className="space-y-4">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">
                            Завершенные опросы
                        </h2>
                        <div className="space-y-4">
                            {completedSurveys.length === 0 ? (
                                <EmptyState message="У Вас пока нет завершенных опросов. Завершенные опросы появятся здесь после истечения срока действия активных опросов." />
                            ) : (
                                completedSurveys.map((survey: any) => (
                                    <Card
                                        key={survey.id}
                                        className="hover:shadow-md transition-shadow"
                                    >
                                        <CardContent className="pt-6">
                                            <div className="flex items-center justify-between">
                                                <div className="flex-1">
                                                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                                                        {survey.title}
                                                    </h3>
                                                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                                                        <div className="flex items-center gap-1">
                                                            <BookOpen className="h-4 w-4" />
                                                            <span>
                                                                {
                                                                    survey.discipline
                                                                }
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-4 text-sm text-gray-600">
                                                        <span>
                                                            Завершен{" "}
                                                            {survey.deadline}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="flex gap-2">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="gap-2"
                                                        onClick={() =>
                                                            handleSurveyResultsNavigate(
                                                                survey.id,
                                                                survey.title
                                                            )
                                                        }
                                                    >
                                                        <Eye className="h-4 w-4" />
                                                        Результаты
                                                    </Button>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))
                            )}
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
