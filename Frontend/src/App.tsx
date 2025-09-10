import { Toaster } from "@/components/UI/toaster";
import { Toaster as Sonner } from "@/components/UI/sonner";
import { TooltipProvider } from "@/components/UI/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/context/AuthContext";
  import ProtectedRoute from "@/components/ProtectedRoute";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminDashboard from "./pages/admin/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";  
import StoreOwnerDashboard from "./pages/StoreOwnerDashboard";
import Unauthorized from "./pages/Unauthorized";
import NotFound from "./pages/NotFound";

// ✅ Import ThemeToggle
import { ThemeToggle } from "./components/UI/ThemeToggle";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const { user, isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route 
        path="/" 
        element={
          isAuthenticated ? (
            user?.role === 'admin' ? (
              <Navigate to="/admin" replace />
            ) : user?.role === 'store_owner' ? (
              <Navigate to="/store-owner" replace />
            ) : (
              <Navigate to="/user" replace />
            )
          ) : (
            <Navigate to="/login" replace />
          )
        } 
      />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/unauthorized" element={<Unauthorized open={false} onOpenChange={function (open: boolean): void {
        throw new Error("Function not implemented.");
      } } onSave={function (): void {
        throw new Error("Function not implemented.");
      } } />} />
      
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/user/*"
        element={
          <ProtectedRoute allowedRoles={['user']}>
            <UserDashboard />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/store-owner/*"
        element={
          <ProtectedRoute allowedRoles={['store_owner']}>
            <StoreOwnerDashboard />
          </ProtectedRoute>
        }
      />

      {/* Keep your existing routes for backward compatibility */}
      <Route 
        path="/admin/dashboard" 
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/user/dashboard" 
        element={
          <ProtectedRoute allowedRoles={['user']}>
            <UserDashboard />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/owner/dashboard" 
        element={
          <ProtectedRoute allowedRoles={['store_owner']}>
            <StoreOwnerDashboard />
          </ProtectedRoute>
        } 
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          {/* ✅ Add ThemeToggle globally (like a header / top bar) */}
          <div className="w-full flex justify-end p-4 bg-background border-b border-border">
            <ThemeToggle />
          </div>

          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;