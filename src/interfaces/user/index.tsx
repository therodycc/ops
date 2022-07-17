export interface AuthState {
  user: User;
  isLoading: boolean;
  isInitialized: boolean;
  isAuthenticated: boolean;
  error: string;
}

export interface User {
  id: string;
  name: string;
  lastName: string;
  fullName: string;
  email: string;
  cellphone: string;
  role: string;
  employeeId: string;
}
