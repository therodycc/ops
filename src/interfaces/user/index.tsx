import { Role } from '../../enums/roles';

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
  officeId: string;
  email: string;
  cellphone: string;
  role: Role;
  employeeId: string;
}
