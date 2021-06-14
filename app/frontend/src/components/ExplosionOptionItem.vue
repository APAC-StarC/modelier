<template>
  <div class="mt-2 flex flex-col items-stretch">
    <span>{{ item.title }}:</span>
    <select v-model="item.direction" class="h-8 text-gray-900">
      <option disabled value="">Please select</option>
      <option value="left">left (-x)</option>
      <option value="right">right (+x)</option>
      <option value="back">back (-y)</option>
      <option value="front">front (+y)</option>
      <option value="down">down (-z)</option>
      <option value="up">up (+z)</option>
      <option value='dontmove'>do nothing</option>
    </select>
  </div>
</template>

<script>
export default {
  name: "ExplosionOptionItem",
  props: ['ptId','item'],
  data() {
    return {}
  },
}
</script>

<style scoped>

</style>