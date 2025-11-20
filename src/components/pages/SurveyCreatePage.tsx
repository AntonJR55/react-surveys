import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Trash2, GripVertical, Save, Calendar } from "lucide-react";
import toast from "react-hot-toast";
import { useSurveysService } from "../../hooks/useSurveysService";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../UI/Card";
import { Button } from "../UI/Button";
import { Input } from "../UI/Input";
import { Label } from "../UI/Label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../UI/Select";
import { RadioGroup, RadioGroupItem } from "../UI/RadioGroup";

interface ISelectedDiscipline {
    id: number;
    name: string;
}

interface IOption {
    optionText: string;
    isAnswer: boolean;
}

interface IQuestion {
    id: number;
    text: string;
    options: IOption[];
    points: number;
}

export function SurveyCreatePage() {
    const [surveyTitle, setSurveyTitle] = useState("");
    const [selectedDiscipline, setSelectedDiscipline] =
        useState<ISelectedDiscipline | null>(null);
    const [endDate, setEndDate] = useState("");
    const [endTime, setEndTime] = useState("");
    const [questions, setQuestions] = useState<IQuestion[]>([
        {
            id: 1,
            text: "",
            options: [
                { optionText: "Вариант 1", isAnswer: false },
                { optionText: "Вариант 2", isAnswer: false },
            ],
            points: 0,
        },
    ]);

    const navigate = useNavigate();

    const { createSurvey } = useSurveysService();

    const storedUserData = sessionStorage.getItem("userData");
    const userData = storedUserData ? JSON.parse(storedUserData) : null;
    const teacherId = userData?.userId;
    const teacherName = userData?.userName;
    const availableDisciplines = userData?.availableDisciplines;
    const availableSurveys = userData?.availableSurveys;

    const addQuestion = () => {
        const newQuestion: IQuestion = {
            id: Date.now(),
            text: "",
            options: [
                { optionText: "Вариант 1", isAnswer: false },
                { optionText: "Вариант 2", isAnswer: false },
            ],
            points: 0,
        };
        setQuestions([...questions, newQuestion]);
    };

    const removeQuestion = (id: number) => {
        setQuestions(questions.filter((q) => q.id !== id));
    };

    const updateQuestion = (id: number, field: keyof IQuestion, value: any) => {
        setQuestions(
            questions.map((q) => (q.id === id ? { ...q, [field]: value } : q))
        );
    };

    const addOption = (questionId: number) => {
        setQuestions(
            questions.map((q) => {
                if (q.id === questionId) {
                    return {
                        ...q,
                        options: [
                            ...q.options,
                            {
                                optionText: `Вариант ${q.options.length + 1}`,
                                isAnswer: false,
                            },
                        ],
                    };
                }
                return q;
            })
        );
    };

    const removeOption = (questionId: number, optionIndex: number) => {
        setQuestions(
            questions.map((q) => {
                if (q.id === questionId) {
                    const newOptions = q.options.filter(
                        (_, idx) => idx !== optionIndex
                    );
                    return {
                        ...q,
                        options: newOptions,
                    };
                }
                return q;
            })
        );
    };

    const updateOption = (
        questionId: number,
        optionIndex: number,
        value: string
    ) => {
        setQuestions(
            questions.map((q) => {
                if (q.id === questionId) {
                    const newOptions = [...q.options];
                    newOptions[optionIndex] = {
                        ...newOptions[optionIndex],
                        optionText: value,
                    };
                    return {
                        ...q,
                        options: newOptions,
                    };
                }
                return q;
            })
        );
    };

    const handleCorrectAnswerChange = (
        questionId: number,
        optionIndex: number
    ) => {
        setQuestions(
            questions.map((q) => {
                if (q.id === questionId) {
                    const newOptions = q.options.map((option, idx) => ({
                        ...option,
                        isAnswer: idx === optionIndex,
                    }));
                    return {
                        ...q,
                        options: newOptions,
                    };
                }
                return q;
            })
        );
    };

    const handleSave = async () => {
        try {
            if (!selectedDiscipline?.id) {
                toast.error("Дисциплина не выбрана", { duration: 3000 });
                return;
            }

            const newSurvey = {
                surveyName: surveyTitle,
                surveyEndDate: `${endDate} ${endTime}`,
                surveyCreatedByTeacherID: teacherId,
                disciplineId: selectedDiscipline.id,
                questions: questions.map((question) => ({
                    questionText: question.text,
                    questionPoints: question.points,
                    questionOptions: question.options.map((option) => ({
                        optionText: option.optionText,
                        isAnswer: option.isAnswer,
                    })),
                })),
            };

            const res = await createSurvey(newSurvey);

            if (res && res.status === "success") {
                const updatedAvailableSurveys = [
                    ...(availableSurveys || []),
                    {
                        surveyId: res.createdSurvey.surveyId,
                        surveyName: res.createdSurvey.surveyName,
                        surveyEndDate: res.createdSurvey.surveyEndDate,
                        surveyCreatedDate: res.createdSurvey.surveyCreatedDate,
                        surveyCreatedBy: {
                            teacherId,
                            teacherName,
                        },
                        surveyOnDiscipline: {
                            disciplineId: selectedDiscipline.id,
                            disciplineName: selectedDiscipline.name,
                        },
                    },
                ];

                sessionStorage.setItem(
                    "userData",
                    JSON.stringify({
                        ...userData,
                        availableSurveys: updatedAvailableSurveys,
                    })
                );

                toast.success("Опрос успешно создан", { duration: 3000 });

                handleReturnToDashboard();
            }
        } catch (error) {
            toast.error("Не удалось создать опрос", {
                duration: 3000,
            });
        }
    };

    const handleReturnToDashboard = () => {
        navigate("/dashboard/teacher");
    };

    return (
        <div className="min-h-[calc(100vh-theme(spacing.16)-theme(spacing.16))] bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-gray-900 mb-2">Создание опроса</h1>
                        <p className="text-gray-600">
                            Заполните информацию о вашем опросе
                        </p>
                    </div>
                    <Button variant="outline" onClick={handleReturnToDashboard}>
                        Назад
                    </Button>
                </div>
                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle>Основная информация</CardTitle>
                        <CardDescription>
                            Название, описание и параметры опроса
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="title">Название опроса *</Label>
                            <Input
                                id="title"
                                placeholder="Например: Итоговый тест по программированию"
                                value={surveyTitle}
                                onChange={(e) => setSurveyTitle(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="discipline">Дисциплина *</Label>
                            <Select
                                value={selectedDiscipline?.id.toString() || ""}
                                onValueChange={(value) => {
                                    if (value) {
                                        const discipline =
                                            availableDisciplines.find(
                                                (d: any) =>
                                                    d.disciplineId.toString() ===
                                                    value
                                            );
                                        if (discipline) {
                                            setSelectedDiscipline({
                                                id: discipline.disciplineId,
                                                name: discipline.disciplineName,
                                            });
                                        }
                                    } else {
                                        setSelectedDiscipline(null);
                                    }
                                }}
                            >
                                <SelectTrigger id="discipline">
                                    <SelectValue placeholder="Выберите дисциплину...">
                                        {selectedDiscipline
                                            ? selectedDiscipline.name
                                            : ""}
                                    </SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                    {availableDisciplines.map(
                                        (discipline: any) => (
                                            <SelectItem
                                                key={discipline.disciplineId}
                                                value={discipline.disciplineId.toString()}
                                            >
                                                {discipline.disciplineName}
                                            </SelectItem>
                                        )
                                    )}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-4 border-t pt-4">
                            <Label className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                Дата и время окончания опроса *
                            </Label>
                            <div className="grid grid-cols-2 gap-4">
                                <Input
                                    id="end-date"
                                    type="date"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                />
                                <Input
                                    id="end-time"
                                    type="time"
                                    value={endTime}
                                    onChange={(e) => setEndTime(e.target.value)}
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-gray-900">Вопросы</h2>
                        <Button
                            onClick={addQuestion}
                            className="gap-2 bg-sky-500 hover:bg-sky-600"
                        >
                            <Plus className="h-4 w-4" />
                            Добавить вопрос
                        </Button>
                    </div>
                    {questions.map((question, qIndex) => (
                        <Card key={question.id}>
                            <CardContent className="pt-6 space-y-4">
                                <div className="flex items-start gap-4">
                                    <GripVertical className="h-6 w-6 text-gray-400 mt-2 cursor-move" />
                                    <div className="flex-1 space-y-4">
                                        <div className="space-y-2">
                                            <Label>Вопрос {qIndex + 1} *</Label>
                                            <Input
                                                placeholder="Введите текст вопроса..."
                                                value={question.text}
                                                onChange={(e) =>
                                                    updateQuestion(
                                                        question.id,
                                                        "text",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                        <div className="space-y-2 max-w-xs">
                                            <Label>
                                                Баллы за правильный ответ *
                                            </Label>
                                            <Input
                                                type="number"
                                                min="0"
                                                placeholder="0"
                                                value={question.points || 0}
                                                onChange={(e) =>
                                                    updateQuestion(
                                                        question.id,
                                                        "points",
                                                        parseInt(
                                                            e.target.value
                                                        ) || 0
                                                    )
                                                }
                                            />
                                        </div>
                                        <div className="space-y-4">
                                            <Label>Варианты ответов *</Label>
                                            <div className="space-y-3">
                                                <div className="space-y-3">
                                                    <RadioGroup
                                                        value={
                                                            question.options.find(
                                                                (opt) =>
                                                                    opt.isAnswer
                                                            )?.optionText || ""
                                                        }
                                                        onValueChange={(
                                                            value
                                                        ) => {
                                                            const optionIndex =
                                                                question.options.findIndex(
                                                                    (opt) =>
                                                                        opt.optionText ===
                                                                        value
                                                                );
                                                            if (
                                                                optionIndex !==
                                                                -1
                                                            ) {
                                                                handleCorrectAnswerChange(
                                                                    question.id,
                                                                    optionIndex
                                                                );
                                                            }
                                                        }}
                                                        className="space-y-3"
                                                    >
                                                        {question.options.map(
                                                            (
                                                                option,
                                                                optIndex
                                                            ) => (
                                                                <div
                                                                    key={
                                                                        optIndex
                                                                    }
                                                                    className="flex items-center space-x-2"
                                                                >
                                                                    <RadioGroupItem
                                                                        id={`q${question.id}-${optIndex}`}
                                                                        value={
                                                                            option.optionText
                                                                        }
                                                                        className="border-gray-300"
                                                                    />
                                                                    <div className="flex-1 flex gap-2">
                                                                        <Input
                                                                            placeholder={`Вариант ${
                                                                                optIndex +
                                                                                1
                                                                            }`}
                                                                            value={
                                                                                option.optionText
                                                                            }
                                                                            onChange={(
                                                                                e
                                                                            ) =>
                                                                                updateOption(
                                                                                    question.id,
                                                                                    optIndex,
                                                                                    e
                                                                                        .target
                                                                                        .value
                                                                                )
                                                                            }
                                                                        />
                                                                        {question
                                                                            .options
                                                                            .length >
                                                                            2 && (
                                                                            <Button
                                                                                variant="outline"
                                                                                size="icon"
                                                                                onClick={() =>
                                                                                    removeOption(
                                                                                        question.id,
                                                                                        optIndex
                                                                                    )
                                                                                }
                                                                            >
                                                                                <Trash2 className="h-4 w-4" />
                                                                            </Button>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            )
                                                        )}
                                                    </RadioGroup>
                                                </div>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() =>
                                                        addOption(question.id)
                                                    }
                                                    className="gap-2"
                                                >
                                                    <Plus className="h-4 w-4" />
                                                    Добавить вариант
                                                </Button>
                                                <p className="text-sm text-gray-600">
                                                    ✓ Выберите правильный ответ
                                                    для автоматической оценки
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    {questions.length > 1 && (
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() =>
                                                removeQuestion(question.id)
                                            }
                                            className="text-red-600 hover:text-red-700"
                                        >
                                            <Trash2 className="h-5 w-5" />
                                        </Button>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
                <div className="flex items-center justify-between p-6 bg-white border rounded-lg">
                    <p className="text-sm text-gray-600">
                        {questions.length}{" "}
                        {questions.length === 1 ? "вопрос" : "вопроса(ов)"}{" "}
                        добавлено
                    </p>
                    <div className="flex gap-3">
                        <Button
                            onClick={handleSave}
                            className="gap-2 bg-sky-500 hover:bg-sky-600"
                            disabled={
                                !surveyTitle ||
                                !selectedDiscipline ||
                                !endDate ||
                                questions.some(
                                    (q) =>
                                        !q.text ||
                                        !q.options.some(
                                            (opt) => opt.isAnswer
                                        ) ||
                                        q.options.length < 2
                                )
                            }
                        >
                            <Save className="h-4 w-4" />
                            Опубликовать опрос
                        </Button>
                    </div>
                </div>
                {(!surveyTitle ||
                    !selectedDiscipline ||
                    !endDate ||
                    questions.some(
                        (q) =>
                            !q.text ||
                            !q.options.some((opt) => opt.isAnswer) ||
                            q.options.length < 2
                    )) && (
                    <p className="text-sm text-red-600 text-center mt-2">
                        Заполните все обязательные поля (отмечены *) и
                        убедитесь, что у каждого вопроса есть текст, выбран
                        правильный ответ и минимум 2 варианта
                    </p>
                )}
            </div>
        </div>
    );
}
