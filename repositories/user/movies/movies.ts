import { getList } from "factories/GetFactory";
import { GetListActionResult } from "factories/interfaces/getList";
import {
  UserMovieActionResponse,
  UserMovieActionResult,
  UserFavouriteMovie,
  BaseRequestResponse,
} from "infrastructure/interfaces/User/user";
import { API_URL } from "utils/api";

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
    const token = getCookieokie(USER_COOKIE);
    const request = await fetch(API_URL.USER.DETAILS.REMOVE_FAVOURITE_MOVIE, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ movieId, email }),
    });
    const response: UserMovieActionResponse = await request.json();
    return databaseResponse(request.ok, response);
  } catch (error) {
    getErrorResponse(error);
  }
};

export const fetchUserFavouriteMovies = async (
  email: string
): Promise<GetListActionResult<UserFavouriteMovie> | BaseRequestResponse> => {
  return await getList<UserFavouriteMovie>(
    API_URL.USER.DETAILS.GET_FAVOURITES,
    true,
    { email: email },
  );
};
