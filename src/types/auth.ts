export type AuthUser = {
  _id?: string;
  name?: string;
  email?: string;
  role?: string;
  chapterId?: string;
  committee?: string; // لو عندك حقل committee
  status?: string;
  points?: number;
  level?: string;
  badges?: any[];
};

export type AuthState = {
  isAuthenticated: boolean;
  accessToken?: string | null;
  refreshToken?: string | null;
  user: AuthUser | null;
};
