import UserManager from "@/../components/App/UserManager";
import { User } from "@/../infrastructure/interfaces/User/user";

export interface UserStore {
  userManager: UserManager;
  user: User;
}
