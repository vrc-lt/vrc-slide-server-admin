import { RootState, Person, VRCSlideEvent } from "~/types";
import { MutationTree, ActionTree } from "vuex";
import axios from "~/plugins/axios";

export const state = (): RootState => ({
  people: [],
  events: [],
  currentEvent: {id: 0, slides: [], name: ""},
  authUser: { session: "" }
})

export const mutations: MutationTree<RootState> = {
  setPeople(state: RootState, people: Person[]): void {
    state.people = people
  },
  setEvents(state: RootState, events: VRCSlideEvent[]): void {
    state.events = events
  },
  setEvent(state: RootState, event: VRCSlideEvent): void {
    state.currentEvent = event
  },
  setUser(state: RootState, user: any): void {
    if(user){
      state.authUser = user
    }else{
      state.authUser = { session: "" }
    }
  }
}

export const actions: ActionTree<RootState, RootState> = {
  async nuxtServerInit({ commit }, { app }) {
    const events: VRCSlideEvent[] = await app.$axios.$get(
      "./api/events", {withCredentials: true}
    )
    commit("setEvents", events)
  },
  async login({ commit }, { username, password }){
    try{
      var params = new URLSearchParams();
          params.append('username', username);
          params.append('password', password);
      const res = await axios.post('./api/login', params, {withCredentials: true});
      commit('setUser', {session: res.headers.session})
    } catch(err){
      throw err
    }
  },
  async fetchEvents({ commit }, { }) {
    
    const res = await axios.get(
      "./api/events", {withCredentials: true}
    )
    const events: VRCSlideEvent[] = res.data
    
    commit("setEvents", events)
  },

  async fetchSingleEvent({ commit }, { id }) {
    
    const res = await axios.get(
      "./api/events/" + id, {withCredentials: true}
    )
    const event: VRCSlideEvent = res.data
    
    commit("setEvent", event)
  }
}
