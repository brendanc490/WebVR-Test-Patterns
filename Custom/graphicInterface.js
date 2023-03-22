/* 
    Contains functions that are integral to the functionality of graphical interface.
    These include showing and hiding textboxes, updating currently displayed stats, and changing between modes
*/

/* Initial webpage layout hides all edit related containers */
toggleDisplayEdit(null);
toggleAddEdit(null);

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
    colIn2.style.display = "none";
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
    advanced.style.display = "none";
}
 var flag = false;
/* updates values in edit section */
function updateStats(){
    /* universal values */
    skyColor.value = sky.components.material.attrValue.color;
    $('#skyCol').minicolors("value",sky.components.material.attrValue.color);
    entity = selectedEntity;
    if(selectedEntity.getAttribute('advanced').val){
        posIn.innerHTML = 'Position: (x: m, y: m, z: m)<input type="text" class="input" id="z" value="'+(-selectedEntity.getAttribute('position').z).toFixed(3)+'"> <input type="text" class="input" id="y" value="'+(selectedEntity.getAttribute('position').y).toFixed(3)+'"> <input type="text" class="input" id="x" value="'+(selectedEntity.getAttribute('position').x).toFixed(3)+'"></input>'
        rotationY.style.display = 'block'
        rotationX.style.display = 'block'
        xIn = document.getElementById("x"); /* x input */
        yIn = document.getElementById("y"); /* y input */
        zIn = document.getElementById("z"); /* z input */
    
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
        xIn.value = (entity.components.position.attrValue.x).toFixed(3);
        yIn.value = (entity.components.position.attrValue.y).toFixed(3);
        zIn.value = (-entity.components.position.attrValue.z).toFixed(3);
    } else {
        posIn.innerHTML = 'Position: (\u03B1: deg, y: m, r: distance m)<input type="text" class="input" id="z" value="'+(-selectedEntity.getAttribute('angle').z).toFixed(3)+'"> <input type="text" class="input" id="y" value="'+(selectedEntity.getAttribute('position').y).toFixed(3)+'"> <input type="text" class="input" id="x" value="'+(-selectedEntity.getAttribute('angle').x).toFixed(3)+'"></input>'
        rotationY.style.display = 'none'
        rotationX.style.display = 'none'
        xIn = document.getElementById("x"); /* x input */
        yIn = document.getElementById("y"); /* y input */
        zIn = document.getElementById("z"); /* z input */
    
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
        xIn.value = (-entity.components.angle.attrValue.x).toFixed(3);
        yIn.value = (entity.components.position.attrValue.y).toFixed(3);
        zIn.value = (-entity.components.angle.attrValue.z).toFixed(3);
    }

    rotationZ.value = (entity.components.rotation.attrValue.z).toFixed(3);
    rotationY.value = (entity.components.rotation.attrValue.y).toFixed(3);
    rotationX.value = (entity.components.rotation.attrValue.x).toFixed(3);
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
            width.value = (selectedEntity.components.geometry.attrValue.width).toFixed(3);
            
        } else {
            width.value = (selectedEntity.children[2].components.geometry.attrValue.width).toFixed(3);
        }
        height.value = (selectedEntity.components.geometry.attrValue.height).toFixed(3);
        fill.value = (selectedEntity.components.fill.attrValue.val).toFixed(3);
    } else if(selectedEntity.getAttribute("id").includes("circle")){ /* circle exclusives */
        radius.value = (selectedEntity.components.geometry.attrValue.radiusOuter).toFixed(3);
        fill.value = (selectedEntity.components.fill.attrValue.val).toFixed(3);
    } else if(selectedEntity.getAttribute("id").includes("triangle")){ /* triangle exclusives */
        vax.value = (selectedEntity.components.geometry.attrValue.vertexA.x).toFixed(3);
        vay.value = (selectedEntity.components.geometry.attrValue.vertexA.y).toFixed(3);
        vbx.value = (selectedEntity.components.geometry.attrValue.vertexB.x).toFixed(3);
        vby.value = (selectedEntity.components.geometry.attrValue.vertexB.y).toFixed(3);
        vcx.value = (selectedEntity.components.geometry.attrValue.vertexC.x).toFixed(3);
        vcy.value = (selectedEntity.components.geometry.attrValue.vertexC.y).toFixed(3);
    } else if(selectedEntity.getAttribute("id").includes("gradient")){ /* gradient exclusives */
        width.value = (selectedEntity.children[0].components.geometry.attrValue.width).toFixed(3);
        height.value = (selectedEntity.children[0].components.geometry.attrValue.height).toFixed(3);
        numBarsIn.value = (selectedEntity.children.length).toFixed(3);
        $('#color2').minicolors("value",entity.components.color2.attrValue.val);
    } else if(selectedEntity.getAttribute("id").includes("checkerboard")){
        rowsIn.value = (selectedEntity.children.length).toFixed(3);
        colsIn.value = (selectedEntity.children[0].children.length).toFixed(3);
        tileSizeIn.value = (selectedEntity.children[0].children[0].components.geometry.attrValue.width).toFixed(3);
        $('#color2').minicolors("value",entity.components.color2.attrValue.val);
    } else if(selectedEntity.getAttribute("id").includes("grille")){
        width.value = (selectedEntity.children[0].components.geometry.attrValue.width).toFixed(3);
        height.value = (selectedEntity.children[0].components.geometry.attrValue.height).toFixed(3);
        numBarsIn.value = (selectedEntity.children.length).toFixed(3);
        $('#color2').minicolors("value",entity.components.color2.attrValue.val);
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
        toggleAddEdit(false);
    } else { /* if add */
        if(patternDisplay.options.length != 0){
            addEditContent.style.display = "block"
            $('#skyCol').minicolors('value', scenes[patternDisplay.value]['sky'].skyColor);
            displayEditContent.style.display = "none"
        } else {
            alert("You must add a scene");
            displayUtility.checked = false;
            boolDisplayEdit = !boolDisplayEdit;
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
    } else if(swap == false){
        utility.checked = false;
        boolAddEdit = false;
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
        advanced.style.display = "block";

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
            colIn2.style.display = "block";
        } else if (selectedEntity.getAttribute("id").includes("checkerboard")) { /* gradient exlcusive containers shown */
            cols.style.display = "block";
            rows.style.display = "block";
            tileSize.style.display = "block";
            colIn2.style.display = "block";
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