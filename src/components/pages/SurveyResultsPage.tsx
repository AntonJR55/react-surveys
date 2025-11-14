import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Users, TrendingUp, Search, BookOpen } from "lucide-react";
import { useStudentGradesService } from "../../hooks/useStudentGradesService";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../UI/Card";
import { Button } from "../UI/Button";
import { Badge } from "../UI/Badge";
import { Input } from "../UI/Input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../UI/Select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../UI/Tabs";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../UI/Table";

interface ISurveyResultsPageProps {
    teacherSurveyResults: {
        surveyId: number;
        surveyName: string;
    } | null;
}

interface IStudentGradeResult {
    studentGradeId: number;
    student: {
        userId: number;
        userName: string;
    };
    groupCode: string;
    grade: number;
}

export function SurveyResultsPage({
    teacherSurveyResults,
}: ISurveyResultsPageProps) {
    const [selectedGroup, setSelectedGroup] = useState<string>("all");
    const [searchStudent, setSearchStudent] = useState("");
    const [studentResults, setStudentResults] = useState<IStudentGradeResult[]>(
        []
    );
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const { getStudentsGradesBySurveyId } = useStudentGradesService();

    useEffect(() => {
        fetchStudentsGrades();
    }, [teacherSurveyResults?.surveyId]);

    const fetchStudentsGrades = async () => {
        if (!teacherSurveyResults) {
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            const results = await getStudentsGradesBySurveyId(
                teacherSurveyResults.surveyId
            );
            setStudentResults(results);
        } catch (error) {
            console.error("Error fetching student grades:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleReturnToDashboard = () => {
        navigate("/dashboard/teacher");
    };

    if (!teacherSurveyResults) {
        return (
            <div className="min-h-[calc(100vh-theme(spacing.16)-theme(spacing.16))] bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-6 flex items-center justify-between">
                        <div>
                            <h1 className="text-gray-900 mb-2">
                                Результаты опроса
                            </h1>
                        </div>
                        <Button
                            variant="outline"
                            onClick={handleReturnToDashboard}
                        >
                            Назад
                        </Button>
                    </div>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="text-center py-8">
                                <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-gray-900 mb-2">
                                    Опрос еще не пройден
                                </h3>
                                <p className="text-gray-600">
                                    Никто из студентов еще не прошел этот опрос
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }

    const filteredResults = studentResults.filter((student) => {
        const matchesGroup =
            selectedGroup === "all" || student.groupCode === selectedGroup;
        const matchesSearch = student.student.userName
            .toLowerCase()
            .includes(searchStudent.toLowerCase());
        return matchesGroup && matchesSearch;
    });

    const averageGrade =
        filteredResults.length > 0
            ? (
                  filteredResults.reduce((sum, s) => sum + s.grade, 0) /
                  filteredResults.length
              ).toFixed(1)
            : 0;

    const uniqueGroups = Array.from(
        new Set(studentResults.map((s) => s.groupCode))
    ).sort();

    return (
        <div className="min-h-[calc(100vh-theme(spacing.16)-theme(spacing.16))] bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-gray-900 mb-2">
                            Результаты опроса
                        </h1>
                        <div className="flex items-center gap-4 text-gray-600">
                            <div className="flex items-center gap-1">
                                <BookOpen className="h-4 w-4" />
                                <span>{teacherSurveyResults.surveyName}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <Button
                            variant="outline"
                            onClick={handleReturnToDashboard}
                        >
                            Назад
                        </Button>
                    </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4 mb-8">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-lg bg-sky-100 flex items-center justify-center">
                                    <Users className="h-6 w-6 text-sky-600" />
                                </div>
                                <div>
                                    <p className="text-2xl text-gray-900">
                                        {filteredResults.length}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        Участников
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center">
                                    <TrendingUp className="h-6 w-6 text-green-600" />
                                </div>
                                <div>
                                    <p className="text-2xl text-gray-900">
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
                <Tabs defaultValue="students" className="space-y-6">
                    <TabsContent value="students" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>
                                    Список студентов с оценками
                                </CardTitle>
                                <CardDescription>
                                    Фильтруйте по группе или ищите по имени
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex gap-4">
                                    <div className="flex-1">
                                        <div className="relative">
                                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                            <Input
                                                placeholder="Поиск по имени студента..."
                                                value={searchStudent}
                                                onChange={(e) =>
                                                    setSearchStudent(
                                                        e.target.value
                                                    )
                                                }
                                                className="pl-10"
                                            />
                                        </div>
                                    </div>
                                    <Select
                                        value={selectedGroup}
                                        onValueChange={setSelectedGroup}
                                    >
                                        <SelectTrigger className="w-[200px]">
                                            <SelectValue placeholder="Все группы" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">
                                                Все группы
                                            </SelectItem>
                                            {uniqueGroups.map((group) => (
                                                <SelectItem
                                                    key={group}
                                                    value={group}
                                                >
                                                    {group}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                {loading ? (
                                    <div className="text-center py-8 text-gray-600">
                                        Загрузка данных...
                                    </div>
                                ) : (
                                    <div className="border rounded-lg">
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead className="text-center">
                                                        №
                                                    </TableHead>
                                                    <TableHead className="text-center">
                                                        ФИО студента
                                                    </TableHead>
                                                    <TableHead className="text-center">
                                                        Группа
                                                    </TableHead>
                                                    <TableHead className="text-center">
                                                        Оценка
                                                    </TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {filteredResults.map(
                                                    (student, index) => (
                                                        <TableRow
                                                            key={
                                                                student.studentGradeId
                                                            }
                                                        >
                                                            <TableCell className="text-center">
                                                                {index + 1}
                                                            </TableCell>
                                                            <TableCell className="text-center font-medium">
                                                                {
                                                                    student
                                                                        .student
                                                                        .userName
                                                                }
                                                            </TableCell>
                                                            <TableCell className="text-center">
                                                                <Badge variant="outline">
                                                                    {
                                                                        student.groupCode
                                                                    }
                                                                </Badge>
                                                            </TableCell>
                                                            <TableCell className="text-center font-medium text-sky-600">
                                                                {student.grade}
                                                            </TableCell>
                                                        </TableRow>
                                                    )
                                                )}
                                            </TableBody>
                                        </Table>
                                    </div>
                                )}
                                {!loading && filteredResults.length === 0 && (
                                    <div className="text-center py-8 text-gray-600">
                                        Студенты не найдены
                                    </div>
                                )}
                                {!loading && (
                                    <div className="flex items-center justify-between pt-4 border-t">
                                        <p className="text-sm text-gray-600">
                                            Показано {filteredResults.length} из{" "}
                                            {studentResults.length} студентов
                                        </p>
                                        <div className="flex gap-2">
                                            <Badge
                                                variant="outline"
                                                className="bg-green-50 text-green-700 border-green-200"
                                            >
                                                Средний балл группы:{" "}
                                                {averageGrade}
                                            </Badge>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
