<template>
  <div class="mt-2 flex flex-col items-stretch">
    <span>Title: {{ ann.title }}</span>
  </div>
</template>

<script>
export default {
  name: "AnnotationItem",
  data() {
    return {
      ann: null,
      //title: '',
      //body: null,
      //position:null,
    }
  },
  props: {
    //title: String,
    //body: String,
    //position: Object,
    ann: Object,
  }
}
</script>

<style scoped>

</style>