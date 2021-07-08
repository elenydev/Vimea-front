import { CURRENT_USER_EMAIL_COOKIE, DATABASE_URL, USER_COOKIE } from "@/../constants";
import { ResponseStatus } from "@/../infrastructure/enums/Request/Request";
import {
  AuthResponse,
  User,
  UserCredentials,
  RemindPasswordResult,
  AuthorizationRequestResult,
  ChangePasswordUserCredentials,
  GetCurrentUser,
} from "@/../infrastructure/interfaces/User/user";
import { getCookie } from "@/../services/cookieService";

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
    const request = await fetch(`${DATABASE_URL}/user/signUp`, {
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
    const request = await fetch(`${DATABASE_URL}/user/signIn`, {
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
    const request = await fetch(`${DATABASE_URL}/user/password/remind`, {
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
    const request = await fetch(`${DATABASE_URL}/user/password/change`, {
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
      `${DATABASE_URL}/user/getCurrent?email=${UserCredential.email}`,
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
