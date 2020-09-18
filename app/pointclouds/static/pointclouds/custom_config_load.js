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
function onImgClick(objId, ptConfig){
    let position = ptConfig.images[objId].cameraPosition;
    let target = ptConfig.images[objId].cameraTarget;
    if (position || target) {
        viewer.scene.view.setView(csvToFloatList(position), csvToFloatList(target))
    }
    let fullImg = $(`<img src="${ptConfig.images[objId].url}" />`);
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

    if (ptConfig.images){
        $('#img-slider').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            verticalSwipe:true,

        });

        Object.entries(ptConfig.images).forEach(([id, obj]) => {
          let slide = $(`<div class="slide-box" data-obj-id="${obj.id}"><img class="slide-image" src="${obj.url}" /><h6 class="slide-title">${obj.title}</h6></div>`);
              slide.click((e)=>{
                  let objId = $(e.currentTarget).data('obj-id');
                  onImgClick(objId, ptConfig);
              });
              $('#img-slider').slick('slickAdd', slide);
        });
    }else{
        $('#img-slider-container').hide();
    }

}