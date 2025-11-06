import { useState } from "react";
import { Card, CardContent } from "../UI/Card";
import { Button } from "../UI/Button";
import { Badge } from "../UI/Badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../UI/Tabs";
import {
    ClipboardList,
    Clock,
    CheckCircle2,
    BookOpen,
    GraduationCap,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export function StudentPage() {
    const [activeTab, setActiveTab] = useState("available");

    const navigate = useNavigate();

    const storedUserData = sessionStorage.getItem("userData");
    const studentData = storedUserData ? JSON.parse(storedUserData) : null;

    if (!studentData) {
        return (
            <div className="min-h-[calc(100vh-theme(spacing.16)-theme(spacing.16))] bg-gray-50 py-8 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-600">Данные не найдены</p>
                </div>
            </div>
        );
    }

    const availableSurveys = studentData.availableSurveys || [];
    const completedSurveys = studentData.studentGrades || [];

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("ru-RU");
    };

    const averageGrade =
        completedSurveys.length > 0
            ? Math.round(
                  completedSurveys.reduce(
                      (sum: any, item: any) => sum + item.grade,
                      0
                  ) / completedSurveys.length
              )
            : 0;

    const handleSurveyCompletionNavigate = (surveyId: number) => {
        navigate(`/dashboard/student/survey-completion/${surveyId}`);
    };

    return (
        <div className="min-h-[calc(100vh-theme(spacing.16)-theme(spacing.16))] bg-gray-50 py-8">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-gray-900 mb-2">
                        Здравствуйте, {studentData.userName}!
                    </h1>
                    <p className="text-gray-600">Личный кабинет студента</p>
                </div>

                <div className="grid md:grid-cols-3 gap-4 mb-8">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-lg bg-sky-100 flex items-center justify-center">
                                    <ClipboardList className="h-6 w-6 text-sky-600" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-gray-900">
                                        {availableSurveys.length}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        Доступных опросов
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center">
                                    <CheckCircle2 className="h-6 w-6 text-green-600" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-gray-900">
                                        {completedSurveys.length}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        Пройдено опросов
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center">
                                    <BookOpen className="h-6 w-6 text-purple-600" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-gray-900">
                                        {averageGrade}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        Средний балл
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <Tabs
                    value={activeTab}
                    onValueChange={setActiveTab}
                    className="space-y-6"
                >
                    <TabsList>
                        <TabsTrigger value="available">
                            Доступные опросы
                        </TabsTrigger>
                        <TabsTrigger value="history">
                            История опросов
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="available" className="space-y-4">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold text-gray-900">
                                Доступные опросы
                            </h2>
                            <Badge
                                variant="outline"
                                className="bg-sky-50 text-sky-700 border-sky-200"
                            >
                                {availableSurveys.length} опросов
                            </Badge>
                        </div>
                        {availableSurveys.length > 0 ? (
                            <div className="space-y-4">
                                {availableSurveys.map((survey: any) => (
                                    <Card
                                        key={survey.surveyId}
                                        className="hover:shadow-md transition-shadow"
                                    >
                                        <CardContent className="pt-6">
                                            <div className="flex items-center justify-between">
                                                <div className="flex-1">
                                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                                        {survey.surveyName}
                                                    </h3>
                                                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                                                        <div className="flex items-center gap-1">
                                                            <BookOpen className="h-4 w-4" />
                                                            <span>
                                                                {
                                                                    survey
                                                                        .surveyOnDiscipline
                                                                        .disciplineName
                                                                }
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <GraduationCap className="h-4 w-4" />
                                                            <span>
                                                                {
                                                                    survey
                                                                        .surveyCreatedBy
                                                                        .teacherName
                                                                }
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                                        <Clock className="h-4 w-4" />
                                                        <span>
                                                            Срок до{" "}
                                                            {formatDate(
                                                                survey.surveyEndDate
                                                            )}
                                                        </span>
                                                    </div>
                                                </div>
                                                <Button
                                                    className="bg-sky-500 hover:bg-sky-600"
                                                    onClick={() => handleSurveyCompletionNavigate(survey.surveyId)}
                                                >
                                                    Пройти опрос
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        ) : (
                            <Card>
                                <CardContent className="pt-12 pb-12 text-center">
                                    <ClipboardList className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                    <p className="text-gray-600">
                                        Нет доступных опросов
                                    </p>
                                </CardContent>
                            </Card>
                        )}
                    </TabsContent>

                    <TabsContent value="history" className="space-y-4">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold text-gray-900">
                                История пройденных опросов
                            </h2>
                            <Badge
                                variant="outline"
                                className="bg-green-50 text-green-700 border-green-200"
                            >
                                {completedSurveys.length} пройдено
                            </Badge>
                        </div>
                        {completedSurveys.length > 0 ? (
                            <div className="space-y-4">
                                {completedSurveys.map((item: any) => (
                                    <Card key={item.survey.surveyId}>
                                        <CardContent className="pt-6">
                                            <div className="flex items-center justify-between">
                                                <div className="flex-1">
                                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                                        {item.survey.surveyName}
                                                    </h3>
                                                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                                                        <div className="flex items-center gap-1">
                                                            <BookOpen className="h-4 w-4" />
                                                            <span>
                                                                {
                                                                    item.survey
                                                                        .surveyOnDiscipline
                                                                        .disciplineName
                                                                }
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <GraduationCap className="h-4 w-4" />
                                                            <span>
                                                                {
                                                                    item.survey
                                                                        .surveyCreatedBy
                                                                        .teacherName
                                                                }
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <p className="text-sm text-gray-600">
                                                        Срок сдачи: до{" "}
                                                        {formatDate(
                                                            item.survey
                                                                .surveyEndDate
                                                        )}
                                                    </p>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <div className="text-center">
                                                        <p className="text-sm text-gray-600 mb-1">
                                                            Оценка
                                                        </p>
                                                        <Badge
                                                            variant="outline"
                                                            className="bg-sky-50 text-sky-700 border-sky-200 text-lg px-3 py-1"
                                                        >
                                                            {item.grade} баллов
                                                        </Badge>
                                                    </div>
                                                    <Badge
                                                        variant="outline"
                                                        className="bg-green-50 text-green-700 border-green-200"
                                                    >
                                                        <CheckCircle2 className="h-4 w-4 mr-1" />
                                                        Пройден
                                                    </Badge>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        ) : (
                            <Card>
                                <CardContent className="pt-12 pb-12 text-center">
                                    <CheckCircle2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                    <p className="text-gray-600">
                                        Вы еще не прошли ни одного опроса
                                    </p>
                                </CardContent>
                            </Card>
                        )}
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
