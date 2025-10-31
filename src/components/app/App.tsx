import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from "react-router-dom";
import { MainPage } from "../pages/MainPage";
import { LoginPage } from "../pages/LoginPage";
import { CreatingPasswordPage } from "../pages/CreatingPasswordPage";
import { StudentPage } from "../pages/StudentPage";
import { NotFoundPage } from "../pages/NotFoundPage";

function App() {
    // const isAuth = true;
    // const userRole = "student";

    // const ProtectedRoute = ({
    //     children,
    //     requiredRole,
    // }: {
    //     children: React.ReactNode;
    //     requiredRole?: string;
    // }) => {
    //     if (!isAuth) {
    //         return <Navigate to="/login" />;
    //     }

    //     if (requiredRole && userRole !== requiredRole) {
    //         return <Navigate to="/" />;
    //     }

    //     return children;
    // };

    // const PublicRoute = ({ children }: { children: React.ReactNode }) => {
    //     return !isAuth ? children : <Navigate to="/" />;
    // };

    return <StudentPage />;

    // return (
    //     <Router>
    //         <Routes>
    //             <Route path="/" element={<MainPage />} />
    //             <Route
    //                 path="/login"
    //                 element={
    //                     <PublicRoute>
    //                         <LoginPage />
    //                     </PublicRoute>
    //                 }
    //             />
    //             <Route
    //                 path="/creating_password"
    //                 element={
    //                     <PublicRoute>
    //                         <CreatingPasswordPage />
    //                     </PublicRoute>
    //                 }
    //             />
    //             <Route
    //                 path="/student_page"
    //                 element={
    //                     <ProtectedRoute requiredRole="student">
    //                         <StudentPage />
    //                     </ProtectedRoute>
    //                 }
    //             />
    //             <Route path="*" element={<NotFoundPage />} />
    //         </Routes>
    //     </Router>
    // );
}

export default App;
