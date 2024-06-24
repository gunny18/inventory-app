// Request body types
export type RegisteruserBody = {
  username: string;
  password: string;
  email: string;
  photo: string | null;
  bio: string | null;
  phone: string | null;
};
