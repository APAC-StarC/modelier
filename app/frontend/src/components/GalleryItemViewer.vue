<template>
  <div>
      <img v-bind:src="selectedImage.url" v-bind:width="imgWidth" height="auto" class="centered-fixed"/>
      <button class="close-img-button text-white underline font-normal text-normal" v-on:click="$emit('image-closed')">close
      </button>
   </div>
</template>

<script>
export default {
  name: "GalleryItemViewer",
  data() {
    return {}
  },
  props: ['selectedImage'],
  computed:{
    imgWidth:function(){
      const originalBrowserWidthOnSave = this.selectedImage.browserWidthOnSave || document.documentElement.clientWidth;
      const currentBrowserWidth = document.documentElement.clientWidth;
      console.log('originalBrowserWidthOnSave',originalBrowserWidthOnSave,'currentBrowserWidth',currentBrowserWidth, 'imgWidth', this.selectedImage.width);
      const imgWidth= currentBrowserWidth / originalBrowserWidthOnSave * currentBrowserWidth;
      console.log("Calculated Image width:", imgWidth);
      return Math.min(imgWidth, this.selectedImage.width);
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
.close-img-button{
  z-index: 100;
  position: fixed;
  bottom: 0;
}
.centered-fixed{
  z-index: 50;
  opacity: 0.5;
  position: fixed;
  top:50%;
  left:50%;
  transform: translate(-50%, -50%);
}
</style>