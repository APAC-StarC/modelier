import Vue from 'vue'
import AdminApp from './AdminApp.vue'
import VueCompositionAPI from '@vue/composition-api'
Vue.use(VueCompositionAPI)


Vue.config.productionTip = false

// import App from './App.vue'
//
// new Vue({
//   render: h => h(App),
// }).$mount('#app')

let $ = window.$;
let Potree = window.Potree;
window.viewer = new Potree.Viewer(document.getElementById("potree_render_area"));
const visConfig = JSON.parse(document.getElementById('visConfig').textContent); //Gets pointcloud json config generated from django template tag above

let viewer = window.viewer;
viewer.setFOV(60);
viewer.setPointBudget(1 * 1000 * 1000);
viewer.setMinNodeSize(0);
//viewer.loadSettingsFromURL();
viewer.setDescription(visConfig.title);


const { menuConf } = visConfig;
if (menuConf.toolsEnabled){
    viewer.loadGUI().then(() => {
        viewer.setLanguage('en');
        if (!menuConf.showTools){
            $("#menu_tools").next().html("");
            $("#menu_tools").hide();
        }
        if (!menuConf.showScene){
            $("#menu_scene").next().html("");
            $("#menu_scene").hide();
        }
        if (!menuConf.showFilters){
            $("#menu_filters").next().html("");
            $("#menu_filters").hide();
        }
        if (!menuConf.showAbout){
            $("#menu_about").next().html("");
            $("#menu_about").hide();
        }
        if (!menuConf.showAppearance){
            $("#menu_appearance").next().html("");
            $("#menu_appearance").hide();
        }

        let section = $(`
        <h3 id="menu_meta" class="accordion-header ui-widget"><span>CYI Tools</span></h3>
        <div class="accordion-content ui-widget pv-menu-list"></div>
        `);
        let content = section.last();
        content.html(`
        <div id="cyi-app">
        </div>
        `);
        section.first().click(() => content.slideToggle());
        $('#potree_menu').append(section)
        //section.insertBefore($('#menu_about'));

        new Vue({
          render: h => h(AdminApp),
        }).$mount('#cyi-app')


    });
}


/*
<template>
  <div>
    <Slider v-model="value" />
  </div>
</template>

<script>
  import Slider from '@vueform/slider/dist/slider.vue2.js'

  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

  export default {
    components: {
      Slider,
    },
    data() {
      return {
        value: 20
      }
    }
  }
</script>

<style src="@vueform/slider/themes/default.css"></style>

<template>
  <div>
    <Toggle v-model="value" />
  </div>
</template>

<script>
  import Toggle from '@vueform/toggle/dist/toggle.vue2.js'

  export default {
    components: {
      Toggle,
    },
    data() {
      return {
        value: true
      }
    }
  }
</script>

<style src="@vueform/toggle/themes/default.css"></style>
<Toggle v-model="value" :classes="{
  container: 'inline-block',
  toggle: 'flex w-12 h-5 rounded-full relative cursor-pointer transition items-center box-content border-2 text-xs leading-none',
  toggleOn: 'bg-green-500 border-green-500 justify-start text-white',
  toggleOff: 'bg-gray-200 border-gray-200 justify-end text-gray-700',
  toggleOnDisabled: 'bg-gray-300 border-gray-300 justify-start text-gray-400 cursor-not-allowed',
  toggleOffDisabled: 'bg-gray-200 border-gray-200 justify-end text-gray-400 cursor-not-allowed',
  handle: 'inline-block bg-white w-5 h-5 top-0 rounded-full absolute transition-all',
  handleOn: 'left-full transform -translate-x-full',
  handleOff: 'left-0',
  handleOnDisabled: 'bg-gray-100 left-full transform -translate-x-full',
  handleOffDisabled: 'bg-gray-100 left-0',
  label: 'text-center w-8 border-box whitespace-nowrap select-none',
}" />
 */