import { deleteItem } from "factories/DeleteFactory";
import { getList } from "factories/GetFactory";
import { GetListActionResult } from "factories/interfaces/getList";
import { postItem } from "factories/PostFactory";
import {
  UserMovieActionResult,
  UserFavouriteMovie,
  BaseRequestResponse,
} from "infrastructure/interfaces/User/user";
import { API_URL } from "utils/api";

export const addUserFavouriteMovie = async (
  movie: UserFavouriteMovie,
  email: string
): Promise<UserMovieActionResult> => {
  const body = { movie, email };
  return await postItem<UserFavouriteMovie[]>(
    API_URL.USER.DETAILS.ADD_FAVOURITE_MOVIE,
    body,
    true,
    false
  );
};

export const removeUserFavouriteMovie = async (
  movieId: string,
  email: string
): Promise<UserMovieActionResult> => {
  return await deleteItem(API_URL.USER.DETAILS.REMOVE_FAVOURITE_MOVIE, true, {
    movieId,
    email,
  });
};

export const fetchUserFavouriteMovies = async (
  email: string
): Promise<GetListActionResult<UserFavouriteMovie> | BaseRequestResponse> => {
  return await getList<UserFavouriteMovie>(
    API_URL.USER.DETAILS.GET_FAVOURITES,
    true,
    { email: email }
  );
};
