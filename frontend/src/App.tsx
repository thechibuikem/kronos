import LoginPage from "./features/auth/pages/LoginPage";
import Dashboard from "./features/home/pages/Dashboard";
import Krons from "./features/kronList/pages/Krons";
import Repos from "./features/repositories/pages/Repositories";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./protectedRoute";
import PublicRoute from "./PublicRoute";
import { AppProvider } from "./api/Context";
export const baseBackendUrl = `${import.meta.env.VITE_BASE_BACKEND_URL}`;



// my frontend app structure
function App() {

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
          path="/krons"
          element={
            <ProtectedRoute>
              <Krons />
            </ProtectedRoute>
          }
        />
        {/* protected repositories route */}
        <Route
          path="/repos"
          element={
            <ProtectedRoute>
              <Repos />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AppProvider>
  );
}

export default App;
