export interface User {
  id: string;
  email: string;
  name: string;
  username: string;
  avatar?: string;
  role: "user" | "admin";
  lastLogin: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
  name: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

export interface updateUser {
  email: string;
  name: string;
  id: string;
}
