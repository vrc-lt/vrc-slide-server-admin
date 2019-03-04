import { RootState, Person, VRCSlideEvent } from "~/types";
import { MutationTree, ActionTree } from "vuex";

export const state = (): RootState => ({
  people: [],
  events: []
})

export const mutations: MutationTree<RootState> = {
  setPeople(state: RootState, people: Person[]): void {
    state.people = people
  },
  setEvents(state: RootState, events: VRCSlideEvent[]): void {
    state.events = events
  }
}

export const actions: ActionTree<RootState, RootState> = {
  async nuxtServerInit({ commit }, { app }) {
    const people: Person[] = await app.$axios.$get(
      "./random-data.json"
    )
    const events: VRCSlideEvent[] = await app.$axios.$get(
      "./events.json"
    )
    commit("setPeople", people.slice(0, 10))
    commit("setEvents", events)
  }
}
