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

export interface RegistrationRequestResult {
  responseStatus: ResponseStatus;
  responseMessage: string;
  user?: User;
}

export interface UserCredentials {
  email: string;
  password: string;
}

export interface AuthResponse extends RegistrationRequestResult, Response {
  message?: string;
}
