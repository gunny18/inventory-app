// Request body types
export type RegisterUserBody = {
  username: string;
  password: string;
  email: string;
  photo: string | null;
  bio: string | null;
  phone: string | null;
};

// Request body login
export type LoginUserBody = {
  email: string;
  password: string;
};
