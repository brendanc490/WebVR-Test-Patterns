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

var interface
var queriesFound = false

/* A-Text for left hand */
var left = document.querySelector("#left");
var leftCoords = document.querySelector("#leftCoords");
var leftAxis, leftTrackpad, leftTrackInd, leftTrigger, x, y, leftMenu, leftStickPress, leftTrackPress

/* Entities for left hand display */
var leftThumbInd, xButtonAnimation, yButtonAnimation, triggerLeftButtonAnimation, gripLeftButtonAnimation

/* A-Text for right hand */
var right = document.querySelector("#right");
var rightCoords = document.querySelector("#rightCoords");
var rightAxis, rightTrackpad, rightTrackInd, rightTrigger, a, b, rightMenu, rightStickPress, rightTrackPress

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
var queriesFound = false

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
    /*var gamePads = navigator.getGamepads();
    var pads = [];
    console.log(gamePads)
    // Count the number of non-null pads
    let result = gamePads.reduce((prev, curr) => {
        if(curr != null){
            pads.push(curr)
            return prev + 1
        } else{ 
            return prev}}, 0);
    console.log(result)*/
    console.log('Entering VR');
    controlsInterval = setInterval(findControls,10);
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
    isRight = !(conRight.getAttribute("position").x == 0 && conRight.getAttribute("position").y == 0 && conRight.getAttribute("position").z == 0);
    isLeft = !(conLeft.getAttribute("position").x == 0 && conLeft.getAttribute("position").y == 0 && conLeft.getAttribute("position").z == 0);
    queryPrefix = ""
    if(isRight){
        right.setAttribute("value", "Right Controller Connected: Yes"); right.setAttribute("color","green")
    }
    if(isLeft){
        left.setAttribute("value", "Left Controller Connected: Yes"); left.setAttribute("color","green")
    }
    if(isRight){
        if(conRight.components['tracked-controls'].attrValue.hasOwnProperty("id") && conRight.components['tracked-controls'].attrValue.id != ""){
            console.log("test")
            scheme = conRight.components['tracked-controls-webxr'].attrValue.id
            controlScheme.setAttribute("value", "Detected Control Scheme: " + scheme)
            if(scheme.includes("touch")){
                conLeft.removeAttribute("oculus-touch-controls")
                conRight.removeAttribute("oculus-touch-controls")
                queryPrefix = "oc-"
            } else if(scheme.includes("go")){
                conLeft.removeAttribute("oculus-go-controls")
                conRight.removeAttribute("oculus-go-controls")
                queryPrefix = "oc-go-"
            } else if(scheme.includes("focus")){
                conLeft.removeAttribute("vive-focus-controls")
                conRight.removeAttribute("vive-focus-controls")
                queryPrefix = "vive-f-"
            } else if(scheme.includes("vive")){
                conLeft.removeAttribute("vive-controls")
                conRight.removeAttribute("vive-controls")
                queryPrefix = "vive-"
            } else if(scheme.includes("windows")){
                conLeft.removeAttribute("windows-motion-controls")
                conRight.removeAttribute("windows-motion-controls")
                queryPrefix = "win-"
            } else {
                queryPrefix = "gen-"
            }
            document.querySelector("#"+queryPrefix+"interface").setAttribute("visible", true)
            executeQueries(queryPrefix)
            clearInterval(controlsInterval)
        } else if(conRight.components['tracked-controls'].attrValue.hasOwnProperty("idPrefix") && conRight.components['tracked-controls'].attrValue.idPrefix != ""){
            console.log("test")
            scheme = conRight.getAttribute("tracked-controls").idPrefix;
            controlScheme.setAttribute("value", "Detected Control Scheme: " + scheme)
            if(scheme.includes("touch")){
                conLeft.removeAttribute("oculus-touch-controls")
                conRight.removeAttribute("oculus-touch-controls")
                queryPrefix = "oc-"
            } else if(scheme.includes("go")){
                conLeft.removeAttribute("oculus-go-controls")
                conRight.removeAttribute("oculus-go-controls")
                queryPrefix = "oc-go-"
            } else if(scheme.includes("focus")){
                conLeft.removeAttribute("vive-focus-controls")
                conRight.removeAttribute("vive-focus-controls")
                queryPrefix = "vive-f-"
            } else if(scheme.includes("vive")){
                conLeft.removeAttribute("vive-controls")
                conRight.removeAttribute("vive-controls")
                queryPrefix = "vive-"
            } else if(scheme.includes("windows")){
                conLeft.removeAttribute("windows-motion-controls")
                conRight.removeAttribute("windows-motion-controls")
                queryPrefix = "win-"
            } else {
                queryPrefix = "gen-"
            }
            document.querySelector("#"+queryPrefix+"interface").setAttribute("visible", true)
            executeQueries(queryPrefix)
            clearInterval(controlsInterval)
        } else {
            //executeQueries(queryPrefix)
            scheme = null
        }
        /*if(conRight.getAttribute("tracked-controls").idPrefix != null){
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
            }
            clearInterval(controlsInterval)
        }*/
        
    } else if(isLeft) {
        if(conLeft.components['tracked-controls'].attrValue.hasOwnProperty("id") && conLeft.components['tracked-controls'].attrValue.id != ""){
            console.log("test3")
            scheme = conLeft.components['tracked-controls-webxr'].attrValue.id
            controlScheme.setAttribute("value", "Detected Control Scheme: " + scheme)
            if(scheme.includes("touch")){
                conLeft.removeAttribute("oculus-touch-controls")
                conRight.removeAttribute("oculus-touch-controls")
                queryPrefix = "oc-"
            } else if(scheme.includes("go")){
                conLeft.removeAttribute("oculus-go-controls")
                conRight.removeAttribute("oculus-go-controls")
                queryPrefix = "oc-go-"
            } else if(scheme.includes("focus")){
                conLeft.removeAttribute("vive-focus-controls")
                conRight.removeAttribute("vive-focus-controls")
                queryPrefix = "vive-f-"
            } else if(scheme.includes("vive")){
                conLeft.removeAttribute("vive-controls")
                conRight.removeAttribute("vive-controls")
                queryPrefix = "vive-"
            } else if(scheme.includes("windows")){
                conLeft.removeAttribute("windows-motion-controls")
                conRight.removeAttribute("windows-motion-controls")
                queryPrefix = "win-"
            } else {
                queryPrefix = "gen-"
            }
            document.querySelector("#"+queryPrefix+"interface").setAttribute("visible", true)
            executeQueries(queryPrefix)
            clearInterval(controlsInterval)
        } else if(conLeft.components['tracked-controls'].attrValue.hasOwnProperty("idPrefix") && conLeft.components['tracked-controls'].attrValue.idPrefix != ""){
            console.log("test2")
            scheme = conLeft.getAttribute("tracked-controls").idPrefix;
            controlScheme.setAttribute("value", "Detected Control Scheme: " + scheme)
            if(scheme.includes("touch")){
                conLeft.removeAttribute("oculus-touch-controls")
                conRight.removeAttribute("oculus-touch-controls")
                queryPrefix = "oc-"
            } else if(scheme.includes("go")){
                conLeft.removeAttribute("oculus-go-controls")
                conRight.removeAttribute("oculus-go-controls")
                queryPrefix = "oc-go-"
            } else if(scheme.includes("focus")){
                conLeft.removeAttribute("vive-focus-controls")
                conRight.removeAttribute("vive-focus-controls")
                queryPrefix = "vive-f-"
            } else if(scheme.includes("vive")){
                conLeft.removeAttribute("vive-controls")
                conRight.removeAttribute("vive-controls")
                queryPrefix = "vive-"
            } else if(scheme.includes("windows")){
                conLeft.removeAttribute("windows-motion-controls")
                conRight.removeAttribute("windows-motion-controls")
                queryPrefix = "win-"
            } else {
                queryPrefix = "gen-"
            }
            document.querySelector("#"+queryPrefix+"interface").setAttribute("visible", true)
            executeQueries(queryPrefix)
            clearInterval(controlsInterval)
        } else {
            scheme = null
        }
        if(conLeft.getAttribute("tracked-controls").idPrefix != null){
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
            //clearInterval(controlsInterval)
        }
    }
    
}

function executeQueries(pref){
    console.log(pref)
    temp = []
    /* A-Text for left hand */
    leftAxis = document.querySelector("#"+pref+"leftAxis");
    leftTrackpad = document.querySelector("#"+pref+"leftTrackpad");
    leftTrigger = document.querySelector("#"+pref+"leftTrigger");
    leftGrip = document.querySelector("#"+pref+"leftGrip");
    y = document.querySelector("#"+pref+"y");
    x = document.querySelector("#"+pref+"x");
    leftMenu = document.querySelector("#"+pref+"leftMenu");
    leftStickPress = document.querySelector("#"+pref+"leftStick");
    leftTrackPress = document.querySelector("#"+pref+"leftTrackpadPress");

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
    rightTrackPress = document.querySelector("#"+pref+"rightTrackpadPress");

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
    var blob = new Blob([JSON.stringify(jsonOut, null, '\t')],
    { type: "text/plain;charset=utf-8" });
    saveAs(blob, devName.value+"Compatibility.JSON");
}