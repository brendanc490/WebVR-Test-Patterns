/* Stores information about all necessary html elements in index.html*/
var scene = document.querySelector("a-scene"); /* Scene */
/* Bars */
var redBar = scene.querySelector("#redBar");
var greenBar = scene.querySelector("#greenBar");
var blueBar = scene.querySelector("#blueBar");
/* Input Information */

/* Orientation input */
var toggle = document.querySelector("#orientation");
/* Height and width inputs */
var heightSlider = document.getElementById("heightRange");
var heightText = document.getElementById("height");
var widthText = document.getElementById("width");
var widthSlider = document.getElementById("widthRange");

/* Handles height/width inputs */
var width = widthSlider.value;
var height = heightSlider.value;

/* If the height slider is changed */
heightSlider.oninput = function() {
    /* Update value in textbox */
    heightText.value = this.value;
    /* Set height to be new height */
    height = this.value;
    /* Redraw bars */
    drawBars(width,height,toggle.checked);
}

/* If the width slider is change */
widthSlider.oninput = function() {
    /* Update value in textbox */
    widthText.value = this.value;
    /* Set width to be new width */
    width = this.value;
    /* Redraw bars */
    drawBars(width,height,toggle.checked);
}

/* If the textbox for height is changed */
$("#height").change(function() {
    /* Change height slider to correct height, this will call the slider change function */
    height = heightText.value;
    heightSlider.value = height;
    drawBars(width,height,toggle.checked);
  });

$("#width").change(function() {
    /* Change width slider to correct height, this will call the slider change function */
    width = widthText.value;
    widthSlider.value = width;
    drawBars(width,height,toggle.checked);
  });

/* Creates array of all bars, used in determining which bar to move on key press */
var currbar = new Array();
currbar.push(redBar);
currbar.push(greenBar);
currbar.push(blueBar);
/* Establishes current bar as redbar */
var currbarNum = 0;

/* Variable that will store step */
var step = 0.1;

/* Positions the bars in desired location and sets them to desired size */

redBar.setAttribute("geometry",{primitive: "box", depth: 0, height: .2, width: .02});
redBar.setAttribute("position",{x: 0, y: .2, z: -1});
greenBar.setAttribute("geometry",{primitive: "box", depth: 0, height: .2, width: .02});
greenBar.setAttribute("position",{x: 0, y: 0, z: -1});
blueBar.setAttribute("geometry",{primitive: "box", depth: 0, height: .2, width: .02});
blueBar.setAttribute("position",{x: 0, y: -.2, z: -1});


/* Handles the drawing of bars when orientation is changed */
function drawNewBars(){
    /* Checks orientation */
    if(toggle.checked == true){
        /* If horizontal*/

        /* Updates the input section to default values */
        heightSlider.value = .02;
        heightText.value = heightSlider.value;
        widthSlider.value = .2;
        widthText.value = widthSlider.value;
        height = .02;
        width = .2;
        /* Draws the new bars with proper orientation */
        drawBars(width,height,toggle.checked);
    } else {
        /* If vertical */

        /* Updates the input section to default values */
        heightSlider.value = .2;
        heightText.value = heightSlider.value;
        widthSlider.value = .02;
        widthText.value = widthSlider.value;
        height = .2;
        width = .02;
        /* Draws the new bars with proper orientation */
        drawBars(width,height,toggle.checked);
    }
}

/* Draws bars with given width, height, orientation at default position */
function drawBars(widthIn,heightIn,orient){
    /* Checks orientation */
    if(orient){
        /* If horizontal */

        /* Draws all bars to desired specifications */
        redBar.setAttribute("geometry",{primitive: "box", depth: 0, height: heightIn, width: widthIn});
        redBar.setAttribute("position",{x: -widthIn*2, y: 0, z: -1});
        greenBar.setAttribute("geometry",{primitive: "box", depth: 0, height: heightIn, width: widthIn});
        greenBar.setAttribute("position",{x: 0, y: 0, z: -1});
        blueBar.setAttribute("geometry",{primitive: "box", depth: 0, height: heightIn, width: widthIn});
        blueBar.setAttribute("position",{x: widthIn*2, y: 0, z: -1});

    } else {
        /* If vertical */

        /* Draws all bars to desired specifications */
        redBar.setAttribute("geometry",{primitive: "box", depth: 0, height: heightIn, width: widthIn});
        redBar.setAttribute("position",{x: 0, y: heightIn*2, z: -1});
        greenBar.setAttribute("geometry",{primitive: "box", depth: 0, height: heightIn, width: widthIn});
        greenBar.setAttribute("position",{x: 0, y: 0, z: -1});
        blueBar.setAttribute("geometry",{primitive: "box", depth: 0, height: heightIn, width: widthIn});
        blueBar.setAttribute("position",{x: 0, y: -heightIn*2, z: -1});

    } 
}

/* Handles horizontal translation */
function updateCoordsHorizontal(angle, bar){
    /* Finds new x coordinates */
    newX = bar.getAttribute("position").x * Math.cos((angle*Math.PI)/180) - bar.getAttribute("position").z * Math.sin((angle*Math.PI)/180);
    /* Finds new z coordinates */
    newZ = bar.getAttribute("position").z * Math.cos((angle*Math.PI)/180) + bar.getAttribute("position").x * Math.sin((angle*Math.PI)/180);
    /* Updates position to new coordinates */
    bar.setAttribute("position",{x: newX.toPrecision(5), y: bar.getAttribute("position").y , z: newZ.toPrecision(5)});
    /* Rotates the bar to keep it facing the camera (negated in orthographic mode)*/
    /*bar.setAttribute("rotation",{x: bar.getAttribute("rotation").x, y: bar.getAttribute("rotation").y - angle, z: bar.getAttribute("rotation").z});*/
}

/* Handles vertical translation */
function updateCoordsVertical(angle, bar){
    /* Finds new y coordinates */
    newY = bar.getAttribute("position").y * Math.cos((angle*Math.PI)/180) - bar.getAttribute("position").z * Math.sin((angle*Math.PI)/180);
    /* Finds new z coordinates */
    newZ = bar.getAttribute("position").z * Math.cos((angle*Math.PI)/180) + bar.getAttribute("position").y * Math.sin((angle*Math.PI)/180);
    /* Updates position to new coordinates */
    bar.setAttribute("position",{x: bar.getAttribute("position").x, y: newY.toPrecision(5), z: newZ.toPrecision(5)});
    /* Rotates the bar to keep it facing the camera (negated in orthographic mode) */
    /*bar.setAttribute("rotation",{x: bar.getAttribute("rotation").x + angle, y: bar.getAttribute("rotation").y, z: bar.getAttribute("rotation").z});*/

}

/* Input listener to determine if movement or bar switch is desired */
document.addEventListener("keydown", movement);
function movement(event) {
    /* Checks what key was pressed */
    var key = event.key;
    switch(key){
        case "ArrowUp":
            /* Changes selected bar to bar above current one, doesn't change for red bar */
            if (currbarNum > 0){
                currbarNum -= 1;
            }
            break;
        case "ArrowDown":
            /* Changes selected bar to bar below current one, doesn't change for blue bar */
            if (currbarNum < 2){
                currbarNum += 1;
            }
            break;
        case "w":
            /* Calls vertical translation */
            updateCoordsVertical((parseFloat($("#step-size").val())), currbar[currbarNum], false);
            break;
        case "s":
            /* Calls vertical translation */
            updateCoordsVertical((-parseFloat($("#step-size").val())), currbar[currbarNum], false);
            break;
        case "a":
            /* Calls horizontal translation */
            updateCoordsHorizontal((-parseFloat($("#step-size").val())), currbar[currbarNum], false);
            break;
        case "d":
            /* Calls horizontal translation */
            updateCoordsHorizontal((parseFloat($("#step-size").val())), currbar[currbarNum], false);
            break;
    }
}