import { ResponseStatus } from "@/../infrastructure/enums/Request/request";

export interface User {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  avatar: string;
  userId: string;
  policy: string | Blob;
  accessToken: string;
  favouriteMovies: string[];
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
