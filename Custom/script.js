const scene = document.querySelector("a-scene");
const entityCanvas = scene.querySelector("#entityCanvas");
const x = document.getElementById("x");
const y = document.getElementById("y");
const z = document.getElementById("z");
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
/*var triangleNum = 0*/


function selectNew(){
    selectedEntity = scene.querySelector("#"+$("#entityId :selected").text());
    console.log(selectedEntity);
    e1.style.display = "none";
    e2.style.display = "none";
    e3.style.display = "none";
    e4.style.display = "none";
    e5.style.display = "none";
    e6.style.display = "none";
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
        e1.style.display = "block";
        e2.style.display = "block";
        e6.style.display = "block";
        a1.style.display = "none";
        a2.style.display = "none";
    } else {
        entitySelectorText.style.display = "none";
        e1.style.display = "none";
        e2.style.display = "none";
        e3.style.display = "none";
        e4.style.display = "none";
        e5.style.display = "none";
        e6.style.display = "none";
        a1.style.display = "block";
        a2.style.display = "block";
    }
}

function addEntity(){
    el = document.createElement('a-entity');
    if($("#entity :selected").text() == "circle"){
        el.setAttribute("id","circle"+circleNum++);
        el.setAttribute("geometry",{primitive: "circle", radius: 0.25});
        el.setAttribute("position",{x: 0, y: 0, z: -1});
        el.setAttribute("material", {color: "#FFFFFF"});
    } else if ($("#entity :selected").text() == "plane"){
        el.setAttribute("id","plane"+planeNum++);
        el.setAttribute("geometry",{primitive: "plane", width: .25, height: 0.5});
        el.setAttribute("position",{x: 0, y: 0, z: -1});
        el.setAttribute("material", {color: "#FFFFFF"});
    }/* else if ($("#entity :selected").text() == "triangle"){
        el.setAttribute("id","triangle"+triangleNum++);
        el.setAttribute("geometry",{primitive: "circle", radius: 0.5});
        el.setAttribute("position",{x: 0, y: 0, z: -1});
    }*/
    entityCanvas.appendChild(el);
    selectedEntity = scene.querySelector("#"+el.getAttribute("id"));
    var option = document.createElement("option");
    option.text = el.getAttribute("id");
    entitySelector.add(option);
    setSelectedEntity();
}

function editEntity(){
    let el = selectedEntity;
    if(entity.components.geometry.attrValue.primitive == "circle"){
        el.setAttribute("geometry",{primitive: "circle", radius: parseFloat($("#radius").val())});
        el.setAttribute("position",{x: parseFloat($("#x").val()), y: parseFloat($("#y").val()), z: parseFloat($("#z").val())});
    } else if (entity.components.geometry.attrValue.primitive == "plane"){
        el.setAttribute("geometry",{primitive: "plane", width: parseFloat($("#width").val()), height: parseFloat($("#height").val())});
        el.setAttribute("position",{x: parseFloat($("#x").val()), y: parseFloat($("#y").val()), z: parseFloat($("#z").val())});
    }/* else if ($("#entity :selected").text() == "triangle"){
        el.setAttribute("id","triangle"+triangleNum++);
        el.setAttribute("geometry",{primitive: "circle", radius: 0.5});
        el.setAttribute("position",{x: 0, y: 0, z: -1});
    }*/

}

function setSelectedEntity(){
    entity = selectedEntity;
    x.value = entity.components.position.attrValue.x;
    y.value = entity.components.position.attrValue.x;
    z.value = entity.components.position.attrValue.z;
    color.value = entity.components.material.attrValue.color;
    if(entity.components.geometry.attrValue.primitive == "plane"){
        width.value = entity.components.geometry.attrValue.width;
        height.value = entity.components.geometry.attrValue.height;
    } else {
        radius.value = entity.components.geometry.attrValue.radius;
    }
}