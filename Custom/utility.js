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
    if(selectedEntity == null){
        alert('No entities added');
        return
    }
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
    } else if(selectedEntity.id.includes("circularDotarray")){
        circularDotarrayNum--;
    } else if(selectedEntity.id.includes("dotarray")){
        dotarrayNum--;
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
    if(selectedEntity == null){
        alert('No entities added');
        return
    }
    // get entity id and increment by 1
    key = selectedEntity.getAttribute("id");
    el = document.createElement("a-entity"); /* create entity */
    if(key.includes("circle")){ /* circle exclusive */
        el.setAttribute("id","circle"+circleNum++);
        el.setAttribute("geometry", scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].textContent][key].geometry);
        el.setAttribute("fill",scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].textContent][key].fill);
    } else if(key.includes("plane")){ /* plane exclusive */
        el.setAttribute("id","plane"+planeNum++);
        el.setAttribute("geometry", scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].textContent][key].geometry);
        if(scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].textContent][key].material.src == ""){
            drawPlaneBorder(scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].textContent][key].widthReal,scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].textContent][key].geometry.height,scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].textContent][key].fill.val,hexToRgb(scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].textContent][key].material.color),el);
        }   
        el.setAttribute("fill",scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].textContent][key].fill);
    } else if(key.includes("triangle")){ /* triangle exclusive */
        el.setAttribute("id","triangle"+triangleNum++);
        el.setAttribute("geometry", scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].textContent][key].geometry);
    } else if (key.includes("gradient")){
        el.setAttribute("id", "gradient"+gradientNum++);
        drawGradient(scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].textContent][key].childGeometry.width,scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].textContent][key].childGeometry.height,scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].textContent][key].numBars,hexToRgb(scenes[patternDisplay.value][key].material.color),hexToRgb(scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].textContent][key].color2.val),el);
        el.setAttribute('color2',scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].textContent][key].color2)
    } else if (key.includes("grille")){
        el.setAttribute("id", "grille"+grilleNum++);
        drawGrille(scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].textContent][key].childGeometry.width,scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].textContent][key].childGeometry.height,scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].textContent][key].numBars,scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].textContent][key].material.color,scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].textContent][key].color2.val,el);
        el.setAttribute('color2',scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].textContent][key].color2)
    } else if (key.includes("checkerboard")){
        el.setAttribute("id", "checkerboard"+checkerboardNum++);
        drawCheckerboard(scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].textContent][key].rows,scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].textContent][key].cols,scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].textContent][key].tileSize,scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].textContent][key].material.color,scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].textContent][key].color2.val,el);
        el.setAttribute('color2',scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].textContent][key].color2)
    } else if (key.includes("circularDotarray")){
        el.setAttribute("id", "circularDotarray"+circularDotarrayNum++);
        drawCircularDotArray(scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].textContent][key].arraySpacing.val,scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].textContent][key].circles,scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].textContent][key].dots,scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].textContent][key].circleSize,scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].textContent][key].material.color,el);
        el.setAttribute("arraySpacing",scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].textContent][key].arraySpacing);
    } else if (key.includes("dotarray")){
        el.setAttribute("id", "dotarray"+dotarrayNum++);
        drawDotArray(scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].textContent][key].rows,scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].textContent][key].cols,scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].textContent][key].circleSize,scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].textContent][key].spacing.val,scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].textContent][key].material.color,el);
        el.setAttribute("arraySpacing",scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].textContent][key].spacing);
    } else if (key.includes("bullseye")){
        el.setAttribute("id", "bullseye"+bullseyeNum++);
        drawBullseye(scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].textContent][key].ringPitch,scenes[patternDisplay.value][key].numRings,scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].textContent][key].material.color,el);
    }

    /* sets stats */
    el.setAttribute("angle", scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].textContent][key].angle);
    el.setAttribute("advanced", scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].textContent][key].advanced);
    el.setAttribute("position", {x: scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].textContent][key].position.x, y: scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].textContent][key].position.y, z: scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].textContent][key].position.z});
    el.setAttribute("material", scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].textContent][key].material);
    el.setAttribute("rotation", scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].textContent][key].rotation);
    el.setAttribute("click-checker","");
    numAdded++;
    entityCanvas.appendChild(el); /* adds entity to scene */

    /* adds option to dropdown */
    var option = document.createElement("option");
    option.text = el.getAttribute("id");
    entitySelector.add(option);

    els.push(el);/* adds entity to list of created entities */
    pool.push(el.object3D);
    setTimeout(() => {  selectNew(el) }, 100);
}

/* handles changes in selected pattern */
//var displayOrder = ['default'];
/*function handlePatternSelect(snapshot){
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
}*/

/* displays current pattern selected */
/*function displayCurrentPattern(snapshot){
    let len = snapshot.options.length;
    let i = 0;
    let sum = 0;
    while(i < len){
        curr = snapshot.options[i]
        if(curr.selected){
            revertChanges()
            addEntitiesFromScene(scenes[curr.text]);
        } 
        i++;
    }
}*/

/* resets current scene */
function resetScene(){
    planeNum = 0;
    circleNum = 0;
    triangleNum = 0;
    gradientNum = 0;
    checkerboardNum = 0;
    grilleNum = 0;
    dotarrayNum = 0;
    circularDotarrayNum = 0;
    bullseyeNum = 0;
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
        if(isNaN(parseInt(patternList.getAttribute('selectedIndex')))){
            return
        }
        if(parseInt(patternList.getAttribute('selectedIndex')) == patternList.children.length-1){
            patternList.children[0].dispatchEvent(new Event('click',{target: patternList.children[parseInt(patternList.getAttribute('selectedIndex'))+1]}));
        } else {
            patternList.children[parseInt(patternList.getAttribute('selectedIndex'))+1].dispatchEvent(new Event('click',{target: patternList.children[parseInt(patternList.getAttribute('selectedIndex'))+1]}));
        }        
        
    } else {
        // left
        if(isNaN(parseInt(patternList.getAttribute('selectedIndex')))){
            return
        }
        if(parseInt(patternList.getAttribute('selectedIndex')) == 0){
            patternList.children[patternList.children.length-1].dispatchEvent(new Event('click',{target: patternList.children[parseInt(patternList.getAttribute('selectedIndex'))+1]}));
        } else {
            patternList.children[parseInt(patternList.getAttribute('selectedIndex'))-1].dispatchEvent(new Event('click',{target: patternList.children[parseInt(patternList.getAttribute('selectedIndex'))+1]}));
        }
        
    }
    
    $('#patternDisplay').trigger('change')
}

/* adds a pattern to pattern list */
function addPattern(){
    /*if(scenes[packageSelect.value][nameIn.value] != null){
        alert('A pattern with this name already exists');
        return;
    }*/
    if(nameIn.value.indexOf('(') > 0 || nameIn.value.indexOf(')') > 0){
        alert('A name cannot include parenthesis ()');
        return
    }
    currName = ''
    if(Object.keys(names[packageSelect.value]).indexOf(nameIn.value) == -1){
        names[packageSelect.value][nameIn.value] = 1
        currName = nameIn.value
    } else {
        currName = nameIn.value+' ('+names[packageSelect.value][nameIn.value]+')'
        names[packageSelect.value][nameIn.value] = names[packageSelect.value][nameIn.value] + 1
    }
    scenes[packageSelect.value][currName] = {sky: {skyColor: '#000000'}}
    var toggle_button = '<li id="'+currName+'">'+currName+'</li>';

    $('#items-list').append(toggle_button)
    
    item = document.getElementById(currName)
    $(item).prop('draggable', true)
    item.addEventListener('dragstart', dragStart)
    item.addEventListener('drop', dropped)
    item.addEventListener('dragenter', cancelDefault)
    item.addEventListener('dragover', cancelDefault)
    item.addEventListener('click',selectPattern)
    //pattern.options.add(new Option(nameIn.value, nameIn.value))
    
    patternList.scrollTo({
        top: 1000000000,
        left: 0,
        behavior: "smooth",
      });
      patternList.children[patternList.children.length-1].dispatchEvent(new Event('click',{target: patternList.children[parseInt(patternList.getAttribute('selectedIndex'))+1]}));
}

/* removes current pattern from pattern list */
function removePattern(){
    let i = 0;
    indices = []
    while(i < patternList.children.length){
        if(patternList.children[i].style.background == 'rgb(243, 152, 20)'){
            indices.push(i)
        }
        i++;
    }
    children = []
    revertChanges()
    indices.forEach(ind => {
        delete scenes[packageSelect.value][patternList.children[ind].textContent]
        if(names[packageSelect.value][patternList.children[ind].textContent] == 1){
            delete names[packageSelect.value][patternList.children[ind].textContent]
        }
        children.push(patternList.children[ind])
    })
    children.forEach(child =>{
        patternList.removeChild(child)
    })
    
}

/* function used to remove changes made to a scene */
function revertChanges(){
    sky.setAttribute('material',{color: '#000000'})
    while(entityCanvas.childElementCount != 0){
        entityCanvas.removeChild(entityCanvas.children[0])
       }
       /*while(entitySelector.childElementCount != 0){
            entitySelector.remove(entitySelector.children[0])
       }*/
        els = []
        pool = []
        circleNum = 0; /* number of circles created */
        planeNum = 0; /* number of planes created */
        triangleNum = 0; /* number of triangles created */
        gradientNum = 0; /* number of gradients created */
        checkerboardNum = 0; /* number of checkerboards created */
        grilleNum = 0;
        dotarrayNum = 0;
        circularDotarrayNum = 0;
        bullseyeNum = 0;
        textureNum = 0;
        numAdded = 0;
}

names = {'default' : {'red':1,'green':1,'blue':1,'white':1,'grille':1,'crosshair':1,'line':1,'circular dot array':1,'dot array':1,'checkerboard (w)':1,'checkerboard (b)':1,'ring_w5':1,'ring_w10':1,'ring_w20':1,'bullseye':1}}
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
    if(isNaN(parseInt(patternList.getAttribute('selectedIndex')))){
        alert('No scene is selected, please exit immersive mode and select a scene.')
    }
    
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
    newPos = {x: 0, y: 0, z: -5};
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
    } else if(selectedEntity.id.includes("circularDotarray")){
        //tileSizeNum = ent.children[0].children[0].components.geometry.attrValue.width;
        newGeom = {primitive: 'ring', radiusOuter: ent.children[0].components.geometry.attrValue.radiusOuter*1.5, radiusInner: 0};
    } else if(selectedEntity.id.includes("dotarray")){
        rowNum = ent.children.length;
        colNum = ent.children[0].children.length;
        //tileSizeNum = ent.children[0].children[0].components.geometry.attrValue.width;
        newGeom = {primitive: 'ring', radiusOuter: ent.children[0].children[0].components.geometry.attrValue.radiusOuter*1.5, radiusInner: 0};
    }  else if(selectedEntity.id.includes("bullseye")){
        rowNum = ent.children.length;
        colNum = ent.children[0].children.length;
        //tileSizeNum = ent.children[0].children[0].components.geometry.attrValue.width;
        newGeom = {primitive: 'ring', radiusOuter: ent.children[0].components.geometry.attrValue.radiusOuter*1.5, radiusInner: 0};
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
    if(scenes[packageSelect.value][nameIn.value] != null){
        alert('A pattern with this name already exists');
        return;
    }
    if(nameIn.value.indexOf('(') > 0 || nameIn.value.indexOf(')') > 0){
        alert('A name cannot include parenthesis ()');
        return
    }
    oldName = patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].textContent
    currScene = scenes[packageSelect.value][oldName]
    currName = ''
    if(Object.keys(names).indexOf(nameIn.value) == -1){
        names[nameIn.value] = 1
        currName = nameIn.value
    } else {
        names[nameIn.value] = names[nameIn.value] + 1
        currName = nameIn.value+''+names[nameIn.value]
    }
    scenes[packageSelect.value][currName] = currScene
    delete scenes[packageSelect.value][oldName]

    patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].textContent = currName
}

let clipboard;
function copyPattern(){
    if(isNaN(parseInt(patternList.getAttribute('selectedIndex')))){
        return
    }
    let i = 0;
    indices = []
    while(i < patternList.children.length){
        if(patternList.children[i].style.background == 'rgb(243, 152, 20)'){
            indices.push(i)
        }
        i++;
    }
    clipboard = {}
    indices.forEach(ind => {
        clipboard[patternList.children[ind].textContent] = scenes[packageSelect.value][patternList.children[ind].textContent]
    })
}

function addPackage(){
    flag = false;
    let i = 0;
    if(nameIn.value.indexOf('(') > 0 || nameIn.value.indexOf(')') > 0){
        alert('A name cannot include parenthesis ()');
        return
    }
    while(i < packageSelect.options.length){
        if(packageSelect.options[i].value == nameIn.value){
            alert('A package with this name already exists');
            return
        }
        i++;
    }

    packageSelect.options.add(new Option(nameIn.value,nameIn.value))
    scenes[nameIn.value] = {}
    names[nameIn.value] = {}
    packageSelect.value = nameIn.value
    changePackage();
}

function changePackage(){
    let i = 0;
    patternList.setAttribute('selectedIndex',"")
    while(patternList.children.length != 0){
        patternList.removeChild(patternList.children[0])
    }
    Object.keys(scenes[packageSelect.value]).forEach(currName =>{
        var toggle_button = '<li id="'+currName+'">'+currName+'</li>';

        $('#items-list').append(toggle_button)
        
        item = document.getElementById(currName)
        $(item).prop('draggable', true)
        item.addEventListener('dragstart', dragStart)
        item.addEventListener('drop', dropped)
        item.addEventListener('dragenter', cancelDefault)
        item.addEventListener('dragover', cancelDefault)
        item.addEventListener('click',selectPattern)
    }
    )
    revertChanges()
}

function renamePackage(){
    if(scenes[nameIn.value] != null){
        alert('A package with this name already exists');
        return;
    }
    if(nameIn.value.indexOf('(') > 0 || nameIn.value.indexOf(')') > 0){
        alert('A name cannot include parenthesis ()');
        return;
    }
    oldName = packageSelect.value
    currPackage = scenes[packageSelect.value]
    
    scenes[nameIn.value] = currPackage
    delete scenes[packageSelect.value]
    packageSelect.options[packageSelect.selectedIndex].value = nameIn.value
    packageSelect.options[packageSelect.selectedIndex].text = nameIn.value
    //patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].textContent = currName
}

function pastePattern(){
    if(clipboard == null){
        return;
    }
    /*if(scenes[packageSelect.value][clipboard.name] != null){
        alert('A scene with the name of the copied pattern already exists, please rename the scene')
        return
    }*/
    Object.keys(clipboard).forEach(name =>{
        currName = name.split(' (')[0];
        if(names[packageSelect.value][currName]){
            currName = currName + ' ('+names[packageSelect.value][currName]+')'
            names[packageSelect.value][name.split(' (')[0]] = names[packageSelect.value][name.split(' (')[0]] + 1
        } else {
            names[packageSelect.value][currName] = 1
        }
        scenes[packageSelect.value][currName] = clipboard[name]
        var toggle_button = '<li id="'+currName+'">'+currName+'</li>';

        $('#items-list').append(toggle_button)
        
        item = document.getElementById(currName)
        $(item).prop('draggable', true)
        item.addEventListener('dragstart', dragStart)
        item.addEventListener('drop', dropped)
        item.addEventListener('dragenter', cancelDefault)
        item.addEventListener('dragover', cancelDefault)
        item.addEventListener('click',selectPattern)
    })
    patternList.scrollTo({
        top: 1000000000,
        left: 0,
        behavior: "smooth",
      });
    
}

function cutPattern(){
    copyPattern()
    removePattern()
}