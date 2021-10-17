import { deleteItem } from "factories/DeleteFactory";
import { getList } from "factories/GetFactory";
import { GetListActionResult } from "factories/interfaces/getList";
import { postItem } from "factories/PostFactory";
import {
  UserMovieActionResult,
  UserFavouriteMovie,
  BaseRequestResponse,
  UserMovieUpdateActionResult,
} from "infrastructure/interfaces/User/user";
import { API_URL } from "utils/api";

export const addUserFavouriteMovie = async (
  movie: UserFavouriteMovie,
  userId: string
): Promise<UserMovieUpdateActionResult> => {
  const body = { movie };
  const params = { userId };
  return await postItem<UserFavouriteMovie[]>(
    API_URL.USER.DETAILS.ADD_FAVOURITE_MOVIE,
    body,
    true,
    false,
    params
  );
};

export const removeUserFavouriteMovie = async (
  movieId: string,
  userId: string
): Promise<UserMovieUpdateActionResult> => {
  return await deleteItem(API_URL.USER.DETAILS.REMOVE_FAVOURITE_MOVIE, true, {
    movieId,
    userId,
  });
};

export const fetchUserFavouriteMovies = async (
  userId: string,
  pageNumber: number,
  pageSize: number
): Promise<GetListActionResult<UserFavouriteMovie> | BaseRequestResponse> => {
  return await getList<UserFavouriteMovie>(
    API_URL.USER.DETAILS.GET_FAVOURITES,
    true,
    { userId, pageNumber, pageSize }
  );
};
