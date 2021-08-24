import { USER_COOKIE } from "utils/constants";
import { ResponseStatus } from "infrastructure/enums/Request/Request";
import {
  UserFavouriteMovie,
  UserMovieActionResponse,
  UserMovieActionResult,
} from "infrastructure/interfaces/User/user";
import { getCookie } from "services/cookieService";
import { API_URL } from "utils/api";
import { getErrorResponse } from "utils/getErrorResponse";

export const addUserFavouriteMovie = async (
  movie: UserFavouriteMovie,
  email: string
): Promise<UserMovieActionResult> => {
  try {
    const token = getCookie(USER_COOKIE);
    const request = await fetch(API_URL.USER.DETAILS.ADD_FAVOURITE_MOVIE, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ movie, email }),
    });
    const response: UserMovieActionResponse = await request.json();
    return databaseResponse(request.ok, response);
  } catch (error) {
    getErrorResponse(error);
  }
};

export const removeUserFavouriteMovie = async (
  movieId: string,
  email: string
): Promise<UserMovieActionResult> => {
  try {
    const token = getCookie(USER_COOKIE);
    const request = await fetch(API_URL.USER.DETAILS.REMOVE_FAVOURITE_MOVIE, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({movieId, email}),
    });
    const response: UserMovieActionResponse = await request.json();
    return databaseResponse(request.ok, response);
  } catch (error) {
    getErrorResponse(error);
  }
};

export const fetchUserFavouriteMovies = async (
  email: string
): Promise<UserMovieActionResult> => {
  try {
    const token = getCookie(USER_COOKIE);
    const request = await fetch(`${API_URL.USER.DETAILS.GET_FAVOURITES}?email=${email}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      }
    });
    const response: UserMovieActionResponse = await request.json();
    return databaseResponse(request.ok, response);
  } catch (error) {
    return {
      responseMessage: error,
      responseStatus: ResponseStatus.FAILED,
    };
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
  getErrorResponse(response.message);
};


