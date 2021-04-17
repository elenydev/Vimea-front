import { DATABASE_URL, USER_COOKIE } from "@/../constants";
import { ResponseStatus } from "@/../infrastructure/enums/Request/Request";
import { UserFavouriteMovie, UserMovieActionResponse, UserMovieActionResult } from "@/../infrastructure/interfaces/User/user";
import { getCookie } from "@/../services/cookieService";

export const addUserFavouriteMovie = async (movie: UserFavouriteMovie): Promise<UserMovieActionResult> => {
  try {
    const token = getCookie(USER_COOKIE);
    const request = await fetch(`${DATABASE_URL}/favourites/add`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(movie)
    })
    const response: UserMovieActionResponse = await request.json();
    return databaseResponse(request.ok, response);
  } catch (error) {
    return {
      responseMessage: error,
      responseStatus: ResponseStatus.FAILED
    }
  }
}

export const removeUserFavouriteMovie = async (movieId: string): Promise<UserMovieActionResult> => {
  try {
    const token = getCookie(USER_COOKIE);
    const request = await fetch(`${DATABASE_URL}/favourites/remove`, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(movieId)
    })
    const response: UserMovieActionResponse = await request.json();
    return databaseResponse(request.ok, response);
  } catch (error) {
    return {
      responseMessage: error,
      responseStatus: ResponseStatus.FAILED
    }
  }
}

export const databaseResponse = (
  isSuccesfullResponse: boolean,
  response: UserMovieActionResponse
): UserMovieActionResult => {
  if (isSuccesfullResponse) {
    return {
      favouriteMovies: response.favouriteMovies,
      responseStatus: ResponseStatus.SUCCESS,
      responseMessage: response.message,
    };
  }
  return {
    responseMessage: response.message,
    responseStatus: ResponseStatus.FAILED,
  };
};
