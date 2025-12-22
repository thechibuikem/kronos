import LoginPage from "./features/auth/pages/LoginPage";
import Dashboard from "./features/home/pages/Dashboard";
import Update from "./features/kronList/pages/Krons";
import Repositories from "./features/repositories/pages/Repositories";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./protectedRoute";
import PublicRoute from "./PublicRoute";
import { AppProvider } from "./api/Context";
export const baseBackendUrl = `${import.meta.env.VITE_BASE_BACKEND_URL}`;
import { useAllReposHandler } from "./features/repositories/handlers/allRepo.Handlers";


// export const baseBackendUrl = "http://localhost:5000/";
// localhost:5000

function App() {
const { repos } = useAllReposHandler();

  return (
    <AppProvider>
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        {/* protected dashboard route */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        {/* protected update route */}
        <Route
          path="/update"
          element={
            <ProtectedRoute>
              <Update />
            </ProtectedRoute>
          }
        />
        {/* protected repositories route */}
        <Route
          path="/repositories"
          element={
            <ProtectedRoute>
              <Repositories searchArray={repos}/>
            </ProtectedRoute>
          }
        />
      </Routes>
    </AppProvider>
  );
}

export default App;
