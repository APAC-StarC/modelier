<template>
  <div>
    <span class="text-xs block mt-4">Movement speed:</span>
    <div>
      <Slider v-model="explosionSettings.explosionMoveStep"/>
    </div>
    <span class="text-xs block mt-4">Movement:</span>
    <div v-for="(item, ptId) in explosionSettings.ptModels" v-bind:key="'explode-'+ptId">
      <ExplosionOptionItem v-bind:item="item" v-bind:pt-id="ptId"></ExplosionOptionItem>
    </div>
  </div>
</template>

<script>
import Slider from '@vueform/slider/dist/slider.vue2.js'
import ExplosionOptionItem from './ExplosionOptionItem.vue'

export default {
  name: "ExplosionConfigurator.vue",
  components: {
    Slider,
    ExplosionOptionItem
  },
  props: ['explosionSettings'],
}
</script>

<style scoped>

</style>
<style src="@vueform/slider/themes/default.css"></style>