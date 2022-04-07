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
              v-bind:init-anchor-point="item.anchorPoint"
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
        const anchorPoint = vals.anchorPoint;
        vectors[udId] = {
          p1,
          p2,
          p3,
          p4,
          z,
          rot,
          anchorPoint
        }
      });
      this.vectors = vectors;
    },
    rerenderMesh(mesh, width, height, angle, rot, z, centerX, centerY) {
      //map.center = new THREE.Vector2(centerX, centerY);
      mesh.position.set(centerX, centerY, z);
      mesh.rotation.z = angle + (rot * 3.14 / 180);
      // mesh.rotateZ()
      mesh.width = width;
      mesh.heigh = height;
      mesh.position.set(centerX, centerY, z);
      //mesh.rotation.x = 3.14;
      //mesh.rotation.y = 3.14;
    },
    calcWidthHeight(t1, t2, t3) {
      const width = (t2.distanceTo(t1));
      const height = (t3.distanceTo(t2));
      const centerX = t2.x - (t2.x - t1.x)/2 - (t2.x - t3.x)/2;
      const centerY = t2.y - (t2.y-t1.y)/2 - (t2.y - t3.y)/2;
      const angle = Math.atan2(t2.y - t1.y, t2.x - t1.x);
      return {width, height, centerX, centerY, angle}
    },
    getSelectedPoints(p1,p2,p3,p4, anchorPoint){
      let selectedPoints;
      switch (anchorPoint) {
        case "1":
          selectedPoints = [p1,p2,p3];
          break;
        case "2":
          selectedPoints = [p2,p3,p4];
          break;
        case "3":
          selectedPoints = [p3,p4, p1];
          break;
        case "4":
          selectedPoints = [p4, p1,p2];
          break;
        default:
          selectedPoints = [p1,p2,p3];
      }
      const [t1,t2,t3]= selectedPoints;
      return [t1,t2,t3];
    },
    createMeshes() {
      Object.entries(this.depictions).forEach(([udId, item]) => {
        if (!this.settings[udId]) {
          return;
        }
        //const centerX = (p1.x + p2.x + p3.x3 + p4.x4) / 4;
        //const centerY = (vals.y1 + vals.y2 + vals.y3 + vals.y4) / 4;
        let {p1, p2, p3, p4} = this.vectors[udId];
        const {z, rot, anchorPoint} = this.settings[udId];
        const startingPoint = anchorPoint;

        const [t1,t2,t3]= this.getSelectedPoints(p1,p2,p3,p4, startingPoint);

        const {width, height, centerX, centerY, angle} = this.calcWidthHeight(t1, t2, t3);

        const geometry = new THREE.PlaneGeometry( width, height );
        const map = new THREE.TextureLoader().load(item.url);
        const material = new THREE.MeshBasicMaterial({map: map, opacity: 0.9, transparent: true, side: THREE.FrontSide});
        const mesh = new THREE.Mesh(geometry, material);

        mesh.visible = false;
        this.viewer.scene.scene.add(mesh);
        this.rerenderMesh(mesh, width, height, angle, rot, z, centerX, centerY);
        this.meshes[udId] = mesh;

        // Render dots for each image for debugging
        // const dots = this.renderDots([p1,p2,p3,p4], z);
        // dots.forEach((dot)=>{
        //   this.viewer.scene.scene.add( dot );
        // })

      })
    },
    renderDots(pointsArr){
      const dots = [];
      pointsArr.forEach((dot)=>{
        var dotGeometry = new THREE.BufferGeometry();
        console.log("calculating dot to display", dot.toArray());
        dotGeometry.setAttribute( 'position', new THREE.Float32BufferAttribute( [...dot.toArray()], 3 ) );
        dotGeometry.setAttribute( 'size', new THREE.Float32BufferAttribute( [1,1,1], 1 ) );
        var dotMaterial = new THREE.PointsMaterial( { size: 0.1 } );
        var meshDot = new THREE.Points( dotGeometry, dotMaterial );
        dots.push(meshDot);
      })
      return dots
    },
    updateMesh(udId, vals) {
      console.log("Updating mesh with vals", vals);
      const p1 = new THREE.Vector2(vals.x1, vals.y1);
      const p2 = new THREE.Vector2(vals.x2, vals.y2);
      const p3 = new THREE.Vector2(vals.x3, vals.y3);
      const p4 = new THREE.Vector2(vals.x4, vals.y4);
      const {z, rot, anchorPoint} = vals;
      const ap = anchorPoint || "1";
      this.vectors[udId] = {
        p1,
        p2,
        p3,
        p4,
        z,
        rot,
        anchorPoint: ap
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
        rot,
        anchorPoint: ap
      }
      console.log("Refreshing with anchor point", ap);
      const [t1,t2,t3]= this.getSelectedPoints(p1,p2,p3,p4, ap);
      console.log("[t1,t2,t3]", [t1,t2,t3]);
      const {width, height, centerX, centerY, angle} = this.calcWidthHeight(t1, t2, t3);
      const mesh = this.meshes[udId];
      this.$emit('on-save', 'depictions');
      this.rerenderMesh(mesh, width, height, angle, rot, z, centerX, centerY);
    }
  },
}
</script>

<style scoped>

</style>
<style src="@vueform/toggle/themes/default.css"></style>