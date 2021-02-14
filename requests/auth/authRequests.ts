import { DATABASE_URL } from "@/../constants";
import { ResponseStatus } from "@/../infrastructure/enums/Request/Request";
import {
  RegistrationRequestResult,
  AuthResponse,
  User,
  UserCredentials,
} from "@/../infrastructure/interfaces/UserInterfaces/user";

export const handleRegistration = async (
  user: User
): Promise<RegistrationRequestResult> => {
  const { firstName, lastName, email, password, avatar, policy } = user;
  const newUser = new FormData();
  newUser.append("firstName", firstName.toLowerCase());
  newUser.append("lastName", lastName.toLowerCase());
  newUser.append("email", email);
  newUser.append("password", password);
  newUser.append("avatar", avatar[0]);
  newUser.append("policy", policy);

  try {
    const request = await fetch(`${DATABASE_URL}/auth/signUp`, {
      method: "POST",
      body: newUser,
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

export const handleAuthorization = async (
  userCredentials: UserCredentials
): Promise<RegistrationRequestResult> => {
  try {
    const request = await fetch(`${DATABASE_URL}/auth/signIn`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userCredentials),
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

export const databaseResponse = (
  response: AuthResponse
): RegistrationRequestResult => {
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
