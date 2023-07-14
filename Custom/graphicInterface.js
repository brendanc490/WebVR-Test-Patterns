/* 
    Contains functions that are integral to the functionality of graphical interface.
    These include showing and hiding textboxes, updating currently displayed stats, and changing between modes
*/

/* Initial webpage layout hides all edit related containers */
toggleDisplayEdit(null);
toggleAddEdit(null);

/* hides edit section */
function hideEditStats(){
    area1.style.display = "none";
    area1.style.display = "none";
    area3.style.display = "none";
    area4.style.display = "none";
    area5.style.display = "none";
    specificSettings.style.gridTemplateRows = "17% 17% 16% 17% 16% 17%";

    removeButton.style.display = "none";
    duplicateButton.display = "none";
    background.style.display = "none";
    vertices.style.display = "none";
    //entitySelectorText.style.display = "none";
    //ent.style.display = "none";
    //nonUni.style.display = "none";
    //entitySelectorText.style.display = "none";
    //posIn.style.display = "none";
    //colIn.style.display = "none";
    colIn2.style.display = "none";
    heightIn.style.display = "none";
    widthIn.style.display = "none";
    radiusIn.style.display = "none";
    //rotIn.style.display = "none";
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
    //advanced.style.display = "none";
    circleSize.style.display = "none";
    spacing.style.display = "none";
    numDots.style.display = "none";
    numCircles.style.display = "none";
    arraySpacing.style.display = "none";
    ringPitch.style.display = "none";
    numRings.style.display = "none";
    toggleCenterDot.style.display = "none";
}
 var flag = false;
/* updates values in edit section */
function updateStats(){
    /* universal values */
    skyColor.value = sky.components.material.attrValue.color;
    $('#skyCol').minicolors("value",sky.components.material.attrValue.color);
    entity = selectedEntity;
    if(selectedEntity.getAttribute('advanced').val){
        posIn.innerHTML = 'Position (x: m, y: m, z: m):'
        rotationY.style.display = 'block'
        rotationX.style.display = 'block'
    
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
        posIn.innerHTML = 'Position (\u03B1: deg, y: m, r: m):'
        rotationY.style.display = 'none'
        rotationX.style.display = 'none'
    
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
        numBarsIn.value = (selectedEntity.children.length);
        $('#color2').minicolors("value",entity.components.color2.attrValue.val);
    } else if(selectedEntity.getAttribute("id").includes("checkerboard")){
        rowsIn.value = (selectedEntity.children.length);
        colsIn.value = (selectedEntity.children[0].children.length);
        tileSizeIn.value = (selectedEntity.children[0].children[0].components.geometry.attrValue.width).toFixed(3);
        $('#color2').minicolors("value",entity.components.color2.attrValue.val);
    } else if(selectedEntity.getAttribute("id").includes("grille")){
        width.value = (selectedEntity.children[0].components.geometry.attrValue.width).toFixed(3);
        height.value = (selectedEntity.children[0].components.geometry.attrValue.height).toFixed(3);
        numBarsIn.value = (selectedEntity.children.length);
        $('#color2').minicolors("value",entity.components.color2.attrValue.val);
    } else if(selectedEntity.getAttribute("id").includes("circularDotarray")){
        numDotsIn.value = (selectedEntity.children[1].children.length);
        numCirclesIn.value = (selectedEntity.children.length-1);
        arraySpacingIn.value = selectedEntity.components.arraySpacing.attrValue.val;
        circleSizeIn.value = (selectedEntity.children[0].components.geometry.attrValue.radiusOuter).toFixed(3);
        toggleCenterDotIn.checked = (selectedEntity.components.toggleCenterDot.attrValue);
    } else if(selectedEntity.getAttribute("id").includes("dotarray")){
        rowsIn.value = (selectedEntity.children.length);
        colsIn.value = (selectedEntity.children[0].children.length);
        circleSizeIn.value = (selectedEntity.children[0].children[0].components.geometry.attrValue.radiusOuter).toFixed(3);
        spacingIn.value = selectedEntity.components.arraySpacing.attrValue.val;
        toggleCenterDotIn.checked = (selectedEntity.components.toggleCenterDot.attrValue);
    } else if(selectedEntity.getAttribute("id").includes("bullseye")){
        numRingsIn.value = (selectedEntity.children.length-1);
        ringPitchIn.value = selectedEntity.children[0].components.geometry.attrValue.radiusOuter*2;
    }

}

/* switches between add or edit mode or refreshes current mode display */
function toggleDisplayEdit(swap){
    /* check if swapping modes or refreshing display */
    if(swap){ /* if the button to swap was pressed */
        boolDisplayEdit = !boolDisplayEdit; /* change current mode */
    } 
    utility.checked = false;
    boolAddEdit = false;
    toggleAddEdit(null)
    /* check if current mode is add or edit */
    if(boolDisplayEdit){ /* if display */
    settingsButtonContainer.style.display = "inline-block"
    addEditContent.style.display = "none"
    packageLayout.style.display = "grid"
    swapContainer.style.width = ""
        //scene_input.value = ""
        //toggleAddEdit(false);
    } else { /* if add */
        if(!isNaN(parseInt(patternList.getAttribute('selectedIndex')))){
            if(coreLayout.style.gridTemplateColumns != "100% 0%"){
                openSettings()
            }
            settingsButtonContainer.style.display = "none"
            addEditContent.style.display = "block"
            packageLayout.style.display = "none"
            swapContainer.style.textAlign = "center"
            swapContainer.style.width = "224px"
            swapContainer.style.paddingTop = "10px"
            swapContainer.style.paddingLeft = "9px"
            //$('#skyCol').minicolors('value', scenes[patternDisplay.value]['sky'].skyColor);
        } else {
            alert("You must select a pattern");
            displayUtility.checked = false;
            boolDisplayEdit = !boolDisplayEdit;
            swapContainer.style.float = "left";
            swapContainer.style.paddingTop = "12px"
            swapContainer.style.paddingLeft = "18px"
            swapContainer.style.textAlign = ""
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
            if(selectedEntity == null) {
                selectedEntity = els[0] /* set selected entity to be first entity created */
            }
            updateStats();
         } /* update stats */
    } else if(swap == false){
        utility.checked = false;
        boolAddEdit = false;
    }
    /* check if current mode is add or edit */
    if(boolAddEdit){ /* if edit */
        editContent.style.display = 'grid';
        addContent.style.display = 'none';
        background.style.display = "none";
        skyIn.style.display = "none";

        

        /* check geometry of object */
        if (selectedEntity.getAttribute("id").includes("plane")){ /* plane exclusive containers shown */
            area1.style.display = "block";
            heightIn.style.display = "flex";
            area2.style.display = "block";
            widthIn.style.display = "flex";
            if(selectedEntity.components.material.attrValue.src == null || selectedEntity.components.material.attrValue.src == ""){
                area3.style.display = "block";
                fillIn.style.display = "flex";
            }
            area4.style.display = "block";
            textureIn.style.display = "flex";
            area5.style.display = "block";
            uploadTextureIn.style.display = "block";
        } else if (selectedEntity.getAttribute("id").includes("circle")){ /* circle exclusive containers shown */
            specificSettings.style.gridTemplateRows = "17% 17% 0% 17% 16% 17%";
            area1.style.display = "block";
            radiusIn.style.display = "flex"; 
            area3.style.display = "block";
            fillIn.style.display = "flex";
        } else if (selectedEntity.getAttribute("id").includes("triangle")) { /* triangle exlcusive containers shown */
            area1.style.display = "block";
            vertices.style.display = "block";
            area2.style.display = "block";
            va.style.display = "flex";
            area3.style.display = "block";
            vb.style.display = "flex";
            area4.style.display = "block"
            vc.style.display = "flex";
        } else if (selectedEntity.getAttribute("id").includes("gradient") || selectedEntity.getAttribute("id").includes("grille")) { /* gradient exlcusive containers shown */
            area1.style.display = "block";
            heightIn.style.display = "flex";
            area2.style.display = "block";
            widthIn.style.display = "flex";
            area3.style.display = "block";
            numBars.style.display = "flex";
            area4.style.display = "block";
            colIn2.style.display = "flex";
        } else if (selectedEntity.getAttribute("id").includes("checkerboard")) { /* gradient exlcusive containers shown */
            area1.style.display = "block";
            cols.style.display = "flex";
            area2.style.display = "block";
            rows.style.display = "flex";
            area3.style.display = "block";
            tileSize.style.display = "flex";
            area4.style.display = "block";
            colIn2.style.display = "flex";
        } else if (selectedEntity.getAttribute("id").includes("circularDotarray")){
            area1.style.display = "block";
            numDots.style.display = "flex";
            area2.style.display = "block";
            numCircles.style.display = "flex";
            area3.style.display = "block";
            circleSize.style.display = "flex";
            area4.style.display = "block";
            arraySpacing.style.display = "flex";
            area5.style.display = "block";
            toggleCenterDot.style.display = "flex"
        } else if (selectedEntity.getAttribute("id").includes("dotarray")){
            area1.style.display = "block";
            cols.style.display = "flex";
            area2.style.display = "block";
            rows.style.display = "flex";
            area3.style.display = "block";
            circleSize.style.display = "flex";
            area4.style.display = "block";
            spacing.style.display = "flex";
            area5.style.display = "block";
            toggleCenterDot.style.display = "flex"
        } else if (selectedEntity.getAttribute("id").includes("bullseye")){
            area1.style.display = "block";
            numRings.style.display = "flex";
            area2.style.display = "block";
            ringPitch.style.display = "flex";
        }
    } else { /* if add */
        editContent.style.display = 'none'
        addContent.style.display = 'block'
        hideEditStats(); /* hide edit containers */
        background.style.display = 'block'
        entitySelectorText.style.display = 'flex'
        skyIn.style.display = 'block'
    }
}

function openSettings(){
    if(coreLayout.style.gridTemplateColumns == "100% 0%"){
        coreLayout.style.width = "400px"
        coreLayout.style.gridTemplateColumns = "65% 35%"
        settingsButtonContainer.style.paddingRight = "40px"
        settingsButton.className = "button reset"
        settingsButton.title = "Close settings"
        settingsIcon.className = "fa-solid fa-close"
    } else {
        coreLayout.style.width = "260px"
        coreLayout.style.gridTemplateColumns = "100% 0%"
        settingsButtonContainer.style.paddingRight = "14px"
        settingsButton.className = "button add"
        settingsButton.title = "Open settings"
        settingsIcon.className = "fa-solid fa-gear"
    }
}

function collapseTab(){
    if(coreLayout.style.gridTemplateRows == "7% 7% 86%"){
        coreLayout.style.gridTemplateRows = "100% 0% 0%"
        coreLayout.style.height = "59.02"
        coreLayout.style.overflowY = "hidden"
    } else {
        coreLayout.style.gridTemplateRows = "7% 7% 86%"
        coreLayout.style.height = ""
        coreLayout.style.overflowY = "auto"
    }
}

function hideUniversal(){
    if(hideUniversalIcon.classList[1] == 'fa-chevron-down'){
        // hide
        hideUniversalIcon.className = "fa-solid fa-chevron-right"
        posIn.style.display = "none"
        xIn.style.display = "none"
        yIn.style.display = "none"
        zIn.style.display = "none"
        rotIn.style.display = "none"
        pitch.style.display = "none"
        roll.style.display = "none"
        yaw.style.display = "none"
        entColor.style.display = "none"
        //universalHeader.style.display = "none";
        //uni.style.borderBottom = "0px solid #999";
        if(hideSpecificIcon.className == "fa-solid fa-chevron-right"){
            editContent.style.gridTemplateRows = "8% 5% 5%"
        } else {
            editContent.style.gridTemplateRows = "8% 50% 5%"
        }
        
    } else {
        // show
        hideUniversalIcon.className = "fa-solid fa-chevron-down"
        posIn.style.display = "block"
        xIn.style.display = "block"
        yIn.style.display = "block"
        zIn.style.display = "block"
        rotIn.style.display = "block"
        pitch.style.display = "block"
        roll.style.display = "block"
        yaw.style.display = "block"
        entColor.style.display = "block"
        //universalHeader.style.display = "block";
        //uni.style.borderBottom = "1px solid #999";
        if(hideSpecificIcon.className == "fa-solid fa-chevron-right"){
            editContent.style.gridTemplateRows = "40% 5% 5%"
        } else {
            editContent.style.gridTemplateRows = "40% 50% 5%"
        }
    }
}

function hideSpecific(){
    if(hideSpecificIcon.classList[1] == 'fa-chevron-down'){
        // hide
        hideSpecificIcon.className = "fa-solid fa-chevron-right"
        area1.style.display = "none"
        area2.style.display = "none"
        area3.style.display = "none"
        area4.style.display = "none"
        area5.style.display = "none"
        if(hideUniversalIcon.className == "fa-solid fa-chevron-right"){
            editContent.style.gridTemplateRows = "8% 5% 5%"
        } else {
            editContent.style.gridTemplateRows = "40% 5% 5%"
        }
        
    } else {
        // show
        hideSpecificIcon.className = "fa-solid fa-chevron-down"
        toggleAddEdit(null);
        //universalHeader.style.display = "block";
        //uni.style.borderBottom = "1px solid #999";
        if(hideUniversalIcon.className == "fa-solid fa-chevron-right"){
            editContent.style.gridTemplateRows = "8% 50% 5%"
        } else {
            editContent.style.gridTemplateRows = "40% 50% 5%"
        }
    }
}