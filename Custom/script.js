/* DOM */
/* Scene related */
const scene = document.querySelector("a-scene");
const entityCanvas = scene.querySelector("#entityCanvas");

/*const directions = document.getElementById("directionsCollapse");
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
  });*/

/* Edit Related */
/* Headers */
const background = document.getElementById("backgroundSettings"); /* header for background settings */
const ent = document.getElementById("entitySettings");
const uni = document.getElementById("universalSettings");
const nonUni = document.getElementById("nonUniversalSettings");
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
skyIn.style.width = "75%";

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
colIn.style.width = "75%";

/* Texture related */
const textureIn = document.getElementById("textureIn");
const texture = document.getElementById("texture");
const uploadTextureIn = document.querySelector("#uploadTextureIn");
const texture_input = document.querySelector("#texture-input");

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
const colsIn = document.getElementById("colsIn"); /* columns input */
const tileSize = document.getElementById("tileSize"); /* tile size container paragraph */
const tileSizeIn = document.getElementById("tileSizeIn"); /* tile size input */

/* Send back/forward */
/*const sendButton = document.getElementById("sendButton");*/

/* Save Edits Button */
/*const editButton = document.getElementById("editButton");*/

/* Save Scene button */
const saveButton = document.getElementById("saveButton");

/* Add related */
const addChoice = document.getElementById("addChoice"); /* add button container paragraph */
const addButton = document.getElementById("addButton"); /* add button */
const upload = document.getElementById("upload"); /* upload button container paragraph*/
const scene_input = document.querySelector("#scene-input"); /* upload button */

const removeButton = document.getElementById("removeButton"); /* remove button container paragraph */

/* Local Variables */
var el = null; /* recently created entity */
var els = new Array(); /* array of all created entities */
var pool = new Array();

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

var uploadedTextureFormat = {};

/* Initial webpage layout hides all edit related containers */
/*content.style.display = "block";
contentDir.style.display = "none";*/
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
    removeButton.style.display = "none";
    background.style.display = "none";
    ent.style.display = "none";
    uni.style.display = "none";
    nonUni.style.display = "none";
    skyIn.style.display = "none";
    entitySelectorText.style.display = "none";
    posIn.style.display = "none";
    colIn.style.display = "none";
    heightIn.style.display = "none";
    widthIn.style.display = "none";
    radiusIn.style.display = "none";
    /*editButton.style.display = "none";*/
    /*sendButton.style.display = "none";*/
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
    uploadTextureIn.style.display = "none";
    fillIn.style.display = "none";
}
 var flag = false;
/* updates values in edit section */
function updateStats(){
    /* universal values */
    skyColor.value = sky.components.material.attrValue.color;
    $('#skyCol').minicolors("value",sky.components.material.attrValue.color);
    entity = selectedEntity;
    xIn.value = -entity.components.angle.attrValue.x;
    yIn.value = entity.components.position.attrValue.y;
    rotation.value = entity.components.rotation.attrValue.z;
    color.value = entity.components.material.attrValue.color;
    flag = true;
    $('#color').minicolors("value",entity.components.material.attrValue.color);
    flag = false;
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
        if(selectedEntity.children.length == 0){
            width.value = selectedEntity.components.geometry.attrValue.width;
            
        } else {
            width.value = selectedEntity.children[2].components.geometry.attrValue.width;
        }
        height.value = selectedEntity.components.geometry.attrValue.height;
        fill.value = selectedEntity.components.fill.attrValue.val;
    } else if(selectedEntity.getAttribute("id").includes("circle")){ /* circle exclusives */
        radius.value = selectedEntity.components.geometry.attrValue.radiusOuter;
        fill.value = selectedEntity.components.fill.attrValue.val;
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
        rowsIn.value = selectedEntity.children.length;
        colsIn.value = selectedEntity.children[0].children.length;
        tileSizeIn.value = selectedEntity.children[0].children[0].components.geometry.attrValue.width;
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
        if(boolAddEdit){
            selectedEntity = scene.querySelector("#"+$("#entityId :selected").text()); /* set selected entity to be first entity created */
            updateStats();
         } /* update stats */
    } 
    /* check if current mode is add or edit */
    if(boolAddEdit){ /* if edit */
        removeButton.style.display = "block";
        /* universal containers shown */
        background.style.display = "block";
        ent.style.display = "block";
        uni.style.display = "block";
        nonUni.style.display = "block";
        skyIn.style.display = "block";
        entitySelectorText.style.display = "block";
        rotIn.style.display = "block";
        /*sendButton.style.display = "block";*/
        saveButton.style.display = "block";
        posIn.style.display = "block";
        colIn.style.display = "block";

        /* add related containers hidden */
        addChoice.style.display = "none";
        addButton.style.display = "none";
        upload.style.display = "none";

        /* check geometry of object */
        if (selectedEntity.getAttribute("id").includes("plane")){ /* plane exclusive containers shown */
            heightIn.style.display = "block";
            widthIn.style.display = "block";
            if(selectedEntity.components.material.attrValue.src == null || selectedEntity.components.material.attrValue.src == ""){
                fillIn.style.display = "block";
            }
            textureIn.style.display = "block";
            uploadTextureIn.style.display = "block";
        } else if (selectedEntity.getAttribute("id").includes("circle")){ /* circle exclusive containers shown */
            radiusIn.style.display = "block"; 
            fillIn.style.display = "block";
        } else if (selectedEntity.getAttribute("id").includes("triangle")) { /* triangle exlcusive containers shown */
            va.style.display = "block";
            vb.style.display = "block";
            vc.style.display = "block";
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

        /* show add containers */;
        addChoice.style.display = "block"; 
        addButton.style.display = "block";
        upload.style.display = "block";
    }
}

/* If the textbox for sky color is changed */
  $('#skyCol').minicolors({
    control: 'hue',
    position:'top',
    change: function () {
        sky.setAttribute("material",{color: $("#skyCol").val()});
    },
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
$('#color').minicolors({
    control: 'hue',
    position:'top',
    change: function () {
        if(!flag){
            editEntity();
        }
    },
});

/* If the textbox for x value is changed */
$("#texture").change(function() {
    if(texture.value == "none"){
        selectedEntity.setAttribute("material",{color: selectedEntity.getAttribute("material").color, shader: "flat", src: ""});
        fillIn.style.display = "block";
    } else {
        selectedEntity.setAttribute("material",{color: selectedEntity.getAttribute("material").color, shader: "flat", src: "#"+texture.value});
        let i = selectedEntity.children.length-1;
        while (i >= 0) {
            selectedEntity.children[i].parentNode.removeChild(selectedEntity.children[i]);
            i--;
        }
        if(typeof selectedEntity.getAttribute("material").src == "object"){
            selectedEntity.setAttribute("geometry",{primitive: "plane", width: .5*(selectedEntity.getAttribute("material").src.naturalWidth/selectedEntity.getAttribute("material").src.naturalHeight)*250, height: .5*250});
        } else {
            selectedEntity.setAttribute("geometry",{primitive: "plane", width: .5*(uploadedTextureFormat[texture.options[texture.selectedIndex].text].width/uploadedTextureFormat[texture.options[texture.selectedIndex].text].height)*250, height: .5*250});
        }
        width.value = selectedEntity.getAttribute("geometry").width;
        height.value = selectedEntity.getAttribute("geometry").height;
        fillIn.style.display = "none";
    }
  });
  

/* If the textbox for x value is changed */
$("#texture-input").change(function() {
    let i = 0;
    var j = 0;
    while(i < texture_input.files.length){
        const reader = new FileReader();
        reader.addEventListener("load", () => {
            uploaded_image = reader.result;
        });
        
        var name = this.files[i].name;
        reader.readAsDataURL(this.files[i]);
        reader.onload = function (e) {
            //Initiate the JavaScript Image object.
            var image = new Image();
    
            //Set the Base64 string return from FileReader as source.
            image.src = e.target.result;
            
            //Validate the File Height and Width.
            image.onload = function () {
                let k = 0;
                let skip = false;
                while(k < texture.options.length){
                    if(texture.options[k].text == texture_input.files[j].name){
                        skip = true;
                    }
                    k++;
                }
                if(!skip){
                    var height = this.height;
                    var width = this.width;
                    uploadedTextureFormat[texture_input.files[j].name] = {width: width, height: height};
                    var option = document.createElement("option"); 
                    option.text = texture_input.files[j++].name;
                    option.value = `url(${this.src})`;
                    texture.add(option);
                }
            };
        }
        i++;
    }

    /*editEntity();*/
  });

/* If the textbox for x value is changed */
$("#fill").change(function() {
    if(selectedEntity.id.includes("plane")){
        if(parseFloat($("#fill").val()) <= 0){
            alert("Border too small (0 < border <= smallest dimension of entity)");
            return;
        } else if((parseFloat($("#width").val()) < parseFloat($("#fill").val())) && (parseFloat($("#width").val()) <= parseFloat($("#height").val())) || (parseFloat($("#height").val()) < parseFloat($("#fill").val())) && (parseFloat($("#width").val()) > parseFloat($("#height").val()))){
            alert("Border too large, will change size of entity (0 < border <= smallest dimension of entity)");
            return;
        }
        if(parseFloat($("#fill").val()) == parseFloat($("#width").val()) && parseFloat($("#height").val()) > parseFloat($("#width").val())){
            selectedEntity.setAttribute("fill",{val: parseFloat($("#fill").val()), isFull: true});
        } else if(parseFloat($("#fill").val()) == parseFloat($("#height").val()) && parseFloat($("#height").val()) < parseFloat($("#width").val())){
            selectedEntity.setAttribute("fill",{val: parseFloat($("#fill").val()), isFull: true});
        } else {
            selectedEntity.setAttribute("fill",{val: parseFloat($("#fill").val()), isFull: false});
        }
    } else {
        if(parseFloat($("#fill").val()) <= 0){
            alert("Border too small (0 < border <= smallest dimension of entity)");
            return;
        } else if(parseFloat($("#radius").val()) < parseFloat($("#fill").val())){
            alert("Border too large, will change size of entity (0 < border <= radius)");
            return;
        }
        if(parseFloat($("#fill").val()) == parseFloat($("#radius").val())){
            selectedEntity.setAttribute("fill",{val: parseFloat($("#fill").val()), isFull: true});
        } else {
            selectedEntity.setAttribute("fill",{val: parseFloat($("#fill").val()), isFull: false});
        }
    }
    editEntity();
  });

/* If the textbox for rotation value is changed */
$("#rotation").change(function() {
    editEntity();
  });

/* If the textbox for radius value is changed */
$("#radius").change(function() {
    /*if(parseFloat($("#fill").val()) > parseFloat($("#radius").val()) || selectedEntity.getAttribute("fill").isFull){
        fill.value = parseFloat($("#radius").val());
        selectedEntity.setAttribute("fill",{val: selectedEntity.getAttribute("fill").val, isFull: true});
    }*/
    if(parseFloat($("#fill").val()) > parseFloat($("#radius").val()) || selectedEntity.getAttribute("fill").isFull){
        fill.value = parseFloat($("#radius").val());
        selectedEntity.setAttribute("fill",{val: parseFloat($("#radius").val()), isFull: true});
    }
    editEntity();
  });

/* If the textbox for width value is changed */
$("#width").change(function() {
    /*if(selectedEntity.id.includes("plane")){
        if((parseFloat($("#fill").val()) > parseFloat($("#width").val()) && parseFloat($("#height").val()) > parseFloat($("#width").val())) || (parseFloat($("#height").val()) > parseFloat($("#width").val()) && selectedEntity.getAttribute("fill").isFull)){
            fill.value = parseFloat($("#width").val());
            selectedEntity.setAttribute("fill",{val: selectedEntity.getAttribute("fill").val, isFull: true});
        }
    }*/

    if(selectedEntity.id.includes("plane")){
        if((parseFloat($("#fill").val()) > parseFloat($("#width").val()) && parseFloat($("#height").val()) > parseFloat($("#width").val())) || (parseFloat($("#height").val()) > parseFloat($("#width").val()) && selectedEntity.getAttribute("fill").isFull)){
            fill.value = parseFloat($("#width").val());
            selectedEntity.setAttribute("fill",{val: parseFloat($("#width").val()), isFull: true});
        }
    }
    
    
    editEntity();
  });

/* If the textbox for height value is changed */
$("#height").change(function() {
    if(selectedEntity.id.includes("plane")){
        if((parseFloat($("#fill").val()) > parseFloat($("#height").val()) && parseFloat($("#height").val()) < parseFloat($("#width").val())) || (parseFloat($("#height").val()) < parseFloat($("#width").val()) && selectedEntity.getAttribute("fill").isFull)){
            fill.value = parseFloat($("#height").val());
            selectedEntity.setAttribute("fill",{val: parseFloat($("#height").val()), isFull: true});
        }
    }
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
/*function sendBack(isback){
    let tmp = null;
    let selected = els.indexOf(selectedEntity); /* finds layer number of current entity */
    /* checks if back or forward */
    /*if(isback){*/ /* if back */
        /*if (selected != 0) {*/ /* if it is not on layer 0 */
            /* swap z values */
            /*tmp = els[selected].getAttribute("position").z;
            els[selected].getAttribute("position").z = els[selected-1].getAttribute("position").z;
            els[selected-1].getAttribute("position").z = tmp;*/

            /* swap position in el arr (this preserves the layering order) */    
            /*tmp = els[selected];
            els[selected] = els[selected-1];
            els[selected-1] = tmp;
        }*/
    /*} else {*/ /* if forward */
        /*if (selected != els.length-1) {*/ /* if not the last layer */
            /* swap z values */
            /*tmp = els[selected].getAttribute("position").z;
            els[selected].getAttribute("position").z = els[selected+1].getAttribute("position").z;
            els[selected+1].getAttribute("position").z = tmp;*/

            /* swap position in el arr (this preserves the layering order) */
            /*tmp = els[selected];
            els[selected] = els[selected+1];
            els[selected+1] = tmp;
        }
    }
}*/

/* Raycasting with orthographic camera */
/*var raycaster = new THREE.Raycaster();
raycaster.layers.set(0);
window.addEventListener("pointerup", function(e) {
    var screenPos = new THREE.Vector2();
    
    screenPos.x = (e.clientX / window.innerWidth) * 2 - 1;
    screenPos.y = - (e.clientY / window.innerHeight) * 2 + 1;
    
    raycaster.setFromCamera(screenPos, scene.camera);

    var rays = raycaster.intersectObjects(pool, true);
    let i = rays.length;
    if(i > 0){
        currMin = rays[0].distance;
        selected = rays[0].object.el;
        while (i > 0) {
            i--;
            if(rays[i].distance < currMin){
                currMin = rays[i].distance;
                selected = rays[i].object.el;
            }
        }
        selected = document.getElementById(selected.id.split("-")[0]);
        console.log(selected);
        selectNew(selected);
    }
});*/

function removeEntity(){
    els.splice(els.indexOf(selectedEntity),1);
    pool.splice(pool.indexOf(selectedEntity.object3D),1);
    if(selectedEntity.id.includes("plane")){
        planeNum--;
    } else if(selectedEntity.id.includes("circle")){
        circleNum--;
    } else if(selectedEntity.id.includes("triangle")){
        triangleNum--;
    } else if(selectedEntity.id.includes("checkerboard")){
        checkerboardNum--;
    } else if(selectedEntity.id.includes("gradient")){
        gradientNum--;
    } else if(selectedEntity.id.includes("grille")){
        grilleNum--;
    }
    entityCanvas.removeChild(selectedEntity);
    for (var i=0; i<entitySelector.length; i++) {
        if (entitySelector.options[i].value == selectedEntity.id)
            entitySelector.remove(i);
    }
    if(els.length == 0){
        utility.checked = false;
        toggleAddEdit(true);
        
    } else {
        selectNew(null);
    }
    numAdded--;
}
