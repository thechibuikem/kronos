import LoginPage from "./features/auth/pages/LoginPage";
import Dashboard from "./features/home/pages/Dashboard";
import Update from "./features/watchlist/pages/Update";
import Repositories from "./features/repositories/pages/Repositories";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./protectedRoute";
import PublicRoute from "./PublicRoute";
import { AppProvider } from "./api/Context";
export const baseBackendUrl = `${import.meta.env.VITE_BASE_BACKEND_URL}`;
// export const baseBackendUrl = "http://localhost:5000/";
// localhost:5000

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
              <Repositories />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AppProvider>
  );
}

export default App;
