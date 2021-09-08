<template>
  <div class="selected-image-container">
      <img v-bind:src="selectedImage.url" width="auto"  class="centered-fixed" v-bind:style="{'opacity':opacity, 'max-height':imgHeight + 'px'}"/>
      <div class="controls">
        <Slider v-model="opacity" v-bind:min="0.1" v-bind:max="1" v-bind:step="-1" style="width:200px" />
        <button class="close-img-button text-gray-900 bg-white rounded-sm px-2 py-1 font-normal text-normal" v-on:click="$emit('image-closed')">close
        </button>
      </div>
   </div>
</template>

<script>
import Slider from '@vueform/slider/dist/slider.vue2.js'
export default {
  name: "GalleryItemViewer",
  components:{
    Slider
  },
  data() {
    return {
      opacity: 0.5,
    }
  },
  props: ['selectedImage', 'selectedImageConf'],
  computed:{

    imgHeight:function(){
      const originalBrowserHeightOnSave = this.selectedImageConf?.browserHeight || 0;
      const currentBrowserHeight = document.documentElement.clientHeight;
      const originalBroweserHeight = originalBrowserHeightOnSave || currentBrowserHeight;
      console.log('originalBrowserHeightOnSave',originalBrowserHeightOnSave,'currentBrowserHeight',currentBrowserHeight, 'imgHeight', this.selectedImage.height, 'originalBroweserHeight',originalBroweserHeight);
      const imgHeight = this.selectedImage.height * currentBrowserHeight / originalBroweserHeight;
      console.log("Calculated Image height:", imgHeight);
      return imgHeight;
    }
  }
}
</script>

<style scoped>

.selected-image-container{
  overflow:hidden;
}
.selected-image-container img {
  max-width: 10000px;
}
.controls{
  z-index: 100;
  position: fixed;
  top: 0;
  left:0;
  right:0;
  padding-top:5px;
  display: flex;
  flex-direction: column;
  align-items: center;

  justify-content: center;
}
.centered-fixed{
  z-index: 50;
  position: fixed;
  top:50%;
  left:50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
}
</style>
<style src="@vueform/slider/themes/default.css"></style>