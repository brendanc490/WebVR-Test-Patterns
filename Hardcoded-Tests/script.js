var scene = document.querySelector("a-scene");
var calibration = scene.querySelector("#calibrationscene");
var contrast = scene.querySelector("#contrast");
var contrastSetup = scene.querySelector("#contrastSetup");
var pixelRatio = scene.querySelector("#pixelRatio");
var size = scene.querySelector("#size");
var foveationInput = document.querySelector("#foveationInput")
var foveationRange = document.querySelector("#foveationRange")
var precisionInput = document.querySelector("#precisionInput")
var precisionRange = document.querySelector("#precisionRange")
var antiAlias = document.querySelector('#antialias')
var conRight = document.querySelector("#con-right");
var conLeft = document.querySelector("#con-left");


/* If the textbox for max width is changed */
$("#maxWidth").change(function() {
    scene.getAttribute('renderer').maxCanvasWidth = parseInt(this.value)
  });

  /* If the textbox for max height is changed */
$("#maxHeight").change(function() {
    scene.getAttribute('renderer').maxCanvasHeight = parseInt(this.value)
  });

/* If the foveation slider is changed */
foveationRange.oninput = function() {
    /* Update value in textbox */
    foveationInput.value = this.value;
    /* Set foveation to be new foveation */
    scene.getAttribute('renderer').foveationLevel = this.value
}


/* If the textbox for foveation is changed */
$("#foveationInput").change(function() {
    /* Change foveation slider to correct foveation, this will call the slider change function */
    if(this.value < 0 || this.value > 3){
        alert('invalid input')
        return
    }
    foveationRange.value = foveationInput.value;
    scene.getAttribute('renderer').foveationLevel = this.value
  });

  function setAA(check){
    scene.getAttribute('renderer').antialias = check.checked.toString()
  }

/* If the precision slider is changed */
precisionRange.oninput = function() {
    if(this.value == 0){
        precisionInput.value = 'low';
    } else if(this.value == 1){
        precisionInput.value = 'medium';
    } else {
        precisionInput.value = 'high'
    }
    scene.getAttribute('renderer').precision = precisionInput.value
}


/* If the textbox for foveation is changed */
$("#precisionInput").change(function() {
    if(this.value == 'low'){
        precisionRange.value = 0;
        scene.getAttribute('renderer').precision = this.value
    } else if(this.value == 'medium'){
        precisionRange.value = 1;
        scene.getAttribute('renderer').precision = this.value
    } else if(this.value == 'high'){
        precisionRange.value = 2;
        scene.getAttribute('renderer').precision = this.value
    } else {
        alert('invalid input')
    }
    
  });

  function setAA(check){
    scene.getAttribute('renderer').antialias = check.checked.toString()
  }
  
  function setAlpha(check){
    scene.getAttribute('renderer').alpha = check.checked.toString()
  }

  function setLog(check){
    scene.getAttribute('renderer').logarithmicDepthBuffer = check.checked.toString()
  }

  function setColorMgmt(check){
    scene.getAttribute('renderer').colorManagement = check.checked.toString()
  }

  function updateInfo(){
    pixelRatio.setAttribute('value', 'Pixel Ratio: '+ scene.sceneEl.renderer.getPixelRatio())
    size.setAttribute('value', "Width: "+scene.sceneEl.renderer.getSize().width+"\nHeight: "+scene.sceneEl.renderer.getSize().height)
  }


function drawPattern(){
    if($("#patterns :selected").text() == "Contrast"){
        var j = 0;
        while (j < 7){
            var i = 0;
            while(i < 32){
                let el = document.createElement('a-entity');
                el.setAttribute("id","whitebox"+(32-i).toString());
                el.setAttribute("geometry",{primitive: "plane", width: 0.05, height: .15});
                el.setAttribute("position",{x: .75-(.05*i), y: .6-(.2*j), z: -1});
                if(j == 0){
                    el.setAttribute("material",{shader: "flat", color: "rgb("+(255-(8*i)).toString()+","+(255-(8*i)).toString()+","+(255-(8*i)).toString()+")"});
                } else if (j == 1){
                    el.setAttribute("material",{shader: "flat", color: "rgb("+(255-(8*i)).toString()+","+(0).toString()+","+(0).toString()+")"});
                } else if (j == 2){
                    el.setAttribute("material",{shader: "flat", color: "rgb("+(255-(8*i)).toString()+","+(255-(8*i)).toString()+","+(0).toString()+")"});
                } else if (j == 3){
                    el.setAttribute("material",{shader: "flat", color: "rgb("+(0).toString()+","+(255-(8*i)).toString()+","+(0).toString()+")"});
                } else if (j == 4){
                    el.setAttribute("material",{shader: "flat", color: "rgb("+(0).toString()+","+(255-(8*i)).toString()+","+(255-(8*i)).toString()+")"});
                } else if (j == 5){
                    el.setAttribute("material",{shader: "flat", color: "rgb("+(0).toString()+","+(0).toString()+","+(255-(8*i)).toString()+")"});
                } else if (j == 6){
                    el.setAttribute("material",{shader: "flat", color: "rgb("+(255-(8*i)).toString()+","+(0).toString()+","+(255-(8*i)).toString()+")"});   
                }
                contrastSetup.appendChild(el);
                i++;
            }
            j++;
        }
        calibration.setAttribute("visible","false");
        contrast.setAttribute("visible","true");
    } else if($("#patterns :selected").text() == "Calibration"){
        calibration.setAttribute("visible","true");
        contrast.setAttribute("visible","false");
    }
}
