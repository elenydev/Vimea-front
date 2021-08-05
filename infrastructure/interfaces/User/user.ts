import { ResponseStatus } from "infrastructure/enums/Request/Request";
import { Movie } from "infrastructure/interfaces/Movie/movie";

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

export interface ChangePasswordUserCredentials extends Omit<UserCredentials, "email"> {
  newPassword: string;
  newPasswordConfirmation: string;
}

export interface AuthResponse extends RegistrationRequestResult, Response {
  message?: string;
}

export interface RemindPasswordResult extends BaseRequestResponse {
  user?: Partial<User>,
  message?: string
}

export interface UserFavouriteMovie extends Movie {
  id: string,
  title: string,
  backdrop_path: string,
  overview: string,
  vote_average: number
}

export interface UserMovieActionResponse {
  favouriteMovies: UserFavouriteMovie[],
  message: string
}

export interface UserMovieActionResult extends BaseRequestResponse {
  favouriteMovies?: UserFavouriteMovie[]
}

export interface GetCurrentUser {
  email: string;
}

export interface RemindPasswordCredentials {
  email: string | null,
  password: string | null,
  passwordConfirm: string | null
}