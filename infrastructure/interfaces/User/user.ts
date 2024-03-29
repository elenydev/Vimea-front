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
  message: string;
}

export interface RegistrationRequestResult extends BaseRequestResponse {
  result?: User;
}

export interface AuthorizationRequestResult extends BaseRequestResponse {
  result?: User | Partial<User>;
}

export interface UserDetailsChangeRequestResult extends BaseRequestResponse {
  result?: User;
}

export interface UserDetailsChangeResponse
  extends UserDetailsChangeRequestResult {}

export interface UserCredentials {
  email: string;
  password: string;
}

export interface ChangePasswordUserCredentials
  extends Omit<UserCredentials, "email"> {
  newPassword: string;
  newPasswordConfirmation: string;
}

export interface AuthResponse extends RegistrationRequestResult, Response {}

export interface RemindPasswordResult extends BaseRequestResponse {
  result?: Partial<User>;
}

export interface GetUserFavouriteMoviesSuccess {
  results: UserFavouriteMovie[];
  pageSize: number;
  pageNumber: number;
  totalCount: {
    favouriteMovies: number;
  };
}

export interface UserFavouriteMovie {
  id: string;
  externalApiId: string;
  title: string;
  backdropPathUrl: string;
  overview: string;
  vote_average: number;
}

export interface UserMovieActionResponse {
  favouriteMovies: UserFavouriteMovie[];
  message: string;
}

export interface UserMovieUpdateActionResult extends BaseRequestResponse {}

export interface UserMovieActionResult
  extends BaseRequestResponse,
    GetUserFavouriteMoviesSuccess {}

export interface GetCurrentUser {
  userId: string;
}

export interface RemindPasswordCredentials {
  email: string | null;
  password: string | null;
  passwordConfirm: string | null;
}
