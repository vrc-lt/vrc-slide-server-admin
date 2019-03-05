<template>
  <section class="event">
      {{$route.params.id}}
        <div v-for="(slide, index) in currentEvent.slides"
            :key="index"
            :slide="slide"> {{ slide.sdid }}, {{ slide.count }}  </div>
    <ul>
    <li v-for="(slide, index) in currentEvent.slides"
    :key="index"
    :slide="slide"> 
      <input type="textbox" :value="slide.sdid" @input="sdidChanged($event.target.value, slide, index)">
      <input type="textbox" :value="slide.count" @input="countChanged($event.target.value, slide, index)">
      <button @click="removeSlide(slide, index)">remove</button>
    </li>
    <li><input placeholder="add slide" @keyup.enter="addSlide"></li>
  </ul>
  </section>
</template>

<script lang="ts">
import {
  Component,
  Vue
} from "nuxt-property-decorator"
import { State } from "vuex-class"
import { Slide, VRCSlideEvent } from "~/types";
import { mapMutations } from 'vuex';

@Component({
  components: {
  }
})
@Component
export default class extends Vue {

    //slides(): Slide[] { return this.$store.state.slides.state.slides; }

    removeSlide(slide: Slide, index){
        this.$store.commit('remove', slide );
    }

    addSlide(e){
        this.$store.commit('add', e.target.value);
        e.target.value = ''
    }

    countChanged(count, slide: Slide, index){
        this.$store.commit('changeCount', {count, slide, index})
    }

    sdidChanged(sdid, slide: Slide, index){
        this.$store.commit('changeSdid', {sdid, slide, index})
    }

  async fetch({ store, params }) {
     await store.dispatch('fetchSingleEvent', params);
  }
  @State currentEvent: VRCSlideEvent
}
</script>

<style scoped>
.header {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.cards {
  display: flex;
  flex-wrap: wrap;
}
</style>
