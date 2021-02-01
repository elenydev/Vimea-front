export interface AddUserFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatar: string;
  policy: string | Blob;
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  userId: string;
}
