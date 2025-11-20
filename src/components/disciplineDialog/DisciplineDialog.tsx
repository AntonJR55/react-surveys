import { useState } from "react";
import { Plus } from "lucide-react";
import toast from "react-hot-toast";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../UI/Dialog";
import { Button } from "../UI/Button";
import { Input } from "../UI/Input";
import { Label } from "../UI/Label";
import { Checkbox } from "../UI/Checkbox";
import { Badge } from "../UI/Badge";
import type { ITeacher } from "../pages/AdminPage";
import type { IGroup } from "../pages/AdminPage";
import { useDisciplinesService } from "../../hooks/useDisciplinesService";

interface DisciplineDialogProps {
    teachers: ITeacher[];
    groups: IGroup[];
    onFetchDisciplines: () => void;
}

export function DisciplineDialog({
    teachers,
    groups,
    onFetchDisciplines,
}: DisciplineDialogProps) {
    const [newDisciplineName, setNewDisciplineName] = useState("");
    const [selectedTeachers, setSelectedTeachers] = useState<ITeacher[]>([]);
    const [selectedGroups, setSelectedGroups] = useState<string[]>([]);

    const { createDiscipline } = useDisciplinesService();

    const handleTeacherToggle = (teacher: ITeacher) => {
        const isSelected = selectedTeachers.some(
            (t) => t.userId === teacher.userId
        );

        if (isSelected) {
            setSelectedTeachers(
                selectedTeachers.filter((t) => t.userId !== teacher.userId)
            );
        } else {
            setSelectedTeachers([
                ...selectedTeachers,
                {
                    userId: teacher.userId,
                    userName: teacher.userName,
                },
            ]);
        }
    };

    const handleGroupToggle = (groupCode: string) => {
        if (selectedGroups.includes(groupCode)) {
            setSelectedGroups(selectedGroups.filter((g) => g !== groupCode));
        } else {
            setSelectedGroups([...selectedGroups, groupCode]);
        }
    };

    const handleSave = async () => {
        try {
            const disciplineObj = {
                disciplineName: newDisciplineName,
                teachersIds: selectedTeachers.map((teacher) => teacher.userId),
                groupsCodes: selectedGroups,
            };
            await createDiscipline(disciplineObj);

            toast.success("Дисциплина успешно создана", {
                duration: 3000,
            });

            setNewDisciplineName("");
            setSelectedTeachers([]);
            setSelectedGroups([]);

            onFetchDisciplines();
        } catch (error) {
            toast.error("Не удалось создать дисциплину", {
                duration: 3000,
            });
        }
    };

    const isFormValid =
        newDisciplineName.trim() &&
        selectedTeachers.length > 0 &&
        selectedGroups.length > 0;

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="gap-2 bg-sky-500 hover:bg-sky-600">
                    <Plus className="h-4 w-4" />
                    Добавить дисциплину
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Добавить новую дисциплину</DialogTitle>
                    <DialogDescription>
                        Заполните название дисциплины, выберите преподавателей и
                        группы
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-6 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="discipline-name">
                            Название дисциплины *
                        </Label>
                        <Input
                            id="discipline-name"
                            placeholder="Например: Высшая математика"
                            value={newDisciplineName}
                            onChange={(e) =>
                                setNewDisciplineName(e.target.value)
                            }
                        />
                    </div>
                    <div className="space-y-3">
                        <Label>Преподаватели *</Label>
                        {selectedTeachers.length > 0 && (
                            <div className="flex flex-wrap gap-2 p-3 bg-sky-50 rounded-lg border border-sky-200">
                                {selectedTeachers.map((teacher) => (
                                    <Badge
                                        key={teacher.userId}
                                        variant="outline"
                                        className="bg-white gap-1 pr-1"
                                    >
                                        {teacher.userName}
                                    </Badge>
                                ))}
                            </div>
                        )}
                        <div className="border rounded-lg p-4 space-y-3 max-h-48 overflow-y-auto bg-gray-50">
                            {teachers.map((teacher) => (
                                <div
                                    key={teacher.userId}
                                    className="flex items-center space-x-2"
                                >
                                    <Checkbox
                                        id={`teacher-${teacher.userId}`}
                                        checked={selectedTeachers.some(
                                            (t) => t.userId === teacher.userId
                                        )}
                                        onCheckedChange={() =>
                                            handleTeacherToggle(teacher)
                                        }
                                    />
                                    <Label
                                        htmlFor={`teacher-${teacher.userId}`}
                                        className="cursor-pointer flex-1"
                                    >
                                        {teacher.userName}
                                    </Label>
                                </div>
                            ))}
                        </div>
                        <p className="text-sm text-gray-600">
                            Выбрано: {selectedTeachers.length}{" "}
                            {selectedTeachers.length === 1
                                ? "преподаватель"
                                : "преподавателя(ей)"}
                        </p>
                    </div>
                    <div className="space-y-3">
                        <Label>Группы *</Label>
                        {selectedGroups.length > 0 && (
                            <div className="flex flex-wrap gap-2 p-3 bg-green-50 rounded-lg border border-green-200">
                                {selectedGroups.map((group) => (
                                    <Badge
                                        key={group}
                                        variant="outline"
                                        className="bg-white gap-1 pr-1"
                                    >
                                        {group}
                                    </Badge>
                                ))}
                            </div>
                        )}
                        <div className="border rounded-lg p-4 space-y-3 max-h-48 overflow-y-auto bg-gray-50">
                            {groups.map((group) => (
                                <div
                                    key={group.groupCode}
                                    className="flex items-center space-x-2"
                                >
                                    <Checkbox
                                        id={`group-${group.groupCode}`}
                                        checked={selectedGroups.includes(
                                            group.groupCode
                                        )}
                                        onCheckedChange={() =>
                                            handleGroupToggle(group.groupCode)
                                        }
                                    />
                                    <Label
                                        htmlFor={`group-${group.groupCode}`}
                                        className="cursor-pointer flex-1"
                                    >
                                        {group.groupCode}
                                    </Label>
                                </div>
                            ))}
                        </div>
                        <p className="text-sm text-gray-600">
                            Выбрано: {selectedGroups.length}{" "}
                            {selectedGroups.length === 1
                                ? "группа"
                                : "групп(ы)"}
                        </p>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline">Отмена</Button>
                    <Button
                        className="bg-sky-500 hover:bg-sky-600"
                        onClick={handleSave}
                        disabled={!isFormValid}
                    >
                        Сохранить
                    </Button>
                </DialogFooter>

                {!isFormValid && (
                    <p className="text-sm text-red-600 text-center -mt-2">
                        Заполните все обязательные поля *
                    </p>
                )}
            </DialogContent>
        </Dialog>
    );
}
