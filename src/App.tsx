import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./protectedRoute";
function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
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
