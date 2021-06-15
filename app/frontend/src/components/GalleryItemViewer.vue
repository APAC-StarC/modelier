<template>
  <div>
      <img v-bind:src="selectedImage.url" v-bind:width="imgWidth" v-bind:height="imgHeight" class="centered-fixed" v-bind:style="{'opacity':opacity}"/>
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
      opacity: 0.5
    }
  },
  props: ['selectedImage'],
  computed:{
    imgWidth:function(){
      const originalBrowserWidthOnSave = this.selectedImage.browserWidth || document.documentElement.clientWidth;
      const currentBrowserWidth = document.documentElement.clientWidth;
      console.log('originalBrowserWidthOnSave',originalBrowserWidthOnSave,'currentBrowserWidth',currentBrowserWidth, 'imgWidth', this.selectedImage.width);
      const imgWidth = currentBrowserWidth / originalBrowserWidthOnSave * currentBrowserWidth;
      console.log("Calculated Image width:", imgWidth);
      console.log("Final img width", Math.min(imgWidth, this.selectedImage.width));
      //const calculatedWidth =  Math.min(imgWidth, this.selectedImage.width);
      //return calculatedWidth;
      return 'auto';

    },
    imgHeight:function(){
      const originalBrowserHeightOnSave = this.selectedImage.browserHeight || document.documentElement.clientHeight;
      const currentBrowserHeight = document.documentElement.clientHeight;
      console.log('originalBrowserHeightOnSave',originalBrowserHeightOnSave,'currentBrowserHeight',currentBrowserHeight, 'imgHeight', this.selectedImage.height);
      const imgHeight = currentBrowserHeight / originalBrowserHeightOnSave * currentBrowserHeight;
      console.log("Calculated Image height:", imgHeight);
      console.log("Final img height", Math.min(imgHeight, this.selectedImage.height));
      const calculatedHeight = Math.min(imgHeight, this.selectedImage.height);
      return calculatedHeight;
    }
  }
}
</script>

<style scoped>

/*#img-overlay-wrapper {*/
/*  position: absolute;*/
/*  left: 0;*/
/*  right: 0;*/
/*  top: 0;*/
/*  bottom: 0;*/
/*  z-index: 1;*/

/*}*/

/*#img-overlay-wrapper .flex-container {*/
/*  display: flex;*/
/*  flex-direction: column;*/
/*  justify-content: center;*/
/*  align-items: center;*/
/*  width: 100%;*/
/*  height: 100%;*/
/*}*/

  #img-overlay-wrapper #img-container {
  /*width: 50%;*/
  opacity: 0.4;
  transition: opacity 1s;
  /*text-align: center;*/
}

#img-overlay-wrapper #img-container:hover {
  width: 50%;
  opacity: 0.7;
}


#img-container img {
  max-width: 100%;
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