function csvToFloatList(param){
    let parts = param.split(',');
    if (!parts.length){
        return null;
    }
    let res = parts.map((pt)=>{return parseFloat(pt)});
    return res;
}
function floatListToPoint(lst){
    return {x:lst[0], y:lst[1], z:lst[2]}
}
function pointToString(point){
    return "" + point.x + ", " + point.y + ", " + point.z;
}
function fallbackCopyTextToClipboard(text) {
  var textArea = document.createElement("textarea");
  textArea.value = text;

  // Avoid scrolling to bottom
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    console.log('Fallback: Copying text command was ' + msg);
  } catch (err) {
    console.error('Fallback: Oops, unable to copy', err);
  }

  document.body.removeChild(textArea);
}
function copyTextToClipboard(text) {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text);
    return;
  }
  navigator.clipboard.writeText(text).then(function() {
    console.log('Async: Copying to clipboard was successful!');
  }, function(err) {
    console.error('Async: Could not copy text: ', err);
  });
}
function onImgClick(objId, imgConfig){
    let position = imgConfig.cameraPosition;
    let target = imgConfig.cameraTarget;
    if (position || target) {
        viewer.scene.view.setView(csvToFloatList(position), csvToFloatList(target))
    }
    let fullImg = $(`<img src="${imgConfig.url}" />`);
    $('#img-container').html(fullImg);
    $('#img-overlay-wrapper').show();
}

function loadCustomConfig(ptConfig, viewer){
    let scene = viewer.scene;
    ptConfig.annotations.forEach((obj)=>{
        let data = {
            position: csvToFloatList(obj.position),
            title: obj.title,
            description: obj.body
        };
        if (obj.cameraPosition && obj.cameraTarget){
            data.cameraPosition= csvToFloatList(obj.cameraPosition);
            data.cameraTarget= csvToFloatList(obj.cameraTarget);
        }
        let ann = new Potree.Annotation(data);
        scene.annotations.add(ann);
    });
    // if (Object.keys(ptConfig.images).length){
    //     $('#img-slider').slick({
    //         slidesToShow: 1,
    //         slidesToScroll: 1,
    //         verticalSwipe:true,
    //
    //     });
    //
    //     Object.entries(ptConfig.images).forEach(([id, obj]) => {
    //       let slide = $(`<div class="slide-box" data-obj-id="${obj.id}"><img class="slide-image" src="${obj.url}" /><h6 class="slide-title">${obj.title}</h6></div>`);
    //           slide.click((e)=>{
    //               let objId = $(e.currentTarget).data('obj-id');
    //               onImgClick(objId, ptConfig);
    //           });
    //           $('#img-slider').slick('slickAdd', slide);
    //     });
    // }else{
    //     $('#img-slider-container').hide();
    // }
}
function loadVisConfig(visConfig, viewer){
    let allImages = [];
    console.log(visConfig);
    Object.keys(visConfig).forEach((ptId)=> {
        if (visConfig[ptId].images) {
            Object.entries(visConfig[ptId].images).forEach(([id, obj]) => {
                console.log(id, obj)
                allImages.push({obj: obj, imgConfig: visConfig[ptId].images[id]});
            });
        }
    });

    if (allImages.length){
        $('#img-slider').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            verticalSwipe:true,

        });

        allImages.forEach((entry) => {
          let slide = $(`<div class="slide-box" data-obj-id="${entry.obj.id}"><img class="slide-image" src="${entry.obj.url}" /><h6 class="slide-title">${entry.obj.title}</h6></div>`);
              slide.click((e)=>{
                  let objId = $(e.currentTarget).data('obj-id');
                  onImgClick(objId, entry.imgConfig);
              });
              $('#img-slider').slick('slickAdd', slide);
        });
    }else{
        $('#img-slider-container').hide();
    }
}