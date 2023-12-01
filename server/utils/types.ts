export type Config = {
  PORT?: number;
  MONGO_URI?: string;
};

export type RegisterInfo = {
  username: string;
  email: string;
  passwd: string;
  passwd2: string;
};
