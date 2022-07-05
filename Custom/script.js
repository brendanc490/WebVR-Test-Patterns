const scene = document.querySelector("a-scene");
const entityCanvas = scene.querySelector("#entityCanvas");
const x = document.getElementById("x");
const y = document.getElementById("y");
const rotation = document.getElementById("rotation");
const color = document.getElementById("color");
const width = document.getElementById("width");
const height = document.getElementById("height");
const radius = document.getElementById("radius");
const a1 = document.getElementById("add1");
const a2 = document.getElementById("add2");
const a3 = document.getElementById("add3");
const entitySelectorText = document.getElementById("editSelector");
const entitySelector = document.getElementById("entityId");
const e1 = document.getElementById("edit1");
const e2 = document.getElementById("edit2");
const e3 = document.getElementById("edit3");
const e4 = document.getElementById("edit4");
const e5 = document.getElementById("edit5");
const e6 = document.getElementById("edit6");
const e7 = document.getElementById("edit7");
const e8 = document.getElementById("edit8");
const e9 = document.getElementById("edit9");
const scene_input = document.querySelector("#scene-input");

var el = null;
const listenerArray = new Array();
var selectedEntity = null;
var circleNum = 0;
var planeNum = 0;
var boolAddEdit = false;
entitySelectorText.style.display = "none";
e1.style.display = "none";
e2.style.display = "none";
e3.style.display = "none";
e4.style.display = "none";
e5.style.display = "none";
e6.style.display = "none";
e7.style.display = "none";
e8.style.display = "none";
e9.style.display = "none";
var els = new Array();
var fileContent = null;
/*var triangleNum = 0*/
var numAdded = 0;


function selectNew(clickTrigger){
    if(clickTrigger != null){
        selectedEntity = clickTrigger;
        entitySelector.value = clickTrigger.getAttribute("id");
    } else {
        selectedEntity = scene.querySelector("#"+$("#entityId :selected").text());
    }
    e1.style.display = "none";
    e2.style.display = "none";
    e3.style.display = "none";
    e4.style.display = "none";
    e5.style.display = "none";
    e6.style.display = "none";
    e7.style.display = "none";
    e8.style.display = "none";
    e9.style.display = "none";
    toggleAddEdit(false);
    setSelectedEntity();
}

function toggleAddEdit(swap){
    if(swap){
        boolAddEdit = !boolAddEdit;
        selectedEntity = scene.querySelector("#"+$("#entityId :selected").text());
        setSelectedEntity();
    } 
    if(boolAddEdit){
        entitySelectorText.style.display = "block";
        if (selectedEntity.components.geometry.attrValue.primitive == "plane"){
            e3.style.display = "block";
            e4.style.display = "block";
        } else if (selectedEntity.components.geometry.attrValue.primitive == "circle"){
            e5.style.display = "block"; 
        } else {
            e4.style.display = "block";
            e5.style.display = "block";
            e6.style.display = "block"; 
        }
        e8.style.display = "block";
        e7.style.display = "block";
        e9.style.display = "block";
        e1.style.display = "block";
        e2.style.display = "block";
        e6.style.display = "block";
        a1.style.display = "none";
        a2.style.display = "none";
        a3.style.display = "none";
    } else {
        entitySelectorText.style.display = "none";
        e1.style.display = "none";
        e2.style.display = "none";
        e3.style.display = "none";
        e4.style.display = "none";
        e5.style.display = "none";
        e6.style.display = "none";
        e7.style.display = "none";
        e8.style.display = "none";
        e9.style.display = "none";
        a1.style.display = "block";
        a2.style.display = "block";
        a3.style.display = "block";
    }
}

function addEntity(){
    el = document.createElement('a-entity');
    if($("#entity :selected").text() == "circle"){
        el.setAttribute("id","circle"+circleNum++);
        el.setAttribute("geometry",{primitive: "circle", radius: 0.25});
        el.setAttribute("position",{x: 0, y: 0, z: -1+(0.0000015*numAdded++)});
        el.setAttribute("material", {color: "#FFFFFF"});
        el.setAttribute("rotation", {x: 0, y: 0, z: 0});
    } else if ($("#entity :selected").text() == "plane"){
        el.setAttribute("id","plane"+planeNum++);
        el.setAttribute("geometry",{primitive: "plane", width: .25, height: 0.5});
        el.setAttribute("position",{x: 0, y: 0, z: -1+(0.000015*numAdded++)});
        el.setAttribute("material", {color: "#FFFFFF"});
        el.setAttribute("rotation", {x: 0, y: 0, z: 0});
    }/* else if ($("#entity :selected").text() == "triangle"){
        el.setAttribute("id","triangle"+triangleNum++);
        el.setAttribute("geometry",{primitive: "circle", radius: 0.5});
        el.setAttribute("position",{x: 0, y: 0, z: -1});
    }*/
    el.setAttribute("click-checker","");
    entityCanvas.appendChild(el);
    selectedEntity = scene.querySelector("#"+el.getAttribute("id"));
    var option = document.createElement("option");
    option.text = el.getAttribute("id");
    entitySelector.add(option);
    setSelectedEntity();
    els.push(el);
}

function editEntity(){
    let el = selectedEntity;
    if(entity.components.geometry.attrValue.primitive == "circle"){
        el.setAttribute("geometry",{primitive: "circle", radius: parseFloat($("#radius").val())});
        el.setAttribute("position",{x: parseFloat($("#x").val()), y: parseFloat($("#y").val()), z: el.getAttribute("position").z});
        el.setAttribute("material",{color: $("#color").val(), shader: "flat"});
        el.setAttribute("rotation",{x: 0, y: 0, z: parseFloat($("#rotation").val())});
    } else if (entity.components.geometry.attrValue.primitive == "plane"){
        el.setAttribute("geometry",{primitive: "plane", width: parseFloat($("#width").val()), height: parseFloat($("#height").val())});
        el.setAttribute("position",{x: parseFloat($("#x").val()), y: parseFloat($("#y").val()), z: el.getAttribute("position").z});
        el.setAttribute("material",{color: $("#color").val(), shader: "flat"});
        el.setAttribute("rotation",{x: 0, y: 0, z: parseFloat($("#rotation").val())});
    }/* else if ($("#entity :selected").text() == "triangle"){
        el.setAttribute("id","triangle"+triangleNum++);
        el.setAttribute("geometry",{primitive: "circle", radius: 0.5});
        el.setAttribute("position",{x: 0, y: 0, z: -1});
    }*/

}

function setSelectedEntity(){
    entity = selectedEntity;
    x.value = entity.components.position.attrValue.x;
    y.value = entity.components.position.attrValue.y;
    rotation.value = entity.components.rotation.attrValue.z;
    color.value = entity.components.material.attrValue.color;
    if(entity.components.geometry.attrValue.primitive == "plane"){
        width.value = entity.components.geometry.attrValue.width;
        height.value = entity.components.geometry.attrValue.height;
    } else {
        radius.value = entity.components.geometry.attrValue.radius;
    }
}
var tmp = null;
function sendBack(isback){
    entity = selectedEntity;
    if(isback){
        selected = els.indexOf(selectedEntity);
        if (selected != 0) {
            /* swap z values */
            tmp = els[selected].getAttribute("position").z;

            els[selected].getAttribute("position").z = els[selected-1].getAttribute("position").z;
            els[selected-1].getAttribute("position").z = tmp;

                /* swap position in el arr (this preserves the layering order) */
                
            tmp = els[selected];
            els[selected] = els[selected-1];
            els[selected-1] = tmp;
            console.log(els[selected-1].getAttribute("position").z);
            console.log(els[selected].getAttribute("position").z);
        }
    } else {
        selected = els.indexOf(selectedEntity);
        if (selected != els.length-1) {
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

const jsonData = {};
function saveScene(){
    els.forEach(element => jsonData[element.id]={geometry: element.components.geometry.attrValue, position: element.components.position.attrValue, material: element.components.material.attrValue, rotation: element.components.rotation.attrValue});
    var blob = new Blob([JSON.stringify(jsonData)],
    { type: "text/plain;charset=utf-8" });
    saveAs(blob, "scene.JSON");
}

scene_input.addEventListener("change", function() {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
        fileContent = JSON.parse(reader.result);
        entityLoader();
    });
    reader.readAsText(this.files[0]);
    
});

function entityLoader(){
    Object.keys(fileContent).forEach(key => {
        console.log(key);
        el = document.createElement("a-entity");
        if(key.includes("circle")){
            el.setAttribute("id","circle"+circleNum++);
        } else if(key.includes("plane")){
            el.setAttribute("id","plane"+planeNum++);
        }
        el.setAttribute("geometry", fileContent[key].geometry);
        el.setAttribute("position", {x: fileContent[key].position.x, y: fileContent[key].position.y, z: -1+(0.0000015*numAdded++)});
        el.setAttribute("material", {color: fileContent[key].material.color, shader: "flat"});
        el.setAttribute("rotation", fileContent[key].rotation);
        el.setAttribute("click-checker","");
        entityCanvas.appendChild(el);
        selectedEntity = scene.querySelector("#"+el.getAttribute("id"));
        var option = document.createElement("option");
        option.text = el.getAttribute("id");
        entitySelector.add(option);
        setSelectedEntity();
        els.push(el);
      });
}