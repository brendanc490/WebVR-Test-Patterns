/* DOM */
/* Scene related */
const scene = document.querySelector("a-scene");
const entityCanvas = scene.querySelector("#entityCanvas");

/* Edit Related */
/* Selection of entity */
const entitySelectorText = document.getElementById("editSelector"); /* Current entity container paragraph */
const entitySelector = document.getElementById("entityId"); /* selector */

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

/* Plane only attributes */
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

/* Send back/forward */
const sendButton = document.getElementById("sendButton");

/* Save Edits Button */
const editButton = document.getElementById("editButton");

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

var selectedEntity = null; /* selected entity */

var circleNum = 0; /* number of circles created */
var planeNum = 0; /* number of planes created */
var triangleNum = 0; /* number of triangles created */
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
    entitySelectorText.style.display = "none";
    posIn.style.display = "none";
    colIn.style.display = "none";
    heightIn.style.display = "none";
    widthIn.style.display = "none";
    radiusIn.style.display = "none";
    editButton.style.display = "none";
    sendButton.style.display = "none";
    rotIn.style.display = "none";
    saveButton.style.display = "none";
    va.style.display = "none";
    vb.style.display = "none";
    vc.style.display = "none";
}

/* updates values in edit section */
function updateStats(){
    /* universal values */
    entity = selectedEntity;
    xIn.value = entity.components.position.attrValue.x;
    yIn.value = entity.components.position.attrValue.y;
    rotation.value = entity.components.rotation.attrValue.z;
    color.value = entity.components.material.attrValue.color;

    if(entity.components.geometry.attrValue.primitive == "plane"){ /* plane exclusives */
        width.value = entity.components.geometry.attrValue.width;
        height.value = entity.components.geometry.attrValue.height;
    } else if(entity.components.geometry.attrValue.primitive == "circle"){ /* circle exclusives */
        radius.value = entity.components.geometry.attrValue.radius;
    } else if(entity.components.geometry.attrValue.primitive == "triangle"){ /* triangle exclusives */
        vax.value = entity.components.geometry.attrValue.vertexA.x;
        vay.value = entity.components.geometry.attrValue.vertexA.y;
        vbx.value = entity.components.geometry.attrValue.vertexB.x;
        vby.value = entity.components.geometry.attrValue.vertexB.y;
        vcx.value = entity.components.geometry.attrValue.vertexC.x;
        vcy.value = entity.components.geometry.attrValue.vertexC.y;
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
        entitySelectorText.style.display = "block";
        rotIn.style.display = "block";
        sendButton.style.display = "block";
        saveButton.style.display = "block";
        posIn.style.display = "block";
        colIn.style.display = "block";
        editButton.style.display = "block";

        /* add related containers hidden */
        addChoice.style.display = "none";
        addButton.style.display = "none";
        upload.style.display = "none";

        /* check geometry of object */
        if (selectedEntity.components.geometry.attrValue.primitive == "plane"){ /* plane exclusive containers shown */
            heightIn.style.display = "block";
            widthIn.style.display = "block";
        } else if (selectedEntity.components.geometry.attrValue.primitive == "circle"){ /* circle exclusive containers shown */
            radiusIn.style.display = "block"; 
        } else if (selectedEntity.components.geometry.attrValue.primitive == "triangle") { /* triangle exlcusive containers shown */
            va.style.display = "block";
            vb.style.display = "block";
            vc.style.display = "block";
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
        el.setAttribute("geometry",{primitive: "triangle", vertexA: {x: 0, y: 0.25, z: 0}, vertexB: {x: -0.25, y: -0.25, z: 0}, vertexC: {x: 0.25, y: -0.25, z: 0}});
    }
    /* Set default universal stats */
    el.setAttribute("position",{x: 0, y: 0, z: -1+(0.00001*numAdded++)});
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

/* edits selected entity */
function editEntity(){
    /* universal changes */
    selectedEntity.setAttribute("position",{x: parseFloat($("#x").val()), y: parseFloat($("#y").val()), z: selectedEntity.getAttribute("position").z});
    selectedEntity.setAttribute("material",{color: $("#color").val(), shader: "flat"});
    selectedEntity.setAttribute("rotation",{x: 0, y: 0, z: parseFloat($("#rotation").val())});

    if(entity.components.geometry.attrValue.primitive == "circle"){  /* circle only changes */
        selectedEntity.setAttribute("geometry",{primitive: "circle", radius: parseFloat($("#radius").val())});
    } else if (entity.components.geometry.attrValue.primitive == "plane"){ /* plane only changes */
        selectedEntity.setAttribute("geometry",{primitive: "plane", width: parseFloat($("#width").val()), height: parseFloat($("#height").val())});
    } else if ($("#entity :selected").text() == "triangle"){ /* triangle only changes */
        selectedEntity.setAttribute("geometry",{primitive: "triangle", vertexA: {x: parseFloat($("#vax").val()), y: parseFloat($("#vay").val()), z: 0},
         vertexB: {x: parseFloat($("#vbx").val()), y: parseFloat($("#vby").val()), z: 0}, vertexC: {x: parseFloat($("#vcx").val()), y: parseFloat($("#vcy").val()), z: 0}});
    }

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
    els.forEach(element => jsonData[element.id]={geometry: element.components.geometry.attrValue, position: element.components.position.attrValue, material: element.components.material.attrValue, rotation: element.components.rotation.attrValue});
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
        el = document.createElement("a-entity"); /* create entity */
        if(key.includes("circle")){ /* circle exclusive */
            el.setAttribute("id","circle"+circleNum++);
        } else if(key.includes("plane")){ /* plane exclusive */
            el.setAttribute("id","plane"+planeNum++);
        } else if(key.includes("triangle")){ /* triangle exclusive */
            el.setAttribute("id","plane"+triangleNum++);
        }
        /* sets stats */
        el.setAttribute("geometry", fileContent[key].geometry);
        el.setAttribute("position", {x: fileContent[key].position.x, y: fileContent[key].position.y, z: -1+(0.00001*numAdded++)});
        el.setAttribute("material", {color: fileContent[key].material.color, shader: "flat"});
        el.setAttribute("rotation", fileContent[key].rotation);
        el.setAttribute("click-checker","");

        entityCanvas.appendChild(el); /* adds entity to scene */

        /* adds option to dropdown */
        var option = document.createElement("option");
        option.text = el.getAttribute("id");
        entitySelector.add(option);

        els.push(el);/* adds entity to list of created entities */
      });
}