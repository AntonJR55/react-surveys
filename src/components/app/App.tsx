import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
    useNavigate,
    useLocation,
} from "react-router-dom";
import { Header } from "../header/Header";
import { MainPage } from "../pages/MainPage";
import { AuthPage } from "../pages/AuthPage";
import { StudentPage } from "../pages/StudentPage";
import { SurveyCompletionPage } from "../pages/SurveyCompletionPage";
import { NotFoundPage } from "../pages/NotFoundPage";

export function App() {
    return (
        <Router>
            <AppContent />
        </Router>
    );
}

function AppContent() {
    const navigate = useNavigate();
    const location = useLocation();

    const storedUserData = sessionStorage.getItem("userData");
    const userData = storedUserData ? JSON.parse(storedUserData) : null;
    const isAuthUser = !!userData;
    const userName = userData?.userName;
    const userRole = userData?.roleNameEn;
    const isAuthPage = location.pathname === "/login";

    const ProtectedRoute = ({
        children,
        requiredRole,
    }: {
        children: React.ReactNode;
        requiredRole: string;
    }) => {
        if (!isAuthUser) {
            return <Navigate to="/login" replace />;
        }

        if (userRole !== requiredRole) {
            return <Navigate to="/" replace />;
        }

        return children;
    };

    const handleLoginNavigate = () => {
        navigate("/login");
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Header
                isSimplified={isAuthPage}
                isAuthUser={isAuthUser}
                userRole={userRole}
                userName={userName}
                onHandleLoginNavigate={handleLoginNavigate}
            />
            <main className="flex-1">
                <Routes>
                    <Route
                        path="/"
                        element={
                            <MainPage
                                onHandleLoginNavigate={handleLoginNavigate}
                            />
                        }
                    />
                    <Route path="/login" element={<AuthPage />} />
                    <Route
                        path="/dashboard/student"
                        element={
                            <ProtectedRoute requiredRole="student">
                                <StudentPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/dashboard/student/survey-completion/:surveyId"
                        element={
                            <ProtectedRoute requiredRole="student">
                                <SurveyCompletionPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/dashboard/teacher"
                        element={
                            <ProtectedRoute requiredRole="teacher">
                                <StudentPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </main>
        </div>
    );
}
