import { useEffect, useState } from "react";
import { Users, BookOpen, GraduationCap, Shield, Plus } from "lucide-react";
import toast from "react-hot-toast";
import { useUsersService } from "../../hooks/useUsersServive";
import { useGroupsService } from "../../hooks/useGroupsService";
import { useRolesService } from "../../hooks/useRolesService";
import { useDisciplinesService } from "../../hooks/useDisciplinesService";
import { DisciplineDialog } from "../disciplineDialog/DisciplineDialog";
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
import { Badge } from "../UI/Badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../UI/Tabs";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../UI/Table";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../UI/Dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../UI/Select";

interface IUser {
    userId: number;
    userName: string;
    role: IRole;
}

export interface ITeacher extends Omit<IUser, "role"> {}

interface IUserWithGroup extends IUser {
    groupCode: string | null;
}

interface IRole {
    roleNameEn: string;
    roleNameRu: string;
}

export interface IGroup {
    groupCode: string;
}

interface IDiscipline {
    disciplineId: number;
    disciplineName: string;
    groups: IGroup[];
    teachers: ITeacher[];
}

export function AdminPage() {
    const [activeTab, setActiveTab] = useState("users");
    const [users, setUsers] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [groups, setGroups] = useState([]);
    const [disciplines, setDisciplines] = useState([]);
    const [newUserName, setNewUserName] = useState("");
    const [selectedRole, setSelectedRole] = useState("");
    const [selectedGroup, setSelectedGroup] = useState("");
    const [newGroupCode, setNewGroupCode] = useState("");

    const {
        getAllUsersDetailed,
        getAllTeachers,
        createStudent,
        createEmployee,
    } = useUsersService();
    const { getAllRoles } = useRolesService();
    const { createGroup, getAllGroups } = useGroupsService();
    const { getAllDisciplinesDetailed } = useDisciplinesService();

    const storedUserData = sessionStorage.getItem("userData");
    const adminData = storedUserData ? JSON.parse(storedUserData) : null;
    const userName = adminData.userName;

    useEffect(() => {
        fetchUsers();
        fetchTeachers();
        fecthRoles();
        fetchGroups();
        fecthDisciplines();
    }, []);

    const fetchUsers = async () => {
        const users = await getAllUsersDetailed();
        setUsers(users);
    };

    const fetchTeachers = async () => {
        const teachers = await getAllTeachers();
        setTeachers(teachers);
    };

    const fecthRoles = async () => {
        const roles = await getAllRoles();
        setRoles(roles);
    };

    const fetchGroups = async () => {
        const groups = await getAllGroups();
        setGroups(groups);
    };

    const fecthDisciplines = async () => {
        const disciplines = await getAllDisciplinesDetailed();
        setDisciplines(disciplines);
    };

    const handleCreateUser = async () => {
        try {
            if (selectedRole === "student") {
                await createStudent(newUserName, selectedRole, selectedGroup);
            } else {
                await createEmployee(newUserName, selectedRole);
            }

            toast.success("Пользователь успешно создан", {
                duration: 3000,
            });

            setNewUserName("");
            setSelectedRole("");
            setSelectedGroup("");

            fetchUsers();
            fetchTeachers();
        } catch (error) {
            toast.error("Не удалось создать пользователя", {
                duration: 3000,
            });
        }
    };

    const handleCreateGroup = async () => {
        try {
            await createGroup(newGroupCode);

            toast.success("Группа успешно создана", {
                duration: 3000,
            });

            setNewGroupCode("");
            fetchGroups();
        } catch (error) {
            toast.error("Не удалось создать группу", {
                duration: 3000,
            });
        }
    };

    const isStudentRole = selectedRole === "student";

    return (
        <div className="min-h-[calc(100vh-theme(spacing.16)-theme(spacing.16))] bg-gray-50 py-8">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-gray-900 mb-2 flex items-center gap-2">
                            <Shield className="h-8 w-8 text-sky-600" />
                            Панель администратора
                        </h1>
                        <p className="text-gray-600">
                            Здравствуйте, {userName}!
                        </p>
                    </div>
                </div>
                <div className="grid md:grid-cols-3 gap-3 mb-8">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-lg bg-sky-100 flex items-center justify-center">
                                    <Users className="h-6 w-6 text-sky-600" />
                                </div>
                                <div>
                                    <p className="text-2xl text-gray-900">
                                        {users.length}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        Пользователей
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center">
                                    <GraduationCap className="h-6 w-6 text-green-600" />
                                </div>
                                <div>
                                    <p className="text-2xl text-gray-900">
                                        {groups.length}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        Групп
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
                                    <p className="text-2xl text-gray-900">
                                        {disciplines.length}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        Дисциплин
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
                        <TabsTrigger value="users">Пользователи</TabsTrigger>
                        <TabsTrigger value="groups">Группы</TabsTrigger>
                        <TabsTrigger value="disciplines">
                            Дисциплины
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="users">
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle>
                                            Управление пользователями
                                        </CardTitle>
                                        <CardDescription>
                                            Создание и просмотр пользователей
                                        </CardDescription>
                                    </div>
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button className="gap-2 bg-sky-500 hover:bg-sky-600">
                                                <Plus className="h-4 w-4" />
                                                Добавить пользователя
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle className="text-center">
                                                    Добавить нового пользователя
                                                </DialogTitle>
                                            </DialogHeader>
                                            <div className="space-y-4 py-4">
                                                <div className="space-y-2">
                                                    <Label>ФИО</Label>
                                                    <Input
                                                        placeholder="Введите ФИО..."
                                                        value={newUserName}
                                                        onChange={(e) =>
                                                            setNewUserName(
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label>Роль</Label>
                                                    <Select
                                                        value={selectedRole}
                                                        onValueChange={
                                                            setSelectedRole
                                                        }
                                                    >
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Выберите роль..." />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {roles.map(
                                                                (
                                                                    role: IRole
                                                                ) => (
                                                                    <SelectItem
                                                                        value={
                                                                            role.roleNameEn
                                                                        }
                                                                    >
                                                                        {
                                                                            role.roleNameRu
                                                                        }
                                                                    </SelectItem>
                                                                )
                                                            )}
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                                {isStudentRole && (
                                                    <div className="space-y-2">
                                                        <Label>Группа</Label>
                                                        <Select
                                                            value={
                                                                selectedGroup
                                                            }
                                                            onValueChange={
                                                                setSelectedGroup
                                                            }
                                                        >
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Выберите группу..." />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {groups.map(
                                                                    (
                                                                        group: IGroup
                                                                    ) => (
                                                                        <SelectItem
                                                                            value={
                                                                                group.groupCode
                                                                            }
                                                                        >
                                                                            {
                                                                                group.groupCode
                                                                            }
                                                                        </SelectItem>
                                                                    )
                                                                )}
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                )}
                                            </div>
                                            <DialogFooter>
                                                <Button
                                                    className="bg-sky-500 hover:bg-sky-600"
                                                    onClick={handleCreateUser}
                                                    disabled={
                                                        !newUserName ||
                                                        !selectedRole ||
                                                        (isStudentRole &&
                                                            !selectedGroup)
                                                    }
                                                >
                                                    Добавить
                                                </Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="border rounded-lg">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead className="text-center">
                                                    ФИО
                                                </TableHead>
                                                <TableHead className="text-center">
                                                    Роль
                                                </TableHead>
                                                <TableHead className="text-center">
                                                    Группа
                                                </TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {users.map(
                                                (user: IUserWithGroup) => (
                                                    <TableRow key={user.userId}>
                                                        <TableCell className="text-center font-medium">
                                                            {user.userName}
                                                        </TableCell>
                                                        <TableCell className="text-center">
                                                            <Badge
                                                                variant="outline"
                                                                className="mx-auto"
                                                            >
                                                                {
                                                                    user.role
                                                                        .roleNameRu
                                                                }
                                                            </Badge>
                                                        </TableCell>
                                                        <TableCell className="text-center">
                                                            {user.groupCode ? (
                                                                <Badge
                                                                    variant="outline"
                                                                    className="mx-auto"
                                                                >
                                                                    {
                                                                        user.groupCode
                                                                    }
                                                                </Badge>
                                                            ) : (
                                                                <span className="text-gray-400">
                                                                    —
                                                                </span>
                                                            )}
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            )}
                                        </TableBody>
                                    </Table>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="groups">
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle>
                                            Управление группами
                                        </CardTitle>
                                        <CardDescription>
                                            Создание и просмотр учебных групп
                                        </CardDescription>
                                    </div>
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button className="gap-2 bg-sky-500 hover:bg-sky-600">
                                                <Plus className="h-4 w-4" />
                                                Добавить группу
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle className="text-center">
                                                    Добавить новую группу
                                                </DialogTitle>
                                            </DialogHeader>
                                            <div className="space-y-4 py-4">
                                                <div className="space-y-2">
                                                    <Label>
                                                        Название группы
                                                    </Label>
                                                    <Input
                                                        placeholder="Например: ИВТ-201"
                                                        value={newGroupCode}
                                                        onChange={(e) =>
                                                            setNewGroupCode(
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <DialogFooter>
                                                <Button
                                                    className="bg-sky-500 hover:bg-sky-600"
                                                    onClick={handleCreateGroup}
                                                >
                                                    Добавить
                                                </Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="border rounded-lg">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead className="text-center">
                                                    Название
                                                </TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {groups.map((group: IGroup) => (
                                                <TableRow key={group.groupCode}>
                                                    <TableCell className="text-center font-medium">
                                                        {group.groupCode}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="disciplines">
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle>
                                            Управление дисциплинами
                                        </CardTitle>
                                        <CardDescription>
                                            Создание и просмотр дисциплин
                                        </CardDescription>
                                    </div>
                                    <DisciplineDialog
                                        teachers={teachers}
                                        groups={groups}
                                        onFetchDisciplines={fecthDisciplines}
                                    />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="border rounded-lg">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead className="text-center">
                                                    Название
                                                </TableHead>
                                                <TableHead className="text-center">
                                                    Преподаватель
                                                </TableHead>
                                                <TableHead className="text-center">
                                                    Группы
                                                </TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {disciplines.map(
                                                (discipline: IDiscipline) => (
                                                    <TableRow
                                                        key={
                                                            discipline.disciplineId
                                                        }
                                                    >
                                                        <TableCell className="font-medium text-center">
                                                            {
                                                                discipline.disciplineName
                                                            }
                                                        </TableCell>
                                                        <TableCell className="text-center">
                                                            {discipline.teachers
                                                                ?.length > 0
                                                                ? discipline.teachers
                                                                      .map(
                                                                          (
                                                                              teacher
                                                                          ) =>
                                                                              teacher.userName
                                                                      )
                                                                      .join(
                                                                          ", "
                                                                      )
                                                                : "—"}
                                                        </TableCell>
                                                        <TableCell className="text-center">
                                                            {discipline.groups
                                                                ?.length > 0
                                                                ? discipline.groups
                                                                      .map(
                                                                          (
                                                                              group
                                                                          ) =>
                                                                              group.groupCode
                                                                      )
                                                                      .join(
                                                                          ", "
                                                                      )
                                                                : "—"}
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            )}
                                        </TableBody>
                                    </Table>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
