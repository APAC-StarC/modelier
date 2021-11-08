<template>
  <div id="app" class="">
    <div v-if="selectedImageUid">
      <portal selector="body">
        <GalleryItemViewer v-on:image-closed="closeGalleryImage" v-bind:viewer="viewer" v-bind:default-fov="defaultFOV"
                           v-bind:selected-image="images[selectedImageUid]" v-bind:selected-image-conf="galleryItemsConfig[selectedImageUid]"></GalleryItemViewer>
        <div class="absolute bottom-0 py-2 text-white bg-gray-800 px-3" style="z-index: 1000;">FOV:{{viewer.getFOV()}}</div>
      </portal>
    </div>
    <div>
      <div v-if="explosionEnabled" class="text-white mt-4">
        <ExplosionPlayer v-bind:explosion-current-step="explosionCurrentStep" v-bind:explosion-settings="explosionSettings"
                         v-bind:pt-potree-references="ptPotreeReferences"
                        v-on:explosion-step-changed="setExplosionStep"
        ></ExplosionPlayer>
      </div>
      <div class="mt-4 flex" v-if="galleryEnabled">
        <!-- Enabled: "bg-indigo-600", Not Enabled: "bg-gray-200" -->
        <Toggle v-model="galleryOpen" :classes="{
                        toggleOn: 'bg-indigo-600 border-indigo-500 justify-start text-white',
                        toggleOff: 'bg-gray-200 border-gray-200 justify-end text-gray-700'
                    }"></Toggle>
        <span class="text-sm font-medium pl-4 block" v-if="galleryOpen">Hide Gallery</span>
        <span class="text-sm font-medium pl-4 block" v-if="!galleryOpen">Show Gallery</span>
      </div>
      <div v-if="images && galleryOpen">
        <GalleryItemsPlayer
            v-on:save-image-orientation="saveOrientationOnSelectedImage"
            v-on:image-selected="selectGalleryImage"
            v-bind:selected-image="images[selectedImageUid]"
            v-bind:images="images"
            v-bind:gallery-items-config="galleryItemsConfig"
            v-bind:viewer="viewer"
            v-bind:admin-mode="adminMode"
        >
        </GalleryItemsPlayer>
      </div>
      <div class="flex mt-4" v-if="depictionsEnabled">
        <!-- Enabled: "bg-indigo-600", Not Enabled: "bg-gray-200" -->
        <Toggle v-model="depictionsOpen" :classes="{
                        toggleOn: 'bg-indigo-600 border-indigo-500 justify-start text-white',
                        toggleOff: 'bg-gray-200 border-gray-200 justify-end text-gray-700'
                    }"></Toggle>
        <span class="text-sm font-medium pl-4 block" v-if="depictionsOpen">GPR Meshes</span>
        <span class="text-sm font-medium pl-4 block" v-if="!depictionsOpen">GPR Meshes</span>
      </div>
      <div v-if="depictionsEnabled">
        <UndergroundDepictionsConfigurator
            v-bind:depictions="undergroundDepictions"
            v-bind:settings="undergroundDepictionsSettings"
            v-bind:viewer="viewer"
            v-bind:show-config="adminMode"
            v-bind:show-gallery="depictionsOpen"
            v-on:on-save="saveToServer"
        ></UndergroundDepictionsConfigurator>
      </div>
      <div class="flex mt-4">
        <!-- Enabled: "bg-indigo-600", Not Enabled: "bg-gray-200" -->
        <button type="button" v-on:click="toggleFullScreen"
                v-bind:class="[ isFullscreen ? 'bg-indigo-600' : 'bg-gray-200' ]"
                class="relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                aria-pressed="false">
          <span class="sr-only">Use setting</span>
          <!-- Enabled: "translate-x-5", Not Enabled: "translate-x-0" -->
          <span aria-hidden="true"
                v-bind:class="[ isFullscreen ? 'translate-x-5' : 'translate-x-0' ]"
                class="pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"></span>
        </button>
        <span class="text-sm font-medium pl-4" v-if="isFullscreen">Close Fullscreen</span>
        <span class="text-sm font-medium pl-4" v-if="!isFullscreen">Go Fullscreen</span>
      </div>
      <!--      <div class="text-white">-->
      <!--        <button type="button" v-on:click="toggleFullScreen"-->
      <!--                class="relative inline-flex items-center px-4 py-2 rounded-md border border-gray-300 bg-white text-md font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">-->
      <!--          🔛 Toggle Fullscreen-->
      <!--        </button>-->
      <!--      </div>-->

      <div class="py-2 mt-6 text-white" v-if="adminMode">
        <div class="flex justify-between">
          <span class="font-semibold">Admin config</span>
          <div class="relative z-0 inline-flex shadow-sm rounded-md flex flex-wrap">
            <button type="button" v-on:click="saveInitialStateConfig"
                    class="-ml-px relative inline-flex items-center p-1 mr-2 rounded-md border border-gray-300 bg-white text-md font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
              💾
            </button>
            <button type="button" v-on:click="loadInitialStateConfig"
                    class="-ml-px relative inline-flex items-center p-1 rounded-md border border-gray-300 bg-white text-md font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
              🔁
            </button>
          </div>
        </div>
        <hr class="border-2 border-white mt-4 mb-4"/>

        <div class="flex mt-2">
          <!-- Enabled: "bg-indigo-600", Not Enabled: "bg-gray-200" -->
          <Toggle v-model="explosionEnabled" :classes="{
                        toggleOn: 'bg-indigo-600 border-indigo-500 justify-start text-white',
                        toggleOff: 'bg-gray-200 border-gray-200 justify-end text-gray-700'
                    }"></Toggle>
          <span class="text-sm font-medium pl-4" v-if="explosionEnabled">Explosion Enabled</span>
          <span class="text-sm font-medium pl-4" v-if="!explosionEnabled">Explosion Disabled</span>
        </div>
        <div v-if="explosionEnabled">
          <div class="mt-2 flex flex-col justify-stretch">
            <ExplosionConfigurator v-bind:explosion-settings="explosionSettings"></ExplosionConfigurator>
          </div>
        </div>

        <hr class="border border-blue-600 mt-4 mb-4"/>

        <div class="flex mt-4">
          <!-- Enabled: "bg-indigo-600", Not Enabled: "bg-gray-200" -->
          <Toggle v-model="galleryEnabled" :classes="{
                        toggleOn: 'bg-indigo-600 border-indigo-500 justify-start text-white',
                        toggleOff: 'bg-gray-200 border-gray-200 justify-end text-gray-700'
                    }"></Toggle>
          <span class="text-sm font-medium pl-4" v-if="galleryEnabled">Gallery Enabled</span>
          <span class="text-sm font-medium pl-4" v-if="!galleryEnabled">Gallery Disabled</span>
        </div>
        <div id="cyi-tools-gallery-config"></div>
        <hr class="border border-blue-600 mt-4 mb-4"/>

        <div class="flex mt-2">
          <Toggle v-model="depictionsEnabled" :classes="{
                        toggleOn: 'bg-indigo-600 border-indigo-500 justify-start text-white',
                        toggleOff: 'bg-gray-200 border-gray-200 justify-end text-gray-700'
                    }"></Toggle>
          <span class="text-sm font-medium pl-4" v-if="depictionsEnabled">GPR Enabled</span>
          <span class="text-sm font-medium pl-4" v-if="!depictionsEnabled">GPR Disabled</span>
        </div>
        <div id="cyi-tools-depictions-config"></div>
      </div>
    </div>

    <portal selector="#cyi-tools-sidebar">
      <div id="cyi-tools-sidebar-content"
           v-bind:class="[sidebarOpen ? 'w-56' : 'w-0', 'fixed top-0 bottom-0 right-0 bg-gray-800 flex flex-col text-white overflow-auto']" style="z-index: 100">

      </div>
    </portal>

  </div>
</template>

<script>
import * as THREE from 'three'
import {Portal} from '@linusborg/vue-simple-portal'

window.THREE = THREE;

function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

const csrftoken = getCookie('csrftoken');
const visConfig = JSON.parse(document.getElementById('visConfig').textContent); //Gets pointcloud json config generated from django template tag above
import GalleryItemsPlayer from './components/GalleryItemsPlayer.vue';
import GalleryItemViewer from './components/GalleryItemViewer.vue';
import ExplosionPlayer from './components/ExplosionPlayer.vue';
import ExplosionConfigurator from './components/ExplosionConfigurator.vue';
import UndergroundDepictionsConfigurator from "./components/UndergroundDepictionsConfigurator.vue";

import Toggle from '@vueform/toggle/dist/toggle.vue2.js'

export default {
  name: 'App',
  components: {
    UndergroundDepictionsConfigurator,
    ExplosionConfigurator,
    ExplosionPlayer,
    GalleryItemsPlayer,
    GalleryItemViewer,
    Portal,
    Toggle
  },
  data() {
    return {
      //General config elements
      viewer: window.viewer,
      scene: null,
      visConfig: visConfig,
      potreeProjectConfig: null,
      orbitControls: window.viewer.orbitControls,
      // CYI Tools Viewer settings
      defaultFOV: 60,
      galleryOpen: false,
      depictionsOpen: false,
      adminMode: window.adminMode,
      //Admin Tools

      explosionEnabled: false,
      galleryEnabled: false,
      depictionsEnabled: false,
      annotationWaitingClick: false,
      explosionSettings: {
        explosionMoveStep: 10,
      },
      explosionCurrentStep: 0,
      images: {},
      galleryItemsConfig: {},
      selectedImageUid: null,
      ptPotreeReferences: {},
      undergroundDepictionsSettings: {}
    }
  },
  watch: {
    galleryOpen: function (val) {
      if(val){
        this.defaultFOV = this.viewer.getFOV();
      }
    },
  },
  computed: {
    // a computed getter
    sidebarOpen: function () {
      // `this` points to the vm instance
      return this.galleryOpen
    },
    isFullscreen: function () {
      return window.fullScreen;
    }
  },
  created: function () {
    let _this = this;
    this.loadInitialStateConfig();
    for (const [ptId, ptConf] of Object.entries(visConfig.pointclouds)) {
      window.Potree.loadPointCloud(ptConf.url, ptConf.title, function (e) {
        let pointcloud = e.pointcloud;
        _this.ptPotreeReferences[ptId] = pointcloud;
        _this.viewer.scene.addPointCloud(pointcloud);
        _this.viewer.fitToScreen();
        _this.initializeExplosionIfNewModel(ptId);
      });
    }

    const axesHelper = new THREE.AxesHelper(5);
    this.viewer.scene.scene.add(axesHelper); // Potree saves the THREEJs scene under a scene ref in the Potree scene
    this.orbitControls = this.viewer.getControls();
    window.addEventListener('keydown', this.keyDown);
    //this.viewer.renderer.domElement.addEventListener('wheel', this.mouseWheel, {passive: true});
    //this.viewer.renderer.domElement.addEventListener('DOMMouseScroll', this.mouseWheel, false);
    window.app = this;
    window.addEventListener("message",this.parentMessage);
  },
  destroyed: function() {
    window.removeEventListener("message", this.parentMessage);
  },
  methods: {
    mouseWheel: function(e){
      const fov = this.viewer.getFOV();
      if (e.ctrlKey && e.shiftKey && this.selectedImageUid){
        console.log('preventDefault')
        e.preventDefault();
        //Our cue to modify FOV
        if(e.wheelDelta > 0 && fov < 100){
          this.viewer.setFOV(fov + 1);
          console.log("Setting fov at", fov+1);
        }else if(e.wheelDelta < 0 && fov > 1){
          this.viewer.setFOV(fov - 1);
        }

      }

    },
    keyDown: function (e) {
      const rot = 0.01;
      const zom = 0.05
      const mov = 0.001;
      switch (e.code) {
        case "KeyS":
        case "ArrowDown":
          // Handle "back"
          //this.orbitControls.panDelta.x += l;
          //this.orbitControls.panDelta.y += l;
          this.orbitControls.pitchDelta += rot;
          break;
        case "KeyW":
        case "ArrowUp":
          // Handle "forward"
          //this.orbitControls.panDelta.x -= l;
          //this.orbitControls.panDelta.y -= l;
          this.orbitControls.pitchDelta -= rot;
          break;
        case "KeyA":
        case "ArrowLeft":
          // Handle "turn left"
          this.orbitControls.yawDelta -= rot;
          //this.orbitControls.pitchDelta -= l;
          break;
        case "KeyD":
        case "ArrowRight":
          // Handle "turn right"
          this.orbitControls.yawDelta += rot;
          //this.orbitControls.pitchDelta += l;
          break;
        case "KeyQ":
          this.orbitControls.panDelta.y += mov;
          break;
        case "KeyE":
          this.orbitControls.panDelta.y -= mov;
          break;
        case "KeyZ":
          this.orbitControls.panDelta.x -= mov;
          break;
        case "KeyC":
          this.orbitControls.panDelta.x += mov;
          break;
        case "KeyR":
          this.orbitControls.radiusDelta += zom;
          break;
        case "KeyF":
          this.orbitControls.radiusDelta -= zom;
          break;
      }
      //this.orbitControls.update(0.01);
    },
    toggleFullScreen: function () {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      }
    },
    setExplosionStep: function(step){
      this.explosionCurrentStep = step;
    },
    saveConfigOnServer: function () {
      //Gather all important stuff to send on the server.
      // The set of info we will send will be the visConfig
      // that we shall get in the future
      const dataToSave = {
        "potree": this.potreeProjectConfig,
        "customFeatures": {
          "explosionEnabled": this.explosionEnabled,
          "galleryEnabled": this.galleryEnabled,
          "depictionsEnabled": this.depictionsEnabled,
          "explosionSettings": this.explosionSettings,
          "galleryItemsSettings": this.galleryItemsConfig,
          "undergroundDepictionsSettings": this.undergroundDepictionsSettings,
        }
      }
      const url = 'config-update';
      const request = new Request(
          url,
          {headers: {'X-CSRFToken': csrftoken}}
      );
      fetch(request, {
        method: 'POST',
        body: JSON.stringify(dataToSave),
        mode: 'same-origin'  // Do not send CSRF token to another domain.
      }).then(function () {
        console.log("Done saving on server")
      });

    },
    saveToServer() {
      this.saveConfigOnServer();
    },
    saveInitialStateConfig: function () {
      this.potreeProjectConfig = window.Potree.saveProject(this.viewer);
      //Save on server
      this.saveConfigOnServer();
    },
    loadInitialStateConfig: function () {
      this.images = visConfig?.images; //Copy image definitions from visConfig to app
      this.undergroundDepictions = visConfig?.undergroundDepictions;
      this.potreeProjectConfig = this.visConfig.jsConf?.potree;
      this.customFeaturesConfig = this.visConfig.jsConf?.customFeatures;

      // For initialization, for now, we decide not to load any measurements or volumes etc
      /*
      data.measurements = [];
      data.volumes = [];
      data.cameraAnimations = [];
      data.classification = {};
      //data.profiles = data.profiles || [];
      //data.orientedImages =data.orientedImages || [];
      //data.annotations = data.annotations || []; //Should be passed to the Vue component for editing, and also be saved on the conf properly
      Potree.loadProject(this.viewer, data);
       */
      const dataToInitialize = this.potreeProjectConfig;
      if (dataToInitialize){
          dataToInitialize.pointclouds = []; //They get loaded from elsewhere right now
         dataToInitialize.geopackages = []; //Not supported right now as they need to be loaded AFTER pointclouds have been loaded
        window.Potree.loadProject(this.viewer, dataToInitialize);
      }


      this.galleryItemsConfig = this.customFeaturesConfig?.galleryItemsSettings || {};
      this.explosionEnabled = this.customFeaturesConfig?.explosionEnabled || false;
      this.galleryEnabled = this.customFeaturesConfig?.galleryEnabled || false;
      this.depictionsEnabled = this.customFeaturesConfig?.depictionsEnabled || false;
      if (this.customFeaturesConfig?.explosionSettings) {
        this.explosionSettings = this.customFeaturesConfig?.explosionSettings
      }
      if (this.customFeaturesConfig?.undergroundDepictionsSettings) {
        this.undergroundDepictionsSettings = this.customFeaturesConfig.undergroundDepictionsSettings
      }
    },
    initializeExplosionIfNewModel: function (ptId) {
      if (!this.explosionSettings.ptModels) {
        this.explosionSettings.ptModels = {};
      }
      if (!this.explosionSettings.ptModels[ptId]) {
        this.explosionSettings.ptModels[ptId] = {
          title: this.visConfig.pointclouds[ptId].title,
          direction: '',
          ptId: ptId,
          initialPos: this.ptPotreeReferences[ptId].position.clone()
        }
      }
    },
    addAnnotation: function () {
      this.annotationWaitingClick = true;
      let _this = this;
      this.viewer.renderer.domElement.addEventListener('mousedown', () => {
        _this.annotationWaitingClick = false;
        // remove old annotations
        //if (currentAnnotation !== null) {
        //    scene.removeAnnotation(currentAnnotation);
        // }

        // find intersection
        let mouse = this.viewer.inputHandler.mouse;
        const camera = this.viewer.scene.getActiveCamera();

        let hit = window.Potree.Utils.getMousePointCloudIntersection(mouse, camera, this.viewer, this.viewer.scene.pointclouds);
        console.log(hit);

        // add new annotation
        if (hit !== null) {
          let currentAnnotation = this.viewer.scene.addAnnotation([
            hit.location.x,
            hit.location.y,
            hit.location.z
          ], {
            "title": `(${hit.location.x},${hit.location.y},${hit.location.z})`,
            "actions": []
          });
          console.log(currentAnnotation);
        }
      }, {once: true});
    },
    csvToFloatList: function (param) {
      let parts = param.split(',');
      if (!parts.length) {
        return null;
      }
      let res = parts.map((pt) => {
        return parseFloat(pt)
      });
      return res;
    },
    closePotreeSidebar: function(){
      if (window.$('#potree_render_area').position().left > 0){
        window.$(".potree_menu_toggle").click()
      }
    },
    selectGalleryImage: function (imgUID) {
      this.closePotreeSidebar();
      this.selectedImageUid = imgUID; // this.images[imgUID];
      const conf = this.galleryItemsConfig[imgUID];
      if (conf) {
        if (conf.viewTarget && conf.viewPosition) {
          this.viewer.setCameraMode(conf.cameraMode); //window.Potree.CameraMode.ORTHOGRAPHIC);
          this.viewer.scene.view.setView(this.csvToFloatList(conf.viewPosition), this.csvToFloatList(conf.viewTarget));
          this.viewer.setFOV(conf.fov || this.defaultFOV);
        }
      }
    },
    closeGalleryImage: function () {
      this.selectedImageUid = null;
      this.viewer.setFOV(this.defaultFOV);
    },
    saveOrientationOnSelectedImage: function (imgUID) {
      const cameraPositionStr = this.viewer.scene.view.position.toArray().toString();
      const targetStr = this.viewer.scene.view.getPivot().toArray().toString();
      const cameraMode = this.viewer.scene.cameraMode;
      const fov = this.viewer.getFOV();
      if (!this.galleryItemsConfig[imgUID]) {
        this.galleryItemsConfig[imgUID] = {}
      }
      this.galleryItemsConfig[imgUID].viewTarget = targetStr;
      this.galleryItemsConfig[imgUID].viewPosition = cameraPositionStr;
      this.galleryItemsConfig[imgUID].cameraMode = cameraMode;
      this.galleryItemsConfig[imgUID].browserWidth = document.documentElement.clientWidth;
      this.galleryItemsConfig[imgUID].browserHeight = document.documentElement.clientHeight;
      this.galleryItemsConfig[imgUID].fov = fov;
      this.saveConfigOnServer();
    },
    parentMessage:function(e){
      console.log(e);
       if (e.data.func == 'explode') {
         const val = e.data.value;
          this.setExplosionStep(val);
      }
       if (e.data.func == 'gallery') {
         const val = e.data.value;
         this.galleryOpen = val;
      }
       if (e.data.func == 'gpr'){
         const val = e.data.value;
         this.depictionsOpen = val;
       }

    },
    render: function () {
      this.viewer.renderer.render(this.viewer.scene.scene, this.viewer.scene.getActiveCamera());
    }
  }
}
</script>

<style>
#admin-app {
  /*font-family: Avenir, Helvetica, Arial, sans-serif;*/
  /*-webkit-font-smoothing: antialiased;*/
  /*-moz-osx-font-smoothing: grayscale;*/
  /*text-align: center;*/
  /*color: #2c3e50;*/
  /*margin-top: 60px;*/
}
</style>
<style src="@vueform/toggle/themes/default.css"></style>