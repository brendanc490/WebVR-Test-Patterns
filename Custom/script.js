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
const addEditContent = document.getElementById("addEditContent")
const displayEditContent = document.getElementById("displayEditContent")
const nameIn = document.getElementById('name');
const displayUtility = document.getElementById('displayUtility');

collapse.addEventListener("click", function() {
    //this.classList.toggle("active");
    if (content.style.display === "block") {
        collapse.innerHTML = "Show Settings";
        content.style.display = "none";
    } else {
        collapse.innerHTML = "Hide Settings";
        content.style.display = "block";
    }
  });

/* Display scenes */
const pattern = document.getElementById("pattern");
const patternList = document.getElementById("patternList");
const patternDisplay = document.getElementById("patternDisplay");
const scene_display_input = document.getElementById("scene-disp-input");

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

var boolAddEdit = false;
var boolDisplayEdit = true; /* toggle for add or edit element */

var fileContent = null; /* contents of uploaded JSON file */

var uploadedTextureFormat = {};

/* Initial webpage layout hides all edit related containers */
/*content.style.display = "block";
contentDir.style.display = "none";*/
toggleDisplayEdit(null);
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
    console.log('test')
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
function toggleDisplayEdit(swap){
    /* check if swapping modes or refreshing display */
    if(swap){ /* if the button to swap was pressed */
        boolDisplayEdit = !boolDisplayEdit; /* change current mode */
    } 
    /* check if current mode is add or edit */
    if(boolDisplayEdit){ /* if display */
        addEditContent.style.display = "none"
        displayEditContent.style.display = "block"
        scene_input.value = ""
    } else { /* if add */
        if(patternDisplay.options.length != 0){
            addEditContent.style.display = "block"
            $('#skyCol').minicolors('value', scenes[patternDisplay.value]['sky'].skyColor);
            displayEditContent.style.display = "none"
        } else {
            alert("You must add a scene");
            displayUtility.checked = false;
        }
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
        saveButton.style.display = "block";
        background.style.display = "block";
        skyIn.style.display = "block";
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
        updateJSON();
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
        if(!flag && $("#color").val().length == 7){
            editEntity();
        }
    },
});

/* If the textbox for x value is changed */
$("#texture").change(function() {
    if(texture.value == "none"){
        selectedEntity.setAttribute("material",{color: selectedEntity.getAttribute("material").color, shader: "flat", src: ""});
        fillIn.style.display = "block";
        editEntity()
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
        if(selectedEntity.getAttribute("fill").isFull){
            if(selectedEntity.getAttribute("geometry").width > selectedEntity.getAttribute("geometry").height){
                selectedEntity.setAttribute("fill", { val: selectedEntity.getAttribute("geometry").height, isFull: true});
            } else {
                selectedEntity.setAttribute("fill", { val: selectedEntity.getAttribute("geometry").width, isFull: true});
            }
        }
        width.value = selectedEntity.getAttribute("geometry").width;
        height.value = selectedEntity.getAttribute("geometry").height;
        fill.value = selectedEntity.getAttribute("fill").val;
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
    updateJSON()
}

var displayOrder = ['default'];
function handlePatternSelect(snapshot){
    /*let len = snapshot.options.length;
    let i = 0;
    while(i < len){
        curr = snapshot.options[i]
        if(curr.selected){
            if(displayOrder.indexOf(curr) == -1){
                displayOrder.push(curr)
            }
        } else {
            if(displayOrder.indexOf(curr) != -1){
                displayOrder.splice(displayOrder.indexOf(curr),1)
            }
        }
        

        i++;
    }*/
    curr = snapshot.id
    if(displayOrder.indexOf(curr) == -1){
        displayOrder.push(curr)
    } else {
            displayOrder.splice(displayOrder.indexOf(curr),1)
    }
    while(patternDisplay.options.length != 0){
        patternDisplay.options.remove(patternDisplay.options[0])
    }
    i = 0
    len = displayOrder.length
    while(i < len){
        if(i == 0){
            patternDisplay.options.add(new Option(displayOrder[i], displayOrder[i], true, true))
            revertChanges()
            addEntitiesFromScene(scenes[displayOrder[i]])

        } else {
            patternDisplay.options.add(new Option(displayOrder[i], displayOrder[i]))
        }
        i++;
    }
}

function displayCurrentPattern(snapshot){
    let len = snapshot.options.length;
    let i = 0;
    while(i < len){
        curr = snapshot.options[i]
        if(curr.selected){
           /* display pattern */
            revertChanges()
            console.log(scenes[curr.text])
            addEntitiesFromScene(scenes[curr.text])
        } 
        i++;
    }
}

var scenes = {default: {sky: {skyColor: '#000000'}}}
finished = false
var ind = 0
var block = false
/* if JSON is uploaded */
scene_display_input.addEventListener("change", function() {

    var myLoop = slowLoop(scene_display_input.files, (itm, idx, cb)=>{
    
        setTimeout(()=>{
            const reader = new FileReader();
            reader.addEventListener("load", () => {

                fileContent = JSON.parse(reader.result);
                let arr = Object.keys(fileContent['scenes'])
                let i = 0;
                while(i < arr.length){
                    if(Object.keys(scenes).indexOf(arr[i]) != -1){
                        scenes[arr[i]+"1"] = fileContent['scenes'][arr[i]]
                    } else {
                        scenes[arr[i]] = fileContent['scenes'][arr[i]]
                    }
                    
                    i++;
                }
                textures = fileContent['textures']['textureValues']
                uploadedTextureFormats = fileContent['textures']['uploadedTextureFormats']
                //scenes[itm.name.split(".")[0]] = fileContent /* loads all entities to scene */
                //console.log(itm.name.split(".")[0])
                cb();
            });
            if(itm.name.split(".")[1] != "JSON"){
                alert("Invalid file type");
                scene_display_input.value = ""
                return;
            }
            if(Object.keys(scenes).indexOf(itm.name.split(".")[0]) != -1){
                itm.name = itm.name.split(".")[0]+"1"+itm.name.split(".")[1]
                console.log(itm)
                /*alert("File already present");
                scene_display_input.value = ""
                return;*/
            }
            reader.readAsText(itm);
            

            
            
            // call cb when finished
            
            
        }, 100);
        
    });
    
    // when it's done....
    myLoop.then(()=>{
        console.log('no')
        patternList.innerHTML = ''
        let arr = Object.keys(scenes)
        let len = arr.length
        let i = 0;
        let len2 = texture.options.length;
        currTextures = []
        while(i < len2){
            currTextures.push(texture.options[i].text)
            i++;
        }
        i = 0;
        uploadedTextures = []
        while(i < textures.length){
            uploadedTextures.push(textures[i].text)
            i++;
        }
        newTextures = [...new Set([...uploadedTextures,...currTextures])]
        console.log(newTextures)
        newTextures.forEach(text => {
            var option = document.createElement("option"); 
            if(uploadedTextures.indexOf(text) != -1 && currTextures.indexOf(text) == -1){
                option.text = textures[uploadedTextures.indexOf(text)].text
                option.value = textures[uploadedTextures.indexOf(text)].val
                texture.add(option);
            }
            

        })

       


        newUploadedTextureFormat = [...new Set([...Object.keys(uploadedTextureFormat),...Object.keys(uploadedTextureFormats)])]
        console.log(newUploadedTextureFormat)
        tmp = {}
        newUploadedTextureFormat.forEach(texture => {
            if(Object.keys(uploadedTextureFormat).indexOf(texture) != -1){
                tmp[texture] = uploadedTextureFormat[texture]
            } else {
                tmp[texture] = uploadedTextureFormats[texture]
            }
        });
        uploadedTextureFormat = tmp

        i = 0;
        while(i < len){
            var toggle_button = '<p><input type="checkbox" id="'+arr[i]+'" name="'+arr[i]+'" onclick="handlePatternSelect(this)"'
            let res = Array.from(patternDisplay.children).reduce(function(acc, x) {
                acc = acc || x.text == arr[i]
                return acc;
              }, false);
            if(res == true){
                toggle_button += 'checked/>'
            
            } else {
                toggle_button += '/>'
            }
            toggle_button += '<label for="'+arr[i]+'">'+arr[i]+'</label></p>';
            $('#patternList').append(toggle_button)
            //pattern.options.add(new Option(arr[i], arr[i]))
            i++
        }
        console.log("Finished looping");

    
    });

    /*while(ind < scene_display_input.files.length){


        const reader = new FileReader();
        reader.addEventListener("load", () => {
            console.log(ind)
            /*if(curr.name.split(".")[1] != "JSON"){
                alert("Invalid file type");
                scene_display_input.value = ""
                return;
            }*/
    
            
/*
            fileContent = JSON.parse(reader.result);
            scenes[curr.name.split(".")[0]] = fileContent /* loads all entities to scene */
            /*finished = true;
            console.log(curr.name.split(".")[0])
            ind++;
            block = false
            
        });
        if(block != true){
            console.log(ind)
            curr = scene_display_input.files[ind];
            reader.readAsText(curr);
            block = true
        }



    }


var myArray = ["a","b","c","d"];*/



/**
 * Execute the loopBody function once for each item in the items array, 
 * waiting for the done function (which is passed into the loopBody function)
 * to be called before proceeding to the next item in the array.
 * @param {Array} items - The array of items to iterate through
 * @param {Function} loopBody - A function to execute on each item in the array.
 *		This function is passed 3 arguments - 
 *			1. The item in the current iteration,
 *			2. The index of the item in the array,
 *			3. A function to be called when the iteration may continue.
 * @returns {Promise} - A promise that is resolved when all the items in the 
 *		in the array have been iterated through.
 */
function slowLoop(items, loopBody) {
	return new Promise(f => {
		done = arguments[2] || f;
		idx = arguments[3] || 0;
		let cb = items[idx + 1] ? () => slowLoop(items, loopBody, done, idx + 1) : done;
		loopBody(items[idx], idx, cb);
	});
}
    

    
});

function resetScene(){
    while(entityCanvas.childElementCount != 0){
        entityCanvas.removeChild(entityCanvas.children[0])
    } 
    $('#skyCol').minicolors('value', '#000000');
    els = []
    updateJSON()
}

function displayNext(direction){
    if(direction){
        // right
        if(patternDisplay.selectedIndex == patternDisplay.childElementCount-1){
            patternDisplay.selectedIndex = 0
        } else {
            patternDisplay.selectedIndex = patternDisplay.selectedIndex+1
        }
        
        
    } else {
        // left
        if(patternDisplay.selectedIndex == 0){
            patternDisplay.selectedIndex = patternDisplay.childElementCount-1
        } else {
            patternDisplay.selectedIndex = patternDisplay.selectedIndex-1
        }
        
    }
    $('#patternDisplay').trigger('change')

}

function addPattern(){
    scenes[nameIn.value] = {sky: {skyColor: '#000000'}}
    var toggle_button = '<p><input type="checkbox" id="'+nameIn.value+'" name="'+nameIn.value+'" onclick="handlePatternSelect(this)"/>\
        <label for="'+nameIn.value+'">'+nameIn.value+'</label></p>';
    $('#patternList').append(toggle_button)
    //pattern.options.add(new Option(nameIn.value, nameIn.value))
}

function removePattern(){
    revertChanges()
    delete scenes[patternDisplay.value]
    //pattern.options.remove(new Option(patternDisplay.value, patternDisplay.value))
    let i = 0;
    while(i < patternList.childElementCount){
        if(patternList.children[i].children[0].id = patternDisplay.value){
            patternList.removeChild(patternList.children[i])
            i = patternList.childElementCount
            displayOrder.splice(displayOrder.indexOf(patternDisplay.value),1);
        }
        i++;
    }
    patternDisplay.options.remove(new Option(patternDisplay.value, patternDisplay.value))
}

function revertChanges(){
    sky.setAttribute('material',{color: '#000000'})
    while(entityCanvas.childElementCount != 0){
        entityCanvas.removeChild(entityCanvas.children[0])
       }
       while(entitySelector.childElementCount != 0){
            entitySelector.remove(entitySelector.children[0])
       }
        els = []
        circleNum = 0; /* number of circles created */
        planeNum = 0; /* number of planes created */
        triangleNum = 0; /* number of triangles created */
        gradientNum = 0; /* number of gradients created */
        checkerboardNum = 0; /* number of checkerboards created */
        grilleNum = 0;
        textureNum = 0;
        numAdded = 0;
}

document.addEventListener('keyup', (e) => {
    if (e.code === "ArrowUp"){
        displayNext(true)
    } else if (e.code === "ArrowDown"){
        displayNext(false)
    }
  });