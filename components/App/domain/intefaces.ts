import UserManager from "@/../managers/UserManager/UserManager";
import { User } from "@/../infrastructure/interfaces/User/user";

export interface UserStore {
  manager: UserManager;
  user: User;
}
