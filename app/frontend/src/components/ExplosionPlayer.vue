<template>
  <div>
    <span class="text-sm block mb-2">💥 Explode scene </span>
    <Slider v-model="explosionCurrentStep" v-bind:tooltips="false" v-on:update="explodeModels"></Slider>
  </div>
</template>

<script>
import Slider from '@vueform/slider/dist/slider.vue2.js'

export default {
  name: "ExplosionPlayer.vue",
  components: {
    Slider
  },
  data() {
    return {
      explosionCurrentStep: 0,
      explosionScaleStepDefault: 10,
      explosionMoveStepDefault: 10
    }
  },
  props: ['explosionSettings', 'ptPotreeReferences'],
  methods: {
    explodeModels: function () {
      //this.explosionCurrentStep = this.explosionCurrentStep + plusminus;
      const step = this.explosionCurrentStep;
      const moveStep = this.explosionSettings?.explosionMoveStep ? this.explosionSettings.explosionMoveStep / 100 : this.explosionMoveStepDefault / 100;
      const scaleStep = this.explosionSettings?.explosionScaleStep ? this.explosionSettings.explosionScaleStep / 100 : this.explosionScaleStepDefault / 100;
      console.log("Trying to explode with step", step, " moveStep", moveStep, " scaleStep", scaleStep);
      Object.entries(this.explosionSettings.ptModels).forEach(([ptId, item]) => {
        const pt = this.ptPotreeReferences[ptId];
        const opt = item.direction;
        const initPos = item.initialPos;
        const modifier = step * moveStep;
        if (opt === 'scale') {
          const scaleSize = 1 + (step * scaleStep);
          pt.scale.set(scaleSize, scaleSize, scaleSize);
        }
        if (opt === 'right') {
          pt.position.x = initPos.x - modifier;
        }
        if (opt === 'left') {
          pt.position.x = initPos.x + modifier;
        }
        if (opt === 'front') {
          pt.position.y = initPos.y - modifier;
        }
        if (opt === 'back') {
          pt.position.y = initPos.y + modifier;
        }
        if (opt === 'up') {
          pt.position.z = initPos.z - modifier;
        }
        if (opt === 'down') {
          pt.position.z = initPos.z + modifier;
        }
      });
    }
  }
}
</script>

<style scoped>

</style>
<style src="@vueform/slider/themes/default.css"></style>