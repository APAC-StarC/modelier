<template>
  <div class="mt-2 flex flex-col max-w-100 text-xs">
    <span class="block font-semibold text-sm text-center">{{ item.title }}</span>
    <div class="flex flex-col mb-2">
      <div><span>x1: </span><input v-model="p1.x" class=""/></div>
      <div><span>y1: </span><input v-model="p1.y" class=""/></div>
    </div>
    <div class="flex flex-col mb-2">
      <div><span>x2: </span><input v-model="p2.x" class=""/></div>
      <div><span>y2: </span><input v-model="p2.y" class=""/></div>
    </div>
    <div class="flex flex-col mb-2">
      <div><span>x3: </span><input v-model="p3.x" class=""/></div>
      <div><span>y3: </span><input v-model="p3.y" class=""/></div>
    </div>
    <div class="flex flex-col mb-2">
      <div><span>x4: </span><input v-model="p4.x" class="" /></div>
      <div><span>y4: </span><input v-model="p4.y" class="" /></div>
    </div>
    <div class="flex flex-col mb-2">
      <div><span>z: </span><input v-model="z" /></div>
      <div><span>Rot(deg) </span><input v-model="rot" /></div>
    </div>
    <div class="flex flex-col mb-2">
        <div><span>Anchor Point</span></div>
        <div>
          <select v-model="anchorPoint" class="h-6 w-24">
            <option value="1">P1</option>
            <option value="2">P2</option>
            <option value="3">P3</option>
            <option value="4">P4</option>
          </select>
      </div>
    </div>

    <button v-on:click="saveValues">Update</button>
  </div>
</template>

<script>
export default {
  name: "UndergroundDepictionConfigItem",
  props: ['udId', 'item', 'initP1', 'initP2', 'initP3', 'initP4', 'initZ', 'initRot', 'initAnchorPoint'],
  data() {
    return {
      p1: this.initP1.clone(),
      p2: this.initP2.clone(),
      p3: this.initP3.clone(),
      p4: this.initP4.clone(),
      z: this.initZ,
      rot: this.initRot,
      anchorPoint : this.initAnchorPoint ? this.initAnchorPoint.toString() : "1"
    }
  },
  methods: {
    saveValues() {
      console.log("Saving values...");
      const values = {
        x1: parseFloat(this.p1.x),
        y1: parseFloat(this.p1.y),
        x2: parseFloat(this.p2.x),
        y2: parseFloat(this.p2.y),
        x3: parseFloat(this.p3.x),
        y3: parseFloat(this.p3.y),
        x4: parseFloat(this.p4.x),
        y4: parseFloat(this.p4.y),
        z: parseFloat(this.z),
        rot: parseInt(this.rot),
        anchorPoint: parseInt(this.anchorPoint)
      }
      this.$emit('item-config-updated', this.udId, values);
    }
  }
}
</script>

<style scoped>

</style>