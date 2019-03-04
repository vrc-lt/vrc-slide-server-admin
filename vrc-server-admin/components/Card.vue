<template>
  <div class="card">
    <h2> {{ event.name }} </h2>
    <div v-for="(slide, index) in event.slides"
        :key="index"
        :slide="slide"> {{ slide.sdid }}, {{ slide.count }}  </div>
  </div>
</template>

<script lang="ts">
import {
  Component,
  Prop,
  Vue
} from "nuxt-property-decorator"

import { VRCSlideEvent } from "~/types";

@Component({})
export default class Card extends Vue {
  @Prop() event: VRCSlideEvent 
}
</script>

<style scoped>
.card {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana,
    sans-serif;
  padding: 1rem;
  margin: 0.25rem;
  border: 0.25rem solid gainsboro;
}
</style>
