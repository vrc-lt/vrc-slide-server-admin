import { RootState, Person, VRCSlideEvent } from "~/types";
import { MutationTree, ActionTree, StoreOptions } from "vuex";
import axios from "~/plugins/axios";
import Vue from "vue";

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
  },
  add (state, text) {
    state.currentEvent.slides.push({
      sdid: text,
      count: 0,
    })
  },
  remove (state, { slide, index }) {
    state.currentEvent.slides.splice(index, 1)
  },
  changeSdid (state, {sdid, slide, index}) {
    slide.sdid = sdid
  },
  changeCount(state, {count, slide, index}) {
    slide.count = parseInt(count, 10)
  },
  moveSlideUpward (state, {slide, index} ){
    if(index > 0){
      const currentSlides = state.currentEvent.slides
      const tmp = currentSlides[index]
      Vue.set(state.currentEvent.slides, index, currentSlides[index - 1])
      Vue.set(state.currentEvent.slides, index - 1, tmp)
    }
  },
  moveSlideDownward(state, {slide, index} ){
    if(index < state.currentEvent.slides.length - 1){
    const currentSlides = state.currentEvent.slides
    const tmp = currentSlides[index]
    Vue.set(state.currentEvent.slides, index, currentSlides[index + 1])
    Vue.set(state.currentEvent.slides, index + 1, tmp)
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
  },
  async submitEvent({commit}, {}){
    const res = await axios.post(
      "./api/events/" + this.state.currentEvent.name + "/update", this.state.currentEvent, {withCredentials: true}
    )
    this.$router.push("/")
  }
}
