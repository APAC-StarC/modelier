<template>
  <portal selector="#cyi-tools-sidebar-content">
    <div class="text-xs px-2 py-2 bg-gray-900 w-100">Photo Gallery</div>
    <div class="flex flex-col justify-stretch px-2">
      <div class="mt-4" v-for="(item, uid) in images" v-bind:key="'img-'+uid">
        <img class="w-100 w-max-100 rounded-sm border border-gray-200" v-bind:src="item.url"
             v-on:click="$emit('image-selected',uid)"/>
        <div class="block text-xs mt-2">Title: <span class="italic font-semibold">{{ item.title }}</span></div>
        <div class="mt-2 flex justify-between text-sm font-semibold" v-if="adminMode"><button v-on:click="$emit('save-image-orientation',uid)" class="text-red-600 italic">Save orientation...</button><span v-if="selectedImage && selectedImage.id==uid" class="text-blue-700">Active</span></div>
      </div>
    </div>
  </portal>
</template>

<script>
import {Portal} from '@linusborg/vue-simple-portal'

export default {
  name: "GalleryItemsPlayer",
  components: {
    Portal
  },
  data() {
    return {}
  },
  props: ['galleryItemsConfig', 'viewer', 'images', 'selectedImage','adminMode'],
}
</script>

<style scoped>

</style>