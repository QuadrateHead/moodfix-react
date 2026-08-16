import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import PublicRoute from "./components/PublicRoute.tsx";
import { AuthProvider } from "./context/AuthContext";
import HomePage from "./pages/HomePage";
import MoviePage from "./pages/MoviePage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient()
function App() {
  return (
    <HashRouter>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route path="/login" element={<PublicRoute><SignInPage /></PublicRoute>} />
            <Route path="/signup" element={<PublicRoute><SignUpPage /></PublicRoute>} />
            <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
            <Route path="/movie/:id" element={<ProtectedRoute><MoviePage /></ProtectedRoute>} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </QueryClientProvider>
      </AuthProvider>
    </HashRouter>
  );
}

export default App;
