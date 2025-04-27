import { Provider } from 'react-redux';
import { store } from './store/store';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/dashboard/Dashboard";
import AccountSettings from "./pages/dashboard/AccountSettings";
import RoomSettings from "./pages/dashboard/RoomSettings";
import JoinRoom from "./pages/dashboard/JoinRoom";
import MeetingRoom from "./pages/MeetingRoom";
import NotFound from "./pages/NotFound";
import Pricing from "./pages/Pricing";
import Checkout from "./pages/Checkout";

const queryClient = new QueryClient();

const App = () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/pricing" element={<Pricing />} />
              
              {/* Protected Routes */}
              <Route path="/checkout/:planId" element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              } />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/dashboard/account" element={
                <ProtectedRoute>
                  <AccountSettings />
                </ProtectedRoute>
              } />
              <Route path="/dashboard/room" element={
                <ProtectedRoute>
                  <RoomSettings />
                </ProtectedRoute>
              } />
              <Route path="/dashboard/join" element={
                <ProtectedRoute requireSubscription>
                  <JoinRoom />
                </ProtectedRoute>
              } />
              
              {/* Meeting Room Route */}
              <Route path="/:subdomain" element={<MeetingRoom />} />
              
              {/* Catch-all Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </Provider>
);

export default App;
