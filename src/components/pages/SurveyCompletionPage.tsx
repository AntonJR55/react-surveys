import { useState } from "react";
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
import { Checkbox } from "../UI/Checkbox";
import { Textarea } from "../UI/Textarea";
import { Label } from "../UI/Label";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";

interface SurveyTakeProps {
    onComplete?: () => void;
    showScore?: boolean;
}

const mockSurvey = {
    title: "Оценка качества преподавания",
    description:
        "Пожалуйста, ответьте на вопросы для улучшения качества образовательного процесса",
    questions: [
        {
            id: 1,
            text: "Насколько понятно преподаватель объясняет материал?",
            type: "single",
            options: [
                "Очень понятно",
                "Понятно",
                "Скорее понятно",
                "Непонятно",
                "Совсем непонятно",
            ],
        },
        {
            id: 2,
            text: "Какие методы обучения использует преподаватель? (можно выбрать несколько)",
            type: "multiple",
            options: [
                "Лекции",
                "Практические занятия",
                "Групповые проекты",
                "Самостоятельная работа",
                "Онлайн материалы",
            ],
        },
        {
            id: 3,
            text: "Насколько актуален изучаемый материал?",
            type: "single",
            options: [
                "Очень актуален",
                "Актуален",
                "Скорее актуален",
                "Устарел",
                "Совсем не актуален",
            ],
        },
        {
            id: 4,
            text: "Ваши предложения по улучшению курса",
            type: "text",
            options: [],
        },
    ],
};

export function SurveyCompletionPage({
    onComplete,
    showScore = true,
}: SurveyTakeProps) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<Record<number, any>>({});
    const [isCompleted, setIsCompleted] = useState(false);
    const [finalScore, setFinalScore] = useState(0);

    const totalQuestions = mockSurvey.questions.length;
    const progress = ((currentQuestion + 1) / totalQuestions) * 100;
    const question = mockSurvey.questions[currentQuestion];

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

    const handleComplete = () => {
        console.log("Survey answers:", answers);

        const mockScore = Math.floor(Math.random() * 30) + 70;
        setFinalScore(mockScore);
        setIsCompleted(true);

        if (!showScore) {
            onComplete?.();
        }
    };

    const handleSingleAnswer = (value: string) => {
        setAnswers({ ...answers, [question.id]: value });
    };

    const handleMultipleAnswer = (value: string, checked: boolean) => {
        const currentAnswers = answers[question.id] || [];
        if (checked) {
            setAnswers({
                ...answers,
                [question.id]: [...currentAnswers, value],
            });
        } else {
            setAnswers({
                ...answers,
                [question.id]: currentAnswers.filter(
                    (a: string) => a !== value
                ),
            });
        }
    };

    const handleTextAnswer = (value: string) => {
        setAnswers({ ...answers, [question.id]: value });
    };

    const isAnswered =
        answers[question.id] !== undefined &&
        (question.type === "text" ||
            (question.type === "single" && answers[question.id]) ||
            (question.type === "multiple" && answers[question.id]?.length > 0));

    if (isCompleted && showScore) {
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
                                {finalScore}
                            </p>
                            <p className="text-gray-600">из 100 баллов</p>
                            <div className="mt-4 w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-sky-500 rounded-full transition-all duration-1000"
                                    style={{ width: `${finalScore}%` }}
                                />
                            </div>
                        </div>

                        <p className="text-sm text-gray-600 mb-6">
                            Результаты опроса будут учтены при оценке качества
                            преподавания.
                            <br />
                            Вы можете просмотреть свои результаты в личном
                            кабинете.
                        </p>

                        <Button
                            onClick={onComplete}
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
                        <CardTitle>{mockSurvey.title}</CardTitle>
                        <CardDescription>
                            {mockSurvey.description}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-4">
                            <h3 className="text-gray-900">
                                {currentQuestion + 1}. {question.text}
                            </h3>
                            {question.type === "single" && (
                                <RadioGroup
                                    value={answers[question.id]}
                                    onValueChange={handleSingleAnswer}
                                    className="space-y-3"
                                >
                                    {question.options.map((option, idx) => (
                                        <div
                                            key={idx}
                                            className="flex items-center space-x-2"
                                        >
                                            <RadioGroupItem
                                                value={option}
                                                id={`q${question.id}-${idx}`}
                                            />
                                            <Label
                                                htmlFor={`q${question.id}-${idx}`}
                                                className="cursor-pointer text-gray-700"
                                            >
                                                {option}
                                            </Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            )}
                            {question.type === "multiple" && (
                                <div className="space-y-3">
                                    {question.options.map((option, idx) => (
                                        <div
                                            key={idx}
                                            className="flex items-center space-x-2"
                                        >
                                            <Checkbox
                                                id={`q${question.id}-${idx}`}
                                                checked={answers[
                                                    question.id
                                                ]?.includes(option)}
                                                onCheckedChange={(checked) =>
                                                    handleMultipleAnswer(
                                                        option,
                                                        checked === true
                                                    )
                                                }
                                            />
                                            <Label
                                                htmlFor={`q${question.id}-${idx}`}
                                                className="cursor-pointer text-gray-700"
                                            >
                                                {option}
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                            )}
                            {question.type === "text" && (
                                <Textarea
                                    placeholder="Введите ваш ответ..."
                                    value={answers[question.id] || ""}
                                    onChange={(e) =>
                                        handleTextAnswer(e.target.value)
                                    }
                                    className="min-h-[120px]"
                                />
                            )}
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
