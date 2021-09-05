import { CURRENT_USER_EMAIL_COOKIE, USER_COOKIE } from "utils/constants";
import {
  User,
  UserCredentials,
  RemindPasswordResult,
  AuthorizationRequestResult,
  ChangePasswordUserCredentials,
  GetCurrentUser,
} from "infrastructure/interfaces/User/user";
import { getCookie } from "services/cookieService";
import { API_URL } from "utils/api";
import { postItem } from "factories/PostFactory";
import { getItem } from "factories/GetFactory";

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

  return postItem(API_URL.USER.AUTH.SIGN_UP, newUser, false, true);
};

export const handleAuthorization = async (
  userCredentials: UserCredentials
): Promise<AuthorizationRequestResult> => {
  return await postItem(API_URL.USER.AUTH.SING_IN, userCredentials);
};

export const handleRemindPassword = async (
  userEmail: string
): Promise<RemindPasswordResult> => {
  const body = { email: userEmail };
  return await postItem(API_URL.USER.AUTH.REMIND_PASSWORD, body);
};

export const handleChangePassword = async (
  userCredentials: ChangePasswordUserCredentials
): Promise<AuthorizationRequestResult> => {
  const { password, newPassword } = userCredentials;
  const email = getCookie(CURRENT_USER_EMAIL_COOKIE);
  const body = { password, newPassword, email };

  return await postItem(API_URL.USER.AUTH.CHANGE_PASSWORD, body, true);
};

export const getCurrentUser = async (
  UserCredential: GetCurrentUser
): Promise<AuthorizationRequestResult> => {
  return await getItem<User>(API_URL.USER.AUTH.CURRENT, false, UserCredential);
};
