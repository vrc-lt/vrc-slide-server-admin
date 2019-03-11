<template>
  <section class="event">
      {{$route.params.id}}
    <div class="tile" v-for="(slide, index) in currentEvent.slides"
    :key="index"
    :slide="slide"> 
      <img class="slide-preview" :src="slideTitlePageUrl(slide)">
      <p>
      <label class="label">Slide ID</label>
      <input class="input" type="textbox" :value="slide.sdid" @input="sdidChanged($event.target.value, slide, index)">
      </p>
      <p>
      <label class="label">Slide count</label>
      <input class="input" type="number" :value="slide.count" @input="countChanged($event.target.value, slide, index)">
      </p>
      <a class="button is-danger remove-button" @click="removeSlide(slide, index)">remove</a>
      <a class="button" @click="moveSlideUpward(slide, index)">up</a>
      <a class="button" @click="moveSlideDownward(slide, index)">down</a>
    </div>
    <div class="tile">
      <input class="input" placeholder="add slide" @keyup.enter="addSlide">
    </div>
    <a @click="submit" class="button-submit button is-primary">Save</a>
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

    slideTitlePageUrl(slide: Slide): String{
      return "https://speakerd.s3.amazonaws.com/presentations/"+ slide.sdid +"/preview_slide_0.jpg?373063"
    }
    //slides(): Slide[] { return this.$store.state.slides.state.slides; }

    removeSlide(slide: Slide, index){
        this.$store.commit('remove', {slide, index} );
    }

    addSlide(e){
        this.$store.commit('add', e.target.value);
        e.target.value = ''
    }

    countChanged(count: String, slide: Slide, index){
        this.$store.commit('changeCount', {count, slide, index})
    }

    sdidChanged(sdid, slide: Slide, index){
        this.$store.commit('changeSdid', {sdid, slide, index})
    }

    moveSlideUpward(slide: Slide , index: number){
        this.$store.commit('moveSlideUpward', {slide, index})
    }

    moveSlideDownward(slide: Slide , index: number){
        this.$store.commit('moveSlideDownward', {slide, index})
    }

    async submit(){
        await this.$store.dispatch('submitEvent')
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

.slide-preview{
  max-width: 80pt;
  max-height: 80pt;
}
.remove-button{
  margin: auto auto auto 8px;
}
.button-submit{
  margin-right: 8px;
}
</style>
