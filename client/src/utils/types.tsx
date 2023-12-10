export type RegisterInfo = {
  username: string;
  email: string;
  passwd: string;
  passwd2: string;
};

export type RegisterFocus = {
  username: boolean;
  email: boolean;
  passwd: boolean;
  passwd2: boolean;
};

export type FormErrors = {
  username: {
    len: string | null;
    valid: string | null;
  };
  email: {
    len: string | null;
    valid: string | null;
  };
  passwd: {
    len: string | null;
    special: string | null;
    capital: string | null;
    num: string | null;
  };
  passwd2: {
    match: string | null;
  };
};

export type LoginInfo = {
  user: string;
  passwd: string;
};

export type InfoMsg = {
  style?: string;
  message?: string | null;
};

export type User = {
  id: string;
  username: string;
  email: string;
  passwd: string;
  verifycode: string;
};

// THE GAME
export type HoldDice = {
  dice1: boolean;
  dice2: boolean;
  dice3: boolean;
  dice4: boolean;
  dice5: boolean;
};
