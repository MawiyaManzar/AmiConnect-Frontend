
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Recommendations from "./pages/Recommendations";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import axios from 'axios';
const queryClient = new QueryClient();

import { useState, useEffect } from 'react'
import { supabase } from '@/utils/supabase'



export function UsersPage() {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem('token'); // From AuthContext

  useEffect(() => {
    async function getUsers() {
      try {
        const response = await axios.get(
          'http://localhost:5000/users?department=BCA&year=3',
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }

    if (token) getUsers();
  }, [token]);

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name} ({user.email})</li>
        ))}
      </ul>
    </div>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route 
            path="/recommendations" 
            element={
              <ProtectedRoute>
                <Recommendations />
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
