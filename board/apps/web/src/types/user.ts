export enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
}

export enum OAuthProvider {
  NAVER = "NAVER",
}

export interface User {
  email: string;
  name: string;
  role: Role;
}

export interface AuthenticatedUser extends User {
  isOnboarded: boolean;
  isVerified: boolean;
  oAuthConnections: {
    provider: OAuthProvider;
  }[];
}
