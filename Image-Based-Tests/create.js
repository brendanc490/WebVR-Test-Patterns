var scene = document.querySelector("a-scene");
var calibration = scene.querySelector("#calibrationscene");
var contrast = scene.querySelector("#contrast");
var contrastSetup = scene.querySelector("#contrastSetup");

/*function drawPattern(){
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
}*/
