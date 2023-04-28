/*
    Contains functions that are integral to the utility of the tool.
    These include click checking, removing entitities, changing the currently displayed scene, resetting the scene and more.
*/

/* selects a new entity for editing*/
function selectNew(clickedEntity){
    /* Check if entity was clicked on or selected via dropdown */
    if(clickedEntity != null){ /* if clicked */
        selectedEntity = clickedEntity; /* updated selected entity */
        entitySelector.value = clickedEntity.getAttribute("id"); /* update dropdown */
    } else { /* if selected via dropdown */
    
        selectedEntity = scene.querySelector("#"+$("#entityId :selected").text()); /* update selected entity */
    }
    advanced.checked = selectedEntity.getAttribute('advanced').val
    /* Update stats in edit section */
    hideEditStats(); /* hide section briefly */
    updateStats(); /* update stats */
    toggleAddEdit(null); /* re-display section */
    highlightSelection(selectedEntity);
}

/* Removes current entity */
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

function duplicateEntity(){
    // get entity id and increment by 1
    key = selectedEntity.getAttribute("id");
    el = document.createElement("a-entity"); /* create entity */
    if(key.includes("circle")){ /* circle exclusive */
        el.setAttribute("id","circle"+circleNum++);
        el.setAttribute("geometry", scenes[patternDisplay.value][key].geometry);
        el.setAttribute("fill",scenes[patternDisplay.value][key].fill);
    } else if(key.includes("plane")){ /* plane exclusive */
        el.setAttribute("id","plane"+planeNum++);
        el.setAttribute("geometry", scenes[patternDisplay.value][key].geometry);
        if(scenes[patternDisplay.value][key].material.src == ""){
            drawPlaneBorder(scenes[patternDisplay.value][key].widthReal,scenes[patternDisplay.value][key].geometry.height,scenes[patternDisplay.value][key].fill.val,hexToRgb(scenes[patternDisplay.value][key].material.color),el);
        }   
        el.setAttribute("fill",scenes[patternDisplay.value][key].fill);
    } else if(key.includes("triangle")){ /* triangle exclusive */
        el.setAttribute("id","triangle"+triangleNum++);
        el.setAttribute("geometry", scenes[patternDisplay.value][key].geometry);
    } else if (key.includes("gradient")){
        el.setAttribute("id", "gradient"+gradientNum++);
        drawGradient(scenes[patternDisplay.value][key].childGeometry.width,scenes[patternDisplay.value][key].childGeometry.height,scenes[patternDisplay.value][key].numBars,hexToRgb(scenes[patternDisplay.value][key].material.color),hexToRgb(scenes[patternDisplay.value][key].color2.val),el);
        el.setAttribute('color2',scenes[patternDisplay.value][key].color2)
    } else if (key.includes("grille")){
        el.setAttribute("id", "grille"+grilleNum++);
        drawGrille(scenes[patternDisplay.value][key].childGeometry.width,scenes[patternDisplay.value][key].childGeometry.height,scenes[patternDisplay.value][key].numBars,scenes[patternDisplay.value][key].material.color,scenes[patternDisplay.value][key].color2.val,el);
        el.setAttribute('color2',scenes[patternDisplay.value][key].color2)
    } else if (key.includes("checkerboard")){
        el.setAttribute("id", "checkerboard"+checkerboardNum++);
        drawCheckerboard(scenes[patternDisplay.value][key].rows,scenes[patternDisplay.value][key].cols,scenes[patternDisplay.value][key].tileSize,scenes[patternDisplay.value][key].material.color,scenes[patternDisplay.value][key].color2.val,el);
        el.setAttribute('color2',scenes[patternDisplay.value][key].color2)
    }
    /* sets stats */
    el.setAttribute("angle", scenes[patternDisplay.value][key].angle);
    el.setAttribute("advanced", scenes[patternDisplay.value][key].advanced);
    el.setAttribute("position", {x: scenes[patternDisplay.value][key].position.x, y: scenes[patternDisplay.value][key].position.y, z: scenes[patternDisplay.value][key].position.z});
    el.setAttribute("material", scenes[patternDisplay.value][key].material);
    el.setAttribute("rotation", scenes[patternDisplay.value][key].rotation);
    el.setAttribute("click-checker","");
    numAdded++;
    entityCanvas.appendChild(el); /* adds entity to scene */

    /* adds option to dropdown */
    var option = document.createElement("option");
    option.text = el.getAttribute("id");
    entitySelector.add(option);

    els.push(el);/* adds entity to list of created entities */
    pool.push(el.object3D);
    setTimeout(() => {  selectNew(el) }, 10);
}

/* handles changes in selected pattern */
var displayOrder = ['default'];
function handlePatternSelect(snapshot){
    curr = snapshot.id
    if(displayOrder.indexOf(curr) == -1){
        displayOrder.push(curr)
    } else {
        displayOrder.splice(displayOrder.indexOf(curr),1)
    }
    while(patternDisplay.options.length != 0){
        patternDisplay.options.remove(patternDisplay.options[0])
    }
    patternDisplay.selectedIndex = 0
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

/* displays current pattern selected */
function displayCurrentPattern(snapshot){
    let len = snapshot.options.length;
    let i = 0;
    let sum = 0;
    while(i < len){
        curr = snapshot.options[i]
        if(curr.selected){
           /* display pattern */
            revertChanges()
            addEntitiesFromScene(scenes[curr.text]);
        } 
        i++;
    }
}

/* resets current scene */
function resetScene(){
    planeNum = 0;
    circleNum = 0;
    triangleNum = 0;
    gradientNum = 0;
    checkerboardNum = 0;
    grilleNum = 0;
    while(entityCanvas.childElementCount != 0){
        entityCanvas.removeChild(entityCanvas.children[0])
    } 
    while(entitySelector.childElementCount != 0){
        entitySelector.remove(entitySelector.children[0])
   }
    $('#skyCol').minicolors('value', '#000000');
    els = []
    updateJSON()
}

/* used to click through current pattern */
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

/* adds a pattern to pattern list */
function addPattern(){
    if(scenes[nameIn.value] != null){
        alert('A pattern with this name already exists');
        return;
    }
    currName = ''
    if(Object.keys(names).indexOf(nameIn.value) == -1){
        names[nameIn.value] = 1
        currName = nameIn.value
    } else {
        names[nameIn.value] = names[nameIn.value] + 1
        currName = nameIn.value+''+names[nameIn.value]
    }
    scenes[currName] = {sky: {skyColor: '#000000'}}
    var toggle_button = '<p><input type="checkbox" id="'+currName+'" name="'+currName+'" onclick="handlePatternSelect(this)"/>\
        <label for="'+currName+'">'+currName+'</label></p>';
    $('#patternList').append(toggle_button)
    //pattern.options.add(new Option(nameIn.value, nameIn.value))
}

/* removes current pattern from pattern list */
function removePattern(){
    revertChanges()
    delete scenes[patternDisplay.value]
    let i = 0;
    while(i < patternList.childElementCount){
        if(patternList.children[i].children[0].id == patternDisplay.value){
            patternList.removeChild(patternList.children[i])
            i = patternList.childElementCount
            displayOrder.splice(displayOrder.indexOf(patternDisplay.value),1);
        }
        i++;
    }
    patternDisplay.options.remove(patternDisplay.selectedIndex)
}

/* function used to remove changes made to a scene */
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

/* listens for key presses to change pattern */
document.addEventListener('keyup', (e) => {
    if (e.code === "ArrowUp"){
        if(($(document.activeElement)[0].id != 'patternDisplay'  && boolAddEdit == false)  || block == false){
            displayNext(false)
        }
    } else if (e.code === "ArrowDown"){
        if(($(document.activeElement)[0].id != 'patternDisplay'  && boolAddEdit == false)  || block == false){
            displayNext(true)
        }
    }
  });

names = {'default':1,'red':1,'green':1,'blue':1,'white':1,'grille':1}
var colorChange = true;

/* handles switches to advanced mode */
val = false;
function switchToAdvanced(switchVal){
    newVal = !selectedEntity.getAttribute('advanced').val
    selectedEntity.setAttribute('advanced', {val: newVal});
    updateStats()
    editEntity()
  }

/* listens for entering vr and removes restrictions on clicking through patterns */
scene.addEventListener('enter-vr',function(){
    block = false;
  });

/* listens for exiting vr and restricts clicking through patterns */
scene.addEventListener('exit-vr',function(){
    block = true;
    toggleAddEdit(false);
  });

function highlightSelection(ent){
    if(block){
        return
    }
    newPos = {x: 0, y: 0, z: -50};
    if(ent.id.includes("plane")){
        newGeom = {primitive: 'plane', width: ent.getAttribute('geometry').width*1.5, height: ent.getAttribute('geometry').height*1.5};
    } else if(selectedEntity.id.includes("circle")){
        newGeom = {primitive: 'ring', radiusOuter: ent.getAttribute('geometry').radiusOuter*1.5, radiusInner: 0};
    } else if(selectedEntity.id.includes("triangle")){
        newGeom = {primitive: 'triangle', vertexA: {x: ent.getAttribute('geometry').vertexA.x*1.5 ,y: ent.getAttribute('geometry').vertexA.y*1.5 ,z: ent.getAttribute('geometry').vertexA.z*1.5}, vertexB: {x: ent.getAttribute('geometry').vertexB.x*1.5 ,y: ent.getAttribute('geometry').vertexB.y*1.5 ,z: ent.getAttribute('geometry').vertexB.z*1.5}, vertexC: {x: ent.getAttribute('geometry').vertexC.x*1.5 ,y: ent.getAttribute('geometry').vertexC.y*1.5 ,z: ent.getAttribute('geometry').vertexC.z*1.5}};
    } else if(selectedEntity.id.includes("checkerboard")){
        rowNum = ent.children.length;
        colNum = ent.children[0].children.length;
        tileSizeNum = ent.children[0].children[0].components.geometry.attrValue.width;
        newGeom = {primitive: 'plane', width: colNum*tileSizeNum*1.5, height: rowNum*tileSizeNum*1.5};
    } else if(selectedEntity.id.includes("gradient")){
        let width = ent.children[0].components.geometry.attrValue.width;
        let height = ent.children[0].components.geometry.attrValue.height;
        let numBars = ent.children.length;
        newGeom = {primitive: 'plane', width: width*numBars*1.25, height: height*1.5};
    } else if(selectedEntity.id.includes("grille")){
        let width = selectedEntity.children[0].components.geometry.attrValue.width;
        let height = selectedEntity.children[0].components.geometry.attrValue.height;
        let numBars = selectedEntity.children.length;
        newGeom = {primitive: 'plane', width: width*numBars*1.25, height: height*1.5};
    }
    tmp = document.createElement('a-entity');
    tmp.setAttribute('id','tmp')
    tmp.setAttribute("geometry",newGeom);
    tmp.setAttribute('position',newPos);
    tmp.setAttribute("material", {shader: "flat", color: "#FFFF00"});
    ent.appendChild(tmp);
    setTimeout(() => {
        let i = selectedEntity.children.length-1;
        while (i >= 0) {
            if(selectedEntity.children[i].getAttribute('id') == 'tmp'){
                selectedEntity.children[i].parentNode.removeChild(selectedEntity.children[i]);
                i--;
            }
            i--;
        }
    }, 1000);


}

function renamePattern(){
    oldName = patternDisplay.value
    currScene = scenes[patternDisplay.value]
    currName = ''
    if(Object.keys(names).indexOf(nameIn.value) == -1){
        names[nameIn.value] = 1
        currName = nameIn.value
    } else {
        names[nameIn.value] = names[nameIn.value] + 1
        currName = nameIn.value+''+names[nameIn.value]
    }
    scenes[currName] = currScene
    delete scenes[oldName]

    displayOrder[displayOrder.indexOf(oldName)] = currName

    var opt = patternDisplay.options[patternDisplay.selectedIndex];
     opt.value =  currName;
     opt.text = currName;

    label = document.querySelector('label[for="'+oldName+'"]')
    label.setAttribute('for',currName)
    label.textContent = currName
}
