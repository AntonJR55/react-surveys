import { UserGreeting } from "../userGreeting/UserGreeting";

export function StudentPage() {
    return (
        <div className="min-h-[calc(100vh-theme(spacing.16)-theme(spacing.16))] bg-gray-50 py-8">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <UserGreeting userName="Alex" />
            </div>
        </div>
    );
}
