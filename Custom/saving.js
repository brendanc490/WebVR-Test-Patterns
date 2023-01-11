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
        entityLoader(contentFile,scene_input.value.split("\\")[2].split(".")[0],true,true); /* loads all entities to scene */
    });
    reader.readAsText(this.files[0]);
    
});

function getExtension(filename) {
    var parts = filename.split('.');
    return parts[parts.length - 1];
  }

/* loads entities from JSON to scene */
function entityLoader(fileContent,name,def,isSingle){
    let skip = false;
    if(Object.keys(fileContent).length == 0){
        alert("Cannot parse file");
        if(isSingle){
            scene_input.value = "";
        } else {
            scene_display_input.value = ""
        }
        return;
    }
    Object.keys(fileContent).forEach(key => {
        if (!key.includes("scenes") && !key.includes("textures") &&  !key.includes("date")){
            alert("Cannot parse file");
            if(isSingle){
                scene_input.value = "";
            } else {
                scene_display_input.value = ""
            }
            skip = true;
        }
    });
    if(skip){
        return;
    }
    if(isSingle && Object.keys(fileContent['scenes']).length != 1){
        alert("Cannot parse file, more than one scene detected");
        scene_input.value = "";
        return;
    } else if(isSingle && Object.keys(fileContent['scenes']).length == 1){
        addEntitiesFromScene(fileContent['scenes'][Object.keys(fileContent['scenes'])[0]])
        updateJSON()
    } else if(!isSingle){
        Object.keys(fileContent['scenes']).forEach(key => {
            addEntitiesFromScene(fileContent['scenes'][key])
        })
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
    /*Object.keys(fileContent).forEach(key => {
        if (!key.includes("texture") && !key.includes("sky") && !key.includes("circle") && !key.includes("plane") && !key.includes("triangle") && !key.includes("gradient") && !key.includes("checkerboard") && !key.includes("grille")){
            alert("Cannot parse file");
            scene_input.value = "";
            skip = true;
        }
    });*/
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
    while(i < fileContent['textures']['textureValues'].length){
        uploadedTextures.push(fileContent['textures']['textureValues'][i].text)
        i++;
    }
    newTextures = [...new Set([...uploadedTextures,...currTextures])]
    newTextures.forEach(text => {
        var option = document.createElement("option"); 
        if(uploadedTextures.indexOf(text) != -1 && currTextures.indexOf(text) == -1){
            option.text = fileContent['textures']['textureValues'][uploadedTextures.indexOf(text)].text
            option.value = fileContent['textures']['textureValues'][uploadedTextures.indexOf(text)].val
            texture.add(option);
        }
        

    })

    newUploadedTextureFormat = [...new Set([...Object.keys(uploadedTextureFormat),...Object.keys(fileContent['textures']['uploadedTextureFormats'])])]
    tmp = {}
    newUploadedTextureFormat.forEach(texture => {
        if(Object.keys(uploadedTextureFormat).indexOf(texture) != -1){
            tmp[texture] = uploadedTextureFormat[texture]
        } else {
            tmp[texture] = fileContent['textures']['uploadedTextureFormats'][texture]
        }
    });
    uploadedTextureFormat = tmp
}

function addEntitiesFromScene(scene){
    console.log(scene)
    Object.keys(scene).forEach(key => {
        console.log(key)
        if(key.includes("sky")){
            sky.setAttribute("material",{color: scene[key].skyColor});
            $('#skyCol').minicolors('value', scene[key].skyColor);
        } else if (key.includes("texture")){
            let i = 0;
            $("#texture").empty();
            while( i < scene[key].vals.length){
                var option = document.createElement("option"); 
                option.text = scene[key].vals[i].text;
                option.value = scene[key].vals[i].val;
                texture.add(option);
                i++;
            }
        } /*else if (key.includes("uploadedTextureFormat")){
            uploadedTextureFormat = fileContent[key];
        }*/ else {
            el = document.createElement("a-entity"); /* create entity */
            if(key.includes("circle")){ /* circle exclusive */
                el.setAttribute("id","circle"+circleNum++);
                el.setAttribute("geometry", scene[key].geometry);
                el.setAttribute("fill",scene[key].fill);
            } else if(key.includes("plane")){ /* plane exclusive */
                el.setAttribute("id","plane"+planeNum++);
                el.setAttribute("geometry", scene[key].geometry);
                drawPlaneBorder(scene[key].widthReal,scene[key].geometry.height,scene[key].fill.val,hexToRgb(scene[key].material.color),el);
                el.setAttribute("fill",scene[key].fill);
            } else if(key.includes("triangle")){ /* triangle exclusive */
                el.setAttribute("id","triangle"+triangleNum++);
                el.setAttribute("geometry", scene[key].geometry);
            } else if (key.includes("gradient")){
                el.setAttribute("id", "gradient"+gradientNum++);
                drawGradient(scene[key].childGeometry.width,scene[key].childGeometry.height,scene[key].numBars,hexToRgb(scene[key].material.color),el);
            } else if (key.includes("grille")){
                el.setAttribute("id", "grille"+grilleNum++);
                drawGrille(scene[key].childGeometry.width,scene[key].childGeometry.height,scene[key].numBars,hexToRgb(scene[key].material.color),el);
            } else if (key.includes("checkerboard")){
                el.setAttribute("id", "checkerboard"+checkerboardNum++);
                drawCheckerboard(scene[key].rows,scene[key].cols,scene[key].tileSize,hexToRgb(scene[key].material.color),el);
            }
            /* sets stats */
            el.setAttribute("angle", {x: scene[key].angle.x});
            el.setAttribute("position", {x: scene[key].position.x, y: scene[key].position.y, z: scene[key].position.z});
            el.setAttribute("material", scene[key].material);
            el.setAttribute("rotation", scene[key].rotation);
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
    })
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
