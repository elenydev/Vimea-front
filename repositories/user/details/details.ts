import { UserDetailsChangeResponse } from "infrastructure/interfaces/User/user";
import { API_URL } from "utils/api";
import { putItem } from "factories/PutFactory";

export const handleAvatarChange = async (
  avatar: File,
  userId: string
): Promise<UserDetailsChangeResponse> => {
  const body = new FormData();
  body.append("avatar", avatar);
  return await putItem(API_URL.USER.DETAILS.CHANGE_AVATAR, body, true, true, {
    userId,
  });
};
