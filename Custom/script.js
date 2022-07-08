/* DOM */
/* Scene related */
const scene = document.querySelector("a-scene");
const entityCanvas = scene.querySelector("#entityCanvas");

/* Edit Related */
/* Headers */
const background = document.getElementById("backgroundSettings"); /* header for background settings */
const ent = document.getElementById("entitySettings"); /* header for entity settings */

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
var numAdded = 0; /* total entities added */

var boolAddEdit = false; /* toggle for add or edit element */

var fileContent = null; /* contents of uploaded JSON file */

/* Initial webpage layout hides all edit related containers */
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

    if(selectedEntity.getAttribute("id").includes("plane")){ /* plane exclusives */
        width.value = selectedEntity.components.geometry.attrValue.width;
        height.value = selectedEntity.components.geometry.attrValue.height;
    } else if(selectedEntity.getAttribute("id").includes("circle")){ /* circle exclusives */
        radius.value = selectedEntity.components.geometry.attrValue.radius;
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
    }
}

/* switches between add or edit mode or refreshes current mode display */
function toggleAddEdit(swap){
    /* check if swapping modes or refreshing display */
    if(swap){ /* if the button to swap was pressed */
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
        /*editButton.style.display = "block";*/

        /* add related containers hidden */
        addChoice.style.display = "none";
        addButton.style.display = "none";
        upload.style.display = "none";

        /* check geometry of object */
        if (selectedEntity.getAttribute("id").includes("plane")){ /* plane exclusive containers shown */
            heightIn.style.display = "block";
            widthIn.style.display = "block";
        } else if (selectedEntity.getAttribute("id").includes("circle")){ /* circle exclusive containers shown */
            radiusIn.style.display = "block"; 
        } else if (selectedEntity.getAttribute("id").includes("triangle")) { /* triangle exlcusive containers shown */
            va.style.display = "block";
            vb.style.display = "block";
            vc.style.display = "block";
        } else if (selectedEntity.getAttribute("id").includes("gradient")) { /* gradient exlcusive containers shown */
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

/* adds entity to scene */
function addEntity(){
    el = document.createElement('a-entity'); /* creates entity */

    /* check desired type of entity */
    if($("#entity :selected").text() == "circle"){ /* if circle */
        el.setAttribute("id","circle"+circleNum++);
        el.setAttribute("geometry",{primitive: "circle", radius: 0.25});
    } else if ($("#entity :selected").text() == "plane"){ /* if plane */
        el.setAttribute("id","plane"+planeNum++);
        el.setAttribute("geometry",{primitive: "plane", width: .25, height: 0.5});
    } else if ($("#entity :selected").text() == "triangle"){ /* if triangle */
        el.setAttribute("id","triangle"+triangleNum++);
        el.setAttribute("geometry",{primitive: "triangle", vertexA: {x: 0, y: 0.1875, z: 0}, vertexB: {x: -0.25, y: -0.25, z: 0}, vertexC: {x: 0.25, y: -0.25, z: 0}});
    } else if ($("#entity :selected").text() == "gradient"){
        el.setAttribute("id","gradient"+gradientNum++);
        drawGradient(.05,.15,32,{r: 255, g: 255, b: 255},el);
    } else if ($("#entity :selected").text() == "checkerboard"){
        el.setAttribute("id","checkerboard"+checkerboardNum++);
        drawCheckerboard(16,16,.1,{r: 255, g: 255, b: 255},el);
    }
    /* Set default universal stats */
    el.setAttribute("position",{x: 0, y: 0, z: -1+(0.00005*numAdded++)});
    el.setAttribute("material", {color: "#FFFFFF"});
    el.setAttribute("rotation", {x: 0, y: 0, z: 0});
    el.setAttribute("click-checker","");

    entityCanvas.appendChild(el); /* add entity to scene */

    /* add entity to potential selections */
    var option = document.createElement("option"); 
    option.text = el.getAttribute("id");
    entitySelector.add(option);

    els.push(el);/* add entity to list of created entities */
}

function drawGradient(width,height,numBars,color,parent){
    var j = 0;
    while(j < numBars){
        let elChild = document.createElement('a-entity');
        elChild.setAttribute("id",parent.id+(numBars-j).toString());
        elChild.setAttribute("geometry",{primitive: "plane", width: width, height: height});
        elChild.setAttribute("position",{x: width*numBars/2-(width*j)-(width/2), y: 0, z: 0});
        elChild.setAttribute("material",{shader: "flat", color: "rgb("+Math.ceil(color.r-((color.r/numBars)*j)).toString()+","+Math.ceil(color.g-((color.g/numBars)*j)).toString()+","+Math.ceil(color.b-((color.b/numBars)*j)).toString()+")"});
        parent.appendChild(elChild);
        j++;
    }
}

function drawCheckerboard(rows,cols,size,color,parent){
    var r = 0;
    var isBlack = false;
    while (r < rows){
        let elChildRow = document.createElement("a-entity");
        elChildRow.setAttribute("id",parent.id+"row"+r);
        var c = 0;
        while (c < cols){
            let elChildCol = document.createElement("a-entity");
            elChildCol.setAttribute("id",parent.id+"col"+c);
            elChildCol.setAttribute("geometry",{primitive: "plane", width: size, height: size});
            elChildCol.setAttribute("position",{x: size*cols/2-(size*c)-(size/2), y: size*rows/2-(size*r)-(size/2), z: 0});
            if(isBlack){
                elChildCol.setAttribute("material",{shader: "flat", color: "rgb(0,0,0)"});
            } else {
                elChildCol.setAttribute("material",{shader: "flat", color: "rgb("+color.r.toString()+","+color.g.toString()+","+color.b.toString()+")"});
            }
            isBlack = !isBlack;
            elChildRow.appendChild(elChildCol)
            c++;
        }
        if (cols % 2 == 0) {isBlack = !isBlack};
        r++;
        parent.appendChild(elChildRow);
    }
}

/* If the textbox for sky color is changed */
$("#skyCol").change(function() {
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


/* edits selected entity */
function editEntity(){
    /* universal changes */
    selectedEntity.setAttribute("position",{x: parseFloat($("#x").val()), y: parseFloat($("#y").val()), z: selectedEntity.getAttribute("position").z});
    selectedEntity.setAttribute("material",{color: $("#color").val(), shader: "flat"});
    selectedEntity.setAttribute("rotation",{x: 0, y: 0, z: parseFloat($("#rotation").val())});

    if(selectedEntity.getAttribute("id").includes("circle")){  /* circle only changes */
        selectedEntity.setAttribute("geometry",{primitive: "circle", radius: parseFloat($("#radius").val())});
    } else if (selectedEntity.getAttribute("id").includes("plane")){ /* plane only changes */
        selectedEntity.setAttribute("geometry",{primitive: "plane", width: parseFloat($("#width").val()), height: parseFloat($("#height").val())});
    } else if (selectedEntity.getAttribute("id").includes("triangle")){ /* triangle only changes */
        selectedEntity.setAttribute("geometry",{primitive: "triangle", vertexA: {x: parseFloat($("#vax").val()), y: parseFloat($("#vay").val()), z: 0},
         vertexB: {x: parseFloat($("#vbx").val()), y: parseFloat($("#vby").val()), z: 0}, vertexC: {x: parseFloat($("#vcx").val()), y: parseFloat($("#vcy").val()), z: 0}});
    } else if (selectedEntity.getAttribute("id").includes("gradient")){ /* gradient only changes */
        let i = selectedEntity.children.length-1;
        while (i >= 0) {
            selectedEntity.children[i].parentNode.removeChild(selectedEntity.children[i]);
            i--;
        }
        drawGradient(parseFloat($("#width").val()),parseFloat($("#height").val()),parseFloat($("#numBarsIn").val()),hexToRgb($("#color").val()),selectedEntity);
    } else if (selectedEntity.getAttribute("id").includes("checkerboard")){ /* checkerboard only changes */
        let i = selectedEntity.children.length-1;
        while (i >= 0) {
            selectedEntity.children[i].parentNode.removeChild(selectedEntity.children[i]);
            i--;
        }
        drawCheckerboard(parseFloat($("#rowsIn").val()),parseFloat($("#colsIn").val()),parseFloat($("#tileSizeIn").val()),hexToRgb($("#color").val()),selectedEntity);
    }

}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

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

/* saves scene in JSON format */
function saveScene(){
    const jsonData = {};
    jsonData["sky"] = {skyColor: sky.getAttribute("material").color};
    els.forEach(element => { 
        if(element.id.includes("gradient")){
            jsonData[element.id] = {numBars: element.children.length, childGeometry: element.children[0].components.geometry.attrValue, position: element.components.position.attrValue, material: element.components.material.attrValue, rotation: element.components.rotation.attrValue};
        } else if(element.id.includes("checkerboard")){
            jsonData[element.id] = {rows: element.children.length, cols: element.children[0].children.length, tileSize: element.children[0].children[0].components.geometry.attrValue.width, position: element.components.position.attrValue, material: element.components.material.attrValue, rotation: element.components.rotation.attrValue};
        } else {
            jsonData[element.id]={geometry: element.components.geometry.attrValue, position: element.components.position.attrValue, material: element.components.material.attrValue, rotation: element.components.rotation.attrValue};
        }});
            
        var blob = new Blob([JSON.stringify(jsonData)],
        { type: "text/plain;charset=utf-8" });
        saveAs(blob, "scene.JSON");
}

/* if JSON is uploaded */
scene_input.addEventListener("change", function() {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
        fileContent = JSON.parse(reader.result);
        entityLoader(); /* loads all entities to scene */
    });
    reader.readAsText(this.files[0]);
    
});

/* loads entities from JSON to scene */
function entityLoader(){
    /* for each entity desired */
    Object.keys(fileContent).forEach(key => {
        if(key.includes("sky")){
            sky.setAttribute("material",{color: fileContent[key].skyColor});
        } else {
            el = document.createElement("a-entity"); /* create entity */
            if(key.includes("circle")){ /* circle exclusive */
                el.setAttribute("id","circle"+circleNum++);
                el.setAttribute("geometry", fileContent[key].geometry);
            } else if(key.includes("plane")){ /* plane exclusive */
                el.setAttribute("id","plane"+planeNum++);
                el.setAttribute("geometry", fileContent[key].geometry);
            } else if(key.includes("triangle")){ /* triangle exclusive */
                el.setAttribute("id","triangle"+triangleNum++);
                el.setAttribute("geometry", fileContent[key].geometry);
            } else if (key.includes("gradient")){
                el.setAttribute("id", "gradient"+gradientNum++);
                drawGradient(fileContent[key].childGeometry.width,fileContent[key].childGeometry.height,fileContent[key].numBars,hexToRgb(fileContent[key].material.color),el);
            } else if (key.includes("checkerboard")){
                el.setAttribute("id", "checkerboard"+checkerboardNum++);
                console.log()
                drawCheckerboard(fileContent[key].rows,fileContent[key].cols,fileContent[key].tileSize,hexToRgb(fileContent[key].material.color),el);
            }
            /* sets stats */
            
            el.setAttribute("position", {x: fileContent[key].position.x, y: fileContent[key].position.y, z: -1+(0.00005*numAdded++)});
            el.setAttribute("material", {color: fileContent[key].material.color, shader: "flat"});
            el.setAttribute("rotation", fileContent[key].rotation);
            el.setAttribute("click-checker","");

            entityCanvas.appendChild(el); /* adds entity to scene */

            /* adds option to dropdown */
            var option = document.createElement("option");
            option.text = el.getAttribute("id");
            entitySelector.add(option);

            els.push(el);/* adds entity to list of created entities */
        }
      });
}