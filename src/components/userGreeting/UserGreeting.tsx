import type { UserName } from "../../types/auth";

interface UserGreetingProps {
    userName: UserName;
}

export function UserGreeting({ userName }: UserGreetingProps) {
    return (
        <div className="mb-8">
            <h1 className="text-gray-900 mb-2">Здравствуйте, {userName}!</h1>
            <p className="text-gray-600">Личный кабинет студента</p>
        </div>
    );
}
