import { Person, VRCSlideEvent, AuthUser } from "~/types";

export interface RootState {
  people: Person[];
  events: VRCSlideEvent[];
  authUser: AuthUser;
}
