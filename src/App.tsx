import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./protectedRoute";
import PublicRoute from "./PublicRoute";
function App() {
  return (
    <Routes>
      <Route path="/" element={
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
    </Routes>
  );
}

export default App;
