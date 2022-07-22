/* DOM */
/* Scene related */
const scene = document.querySelector("a-scene");
const entityCanvas = scene.querySelector("#entityCanvas");

const directions = document.getElementById("directionsCollapse");
const contentDir = document.getElementById("contentDir");
directions.addEventListener("click", function() {
    this.classList.toggle("active");
    if (contentDir.style.display === "block") {
        directions.innerHTML = "Show Directions";
        contentDir.style.display = "none";
    } else {
        directions.innerHTML = "Hide Directions";
        contentDir.style.display = "block";
    }
  });

/* Edit Related */
/* Headers */
const background = document.getElementById("backgroundSettings"); /* header for background settings */
const ent = document.getElementById("entitySettings"); /* header for entity settings */
const utility = document.getElementById("utility");
const collapse = document.getElementById("collapse");
const content = document.getElementById("content");
collapse.addEventListener("click", function() {
    this.classList.toggle("active");
    if (content.style.display === "block") {
        collapse.innerHTML = "Show Settings";
        content.style.display = "none";
    } else {
        collapse.innerHTML = "Hide Settings";
        content.style.display = "block";
    }
  });

/* Selection of entity */
const entitySelectorText = document.getElementById("editSelector"); /* current entity container paragraph */
const entitySelector = document.getElementById("entityId"); /* selector */

/* Sky related */
const skyIn = document.getElementById("skyIn"); /* sky color container */
const skyColor = document.getElementById("skyCol"); /* sky color input */

/* Universal attributes */
/* Position related */
const posIn = document.getElementById("posIn"); /* position Container Paragraph */
const xIn = document.getElementById("x"); /* x input */
const yIn = document.getElementById("y"); /* y input */

/* Rotation related */
const rotation = document.getElementById("rotation"); /* rotation container paragraph */ 
const rotIn = document.getElementById("rotIn"); /* rotation input */

/* Color related */
const color = document.getElementById("color"); /* color container paragraph */
const colIn = document.getElementById("colIn"); /* color input */

/* Texture related */
const textureIn = document.getElementById("textureIn");
const texture = document.getElementById("texture");

/* Fill related */
const fillIn = document.getElementById("fillIn");
const fill = document.getElementById("fill");

/* Circle only attributes */
/* Radius related */
const radius = document.getElementById("radius"); /* radius container paragraph */
const radiusIn = document.getElementById("radiusIn"); /* radius input */

/* Plane/Gradient only attributes */
/* Width related */
const width = document.getElementById("width"); /* width container paragraph */
const widthIn = document.getElementById("widthIn"); /* width input */

/* Height related */
const height = document.getElementById("height"); /* height container paragraph */
const heightIn = document.getElementById("heightIn"); /* height input */

/* Triangle only attributes */
/* Vertex A related */
const va = document.getElementById("va"); /* vertex A container paragraph */
const vax = document.getElementById("vax"); /* x input */
const vay = document.getElementById("vay"); /* y input */

/* vertex B related */
const vb = document.getElementById("vb"); /* vertex B container paragraph */
const vbx = document.getElementById("vbx"); /* x input */
const vby = document.getElementById("vby"); /* y input */

/* Vertex C related */
const vc = document.getElementById("vc"); /* vertex C container paragraph */
const vcx = document.getElementById("vcx"); /* x input */
const vcy = document.getElementById("vcy"); /* y input */

/* Gradient only attributes */
/* Number of bars related */
const numBars = document.getElementById("numBars"); /* number of bars container paragraph */
const numBarsIn = document.getElementById("numBarsIn"); /* number of bars input */

/* Checkerboard only attributes */
const rows = document.getElementById("rows"); /* rows container paragraph */
const rowsIn = document.getElementById("rowsIn"); /* rows input */
const cols = document.getElementById("cols"); /* columns container paragraph */
const colsIn = document.getElementById("xolsIn"); /* columns input */
const tileSize = document.getElementById("tileSize"); /* tile size container paragraph */
const tileSizeIn = document.getElementById("tileSizeIn"); /* tile size input */

/* Send back/forward */
const sendButton = document.getElementById("sendButton");

/* Save Edits Button */
/*const editButton = document.getElementById("editButton");*/

/* Save Scene button */
const saveButton = document.getElementById("saveButton");

/* Add related */
const addChoice = document.getElementById("addChoice"); /* add button container paragraph */
const addButton = document.getElementById("addButton"); /* add button */
const upload = document.getElementById("upload"); /* upload button container paragraph*/
const scene_input = document.querySelector("#scene-input"); /* upload button */

/* Local Variables */
var el = null; /* recently created entity */
var els = new Array(); /* array of all created entities */

var sky = scene.querySelector("#sky"); /* sky */

var selectedEntity = null; /* selected entity */

var circleNum = 0; /* number of circles created */
var planeNum = 0; /* number of planes created */
var triangleNum = 0; /* number of triangles created */
var gradientNum = 0; /* number of gradients created */
var checkerboardNum = 0; /* number of checkerboards created */
var grilleNum = 0;
var textureNum = 0;
var numAdded = 0; /* total entities added */

var boolAddEdit = false; /* toggle for add or edit element */

var fileContent = null; /* contents of uploaded JSON file */

/* Initial webpage layout hides all edit related containers */
content.style.display = "block";
contentDir.style.display = "none";
toggleAddEdit(null);

/* selects a new entity for editing*/
function selectNew(clickedEntity){
    /* Check if entity was clicked on or selected via dropdown */
    if(clickedEntity != null){ /* if clicked */
        selectedEntity = clickedEntity; /* updated selected entity */
        entitySelector.value = clickedEntity.getAttribute("id"); /* update dropdown */
    } else { /* if selected via dropdown */
        selectedEntity = scene.querySelector("#"+$("#entityId :selected").text()); /* update selected entity */
    }
    /* Update stats in edit section */
    hideEditStats(); /* hide section briefly */
    updateStats(); /* update stats */
    toggleAddEdit(false); /* re-display section */
}

/* hides edit section */
function hideEditStats(){
    background.style.display = "none";
    ent.style.display = "none";
    skyIn.style.display = "none";
    entitySelectorText.style.display = "none";
    posIn.style.display = "none";
    colIn.style.display = "none";
    heightIn.style.display = "none";
    widthIn.style.display = "none";
    radiusIn.style.display = "none";
    /*editButton.style.display = "none";*/
    sendButton.style.display = "none";
    rotIn.style.display = "none";
    saveButton.style.display = "none";
    va.style.display = "none";
    vb.style.display = "none";
    vc.style.display = "none";
    numBars.style.display = "none";
    rows.style.display = "none";
    cols.style.display = "none";
    tileSize.style.display = "none";
    textureIn.style.display = "none";
    fillIn.style.display = "none";
}

/* updates values in edit section */
function updateStats(){
    /* universal values */
    skyColor.value = sky.components.material.attrValue.color;
    entity = selectedEntity;
    xIn.value = entity.components.position.attrValue.x;
    yIn.value = entity.components.position.attrValue.y;
    rotation.value = entity.components.rotation.attrValue.z;
    color.value = entity.components.material.attrValue.color;
    if (entity.components.material.attrValue.src == "" || entity.components.material.attrValue.src == null){
        texture.selectedIndex = 0;
        texture.options[0].selected = true;
    } else {
        $(texture.options).each(function() {
            if((entity.components.material.attrValue.src).includes(this.value))
                this.selected = true;
        });
    }

    if(selectedEntity.getAttribute("id").includes("plane")){ /* plane exclusives */
        width.value = selectedEntity.children[2].components.geometry.attrValue.width;
        height.value = selectedEntity.children[0].components.geometry.attrValue.height;
        fill.value = ((selectedEntity.children[0].components.geometry.attrValue.width*2)/selectedEntity.children[2].components.geometry.attrValue.width)*((selectedEntity.children[0].components.geometry.attrValue.width*2)/selectedEntity.children[2].components.geometry.attrValue.width)*100;
    } else if(selectedEntity.getAttribute("id").includes("ring")){ /* circle exclusives */
        radius.value = selectedEntity.components.geometry.attrValue.radiusOuter;
        fill.value = (selectedEntity.components.geometry.attrValue.radiusInner*selectedEntity.components.geometry.attrValue.radiusInner)/(selectedEntity.components.geometry.attrValue.radiusOuter*selectedEntity.components.geometry.attrValue.radiusOuter);
    } else if(selectedEntity.getAttribute("id").includes("triangle")){ /* triangle exclusives */
        vax.value = selectedEntity.components.geometry.attrValue.vertexA.x;
        vay.value = selectedEntity.components.geometry.attrValue.vertexA.y;
        vbx.value = selectedEntity.components.geometry.attrValue.vertexB.x;
        vby.value = selectedEntity.components.geometry.attrValue.vertexB.y;
        vcx.value = selectedEntity.components.geometry.attrValue.vertexC.x;
        vcy.value = selectedEntity.components.geometry.attrValue.vertexC.y;
    } else if(selectedEntity.getAttribute("id").includes("gradient")){ /* gradient exclusives */
        width.value = selectedEntity.children[0].components.geometry.attrValue.width;
        height.value = selectedEntity.children[0].components.geometry.attrValue.height;
        numBarsIn.value = selectedEntity.children.length;
    } else if(selectedEntity.getAttribute("id").includes("checkerboard")){
        rowsIn.style.value = selectedEntity.children.length;
        cols.style.value = selectedEntity.children[0].length;
        tileSize.style.value = selectedEntity.children[0].children[0].components.geometry.attrValue.width;
    } else if(selectedEntity.getAttribute("id").includes("grille")){
        width.value = selectedEntity.children[0].components.geometry.attrValue.width;
        height.value = selectedEntity.children[0].components.geometry.attrValue.height;
        numBarsIn.value = selectedEntity.children.length;
    }
}

/* switches between add or edit mode or refreshes current mode display */
function toggleAddEdit(swap){
    /* check if swapping modes or refreshing display */
    if(swap){ /* if the button to swap was pressed */
        if(numAdded == 0){
            alert("You must add an entity before editing the scene");
            utility.checked = false;
            return;
        }
        boolAddEdit = !boolAddEdit; /* change current mode */
        selectedEntity = scene.querySelector("#"+$("#entityId :selected").text()); /* set selected entity to be first entity created */
        updateStats(); /* update stats */
    } 
    /* check if current mode is add or edit */
    if(boolAddEdit){ /* if edit */
        /* universal containers shown */
        background.style.display = "block";
        ent.style.display = "block";
        skyIn.style.display = "block";
        entitySelectorText.style.display = "block";
        rotIn.style.display = "block";
        sendButton.style.display = "block";
        saveButton.style.display = "block";
        posIn.style.display = "block";
        colIn.style.display = "block";
        textureIn.style.display = "block";
        /*editButton.style.display = "block";*/

        /* add related containers hidden */
        addChoice.style.display = "none";
        addButton.style.display = "none";
        upload.style.display = "none";

        /* check geometry of object */
        if (selectedEntity.getAttribute("id").includes("plane")){ /* plane exclusive containers shown */
            heightIn.style.display = "block";
            widthIn.style.display = "block";
            if(entity.components.material.attrValue.src == null){
                fillIn.style.display = "block";
            }
        } else if (selectedEntity.getAttribute("id").includes("circle")){ /* circle exclusive containers shown */
            radiusIn.style.display = "block"; 
            fillIn.style.display = "block";
        } else if (selectedEntity.getAttribute("id").includes("triangle")) { /* triangle exlcusive containers shown */
            va.style.display = "block";
            vb.style.display = "block";
            vc.style.display = "block";
            fillIn.style.display = "block";
        } else if (selectedEntity.getAttribute("id").includes("gradient") || selectedEntity.getAttribute("id").includes("grille")) { /* gradient exlcusive containers shown */
            heightIn.style.display = "block";
            widthIn.style.display = "block";
            numBars.style.display = "block";
        } else if (selectedEntity.getAttribute("id").includes("checkerboard")) { /* gradient exlcusive containers shown */
            cols.style.display = "block";
            rows.style.display = "block";
            tileSize.style.display = "block";
        }
    } else { /* if add */
        hideEditStats(); /* hide edit containers */

        /* show add containers */
        addChoice.style.display = "block"; 
        addButton.style.display = "block";
        upload.style.display = "block";
    }
}

/* If the textbox for sky color is changed */
$("#skyCol").change(function() {
    if(hexToRgb($("#skyCol").val()) == null){
        alert("Invalid color (check that the color was entered in hexadecimal format)");
        return;
    }
    sky.setAttribute("material",{color: $("#skyCol").val()});
  });

/* If the textbox for x value is changed */
$("#x").change(function() {
    editEntity();
  });

/* If the textbox for y value is changed */
$("#y").change(function() {
    editEntity();
  });

/* If the textbox for z value is changed */
$("#z").change(function() {
    editEntity();
  });

/* If the textbox for color value is changed */
$("#color").change(function() {
    editEntity();
  });

/* If the textbox for x value is changed */
$("#texture").change(function() {
    if(texture.value == "none"){
        fillIn.style.display = "block";
    } else {
        fillIn.style.display = "none";
    }
    editEntity();
  });

/* If the textbox for x value is changed */
$("#fill").change(function() {
    editEntity();
  });

/* If the textbox for rotation value is changed */
$("#rotation").change(function() {
    editEntity();
  });

/* If the textbox for radius value is changed */
$("#radius").change(function() {
    editEntity();
  });

/* If the textbox for width value is changed */
$("#width").change(function() {
    editEntity();
  });

/* If the textbox for height value is changed */
$("#height").change(function() {
    editEntity();
  });

/* If the textbox for vax value is changed */
$("#vax").change(function() {
    editEntity();
  });

/* If the textbox for vay value is changed */
$("#vay").change(function() {
    editEntity();
  });

/* If the textbox for vbx value is changed */
$("#vbx").change(function() {
    editEntity();
  });

/* If the textbox for vby value is changed */
$("#vby").change(function() {
    editEntity();
  });

/* If the textbox for vcx value is changed */
$("#vcx").change(function() {
    editEntity();
  });

/* If the textbox for vcy value is changed */
$("#vcy").change(function() {
    editEntity();
  });

/* If the textbox for numbers of bars value is changed */
$("#numBarsIn").change(function() {
    editEntity();
  });

/* If the textbox for numbers of rows is changed */
$("#rowsIn").change(function() {
    editEntity();
  });

/* If the textbox for numbers of cols is changed */
$("#colsIn").change(function() {
    editEntity();
  });

/* If the textbox for size of tiles is changed */
$("#tileSizeIn").change(function() {
    editEntity();
  });

/* sends entity back or forward one layer */
function sendBack(isback){
    let tmp = null;
    let selected = els.indexOf(selectedEntity); /* finds layer number of current entity */
    /* checks if back or forward */
    if(isback){ /* if back */
        if (selected != 0) { /* if it is not on layer 0 */
            /* swap z values */
            tmp = els[selected].getAttribute("position").z;
            els[selected].getAttribute("position").z = els[selected-1].getAttribute("position").z;
            els[selected-1].getAttribute("position").z = tmp;

            /* swap position in el arr (this preserves the layering order) */    
            tmp = els[selected];
            els[selected] = els[selected-1];
            els[selected-1] = tmp;
        }
    } else { /* if forward */
        if (selected != els.length-1) { /* if not the last layer */
            /* swap z values */
            tmp = els[selected].getAttribute("position").z;
            els[selected].getAttribute("position").z = els[selected+1].getAttribute("position").z;
            els[selected+1].getAttribute("position").z = tmp;

            /* swap position in el arr (this preserves the layering order) */
            tmp = els[selected];
            els[selected] = els[selected+1];
            els[selected+1] = tmp;
        }
    }
}

