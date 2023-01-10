var defaultStr = "default"
/* saves scene in JSON format */
function saveScene(){
    const jsonData = {};
    jsonData["sky"] = {skyColor: sky.getAttribute("material").color};
    //jsonData["uploadedTextureFormat"] = uploadedTextureFormat;
    let i = 0;
    let arr = [];
    let data = {scenes: {}, textures: {uploadedTextureFormats: {}, textureValues: []}, date: ""}
    while(i < texture.options.length){
        arr.push({val: texture.options[i].value, text: texture.options[i].text});
        i++;
    }
    data["textures"]['textureValues'] = arr;
    data["textures"]['uploadedTextureFormats'] = uploadedTextureFormat;
    els.forEach(element => { 
        if(element.id.includes("gradient") || element.id.includes("grille")){
            jsonData[element.id] = {angle: element.components.angle.attrValue, numBars: element.children.length, childGeometry: element.children[0].components.geometry.attrValue, position: element.components.position.attrValue, material: element.components.material.attrValue, rotation: element.components.rotation.attrValue};
        } else if(element.id.includes("checkerboard")){
            jsonData[element.id] = {angle: element.components.angle.attrValue, rows: element.children.length, cols: element.children[0].children.length, tileSize: element.children[0].children[0].components.geometry.attrValue.width, position: element.components.position.attrValue, material: element.components.material.attrValue, rotation: element.components.rotation.attrValue};
        } else if(element.id.includes("plane")){
            jsonData[element.id] = {angle: element.components.angle.attrValue, widthReal: (element.children.length == 0 ? element.components.geometry.attrValue.width : element.children[2].components.geometry.attrValue.width),fill: element.components.fill.attrValue, geometry: element.components.geometry.attrValue, position: element.components.position.attrValue, material: element.components.material.attrValue, rotation: element.components.rotation.attrValue};
        } else if(element.id.includes("circle")){
            jsonData[element.id]={angle: element.components.angle.attrValue, geometry: element.components.geometry.attrValue, fill: element.components.fill.attrValue, position: element.components.position.attrValue, material: element.components.material.attrValue, rotation: element.components.rotation.attrValue};
        } else {
            jsonData[element.id]={angle: element.components.angle.attrValue, geometry: element.components.geometry.attrValue, position: element.components.position.attrValue, material: element.components.material.attrValue, rotation: element.components.rotation.attrValue};
        }});
        
        data['scenes'][patternDisplay.value] = jsonData
        data['date'] = new Date().toLocaleString();
        var blob = new Blob([JSON.stringify(data, null, '\t')],
        { type: "text/plain;charset=utf-8" });
        saveAs(blob, patternDisplay.value+".JSON");
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
        contentFile = JSON.parse(reader.result);
        entityLoader(contentFile,scene_input.value.split("\\")[2].split(".")[0],true); /* loads all entities to scene */
    });
    reader.readAsText(this.files[0]);
    
});

function getExtension(filename) {
    var parts = filename.split('.');
    return parts[parts.length - 1];
  }

/* loads entities from JSON to scene */
function entityLoader(fileContent,name,def){
    let skip = false;
    if(Object.keys(fileContent).length == 0){
        alert("Cannot parse file");
    }
    Object.keys(fileContent).forEach(key => {
        if (/*!key.includes("uploadedTextureFormat") && */!key.includes("texture") && !key.includes("sky") && !key.includes("circle") && !key.includes("plane") && !key.includes("triangle") && !key.includes("gradient") && !key.includes("checkerboard") && !key.includes("grille")){
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
                $('#skyCol').minicolors('value', fileContent[key].skyColor);
            } else if (key.includes("texture")){
                let i = 0;
                $("#texture").empty();
                while( i < fileContent[key].vals.length){
                    var option = document.createElement("option"); 
                    option.text = fileContent[key].vals[i].text;
                    option.value = fileContent[key].vals[i].val;
                    texture.add(option);
                    i++;
                }
            } /*else if (key.includes("uploadedTextureFormat")){
                uploadedTextureFormat = fileContent[key];
            }*/ else {
                el = document.createElement("a-entity"); /* create entity */
                if(key.includes("circle")){ /* circle exclusive */
                    el.setAttribute("id","circle"+circleNum++);
                    el.setAttribute("geometry", fileContent[key].geometry);
                    el.setAttribute("fill",fileContent[key].fill);
                } else if(key.includes("plane")){ /* plane exclusive */
                    el.setAttribute("id","plane"+planeNum++);
                    el.setAttribute("geometry", fileContent[key].geometry);
                    drawPlaneBorder(fileContent[key].widthReal,fileContent[key].geometry.height,fileContent[key].fill.val,hexToRgb(fileContent[key].material.color),el);
                    el.setAttribute("fill",fileContent[key].fill);
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
                el.setAttribute("angle", {x: fileContent[key].angle.x});
                el.setAttribute("position", {x: fileContent[key].position.x, y: fileContent[key].position.y, z: fileContent[key].position.z});
                el.setAttribute("material", fileContent[key].material);
                el.setAttribute("rotation", fileContent[key].rotation);
                el.setAttribute("click-checker","");
                numAdded++;
                entityCanvas.appendChild(el); /* adds entity to scene */

                /* adds option to dropdown */
                var option = document.createElement("option");
                option.text = el.getAttribute("id");
                entitySelector.add(option);

                els.push(el);/* adds entity to list of created entities */
                pool.push(el.object3D);
                
            }
            
        }

      });
      if(def){
                    
        let len = pattern.childElementCount
        let i = 0;
        const obj = scenes[defaultStr]
        scenes[name] = obj;
        delete scenes[defaultStr];
        while(i < len){
            if(pattern.children[i].text == defaultStr){
                pattern.children[i].text = name
                pattern.children[i].value = name
            }
            i++;
        }

        len = patternDisplay.childElementCount
        i = 0;
        while(i < len){
            if(patternDisplay.children[i].text == defaultStr){
                patternDisplay.children[i].text = name
                patternDisplay.children[i].value = name
                defaultStr = name
            }
            i++;
        }
        scenes[name] = fileContent
    }
    
}

function saveSelected(){
    let data = {scenes: {}, textures: {uploadedTextureFormats: {}, textureValues: []}, date: ""}
    let i = 0;
    let len = patternDisplay.options.length
    textures = []
    while(i < texture.options.length){
        textures.push({val: texture.options[i].value, text: texture.options[i].text});
        i++;
    }
    i = 0;
    while(i < len){
        data['scenes'][patternDisplay.options[i].text] = scenes[[patternDisplay.options[i].text]]
        i++;
    }
    data['textures']['textureValues'] = textures
    data['textures']['uploadedTextureFormats'] = uploadedTextureFormat
    data['date'] = new Date().toLocaleString();
    var blob = new Blob([JSON.stringify(data, null, '\t')],
    { type: "text/plain;charset=utf-8" });
    saveAs(blob, "pattern_package.JSON");
}
