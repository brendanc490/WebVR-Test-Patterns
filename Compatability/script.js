 /* Scene */
var scene = document.querySelector("a-scene");
/* camera and controllers */
var camera = document.querySelector("#camera");
var conRight = document.querySelector("#con-right");
var conLeft = document.querySelector("#con-left");

/* A-Text for device and control scheme */
var controlScheme = document.querySelector("#controlScheme")
var device = document.querySelector("#device");
var devCoords = document.querySelector("#devCoords");

var queriesFound = false

/* A-Text for left hand */
var left = document.querySelector("#left");
var leftCoords = document.querySelector("#leftCoords");
var leftAxis, leftTrackpad, leftTrigger, x, y, leftMenu, leftStickPress, leftTrackPress

/* Entities for left hand display */
var leftThumbInd, xButtonAnimation, yButtonAnimation, triggerLeftButtonAnimation, gripLeftButtonAnimation

/* A-Text for right hand */
var right = document.querySelector("#right");
var rightCoords = document.querySelector("#rightCoords");
var rightAxis, rightTrackpad, rightTrigger, a, b, rightMenu, rightStickPress, rightTrackPress

/* Entities for right hand display */
var rightThumbInd, aButtonAnimation, bButtonAnimation, triggerRightButtonAnimation, gripRightButtonAnimation

/* HTML text */
var leftThumb = document.querySelector("#isLeftThumb");
var isDevice = document.querySelector("#isDevice");
var isPositional = document.querySelector("#isPositional");
var isControllers = document.querySelector("#isControllers");
var rightThumb = document.querySelector("#isRightThumb");
var devName = document.querySelector("#name");


var isDeviceCon, isPositionalDataAvailable, isRight, isLeft
var out = []
var jsonOut = {}
var buttonsDown = {a: false, b: false ,x: false, y: false, thumbLeft: false, thumbRight: false, gripLeft: false, gripRight: false, triggerLeft: false, triggerRight: false, trackpadLeft: false, trackpadRight: false, touchpadLeft: false, touchpadRight: false }
var scheme = "none"
var controlsInterval, graphicsInterval

/* When VR is entered */
scene.addEventListener('enter-vr',function(){
    
    // Sets initial controllers found to be false
    isRightControllerCon = isLeftControllerCon = false;
    // Checks for a VR device by looking for positional data
    isDeviceCon = isPositionalDataAvailable = AFRAME.utils.device.checkHeadsetConnected();
    // If device found, saves the finding in log
    if(isDeviceCon){ 
        //isDevice.textContent = isPositional.textContent = 'Yes';
        out.push("headset"); 
        device.setAttribute("value", "Device Connected: Yes");
        device.setAttribute("color","green")
    } else {
        //isDevice.textContent = isPositional.textContent = 'No'
    }
    // Checks for gamepads connected
    var gamePads = navigator.getGamepads();
    var pads = [];
    console.log(gamePads)
    // Count the number of non-null pads
    let result = gamePads.reduce((prev, curr) => {
        if(curr != null){
            pads.push(curr)
            return prev + 1
        } else{ 
            return prev}}, 0);
    console.log(result)
    isRight = !(conRight.getAttribute("position").x == 0 && conRight.getAttribute("position").y == 0 && conRight.getAttribute("position").z == 0);
    isLeft = !(conLeft.getAttribute("position").x == 0 && conLeft.getAttribute("position").y == 0 && conLeft.getAttribute("position").z == 0);
    if(isRight){
        right.setAttribute("value", "Right Controller Connected: Yes"); right.setAttribute("color","green")
    }
    if(isLeft){
        left.setAttribute("value", "Left Controller Connected: Yes"); left.setAttribute("color","green")
    }
    // if controllers found, find the buttons and prompt the user to press them
    console.log(isRight || isLeft)
    if(result > 0 || isRight || isLeft) {
        //isControllers.textContent = 'Yes'
        out.push("controllers")
    } else {
        //isControllers.textContent = 'No'
    }

    console.log('Entering VR');
    controlsInterval = setInterval(findControls,10);
    //graphicsInterval = setInterval(updateGraphics,10);
});


/* When VR is exited */
scene.addEventListener('exit-vr',function(){
    jsonOut = {device: {detected: isDeviceCon, scheme: scheme, controllers:{ leftController: {detected: isLeft, model: leftModel, functionality: {stickAxis: isLeftStick, grip: gripLeftPressed, trigger: triggerLeftPressed, a: aPressed, b: bPressed, menu: menuLeftPressed, stickPress: thumbLeftPressed}}, rightController: {detected: isRight, model: rightModel, functionality: {stickAxis: isRightStick, grip: gripRightPressed, trigger: triggerRightPressed, x: xPressed, y: yPressed, menu: menuRightPressed, stickPress: thumbRightPressed}}}}}
    console.log(jsonOut)
    console.log('Exiting VR');
    clearInterval(graphicsInterval)
});


var leftModel, rightModel
function findControls(){
    if(isRight){
        if(conRight.components['tracked-controls-webxr'].attrValue.hasOwnProperty("id") && conRight.components['tracked-controls-webxr'].attrValue.id != ""){
            scheme = conRight.components['tracked-controls-webxr'].attrValue.id
            controlScheme.setAttribute("value", "Detected Control Scheme: " + scheme)
            if(scheme.includes("touch")){
                queryPrefix = "oc-"
            } else if(scheme.includes("go")){
                queryPrefix = "oc-go-"
            } else if(scheme.includes("focus")){
                queryPrefix = "vive-f-"
            } else if(scheme.includes("vive")){
                queryPrefix = "vive-"
            } else if(scheme.includes("windows")){
                queryPrefix = "win-"
            } else {
                queryPrefix = "gen-"
            }
            clearInterval(controlsInterval)
        } else if(conRight.components['tracked-controls-webxr'].attrValue.hasOwnProperty("idPrefix") && conRight.components['tracked-controls-webxr'].attrValue.idPrefix != ""){
            scheme = conRight.getAttribute("tracked-controls").idPrefix;
            controlScheme.setAttribute("value", "Detected Control Scheme: " + scheme)
            if(scheme.includes("touch")){
                queryPrefix = "oc-"
            } else if(scheme.includes("go")){
                queryPrefix = "oc-go-"
            } else if(scheme.includes("focus")){
                queryPrefix = "vive-f-"
            } else if(scheme.includes("vive")){
                queryPrefix = "vive-"
            } else if(scheme.includes("windows")){
                queryPrefix = "win-"
            } else {
                queryPrefix = "gen-"
            }
            executeQueries(queryPrefix)
            clearInterval(controlsInterval)
        } else {
            scheme = null
        }
        if(conRight.getAttribute("tracked-controls").idPrefix != null){
            /*path = "../lib/ControllerModels/"
            file = conRight.getAttribute("gltf-model").split("/");
            file = file[file.length-1]
            rightModel = file
            conRight.setAttribute("gltf-model", path+file)
            if(conLeft.getAttribute("tracked-controls").idPrefix != null){
                path = "../lib/ControllerModels/"
                file = conLeft.getAttribute("gltf-model").split("/");
                file = file[file.length-1]
                leftModel = file
                conLeft.setAttribute("gltf-model", path+file)
            }*/
            clearInterval(controlsInterval)
        }
        
    } else if(isLeft) {
        if(conLeft.components['tracked-controls-webxr'].attrValue.hasOwnProperty("id") && conLeft.components['tracked-controls-webxr'].attrValue.id != ""){
            scheme = conLeft.components['tracked-controls-webxr'].attrValue.id
            controlScheme.setAttribute("value", "Detected Control Scheme: " + scheme)
            clearInterval(controlsInterval)
        } else if(conLeft.components['tracked-controls-webxr'].attrValue.hasOwnProperty("idPrefix") && conLeft.components['tracked-controls-webxr'].attrValue.idPrefix != ""){
            scheme = conLeft.getAttribute("tracked-controls").idPrefix;
            controlScheme.setAttribute("value", "Detected Control Scheme: " + scheme)
            clearInterval(controlsInterval)
        } else {
            scheme = null
        }
        
        if(conLeft.getAttribute("tracked-controls-").idPrefix != null){
            /*console.log(conLeft.getAttribute("gltf-model"))
            path = "../lib/ControllerModels/"
            file = conLeft.getAttribute("gltf-model").split("/");
            file = file[file.length-1]
            leftModel = file
            conLeft.setAttribute("gltf-model", path+file)
            if(conRight.getAttribute("tracked-controls").idPrefix != null){
                path = "../lib/ControllerModels/"
                file = conRight.getAttribute("gltf-model").split("/");
                file = file[file.length-1]
                rightModel = file
                conRight.setAttribute("gltf-model", path+file)
            }*/
            clearInterval(controlsInterval)
        }
    }
    
}

/* This interval handles the display of current buttons being pressed down */

/*function updateGraphics(){
    devCoords.setAttribute("value","x: "+camera.getAttribute("position").x.toFixed(2)+", y: "+camera.getAttribute("position").y.toFixed(2)+", z: "+camera.getAttribute("position").z.toFixed(2))
    rightCoords.setAttribute("value","x: "+conRight.getAttribute("position").x.toFixed(2)+", y: "+conRight.getAttribute("position").y.toFixed(2)+", z: "+conRight.getAttribute("position").z.toFixed(2))
    leftCoords.setAttribute("value","x: "+conLeft.getAttribute("position").x.toFixed(2)+", y: "+conLeft.getAttribute("position").y.toFixed(2)+", z: "+conLeft.getAttribute("position").z.toFixed(2))
    if(buttonsDown["a"]){
        aButtonAnimation.setAttribute("material","shader: flat; color: #FFFFFF; side:double")
    } else {
        aButtonAnimation.setAttribute("material","shader: flat; color: #797979; side:double")
    }
    if(buttonsDown["b"]){
        bButtonAnimation.setAttribute("material","shader: flat; color: #FFFFFF; side:double")
    } else {
        bButtonAnimation.setAttribute("material","shader: flat; color: #797979; side:double")
    }
    if(buttonsDown["x"]){
        xButtonAnimation.setAttribute("material","shader: flat; color: #FFFFFF; side:double")
    } else {
        xButtonAnimation.setAttribute("material","shader: flat; color: #797979; side:double")
    }
    if(buttonsDown["y"]){
        yButtonAnimation.setAttribute("material","shader: flat; color: #FFFFFF; side:double")
    } else {
        yButtonAnimation.setAttribute("material","shader: flat; color: #797979; side:double")
    }
    if(buttonsDown["thumbRight"]){
        rightThumbInd.setAttribute("material","shader: flat; color: #FFFFFF; side:double")
    } else {
        rightThumbInd.setAttribute("material","shader: flat; color: #222222; side:double")
    }
    if(buttonsDown["thumbLeft"]){
        leftThumbInd.setAttribute("material","shader: flat; color: #FFFFFF; side:double")
    } else {
        leftThumbInd.setAttribute("material","shader: flat; color: #222222; side:double")
    }
    if(buttonsDown["triggerRight"]){
        triggerRightButtonAnimation.setAttribute("material","shader: flat; color: #FFFFFF; side:double")
    } else {
        triggerRightButtonAnimation.setAttribute("material","shader: flat; color: #797979; side:double")
    }
    if(buttonsDown["triggerLeft"]){
        triggerLeftButtonAnimation.setAttribute("material","shader: flat; color: #FFFFFF; side:double")
    } else {
        triggerLeftButtonAnimation.setAttribute("material","shader: flat; color: #797979; side:double")
    }
    if(buttonsDown["gripRight"]){
        gripRightButtonAnimation.setAttribute("material","shader: flat; color: #FFFFFF; side:double")
    } else {
        gripRightButtonAnimation.setAttribute("material","shader: flat; color: #797979; side:double")
    }
    if(buttonsDown["gripLeft"]){
        gripLeftButtonAnimation.setAttribute("material","shader: flat; color: #FFFFFF; side:double")
    } else {
        gripLeftButtonAnimation.setAttribute("material","shader: flat; color: #797979; side:double")
    }
    if(buttonsDown["trackpadRight"]){
        trackpadRightAnimation.setAttribute("material","shader: flat; color: #FFFFFF; side:double")
    } else {
        trackpadRightAnimation.setAttribute("material","shader: flat; color: #797979; side:double")
    }
    if(buttonsDown["trackpadLeft"]){
        trackpadRightAnimation.setAttribute("material","shader: flat; color: #FFFFFF; side:double")
    } else {
        trackpadRightAnimation.setAttribute("material","shader: flat; color: #797979; side:double")
    }
}*/

function executeQueries(pref){
    temp = []
    /* A-Text for left hand */
    leftAxis = document.querySelector("#"+pref+"leftAxis");
    leftTrackpad = document.querySelector("#"+pref+"leftTrackpad");
    leftTrigger = document.querySelector("#leftTrigger");
    leftGrip = document.querySelector("#"+pref+"leftGrip");
    y = document.querySelector("#"+pref+"y");
    x = document.querySelector("#"+pref+"x");
    leftMenu = document.querySelector("#"+pref+"leftMenu");
    leftStickPress = document.querySelector("#"+pref+"leftStick");
    leftTrackPress = document.querySelector("#"+pref+"leftTrackpadPressed");

    /* Entities for left hand display */
    leftThumbInd = document.querySelector("#"+pref+"leftThumbIndicator");
    leftTrackInd = document.querySelector("#"+pref+"leftTrackpadIndicator");
    xButtonAnimation = document.querySelector("#"+pref+"xButtonAnimation");
    yButtonAnimation = document.querySelector("#"+pref+"yButtonAnimation");
    triggerLeftButtonAnimation = document.querySelector("#"+pref+"triggerLeftButtonAnimation");
    gripLeftButtonAnimation = document.querySelector("#"+pref+"gripLeftButtonAnimation");
    temp.concat([leftThumbInd,leftTrackInd,xButtonAnimation,yButtonAnimation,triggerLeftButtonAnimation,gripLeftButtonAnimation])

    /* A-Text for right hand */
    rightAxis = document.querySelector("#"+pref+"rightAxis");
    rightTrackpad = document.querySelector("#"+pref+"rightTrackpad");
    rightTrigger = document.querySelector("#"+pref+"rightTrigger");
    rightGrip = document.querySelector("#"+pref+"rightGrip");
    b = document.querySelector("#"+pref+"b");
    a = document.querySelector("#"+pref+"a");
    rightStickPress = document.querySelector("#"+pref+"rightStick");
    rightMenu = document.querySelector("#"+pref+"rightMenu");
    rightTrackPress = document.querySelector("#"+pref+"rightTrackpadPressed");

    /* Entities for right hand display */
    rightThumbInd = document.querySelector("#"+pref+"rightThumbIndicator");
    rightTrackInd = document.querySelector("#"+pref+"rightTrackpadIndicator");
    aButtonAnimation = document.querySelector("#"+pref+"aButtonAnimation");
    bButtonAnimation = document.querySelector("#"+pref+"bButtonAnimation");
    triggerRightButtonAnimation = document.querySelector("#"+pref+"triggerRightButtonAnimation");
    gripRightButtonAnimation = document.querySelector("#"+pref+"gripRightButtonAnimation");
    temp.concat([rightThumbInd,rightTrackInd,aButtonAnimation,bButtonAnimation,triggerRightButtonAnimation,gripRightButtonAnimation])

    temp.forEach(element => {
        if(element != null){
            AFRAME.utils.entity.setComponentProperty(element, 'button', {isPressed: false})
        }
    });
    queriesFound = true
}

function exportJSON(){
    var blob = new Blob([JSON.stringify(jsonOut)],
    { type: "text/plain;charset=utf-8" });
    saveAs(blob, devName.value+"Compatibility.JSON");
}