import { DATABASE_URL, USER_COOKIE } from "utils/constants";
import { ResponseStatus } from "infrastructure/enums/Request/Request";
import {
  UserDetailsChangeRequestResult,
  UserDetailsChangeResponse
} from "infrastructure/interfaces/User/user";
import { getCookie } from "services/cookieService";

export const handleAvatarChange = async (
  avatar: File,
  userId: string
): Promise<UserDetailsChangeResponse> => {
  try {
    const token = getCookie(USER_COOKIE);
    const body = new FormData();
    body.append("avatar", avatar);
    body.append("userId", userId);
    const request = await fetch(`${DATABASE_URL}/user/avatar/change`, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + token,
      },
      body
    });
    const response: UserDetailsChangeResponse = await request.json();
    return databaseResponse(request.ok, response);
  } catch (error) {
    return {
      responseMessage: error,
      responseStatus: ResponseStatus.FAILED,
    };
  }
};

export const databaseResponse = (
  isSuccesfullResponse: boolean,
  response: UserDetailsChangeResponse
): UserDetailsChangeRequestResult => {
  if (isSuccesfullResponse) {
    return {
      user: response.user,
      responseStatus: ResponseStatus.SUCCESS,
      responseMessage: response.message,
    };
  }
  return {
    responseMessage: response.message,
    responseStatus: ResponseStatus.FAILED,
  };
};
