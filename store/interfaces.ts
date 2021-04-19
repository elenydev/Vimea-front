import { UserStore } from "@/../components/App/domain/intefaces";
import { NotificationsStore } from "../components/Notifications/domain/interfaces";
import { MovieStore } from "../managers/MovieManager/interfaces";

export interface Store {
  readonly userStore: UserStore;
  readonly notificationsStore: NotificationsStore;
  readonly movieStore: MovieStore
}
