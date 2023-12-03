export type Config = {
  PORT?: number;
  MONGO_URI?: string;
  SECRET?: string;
};

export type RegisterInfo = {
  username: string;
  email: string;
  passwd: string;
  passwd2: string;
};

export type LoginInfo = {
  user: string;
  passwd: string;
};

export type User = {
  id: string;
  username: string;
  email: string;
  passwd: string;
  verifycode: string;
};

export type SafeUser = {
  id: string;
  username: string;
  email: string;
};

export type Token = {
  id: string;
  username: string;
  email: string;
  iat: number;
  eat: number;
};
