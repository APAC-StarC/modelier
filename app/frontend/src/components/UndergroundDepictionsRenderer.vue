<template>
  <div>
    <h2>Depictions</h2>
    <div v-for="(item, udId) in settings" v-bind:key="'rendDepict-'+udId">
      <span>({{ item.x1 }},{{ item.y1 }}),({{ item.x2 }},{{ item.y2 }}),({{ item.x3 }},{{ item.y3 }}),({{
          item.x4
        }},{{ item.y4 }})</span>
    </div>
    <button v-on:click="checkValues">Check values</button>
  </div>
</template>

<script>
export default {
  name: "UndergroundDepictionsRenderer",
  props: ['depictions', 'settings', 'viewer'],
  data() {
    return {
      meshes: {}
    }

  },
  methods: {
    createMeshes() {
      this.meshes = {};
    },
    checkValues() {
      console.log("Current settings:", this.settings);
    }
  },

}
</script>

<style scoped>

</style>