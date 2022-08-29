export interface Auth {
  accessToken: string;
  refreshToken: string;
  username?: string;
}

export interface User {
  login: string;
  password: string;
}
