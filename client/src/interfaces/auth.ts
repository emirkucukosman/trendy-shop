export interface IUser {
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthState {
  isInitialised: boolean;
  loginStatus: "idle" | "loading" | "success" | "fail";
  registerStatus: "idle" | "loading" | "success" | "fail";
  isAuthenticated: boolean;
  user: IUser | null;
  loginError: string | null;
  registerError: string | null;
}
