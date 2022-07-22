/* saves scene in JSON format */
function saveScene(){
    const jsonData = {};
    jsonData["sky"] = {skyColor: sky.getAttribute("material").color};
    els.forEach(element => { 
        if(element.id.includes("gradient") || element.id.includes("grille")){
            jsonData[element.id] = {numBars: element.children.length, childGeometry: element.children[0].components.geometry.attrValue, position: element.components.position.attrValue, material: element.components.material.attrValue, rotation: element.components.rotation.attrValue};
        } else if(element.id.includes("checkerboard")){
            jsonData[element.id] = {rows: element.children.length, cols: element.children[0].children.length, tileSize: element.children[0].children[0].components.geometry.attrValue.width, position: element.components.position.attrValue, material: element.components.material.attrValue, rotation: element.components.rotation.attrValue};
        } else if(element.id.includes("plane")){
            jsonData[element.id] = {widthReal: element.components.geometry.attrValue.width ,fill: ((element.children[0].components.geometry.attrValue.width*2)/element.children[2].components.geometry.attrValue.width)*((element.children[0].components.geometry.attrValue.width*2)/element.children[2].components.geometry.attrValue.width)*100, geometry: element.components.geometry.attrValue, position: element.components.position.attrValue, material: element.components.material.attrValue, rotation: element.components.rotation.attrValue};
        } else {
            jsonData[element.id]={geometry: element.components.geometry.attrValue, position: element.components.position.attrValue, material: element.components.material.attrValue, rotation: element.components.rotation.attrValue};
        }});
            
        var blob = new Blob([JSON.stringify(jsonData)],
        { type: "text/plain;charset=utf-8" });
        saveAs(blob, "scene.JSON");
}

/* if JSON is uploaded */
scene_input.addEventListener("change", function() {
    if(scene_input.value.split(".")[1] != "JSON"){
        alert("Invalid file type");
        scene_input.value = "";
        return;
    }
    const reader = new FileReader();
    reader.addEventListener("load", () => {
        fileContent = JSON.parse(reader.result);
        entityLoader(); /* loads all entities to scene */
    });
    reader.readAsText(this.files[0]);
    
});

function getExtension(filename) {
    var parts = filename.split('.');
    return parts[parts.length - 1];
  }

/* loads entities from JSON to scene */
function entityLoader(){
    let skip = false;
    Object.keys(fileContent).forEach(key => {
        if (!key.includes("sky") && !key.includes("circle") && !key.includes("plane") && !key.includes("triangle") && !key.includes("gradient") && !key.includes("checkerboard") && !key.includes("grille")){
            alert("Cannot parse file");
            scene_input.value = "";
            skip = true;
        }
    });
    if(skip){
        return;
    }
    /* for each entity desired */
    Object.keys(fileContent).forEach(key => {
        if(!skip){
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
                    drawPlaneBorder(fileContent[key].widthReal,fileContent[key].geometry.height,fileContent[key].fill,hexToRgb(fileContent[key].material.color),el);
                } else if(key.includes("triangle")){ /* triangle exclusive */
                    el.setAttribute("id","triangle"+triangleNum++);
                    el.setAttribute("geometry", fileContent[key].geometry);
                } else if (key.includes("gradient")){
                    el.setAttribute("id", "gradient"+gradientNum++);
                    drawGradient(fileContent[key].childGeometry.width,fileContent[key].childGeometry.height,fileContent[key].numBars,hexToRgb(fileContent[key].material.color),el);
                } else if (key.includes("grille")){
                    el.setAttribute("id", "grille"+grilleNum++);
                    drawGrille(fileContent[key].childGeometry.width,fileContent[key].childGeometry.height,fileContent[key].numBars,hexToRgb(fileContent[key].material.color),el);
                } else if (key.includes("checkerboard")){
                    el.setAttribute("id", "checkerboard"+checkerboardNum++);
                    drawCheckerboard(fileContent[key].rows,fileContent[key].cols,fileContent[key].tileSize,hexToRgb(fileContent[key].material.color),el);
                }
                /* sets stats */
                
                el.setAttribute("position", {x: fileContent[key].position.x, y: fileContent[key].position.y, z: -1+(0.00005*numAdded++)});
                el.setAttribute("material", fileContent[key].material);
                el.setAttribute("rotation", fileContent[key].rotation);
                el.setAttribute("click-checker","");

                entityCanvas.appendChild(el); /* adds entity to scene */

                /* adds option to dropdown */
                var option = document.createElement("option");
                option.text = el.getAttribute("id");
                entitySelector.add(option);

                els.push(el);/* adds entity to list of created entities */
            }
        }
      });
}