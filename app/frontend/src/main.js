import Vue from 'vue'
import AdminApp from './App.vue'
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


const { menuConf, visConf } = visConfig;
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
        }else{
            $("#menu_about").html("About Potree");
        }
        if (!menuConf.showAppearance){
            $("#menu_appearance").next().html("");
            $("#menu_appearance").hide();
        }

        let content, section, sections = [];
        if (visConf.description){
            let section = $(`
            <h3 id="menu_model_description" class="accordion-header ui-widget"><span>About the Project</span></h3>
            <div class="accordion-content ui-widget pv-menu-list p-2"></div>
            `);
            let content = section.last();
            content.html(visConf.description);
            section.first().click(() => content.slideToggle());
            sections.push(section);
        }
        section = $(`
        <h3 id="menu_meta" class="accordion-header ui-widget"><span>CYI Tools</span></h3>
        <div class="accordion-content ui-widget pv-menu-list"></div>
        `);
        content = section.last();
        content.html(`
        <div id="cyi-app">
        </div>
        `);
        section.first().click(() => content.slideToggle());
        sections.push(section);

        sections.forEach(section => $('#potree_menu').append(section));
        //section.insertBefore($('#menu_about'));

        new Vue({
          render: h => h(AdminApp),
        }).$mount('#cyi-app');


    });
}