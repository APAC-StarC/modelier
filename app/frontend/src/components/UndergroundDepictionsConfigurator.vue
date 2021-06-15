<template>
  <div>
    <div v-if="showConfig">
      <portal selector="#cyi-tools-depictions-config">
        <div v-for="(item, udId) in vectors" v-bind:key="'underDepict-'+udId"
             class="bg-gray-100 rounded-xl text-gray-900 px-1">
          <UndergroundDepictionConfigItem
              v-on:item-config-updated="updateMesh"
              v-bind:init-p1="item.p1"
              v-bind:init-p2="item.p2"
              v-bind:init-p3="item.p3"
              v-bind:init-p4="item.p4"
              v-bind:init-z="item.z"
              v-bind:init-rot="item.rot"
              v-bind:item="depictions[udId]"
              v-bind:ud-id="udId"
          ></UndergroundDepictionConfigItem>
        </div>
      </portal>
    </div>
    <div v-if="showGallery" class="mt-2">
      <div v-for="(item, udId) in depictions" v-bind:key="'depictGalleryItem-'+udId"
           class="px-2 py-1">
        <div v-if="meshes[udId]" class="flex">
          <Toggle v-model="meshes[udId].visible"></Toggle>
          <span class="block ml-2 text-xs mt-2 text-center">{{ item.title }}</span>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import UndergroundDepictionConfigItem from "./UndergroundDepictionConfigItem.vue";
import * as THREE from "three";
import {Portal} from '@linusborg/vue-simple-portal'
import Toggle from '@vueform/toggle/dist/toggle.vue2.js'

export default {
  name: "UndergroundDepictionsConfigurator",
  components: {
    UndergroundDepictionConfigItem,
    Portal,
    Toggle
  },
  props: ['settings', 'depictions', 'viewer', 'showConfig', 'showGallery'],
  data() {
    return {
      meshes: {},
      vectors: null,
    }
  },
  mounted() {
    this.createVectors();
    this.createMeshes();
  },
  methods: {
    createVectors() {
      let vectors = {}
      Object.entries(this.depictions).forEach(([udId]) => {
        const vals = this.settings[udId] || {x1: 0, y1: 0, x2: 0, y2: 0, x3: 0, y3: 0, x4: 0, y4: 0, z: 0, rot: 0};
        const p1 = new THREE.Vector2(vals.x1, vals.y1);
        const p2 = new THREE.Vector2(vals.x2, vals.y2);
        const p3 = new THREE.Vector2(vals.x3, vals.y3);
        const p4 = new THREE.Vector2(vals.x4, vals.y4);
        const z = vals.z;
        const rot = vals.rot;
        vectors[udId] = {
          p1,
          p2,
          p3,
          p4,
          z,
          rot,
        }
      });
      this.vectors = vectors;
    },
    rerenderMesh(mesh, width, height, rot, z, centerX, centerY) {

      mesh.width = width;
      mesh.heigh = height;
      mesh.position.set(centerX, centerY, z);
      mesh.rotation.z = rot * 3.14 / 180;
      //mesh.rotation.x = 3.14;
      mesh.rotation.y = 3.14;
    },
    calcWidthHeight(p1, p2, p3, p4) {
      const centerX = (p1.x + p2.x + p3.x + p4.x) / 4;
      const centerY = (p1.y + p2.y + p3.y + p4.y) / 4;
      // const center = new THREE.Vector2(centerX, centerY);
      // p1.rotateAround(center, rotRad);
      // p2.rotateAround(center, rotRad);
      // p3.rotateAround(center, rotRad);
      // p4.rotateAround(center, rotRad);

      const dist1 = (p1.distanceTo(p4) + p2.distanceTo(p3)) / 2;  //(this.calcDistance(vals.x4, vals.y4, vals.x1, vals.y1) + this.calcDistance(vals.x3, vals.y3, vals.x2, vals.y2)) / 2;
      const dist2 = (p2.distanceTo(p1) + p3.distanceTo(p4)) / 2;  //this.calcDistance(vals.x2, vals.y2, vals.x1, vals.y1) + this.calcDistance(vals.x3, vals.y3, vals.x4, vals.y4)) / 2;
      const width = Math.max(dist1, dist2);
      const height = Math.min(dist1, dist2);
      return {width, height, centerX, centerY}
    },
    createMeshes() {
      Object.entries(this.depictions).forEach(([udId, item]) => {
        const map = new THREE.TextureLoader().load(item.url);
        const material = new THREE.MeshBasicMaterial({map: map, opacity: 0.9, transparent: true,});
        if (!this.settings[udId]) {
          return;
        }
        //const centerX = (p1.x + p2.x + p3.x3 + p4.x4) / 4;
        //const centerY = (vals.y1 + vals.y2 + vals.y3 + vals.y4) / 4;
        let {p1, p2, p3, p4} = this.vectors[udId];
        const {z, rot} = this.settings[udId];
        const {width, height, centerX, centerY} = this.calcWidthHeight(p1, p2, p3, p4);
        const mesh = new THREE.Mesh(new THREE.BoxGeometry(width, height, 0.01), material);
        mesh.visible = false;
        this.viewer.scene.scene.add(mesh);
        this.rerenderMesh(mesh, width, height, rot, z, centerX, centerY);
        this.meshes[udId] = mesh;
      })
    },
    updateMesh(udId, vals) {
      const p1 = new THREE.Vector2(vals.x1, vals.y1);
      const p2 = new THREE.Vector2(vals.x2, vals.y2);
      const p3 = new THREE.Vector2(vals.x3, vals.y3);
      const p4 = new THREE.Vector2(vals.x4, vals.y4);
      const {z, rot} = vals;
      this.vectors[udId] = {
        p1,
        p2,
        p3,
        p4,
        z,
        rot
      };
      this.settings[udId] = {
        x1: p1.x,
        y1: p1.y,
        x2: p2.x,
        y2: p2.y,
        x3: p3.x,
        y3: p3.y,
        x4: p4.x,
        y4: p4.y,
        z,
        rot
      }
      const {width, height, centerX, centerY} = this.calcWidthHeight(p1, p2, p3, p4);
      const mesh = this.meshes[udId];
      this.$emit('on-save', 'depictions');
      this.rerenderMesh(mesh, width, height, rot, z, centerX, centerY);
    }
  },
}
</script>

<style scoped>

</style>
<style src="@vueform/toggle/themes/default.css"></style>