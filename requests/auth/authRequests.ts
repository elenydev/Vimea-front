import { DATABASE_URL } from "@/../constants";
import { ResponseStatus } from "@/../infrastructure/enums/Request/Request";
import {
  AuthRequestResult,
  AuthResponse,
  User,
} from "@/../infrastructure/interfaces/UserInterfaces/user";

export const handleRegistration = async (
  user: User
): Promise<AuthRequestResult> => {
  try {
    const request = await fetch(`${DATABASE_URL}/auth/signUp`, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const response: AuthResponse = await request.json();
    return databaseResponse(response);
  } catch (error) {
    return {
      responseMessage: error,
      responseStatus: ResponseStatus.FAILED,
    };
  }
};

export const databaseResponse = (response: AuthResponse): AuthRequestResult => {
  if (response.ok) {
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
