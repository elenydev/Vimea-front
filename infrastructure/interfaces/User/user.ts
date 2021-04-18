import { ResponseStatus } from "@/../infrastructure/enums/Request/Request";

export interface User {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  avatar: string;
  userId: string;
  policy: string | Blob;
  accessToken: string;
  favouriteMovies: UserFavouriteMovie[];
}

export interface BaseRequestResponse {
  responseStatus: ResponseStatus;
  responseMessage: string;
}

export interface RegistrationRequestResult extends BaseRequestResponse {
  user?: User;
}

export interface AuthorizationRequestResult extends Omit<RegistrationRequestResult, "user"> {
  user?: User | Partial<User>
}

export interface UserCredentials {
  email: string;
  password: string;
}

export interface ChangePasswordUserCredentials extends UserCredentials {
  newPassword: string;
}

export interface AuthResponse extends RegistrationRequestResult, Response {
  message?: string;
}

export interface RemindPasswordResult extends BaseRequestResponse {
  user?: Partial<User>,
  message?: string
}

export interface UserFavouriteMovie {
  movieId: string,
  movieTitle: string,
  movieAvatarUrl: string,
  movieDescription: string,
  movieRate: string | number
}

export interface UserMovieActionResponse {
  favouriteMovies: UserFavouriteMovie[],
  message: string
}

export interface UserMovieActionResult extends BaseRequestResponse {
  favouriteMovies?: UserFavouriteMovie[]
}