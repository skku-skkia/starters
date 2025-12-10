export enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
}

export enum OAuthProvider {
  NAVER = "NAVER",
}

export interface User {
  id: string;
  email: string;
  username: string;
  role: Role;
}

export interface AuthenticatedUser extends User {
  isOnboarded: boolean;
  isVerified: boolean;
  oAuthConnections: {
    provider: OAuthProvider;
  }[];
}
