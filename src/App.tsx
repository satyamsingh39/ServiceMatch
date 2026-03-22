

//new
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Chatbot from "./components/Chatbot";
import Layout from "./components/Layout";

// ===== Public pages =====
import Index from "./pages/Index";
import Contact from "./pages/Contact";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import LearnMore from "./pages/LearnMore";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import CookiePolicy from "./pages/CookiePolicy";
import Accessibility from "./pages/Accessibility";
import NotFound from "./pages/NotFound";

// ===== Waiter pages =====
import Dashboard from "./waiter/Dashboard";
import FindJobs from "./waiter/FindJobs";
import Profile from "./waiter/Profile";
import AppliedJobs from "./waiter/AppliedJobs";
import Notifications from "./waiter/Notifications";

// ===== Hotel pages =====
import HotelLayout from "./hotel/layout/HotelLayout";
import HotelDashboard from "./hotel/Dashboard/HotelDashboard";
import HotelProfile from "./hotel/Profile/HotelProfile";
import PostJob from "./hotel/Jobs/PostJob";
import ManageJobs from "./hotel/Jobs/ManageJobs";
import ApplicantsList from "./hotel/Applicants/ApplicantsList";
import HotelNotifications from "./hotel/Notifications/HotelNotifications";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />

      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <Routes>
          {/* ===== PUBLIC ROUTES ===== */}
          <Route path="/" element={<Index />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/learn-more" element={<LearnMore />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/cookie-policy" element={<CookiePolicy />} />
          <Route path="/accessibility" element={<Accessibility />} />


          {/* ===== WAITER DASHBOARD ROUTES ===== */}
          <Route path="/waiter" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="jobs" element={<FindJobs />} />
            <Route path="profile" element={<Profile />} />
            <Route path="applications" element={<AppliedJobs />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="*" element={<Navigate to="/waiter" replace />} />
          </Route>

          {/* ===== HOTEL (EMPLOYER) DASHBOARD ROUTES ===== */}
          <Route path="/hotel" element={<HotelLayout />}>
            <Route index element={<HotelDashboard />} />
            <Route path="profile" element={<HotelProfile />} />
            <Route path="post-job" element={<PostJob />} />
            <Route path="manage-jobs" element={<ManageJobs />} />
            <Route path="applicants" element={<ApplicantsList />} />
            <Route path="notifications" element={<HotelNotifications />} />
            <Route path="*" element={<Navigate to="/hotel" replace />} />
          </Route>

          {/* ===== CATCH ALL ===== */}
          <Route path="*" element={<NotFound />} />
        </Routes>

        <Chatbot />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
