import { Person, VRCSlideEvent } from "~/types";

export interface RootState {
  people: Person[];
  events: VRCSlideEvent[];
}
