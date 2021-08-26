import { USER_COOKIE } from "utils/constants";
import { ResponseStatus } from "infrastructure/enums/Request/Request";
import {
  UserDetailsChangeRequestResult,
  UserDetailsChangeResponse
} from "infrastructure/interfaces/User/user";
import { getCookie } from "services/cookieService";
import { API_URL } from "utils/api";
import { getErrorResponse } from "utils/getErrorResponse";

export const handleAvatarChange = async (
  avatar: File,
  userId: string
): Promise<UserDetailsChangeResponse> => {
  try {
    const token = getCookie(USER_COOKIE);
    const body = new FormData();
    body.append("avatar", avatar);
    body.append("userId", userId);
    const request = await fetch(API_URL.USER.DETAILS.CHANGE_AVATAR, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + token,
      },
      body
    });
    const response: UserDetailsChangeResponse = await request.json();
    return databaseResponse(request.ok, response);
  } catch (error) {
    getErrorResponse(error);
  }
};
