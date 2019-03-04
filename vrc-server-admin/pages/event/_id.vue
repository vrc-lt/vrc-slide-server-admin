<template>
  <section class="event">
      {{$route.params.id}}
        <div v-for="(slide, index) in currentEvent.slides"
            :key="index"
            :slide="slide"> {{ slide.sdid }}, {{ slide.count }}  </div>
  </section>
</template>

<script lang="ts">
import {
  Component,
  Vue
} from "nuxt-property-decorator"
import { State } from "vuex-class"
import { VRCSlideEvent } from "~/types";

@Component({
  components: {
  }
})
export default class extends Vue {
  async fetch({ store, params }) {
     await store.dispatch('fetchSingleEvent', params);
  }
  @State currentEvent : VRCSlideEvent
  
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
