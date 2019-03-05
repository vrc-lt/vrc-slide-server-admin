import { Slide, Person, VRCSlideEvent, AuthUser } from "~/types";

export interface RootState {
  people: Person[];
  events: VRCSlideEvent[];
  currentEvent: VRCSlideEvent;
  authUser: AuthUser;
}

export interface SlideState{
  slides: Slide[];
}