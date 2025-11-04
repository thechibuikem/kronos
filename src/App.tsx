import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import Update from "./pages/Update";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./protectedRoute";
import PublicRoute from "./PublicRoute";
import { AppProvider } from "./Context/Context";
function App() {
  return (
    <AppProvider>
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
      {/* protected update route */}
      <Route
        path="/update"
        element={
          <ProtectedRoute>
            <Update />
          </ProtectedRoute>
        }
      />

    </Routes>
</AppProvider>
  );
}

export default App;
