(function(e){function t(t){for(var n,a,r=t[0],l=t[1],c=t[2],p=0,u=[];p<r.length;p++)a=r[p],Object.prototype.hasOwnProperty.call(o,a)&&o[a]&&u.push(o[a][0]),o[a]=0;for(n in l)Object.prototype.hasOwnProperty.call(l,n)&&(e[n]=l[n]);d&&d(t);while(u.length)u.shift()();return s.push.apply(s,c||[]),i()}function i(){for(var e,t=0;t<s.length;t++){for(var i=s[t],n=!0,r=1;r<i.length;r++){var l=i[r];0!==o[l]&&(n=!1)}n&&(s.splice(t--,1),e=a(a.s=i[0]))}return e}var n={},o={app:0},s=[];function a(t){if(n[t])return n[t].exports;var i=n[t]={i:t,l:!1,exports:{}};return e[t].call(i.exports,i,i.exports,a),i.l=!0,i.exports}a.m=e,a.c=n,a.d=function(e,t,i){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},a.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(a.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)a.d(i,n,function(t){return e[t]}.bind(null,n));return i},a.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="/static/vue/dist/";var r=window["webpackJsonp"]=window["webpackJsonp"]||[],l=r.push.bind(r);r.push=t,r=r.slice();for(var c=0;c<r.length;c++)t(r[c]);var d=l;s.push([0,"chunk-vendors"]),i()})({0:function(e,t,i){e.exports=i("56d7")},"505c":function(e,t,i){"use strict";i("e45e")},"56d7":function(e,t,i){"use strict";i.r(t);i("e260"),i("e6cf"),i("cca6"),i("a79d"),i("a4d3"),i("e01a");var n=i("a026"),o=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{attrs:{id:"app"}},[e.selectedImageUid?i("div",[i("portal",{attrs:{selector:"body"}},[i("GalleryItemViewer",{attrs:{viewer:e.viewer,"default-fov":e.defaultFOV,"selected-image":e.images[e.selectedImageUid],"selected-image-conf":e.galleryItemsConfig[e.selectedImageUid]},on:{"image-closed":e.closeGalleryImage}}),i("div",{staticClass:"absolute bottom-0 py-2 text-white bg-gray-800 px-3",staticStyle:{"z-index":"1000"}},[e._v("FOV:"+e._s(e.viewer.getFOV()))])],1)],1):e._e(),i("div",[e.explosionEnabled?i("div",{staticClass:"text-white mt-4"},[i("ExplosionPlayer",{attrs:{"explosion-current-step":e.explosionCurrentStep,"explosion-settings":e.explosionSettings,"pt-potree-references":e.ptPotreeReferences},on:{"explosion-step-changed":e.setExplosionStep}})],1):e._e(),e.galleryEnabled?i("div",{staticClass:"mt-4 flex"},[i("Toggle",{attrs:{classes:{toggleOn:"bg-indigo-600 border-indigo-500 justify-start text-white",toggleOff:"bg-gray-200 border-gray-200 justify-end text-gray-700"}},model:{value:e.galleryOpen,callback:function(t){e.galleryOpen=t},expression:"galleryOpen"}}),e.galleryOpen?i("span",{staticClass:"text-sm font-medium pl-4 block"},[e._v("Hide Gallery")]):e._e(),e.galleryOpen?e._e():i("span",{staticClass:"text-sm font-medium pl-4 block"},[e._v("Show Gallery")])],1):e._e(),e.images&&e.galleryOpen?i("div",[i("GalleryItemsPlayer",{attrs:{"selected-image":e.images[e.selectedImageUid],images:e.images,"gallery-items-config":e.galleryItemsConfig,viewer:e.viewer,"admin-mode":e.adminMode},on:{"save-image-orientation":e.saveOrientationOnSelectedImage,"image-selected":e.selectGalleryImage}})],1):e._e(),e.depictionsEnabled?i("div",{staticClass:"flex mt-4"},[i("Toggle",{attrs:{classes:{toggleOn:"bg-indigo-600 border-indigo-500 justify-start text-white",toggleOff:"bg-gray-200 border-gray-200 justify-end text-gray-700"}},model:{value:e.depictionsOpen,callback:function(t){e.depictionsOpen=t},expression:"depictionsOpen"}}),e.depictionsOpen?i("span",{staticClass:"text-sm font-medium pl-4 block"},[e._v("GPR Meshes")]):e._e(),e.depictionsOpen?e._e():i("span",{staticClass:"text-sm font-medium pl-4 block"},[e._v("GPR Meshes")])],1):e._e(),e.depictionsEnabled?i("div",[i("UndergroundDepictionsConfigurator",{attrs:{depictions:e.undergroundDepictions,settings:e.undergroundDepictionsSettings,viewer:e.viewer,"show-config":e.adminMode,"show-gallery":e.depictionsOpen},on:{"on-save":e.saveToServer}})],1):e._e(),i("div",{staticClass:"flex mt-4"},[i("button",{staticClass:"relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",class:[e.isFullscreen?"bg-indigo-600":"bg-gray-200"],attrs:{type:"button","aria-pressed":"false"},on:{click:e.toggleFullScreen}},[i("span",{staticClass:"sr-only"},[e._v("Use setting")]),i("span",{staticClass:"pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200",class:[e.isFullscreen?"translate-x-5":"translate-x-0"],attrs:{"aria-hidden":"true"}})]),e.isFullscreen?i("span",{staticClass:"text-sm font-medium pl-4"},[e._v("Close Fullscreen")]):e._e(),e.isFullscreen?e._e():i("span",{staticClass:"text-sm font-medium pl-4"},[e._v("Go Fullscreen")])]),e.adminMode?i("div",{staticClass:"py-2 mt-6 text-white"},[i("div",{staticClass:"flex justify-between"},[i("span",{staticClass:"font-semibold"},[e._v("Admin config")]),i("div",{staticClass:"relative z-0 inline-flex shadow-sm rounded-md flex flex-wrap"},[i("button",{staticClass:"-ml-px relative inline-flex items-center p-1 mr-2 rounded-md border border-gray-300 bg-white text-md font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500",attrs:{type:"button"},on:{click:e.saveInitialStateConfig}},[e._v(" 💾 ")]),i("button",{staticClass:"-ml-px relative inline-flex items-center p-1 rounded-md border border-gray-300 bg-white text-md font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500",attrs:{type:"button"},on:{click:e.loadInitialStateConfig}},[e._v(" 🔁 ")])])]),i("hr",{staticClass:"border-2 border-white mt-4 mb-4"}),i("div",{staticClass:"flex mt-2"},[i("Toggle",{attrs:{classes:{toggleOn:"bg-indigo-600 border-indigo-500 justify-start text-white",toggleOff:"bg-gray-200 border-gray-200 justify-end text-gray-700"}},model:{value:e.explosionEnabled,callback:function(t){e.explosionEnabled=t},expression:"explosionEnabled"}}),e.explosionEnabled?i("span",{staticClass:"text-sm font-medium pl-4"},[e._v("Explosion Enabled")]):e._e(),e.explosionEnabled?e._e():i("span",{staticClass:"text-sm font-medium pl-4"},[e._v("Explosion Disabled")])],1),e.explosionEnabled?i("div",[i("div",{staticClass:"mt-2 flex flex-col justify-stretch"},[i("ExplosionConfigurator",{attrs:{"explosion-settings":e.explosionSettings}})],1)]):e._e(),i("hr",{staticClass:"border border-blue-600 mt-4 mb-4"}),i("div",{staticClass:"flex mt-4"},[i("Toggle",{attrs:{classes:{toggleOn:"bg-indigo-600 border-indigo-500 justify-start text-white",toggleOff:"bg-gray-200 border-gray-200 justify-end text-gray-700"}},model:{value:e.galleryEnabled,callback:function(t){e.galleryEnabled=t},expression:"galleryEnabled"}}),e.galleryEnabled?i("span",{staticClass:"text-sm font-medium pl-4"},[e._v("Gallery Enabled")]):e._e(),e.galleryEnabled?e._e():i("span",{staticClass:"text-sm font-medium pl-4"},[e._v("Gallery Disabled")])],1),i("div",{attrs:{id:"cyi-tools-gallery-config"}}),i("hr",{staticClass:"border border-blue-600 mt-4 mb-4"}),i("div",{staticClass:"flex mt-2"},[i("Toggle",{attrs:{classes:{toggleOn:"bg-indigo-600 border-indigo-500 justify-start text-white",toggleOff:"bg-gray-200 border-gray-200 justify-end text-gray-700"}},model:{value:e.depictionsEnabled,callback:function(t){e.depictionsEnabled=t},expression:"depictionsEnabled"}}),e.depictionsEnabled?i("span",{staticClass:"text-sm font-medium pl-4"},[e._v("GPR Enabled")]):e._e(),e.depictionsEnabled?e._e():i("span",{staticClass:"text-sm font-medium pl-4"},[e._v("GPR Disabled")])],1),i("div",{attrs:{id:"cyi-tools-depictions-config"}})]):e._e()]),i("portal",{attrs:{selector:"#cyi-tools-sidebar"}},[i("div",{class:[e.sidebarOpen?"w-56":"w-0","fixed top-0 bottom-0 right-0 bg-gray-800 flex flex-col text-white overflow-auto"],staticStyle:{"z-index":"100"},attrs:{id:"cyi-tools-sidebar-content"}})])],1)},s=[],a=i("3835"),r=i("1da1"),l=(i("96cf"),i("ac1f"),i("1276"),i("498a"),i("d3b7"),i("4fad"),i("c740"),i("b0c0"),i("159b"),i("07ac"),i("3ca3"),i("ddb0"),i("99af"),i("d81d"),i("25f0"),i("5a89")),c=i("da99"),d=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("portal",{attrs:{selector:"#cyi-tools-sidebar-content"}},[i("div",{staticClass:"text-xs px-2 py-2 bg-gray-900 w-100"},[e._v("Photo Gallery")]),i("div",{staticClass:"flex flex-col justify-stretch px-2"},e._l(e.images,(function(t,n){return i("div",{key:"img-"+n,staticClass:"mt-4"},[i("img",{staticClass:"w-100 w-max-100 rounded-sm border border-gray-200",attrs:{src:t.url},on:{click:function(t){return e.$emit("image-selected",n)}}}),i("div",{staticClass:"block text-xs mt-2"},[e._v("Title: "),i("span",{staticClass:"italic font-semibold"},[e._v(e._s(t.title))])]),e.adminMode?i("div",{staticClass:"mt-2 flex justify-between text-sm font-semibold"},[i("button",{staticClass:"text-red-600 italic",on:{click:function(t){return e.$emit("save-image-orientation",n)}}},[e._v("Save orientation...")]),e.selectedImage&&e.selectedImage.id==n?i("span",{staticClass:"text-blue-700"},[e._v("Active")]):e._e()]):e._e()])})),0)])},p=[],u={name:"GalleryItemsPlayer",components:{Portal:c["a"]},data:function(){return{}},props:["galleryItemsConfig","viewer","images","selectedImage","adminMode"]},g=u,v=i("2877"),m=Object(v["a"])(g,d,p,!1,null,"a761fe44",null),f=m.exports,h=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"selected-image-container"},[i("img",{staticClass:"centered-fixed",style:{opacity:e.opacity,"max-height":e.imgHeight+"px"},attrs:{src:e.selectedImage.url,width:"auto"}}),i("div",{staticClass:"controls"},[i("Slider",{staticStyle:{width:"200px"},attrs:{min:.1,max:1,step:-1},model:{value:e.opacity,callback:function(t){e.opacity=t},expression:"opacity"}}),i("button",{staticClass:"close-img-button text-gray-900 bg-white rounded-sm px-2 py-1 font-normal text-normal",on:{click:function(t){return e.$emit("image-closed")}}},[e._v("close ")])],1)])},x=[],y=i("fb55"),b={name:"GalleryItemViewer",components:{Slider:y["a"]},data:function(){return{opacity:.5}},props:["selectedImage","selectedImageConf","viewer"],computed:{imgHeight:function(){var e,t=(null===(e=this.selectedImageConf)||void 0===e?void 0:e.browserHeight)||0,i=document.documentElement.clientHeight,n=t||i;console.log("originalBrowserHeightOnSave",t,"currentBrowserHeight",i,"imgHeight",this.selectedImage.height,"originalBroweserHeight",n);var o=this.selectedImage.height*i/n;return console.log("Calculated Image height:",o),o}}},w=b,C=(i("505c"),i("6419"),Object(v["a"])(w,h,x,!1,null,"9ad89464",null)),_=C.exports,S=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",[i("span",{staticClass:"text-sm block mb-2"},[e._v("💥 Explode scene ")]),i("Slider",{attrs:{tooltips:!1},on:{update:function(t){return e.$emit("explosion-step-changed",e.explosionStepInternal)}},model:{value:e.explosionStepInternal,callback:function(t){e.explosionStepInternal=t},expression:"explosionStepInternal"}})],1)},P=[],O={name:"ExplosionPlayer.vue",components:{Slider:y["a"]},data:function(){return{explosionScaleStepDefault:10,explosionMoveStepDefault:10,explosionStepInternal:0}},props:["explosionSettings","ptPotreeReferences","explosionCurrentStep"],watch:{explosionCurrentStep:function(){var e,t,i=this;this.explosionStepInternal=this.explosionCurrentStep;var n=this.explosionCurrentStep,o=null!==(e=this.explosionSettings)&&void 0!==e&&e.explosionMoveStep?this.explosionSettings.explosionMoveStep/100:this.explosionMoveStepDefault/100,s=null!==(t=this.explosionSettings)&&void 0!==t&&t.explosionScaleStep?this.explosionSettings.explosionScaleStep/100:this.explosionScaleStepDefault/100;console.log("Trying to explode with step",n," moveStep",o," scaleStep",s),Object.entries(this.explosionSettings.ptModels).forEach((function(e){var t=Object(a["a"])(e,2),r=t[0],l=t[1],c=i.ptPotreeReferences[r],d=l.direction,p=l.initialPos,u=n*o;if("scale"===d){var g=1+n*s;c.scale.set(g,g,g)}"right"===d&&(c.position.x=p.x-u),"left"===d&&(c.position.x=p.x+u),"front"===d&&(c.position.y=p.y-u),"back"===d&&(c.position.y=p.y+u),"up"===d&&(c.position.z=p.z-u),"down"===d&&(c.position.z=p.z+u)}))}}},E=O,I=Object(v["a"])(E,S,P,!1,null,"00fe193d",null),k=I.exports,j=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",[i("span",{staticClass:"text-xs block mt-4"},[e._v("Movement speed:")]),i("div",[i("Slider",{model:{value:e.explosionSettings.explosionMoveStep,callback:function(t){e.$set(e.explosionSettings,"explosionMoveStep",t)},expression:"explosionSettings.explosionMoveStep"}})],1),i("span",{staticClass:"text-xs block mt-4"},[e._v("Movement:")]),e._l(e.explosionSettings.ptModels,(function(e,t){return i("div",{key:"explode-"+t},[i("ExplosionOptionItem",{attrs:{item:e,"pt-id":t}})],1)}))],2)},F=[],M=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"mt-2 flex flex-col items-stretch"},[i("span",[e._v(e._s(e.item.title)+":")]),i("select",{directives:[{name:"model",rawName:"v-model",value:e.item.direction,expression:"item.direction"}],staticClass:"h-8 text-gray-900",on:{change:function(t){var i=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){var t="_value"in e?e._value:e.value;return t}));e.$set(e.item,"direction",t.target.multiple?i:i[0])}}},[i("option",{attrs:{disabled:"",value:""}},[e._v("Please select")]),i("option",{attrs:{value:"left"}},[e._v("left (-x)")]),i("option",{attrs:{value:"right"}},[e._v("right (+x)")]),i("option",{attrs:{value:"back"}},[e._v("back (-y)")]),i("option",{attrs:{value:"front"}},[e._v("front (+y)")]),i("option",{attrs:{value:"down"}},[e._v("down (-z)")]),i("option",{attrs:{value:"up"}},[e._v("up (+z)")]),i("option",{attrs:{value:"dontmove"}},[e._v("do nothing")])])])},D=[],z={name:"ExplosionOptionItem",props:["ptId","item"],data:function(){return{}}},T=z,V=Object(v["a"])(T,M,D,!1,null,"702cca04",null),$=V.exports,A={name:"ExplosionConfigurator.vue",components:{Slider:y["a"],ExplosionOptionItem:$},props:["explosionSettings"]},G=A,R=Object(v["a"])(G,j,F,!1,null,"36734707",null),U=R.exports,N=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",[e.showConfig?i("div",[i("portal",{attrs:{selector:"#cyi-tools-depictions-config"}},e._l(e.vectors,(function(t,n){return i("div",{key:"underDepict-"+n,staticClass:"bg-gray-100 rounded-xl text-gray-900 px-1"},[i("UndergroundDepictionConfigItem",{attrs:{"init-p1":t.p1,"init-p2":t.p2,"init-p3":t.p3,"init-p4":t.p4,"init-z":t.z,"init-rot":t.rot,"init-anchor-point":t.anchorPoint,item:e.depictions[n],"ud-id":n},on:{"item-config-updated":e.updateMesh}})],1)})),0)],1):e._e(),e.showGallery?i("div",{staticClass:"mt-2"},e._l(e.depictions,(function(t,n){return i("div",{key:"depictGalleryItem-"+n,staticClass:"px-2 py-1"},[e.meshes[n]?i("div",{staticClass:"flex"},[i("Toggle",{model:{value:e.meshes[n].visible,callback:function(t){e.$set(e.meshes[n],"visible",t)},expression:"meshes[udId].visible"}}),i("span",{staticClass:"block ml-2 text-xs mt-2 text-center"},[e._v(e._s(t.title))])],1):e._e()])})),0):e._e()])},H=[],K=i("2909"),B=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"mt-2 flex flex-col max-w-100 text-xs"},[i("span",{staticClass:"block font-semibold text-sm text-center"},[e._v(e._s(e.item.title))]),i("div",{staticClass:"flex flex-col mb-2"},[i("div",[i("span",[e._v("x1: ")]),i("input",{directives:[{name:"model",rawName:"v-model",value:e.p1.x,expression:"p1.x"}],domProps:{value:e.p1.x},on:{input:function(t){t.target.composing||e.$set(e.p1,"x",t.target.value)}}})]),i("div",[i("span",[e._v("y1: ")]),i("input",{directives:[{name:"model",rawName:"v-model",value:e.p1.y,expression:"p1.y"}],domProps:{value:e.p1.y},on:{input:function(t){t.target.composing||e.$set(e.p1,"y",t.target.value)}}})])]),i("div",{staticClass:"flex flex-col mb-2"},[i("div",[i("span",[e._v("x2: ")]),i("input",{directives:[{name:"model",rawName:"v-model",value:e.p2.x,expression:"p2.x"}],domProps:{value:e.p2.x},on:{input:function(t){t.target.composing||e.$set(e.p2,"x",t.target.value)}}})]),i("div",[i("span",[e._v("y2: ")]),i("input",{directives:[{name:"model",rawName:"v-model",value:e.p2.y,expression:"p2.y"}],domProps:{value:e.p2.y},on:{input:function(t){t.target.composing||e.$set(e.p2,"y",t.target.value)}}})])]),i("div",{staticClass:"flex flex-col mb-2"},[i("div",[i("span",[e._v("x3: ")]),i("input",{directives:[{name:"model",rawName:"v-model",value:e.p3.x,expression:"p3.x"}],domProps:{value:e.p3.x},on:{input:function(t){t.target.composing||e.$set(e.p3,"x",t.target.value)}}})]),i("div",[i("span",[e._v("y3: ")]),i("input",{directives:[{name:"model",rawName:"v-model",value:e.p3.y,expression:"p3.y"}],domProps:{value:e.p3.y},on:{input:function(t){t.target.composing||e.$set(e.p3,"y",t.target.value)}}})])]),i("div",{staticClass:"flex flex-col mb-2"},[i("div",[i("span",[e._v("x4: ")]),i("input",{directives:[{name:"model",rawName:"v-model",value:e.p4.x,expression:"p4.x"}],domProps:{value:e.p4.x},on:{input:function(t){t.target.composing||e.$set(e.p4,"x",t.target.value)}}})]),i("div",[i("span",[e._v("y4: ")]),i("input",{directives:[{name:"model",rawName:"v-model",value:e.p4.y,expression:"p4.y"}],domProps:{value:e.p4.y},on:{input:function(t){t.target.composing||e.$set(e.p4,"y",t.target.value)}}})])]),i("div",{staticClass:"flex flex-col mb-2"},[i("div",[i("span",[e._v("z: ")]),i("input",{directives:[{name:"model",rawName:"v-model",value:e.z,expression:"z"}],domProps:{value:e.z},on:{input:function(t){t.target.composing||(e.z=t.target.value)}}})]),i("div",[i("span",[e._v("Rot(deg) ")]),i("input",{directives:[{name:"model",rawName:"v-model",value:e.rot,expression:"rot"}],domProps:{value:e.rot},on:{input:function(t){t.target.composing||(e.rot=t.target.value)}}})])]),i("div",{staticClass:"flex flex-col mb-2"},[e._m(0),i("div",[i("select",{directives:[{name:"model",rawName:"v-model",value:e.anchorPoint,expression:"anchorPoint"}],staticClass:"h-6 w-24",on:{change:function(t){var i=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){var t="_value"in e?e._value:e.value;return t}));e.anchorPoint=t.target.multiple?i:i[0]}}},[i("option",{attrs:{value:"1"}},[e._v("P1")]),i("option",{attrs:{value:"2"}},[e._v("P2")]),i("option",{attrs:{value:"3"}},[e._v("P3")]),i("option",{attrs:{value:"4"}},[e._v("P4")])])])]),i("button",{on:{click:e.saveValues}},[e._v("Update")])])},L=[function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",[i("span",[e._v("Anchor Point")])])}],W={name:"UndergroundDepictionConfigItem",props:["udId","item","initP1","initP2","initP3","initP4","initZ","initRot","initAnchorPoint"],data:function(){return{p1:this.initP1.clone(),p2:this.initP2.clone(),p3:this.initP3.clone(),p4:this.initP4.clone(),z:this.initZ,rot:this.initRot,anchorPoint:this.initAnchorPoint?this.initAnchorPoint.toString():"1"}},methods:{saveValues:function(){console.log("Saving values...");var e={x1:parseFloat(this.p1.x),y1:parseFloat(this.p1.y),x2:parseFloat(this.p2.x),y2:parseFloat(this.p2.y),x3:parseFloat(this.p3.x),y3:parseFloat(this.p3.y),x4:parseFloat(this.p4.x),y4:parseFloat(this.p4.y),z:parseFloat(this.z),rot:parseInt(this.rot),anchorPoint:parseInt(this.anchorPoint)};this.$emit("item-config-updated",this.udId,e)}}},J=W,X=Object(v["a"])(J,B,L,!1,null,"83f41ee2",null),Y=X.exports,Z=i("a04f"),q={name:"UndergroundDepictionsConfigurator",components:{UndergroundDepictionConfigItem:Y,Portal:c["a"],Toggle:Z["a"]},props:["settings","depictions","viewer","showConfig","showGallery"],data:function(){return{meshes:{},vectors:null}},mounted:function(){this.createVectors(),this.createMeshes()},methods:{createVectors:function(){var e=this,t={};Object.entries(this.depictions).forEach((function(i){var n=Object(a["a"])(i,1),o=n[0],s=e.settings[o]||{x1:0,y1:0,x2:0,y2:0,x3:0,y3:0,x4:0,y4:0,z:0,rot:0},r=new l["Vector2"](s.x1,s.y1),c=new l["Vector2"](s.x2,s.y2),d=new l["Vector2"](s.x3,s.y3),p=new l["Vector2"](s.x4,s.y4),u=s.z,g=s.rot;t[o]={p1:r,p2:c,p3:d,p4:p,z:u,rot:g}})),this.vectors=t},rerenderMesh:function(e,t,i,n,o,s,a,r){e.position.set(a,r,s),e.rotateZ(n+3.14*o/180),e.width=t,e.heigh=i,e.position.set(a,r,s)},calcWidthHeight:function(e,t,i){var n=t.distanceTo(e),o=i.distanceTo(t),s=t.x-(t.x-e.x)/2-(t.x-i.x)/2,a=t.y-(t.y-e.y)/2-(t.y-i.y)/2,r=Math.atan2(t.y-e.y,t.x-e.x);return{width:n,height:o,centerX:s,centerY:a,angle:r}},getSelectedPoints:function(e,t,i,n,o){var s;switch(o){case 1:s=[e,t,i];break;case 2:s=[t,i,n];break;case 3:s=[i,n,e];break;case 4:s=[n,e,t];break;default:s=[e,t,i]}var r=s,l=Object(a["a"])(r,3),c=l[0],d=l[1],p=l[2];return[c,d,p]},createMeshes:function(){var e=this;Object.entries(this.depictions).forEach((function(t){var i=Object(a["a"])(t,2),n=i[0],o=i[1];if(e.settings[n]){var s=e.vectors[n],r=s.p1,c=s.p2,d=s.p3,p=s.p4,u=e.settings[n],g=u.z,v=u.rot,m=1,f=e.getSelectedPoints(r,c,d,p,m),h=Object(a["a"])(f,3),x=h[0],y=h[1],b=h[2],w=e.calcWidthHeight(x,y,b),C=w.width,_=w.height,S=w.centerX,P=w.centerY,O=w.angle,E=new l["PlaneGeometry"](C,_),I=(new l["TextureLoader"]).load(o.url),k=new l["MeshBasicMaterial"]({map:I,opacity:.9,transparent:!0,side:l["FrontSide"]}),j=new l["Mesh"](E,k);j.visible=!1,e.viewer.scene.scene.add(j),e.rerenderMesh(j,C,_,O,v,g,S,P),e.meshes[n]=j}}))},renderDots:function(e){var t=[];return e.forEach((function(e){var i=new l["BufferGeometry"];console.log("calculating dot to display",e.toArray()),i.setAttribute("position",new l["Float32BufferAttribute"](Object(K["a"])(e.toArray()),3)),i.setAttribute("size",new l["Float32BufferAttribute"]([1,1,1],1));var n=new l["PointsMaterial"]({size:.1}),o=new l["Points"](i,n);t.push(o)})),t},updateMesh:function(e,t){var i=new l["Vector2"](t.x1,t.y1),n=new l["Vector2"](t.x2,t.y2),o=new l["Vector2"](t.x3,t.y3),s=new l["Vector2"](t.x4,t.y4),r=t.z,c=t.rot,d=t.anchorPoint,p=d||1;this.vectors[e]={p1:i,p2:n,p3:o,p4:s,z:r,rot:c,anchorPoint:p},this.settings[e]={x1:i.x,y1:i.y,x2:n.x,y2:n.y,x3:o.x,y3:o.y,x4:s.x,y4:s.y,z:r,rot:c,anchorPoint:p},console.log("Refreshing with anchor point",p);var u=this.getSelectedPoints(i,n,o,s,p),g=Object(a["a"])(u,3),v=g[0],m=g[1],f=g[2];console.log("[t1,t2,t3]",[v,m,f]);var h=this.calcWidthHeight(v,m,f),x=h.width,y=h.height,b=h.centerX,w=h.centerY,C=h.angle,_=this.meshes[e];this.$emit("on-save","depictions"),this.rerenderMesh(_,x,y,C,c,r,b,w)}}},Q=q,ee=(i("0b71"),Object(v["a"])(Q,N,H,!1,null,"643cd09c",null)),te=ee.exports;function ie(e){var t=null;if(document.cookie&&""!==document.cookie)for(var i=document.cookie.split(";"),n=0;n<i.length;n++){var o=i[n].trim();if(o.substring(0,e.length+1)===e+"="){t=decodeURIComponent(o.substring(e.length+1));break}}return t}window.THREE=l;var ne=ie("csrftoken"),oe=JSON.parse(document.getElementById("visConfig").textContent),se={name:"App",components:{UndergroundDepictionsConfigurator:te,ExplosionConfigurator:U,ExplosionPlayer:k,GalleryItemsPlayer:f,GalleryItemViewer:_,Portal:c["a"],Toggle:Z["a"]},data:function(){return{viewer:window.viewer,scene:null,visConfig:oe,potreeProjectConfig:null,orbitControls:window.viewer.orbitControls,defaultFOV:60,galleryOpen:!1,depictionsOpen:!1,adminMode:window.adminMode,explosionEnabled:!1,galleryEnabled:!1,depictionsEnabled:!1,annotationWaitingClick:!1,explosionSettings:{explosionMoveStep:10},explosionCurrentStep:0,images:{},galleryItemsConfig:{},selectedImageUid:null,ptPotreeReferences:{},undergroundDepictionsSettings:{}}},watch:{galleryOpen:function(e){e&&(this.defaultFOV=this.viewer.getFOV())}},computed:{sidebarOpen:function(){return this.galleryOpen},isFullscreen:function(){return window.fullScreen}},created:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.loadInitialStateConfig();case 2:t=new l["AxesHelper"](5),this.viewer.scene.scene.add(t),this.orbitControls=this.viewer.getControls(),window.addEventListener("keydown",this.keyDown),window.app=this,window.addEventListener("message",this.parentMessage);case 8:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}(),destroyed:function(){window.removeEventListener("message",this.parentMessage)},methods:{keyDown:function(e){var t=.01,i=.05,n=.001,o=this.viewer.getFOV();switch(e.code){case"KeyS":case"ArrowDown":this.orbitControls.pitchDelta+=t;break;case"KeyW":case"ArrowUp":this.orbitControls.pitchDelta-=t;break;case"KeyA":case"ArrowLeft":this.orbitControls.yawDelta-=t;break;case"KeyD":case"ArrowRight":this.orbitControls.yawDelta+=t;break;case"KeyQ":this.orbitControls.panDelta.y+=n;break;case"KeyE":this.orbitControls.panDelta.y-=n;break;case"KeyZ":this.orbitControls.panDelta.x-=n;break;case"KeyC":this.orbitControls.panDelta.x+=n;break;case"KeyR":this.orbitControls.radiusDelta+=i;break;case"KeyF":this.orbitControls.radiusDelta-=i;break;case"KeyT":o<100&&this.viewer.setFOV(o+1);break;case"KeyG":o>1&&this.viewer.setFOV(o-1);break}},toggleFullScreen:function(){document.fullscreenElement?document.exitFullscreen&&document.exitFullscreen():document.documentElement.requestFullscreen()},setExplosionStep:function(e){this.explosionCurrentStep=e},saveConfigOnServer:function(){var e={potree:this.potreeProjectConfig,customFeatures:{explosionEnabled:this.explosionEnabled,galleryEnabled:this.galleryEnabled,depictionsEnabled:this.depictionsEnabled,explosionSettings:this.explosionSettings,galleryItemsSettings:this.galleryItemsConfig,undergroundDepictionsSettings:this.undergroundDepictionsSettings}},t="config-update",i=new Request(t,{headers:{"X-CSRFToken":ne}});fetch(i,{method:"POST",body:JSON.stringify(e),mode:"same-origin"}).then((function(){console.log("Done saving on server")}))},saveToServer:function(){this.saveConfigOnServer()},saveInitialStateConfig:function(){this.potreeProjectConfig=window.Potree.saveProject(this.viewer),this.saveConfigOnServer()},loadInitialStateConfig:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(){var t,i,n,o,s,r,l,c,d,p,u,g,v,m,f,h,x,y,b,w,C,_,S,P,O,E,I,k=this;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:for(this.images=null===(t=this.visConfig)||void 0===t?void 0:t.images,this.undergroundDepictions=null===(i=this.visConfig)||void 0===i?void 0:i.undergroundDepictions,this.potreeProjectConfig=null===(n=this.visConfig.jsConf)||void 0===n?void 0:n.potree,this.customFeaturesConfig=null===(o=this.visConfig.jsConf)||void 0===o?void 0:o.customFeatures,u=this.potreeProjectConfig,v=(null===u||void 0===u?void 0:u.pointclouds)||[],m={},f={},h=0,x=Object.entries(this.visConfig.pointclouds);h<x.length;h++)y=Object(a["a"])(x[h],2),b=y[0],w=y[1],f[w.title]=b;for(C=function(){var e=Object(a["a"])(S[_],2),t=e[0],i=e[1];g=v.findIndex((function(e){return e.url==i.url})),g>-1?v[g].name=i.title:m[t]=i},_=0,S=Object.entries(this.visConfig.pointclouds);_<S.length;_++)C();if(!u){e.next=16;break}return u.pointclouds=v,u.geopackages=[],e.next=16,window.Potree.loadProject(this.viewer,u);case 16:return P=[],Object.values(m).forEach((function(e){O=window.Potree.loadPointCloud(e.url,""),P.push(O),O.then((function(t){t.pointcloud.name=e.title,k.viewer.scene.addPointCloud(t.pointcloud)}))})),e.next=20,Promise.all(P);case 20:this.viewer.scene.pointclouds.forEach((function(e){E=f[e.name],k.ptPotreeReferences[E]=e,k.initializeExplosionIfNewModel(E)})),this.viewer.fitToScreen(),this.galleryItemsConfig=(null===(s=this.customFeaturesConfig)||void 0===s?void 0:s.galleryItemsSettings)||{},this.explosionEnabled=(null===(r=this.customFeaturesConfig)||void 0===r?void 0:r.explosionEnabled)||!1,this.galleryEnabled=(null===(l=this.customFeaturesConfig)||void 0===l?void 0:l.galleryEnabled)||!1,this.depictionsEnabled=(null===(c=this.customFeaturesConfig)||void 0===c?void 0:c.depictionsEnabled)||!1,null!==(d=this.customFeaturesConfig)&&void 0!==d&&d.explosionSettings&&(this.explosionSettings=null===(I=this.customFeaturesConfig)||void 0===I?void 0:I.explosionSettings),null!==(p=this.customFeaturesConfig)&&void 0!==p&&p.undergroundDepictionsSettings&&(this.undergroundDepictionsSettings=this.customFeaturesConfig.undergroundDepictionsSettings);case 28:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}(),initializeExplosionIfNewModel:function(e){this.explosionSettings.ptModels||(this.explosionSettings.ptModels={}),this.explosionSettings.ptModels[e]||(this.explosionSettings.ptModels[e]={title:this.visConfig.pointclouds[e].title,direction:"",ptId:e,initialPos:this.ptPotreeReferences[e].position.clone()})},addAnnotation:function(){var e=this;this.annotationWaitingClick=!0;var t=this;this.viewer.renderer.domElement.addEventListener("mousedown",(function(){t.annotationWaitingClick=!1;var i=e.viewer.inputHandler.mouse,n=e.viewer.scene.getActiveCamera(),o=window.Potree.Utils.getMousePointCloudIntersection(i,n,e.viewer,e.viewer.scene.pointclouds);null!==o&&e.viewer.scene.addAnnotation([o.location.x,o.location.y,o.location.z],{title:"(".concat(o.location.x,",").concat(o.location.y,",").concat(o.location.z,")"),actions:[]})}),{once:!0})},csvToFloatList:function(e){var t=e.split(",");if(!t.length)return null;var i=t.map((function(e){return parseFloat(e)}));return i},openPotreeSidebar:function(){window.$("#potree_render_area").position().left<=0&&window.$(".potree_menu_toggle").click()},closePotreeSidebar:function(){window.$("#potree_render_area").position().left>0&&window.$(".potree_menu_toggle").click()},selectGalleryImage:function(e){this.closePotreeSidebar(),this.selectedImageUid=e;var t=this.galleryItemsConfig[e];t&&t.viewTarget&&t.viewPosition&&(this.viewer.setCameraMode(t.cameraMode),this.viewer.scene.view.setView(this.csvToFloatList(t.viewPosition),this.csvToFloatList(t.viewTarget)),this.viewer.setFOV(t.fov||this.defaultFOV))},closeGalleryImage:function(){this.selectedImageUid=null,this.viewer.setFOV(this.defaultFOV)},saveOrientationOnSelectedImage:function(e){var t=this.viewer.scene.view.position.toArray().toString(),i=this.viewer.scene.view.getPivot().toArray().toString(),n=this.viewer.scene.cameraMode,o=this.viewer.getFOV();this.galleryItemsConfig[e]||(this.galleryItemsConfig[e]={}),this.galleryItemsConfig[e].viewTarget=i,this.galleryItemsConfig[e].viewPosition=t,this.galleryItemsConfig[e].cameraMode=n,this.galleryItemsConfig[e].browserWidth=document.documentElement.clientWidth,this.galleryItemsConfig[e].browserHeight=document.documentElement.clientHeight,this.galleryItemsConfig[e].fov=o,this.saveConfigOnServer()},parentMessage:function(e){if(console.log(e),"explode"==e.data.func){var t=e.data.value;this.setExplosionStep(t)}if("gallery"==e.data.func){var i=e.data.value;this.galleryOpen=i}if("gpr"==e.data.func){var n=e.data.value;this.openPotreeSidebar(),this.depictionsOpen=n}},render:function(){this.viewer.renderer.render(this.viewer.scene.scene,this.viewer.scene.getActiveCamera())}}},ae=se,re=(i("560b"),Object(v["a"])(ae,o,s,!1,null,null,null)),le=re.exports,ce=i("a6f4");n["default"].use(ce["b"]),n["default"].config.productionTip=!1;var de=window.$,pe=window.Potree;window.viewer=new pe.Viewer(document.getElementById("potree_render_area"));var ue=JSON.parse(document.getElementById("visConfig").textContent),ge=window.viewer;ge.setFOV(60),ge.setPointBudget(1e6),ge.setMinNodeSize(0),ge.setDescription(ue.title);var ve=ue.menuConf,me=ue.visConf;ve.toolsEnabled&&ge.loadGUI().then((function(){ge.setLanguage("en"),ve.showTools||(de("#menu_tools").next().html(""),de("#menu_tools").hide()),ve.showScene||(de("#menu_scene").next().html(""),de("#menu_scene").hide()),ve.showFilters||(de("#menu_filters").next().html(""),de("#menu_filters").hide()),ve.showAbout?de("#menu_about").html("About Potree"):(de("#menu_about").next().html(""),de("#menu_about").hide()),ve.showAppearance||(de("#menu_appearance").next().html(""),de("#menu_appearance").hide());var e,t,i=[];if(me.description){var o=de('\n            <h3 id="menu_model_description" class="accordion-header ui-widget"><span>About the Project</span></h3>\n            <div class="accordion-content ui-widget pv-menu-list p-2"></div>\n            '),s=o.last();s.html(me.description),o.first().click((function(){return s.slideToggle()})),i.push(o)}t=de('\n        <h3 id="menu_meta" class="accordion-header ui-widget"><span>CYI Tools</span></h3>\n        <div class="accordion-content ui-widget pv-menu-list"></div>\n        '),e=t.last(),e.html('\n        <div id="cyi-app">\n        </div>\n        '),t.first().click((function(){return e.slideToggle()})),i.push(t),i.forEach((function(e){return de("#potree_menu").append(e)})),new n["default"]({render:function(e){return e(le)}}).$mount("#cyi-app")}))},e45e:function(e,t,i){}});
//# sourceMappingURL=app.js.map