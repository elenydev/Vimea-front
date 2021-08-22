import { CURRENT_USER_EMAIL_COOKIE, USER_COOKIE } from "utils/constants";
import { ResponseStatus } from "infrastructure/enums/Request/Request";
import {
  AuthResponse,
  User,
  UserCredentials,
  RemindPasswordResult,
  AuthorizationRequestResult,
  ChangePasswordUserCredentials,
  GetCurrentUser,
} from "infrastructure/interfaces/User/user";
import { getCookie } from "services/cookieService";
import { API_URL } from "utils/api";

export const handleRegistration = async (
  user: User
): Promise<AuthorizationRequestResult> => {
  const { firstName, lastName, email, password, avatar, policy } = user;
  const newUser = new FormData();
  newUser.append("firstName", firstName.toLowerCase());
  newUser.append("lastName", lastName.toLowerCase());
  newUser.append("email", email);
  newUser.append("password", password);
  newUser.append("avatar", avatar[0]);
  newUser.append("policy", policy);

  try {
    const request = await fetch(API_URL.USER.AUTH.SIGN_UP, {
      method: "POST",
      body: newUser,
    });
    const response: AuthResponse = await request.json();
    return databaseResponse(request.ok, response);
  } catch (error) {
    return {
      responseMessage: error,
      responseStatus: ResponseStatus.FAILED,
    };
  }
};

export const handleAuthorization = async (
  userCredentials: UserCredentials
): Promise<AuthorizationRequestResult> => {
  try {
    const request = await fetch(API_URL.USER.AUTH.SING_IN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userCredentials),
    });
    const response: AuthResponse = await request.json();
    return databaseResponse(request.ok, response);
  } catch (error) {
    return {
      responseMessage: error,
      responseStatus: ResponseStatus.FAILED,
    };
  }
};

export const handleRemindPassword = async (
  userEmail: string
): Promise<RemindPasswordResult> => {
  const body = { email: userEmail };
  try {
    const request = await fetch(API_URL.USER.AUTH.REMIND_PASSWORD, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const response: RemindPasswordResult = await request.json();
    return databaseResponse(request.ok, response);
  } catch (error) {
    return {
      responseMessage: error,
      responseStatus: ResponseStatus.FAILED,
    };
  }
};

export const handleChangePassword = async (
  userCredentials: ChangePasswordUserCredentials
): Promise<AuthorizationRequestResult> => {
  const { password, newPassword } = userCredentials;
  const email = getCookie(CURRENT_USER_EMAIL_COOKIE);
  const body = { password, newPassword, email };
  const token = getCookie(USER_COOKIE);
  try {
    const request = await fetch(API_URL.USER.AUTH.CHANGE_PASSWORD, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(body),
    });
    const response: AuthResponse = await request.json();
    return databaseResponse(request.ok, response);
  } catch (error) {
    return {
      responseMessage: error,
      responseStatus: ResponseStatus.FAILED,
    };
  }
};

export const getCurrentUser = async (
  UserCredential: GetCurrentUser
): Promise<AuthorizationRequestResult> => {
  try {
    const request = await fetch(
      `${API_URL.USER.AUTH.CURRENT}email=${UserCredential.email}`,
      {
        method: "GET",
      }
    );
    const response: AuthResponse = await request.json();
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
  response: AuthResponse | RemindPasswordResult
): AuthorizationRequestResult => {
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
