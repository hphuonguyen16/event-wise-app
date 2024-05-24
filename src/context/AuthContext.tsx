'use client'
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { User } from "@/types/user";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import axios from "axios";
import UrlConfig from "@/config/urlConfig";

// Define a user type or interface

// Create the context
export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  accessToken: string | null;
  setAccessToken: (accessToken: string | null) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setUser: (user: User | null) => void;
  // login: any
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook to access the context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// Create a provider component
interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname(); // Get the current route from the router

 useEffect(() => {
   const fetchUserData = async () => {
     try {
       if (localStorage.getItem("persist")) {
         setIsAuthenticated(true);
         const response = await axios.get(UrlConfig.me.getMe, {
           headers: {
             Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
           },
         });
         const data = response.data.data;
         setUser(data);
         setAccessToken(data.accessToken);
       }
     } catch (error) {
       console.error("Error fetching user data:", error);
     }
   };

   fetchUserData();
 }, []); 
  
  console.log("user", user)



  useEffect(() => {
    // set isAuthenticated to true if have cookie in browser name 'jwt'
    if (localStorage.getItem("persist") && pathname === "/login") {
      router.push("/");
    } else if (localStorage.getItem("persist")) {
      if (pathname === "/login" || pathname === "/register") {
        router.push("/");
      }
    } else if (
      !localStorage.getItem("persist") &&
      pathname !== "/login" &&
      pathname !== "/register" &&
      pathname !== "/register/business" &&
      pathname !== "/register/personal" &&
      pathname !== "/forgot-password" &&
      !pathname.startsWith("/verify")
    ) {
      router.push("/login");
      return;
    }
  }, [router, pathname]);

  const logout = () => {
    // Implement your logout logic here
    // Typically, you would clear the user data (e.g., remove cookies or clear local storage)
  };

  // Provide user, login, and logout values to the context
  const contextValues: AuthContextType = {
    user,
    setUser,
    logout,
    accessToken,
    setAccessToken,
    isAuthenticated,
    setIsAuthenticated,
  };

  return (
    <AuthContext.Provider value={contextValues}>
      {children}
    </AuthContext.Provider>
  );
}
