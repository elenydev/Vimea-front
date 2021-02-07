import { ResponseStatus } from "@/../infrastructure/enums/Request/Request";

export interface User {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  avatar: string;
  userId: string;
  policy: string | Blob;
}

export interface AuthRequestResult {
  responseStatus: ResponseStatus;
  responseMessage: string;
  user?: User;
}

export interface AuthResponse extends AuthRequestResult, Response {
  message?: string;
}
