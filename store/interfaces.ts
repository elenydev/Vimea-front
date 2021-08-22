import { UserStore } from "components/User/domain/intefaces";
import { NotificationsStore } from "components/Notifications/domain/interfaces";
import { FormStore } from "managers/FormManager/interfaces";
import { MovieStore } from "managers/MovieManager/interfaces";

export interface Store {
  readonly userStore: UserStore;
  readonly notificationsStore: NotificationsStore;
  readonly movieStore: MovieStore;
  readonly formStore: FormStore;
}
