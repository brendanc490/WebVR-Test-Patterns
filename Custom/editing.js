/* 
    Responsible for editing currently selected entity
    Whenever an appropriate change is queued, editEntity function is called and adjusts current entity based on changes

*/

/* edits selected entity */
function editEntity(){
    /* checks for valid entries of universal changes */
    if(isNaN(parseFloat($("#x").val())) || isNaN(parseFloat($("#y").val())) || isNaN(parseFloat($("#z").val()))){
        alert("Please enter a valid position");
        return;
    }
    if(hexToRgb($("#color").val()) == null){
        alert("Invalid color (check that the color was entered in hexadecimal format)");
        return;
    }
    if(val && ((isNaN(parseFloat($("#rotationZ").val())) || isNaN(parseFloat($("#rotationY").val())) || isNaN(parseFloat($("#rotationX").val()))))){
        alert("Please enter a valid rotation");
        return;
    } else if(!val && isNaN(parseFloat($("#rotationZ").val()))) {
        alert("Please enter a valid rotation");
        return;
    }

    /* Checks whether the current entity is advanced or not */
    if(selectedEntity.getAttribute('advanced').val){
        /* Updates universal settings if advanced */
        selectedEntity.setAttribute("position",{x: parseFloat($("#x").val()), y: parseFloat($("#y").val()), z: -parseFloat($("#z").val())});
        d = (-Math.round(Math.sqrt((parseFloat($("#x").val()))*(parseFloat($("#x").val()))+(parseFloat($("#z").val()))*(parseFloat($("#z").val())))))
        selectedEntity.setAttribute("angle",{x: ((Math.asin(parseFloat($("#x").val())/d))*180)/Math.PI, z: d});
        selectedEntity.setAttribute("rotation",{x: parseFloat($("#rotationX").val()), y: parseFloat($("#rotationY").val()), z: parseFloat($("#rotationZ").val())});
    } else {
        /* Updates universal settings if not advanced */
        selectedEntity.setAttribute("position",{x: -parseFloat($("#z").val()) * Math.sin((-parseFloat($("#x").val())*Math.PI)/180), y: parseFloat($("#y").val()), z: -parseFloat($("#z").val()) * Math.cos((-parseFloat($("#x").val())*Math.PI)/180)});
        selectedEntity.setAttribute("angle",{x: -parseFloat($("#x").val()), z: -parseFloat($("#z").val())})
        selectedEntity.setAttribute("rotation",{x: 0, y: selectedEntity.getAttribute('angle').x, z: parseFloat($("#rotationZ").val())});
    }
    
    /* Adds a texture if a texture input is selected */
    if($("#texture").val() == "none"){
        selectedEntity.setAttribute("material",{shader: "flat", src: "", color: $("#color").val()});
    } else {
        selectedEntity.setAttribute("material",{shader: "flat", src: "#"+$("#texture").val(), color: $("#color").val()});
    }

    if(selectedEntity.getAttribute("id").includes("circle")){  /* circle only changes */
        /* check for valid inputs */
        if(isNaN(parseFloat($("#radius").val()))){
            alert("Please enter a valid radius");
            return;
        } else if(parseFloat($("#radius").val()) < 0){
            alert("Please enter a valid radius");
            return;
        } else if(parseFloat($("#fill").val()) <= 0){
            alert("Border too small (0 < border <= smallest dimension of entity)");
            return;
        } else if(parseFloat($("#radius").val()) < parseFloat($("#fill").val())){
            alert("Border too large, will change size of entity (0 < border <= radius)")
        }

        // edit stats
        selectedEntity.setAttribute("geometry",{primitive: "ring", radiusOuter: parseFloat($("#radius").val()), radiusInner: parseFloat($("#radius").val())-parseFloat($("#fill").val()), segmentsTheta: 100});
        selectedEntity.setAttribute("material",{shader: "flat", src: selectedEntity.getAttribute("material").src, color: $("#color").val()});
    } else if (selectedEntity.getAttribute("id").includes("plane")){ /* plane only changes */
        // check for valid inputs
        if(isNaN(parseFloat($("#width").val()))){
            alert("Please enter a valid width");
            return;
        }
        if(isNaN(parseFloat($("#height").val()))){
            alert("Please enter a valid height");
            return;
        }
        if(parseFloat($("#height").val()) < 0){
            alert("Please enter a valid height ( >= 0 )");
            return;
        } else if(parseFloat($("#width").val()) < 0){
            alert("Please enter a valid width ( >= 0 )");
            return;
        } else if(parseFloat($("#fill").val()) <= 0){
            alert("Border too small (0 < border <= smallest dimension of entity)");
            return;
        } else if((parseFloat($("#width").val()) < parseFloat($("#fill").val())) && (parseFloat($("#width").val()) <= parseFloat($("#height").val())) || (parseFloat($("#height").val()) < parseFloat($("#fill").val())) && (parseFloat($("#width").val()) > parseFloat($("#height").val()))){
            alert("Border too large, will change size of entity (0 < border <= smallest dimension of entity)");
            return;
        }
        
        // if no texture, draw plane border
        if (texture.value == "none"){
            selectedEntity.setAttribute("geometry",{primitive: "plane", width: 0, height: parseFloat($("#height").val())});
            let i = selectedEntity.children.length-1;
            while (i >= 0) {
                selectedEntity.children[i].parentNode.removeChild(selectedEntity.children[i]);
                i--;
            }
            drawPlaneBorder(parseFloat($("#width").val()),parseFloat($("#height").val()),parseFloat($("#fill").val()),hexToRgb($("#color").val()),selectedEntity);
        } else { // draw solid plane that will be the texture canvas
            let i = selectedEntity.children.length-1;
            while (i >= 0) {
                selectedEntity.children[i].parentNode.removeChild(selectedEntity.children[i]);
                i--;
            }
            selectedEntity.setAttribute("geometry",{primitive: "plane", width: parseFloat($("#width").val()), height: parseFloat($("#height").val())});
        }


    } else if (selectedEntity.getAttribute("id").includes("triangle")){ /* triangle only changes */
    // check for valid inputs
    if(isNaN(parseFloat($("#vax").val()))){
        alert("Please enter a valid position");
        return;
    }
    if(isNaN(parseFloat($("#vay").val()))){
        alert("Please enter a valid position");
        return;
    }
    if(isNaN(parseFloat($("#vbx").val()))){
        alert("Please enter a valid position");
        return;
    }
    if(isNaN(parseFloat($("#vby").val()))){
        alert("Please enter a valid position");
        return;
    }
    if(isNaN(parseFloat($("#vcx").val()))){
        alert("Please enter a valid position");
        return;
    }
    if(isNaN(parseFloat($("#vcy").val()))){
        alert("Please enter a valid position");
        return;
    }
    // update stats
        selectedEntity.setAttribute("geometry",{primitive: "triangle", vertexA: {x: parseFloat($("#vax").val()), y: parseFloat($("#vay").val()), z: 0},
         vertexB: {x: parseFloat($("#vbx").val()), y: parseFloat($("#vby").val()), z: 0}, vertexC: {x: parseFloat($("#vcx").val()), y: parseFloat($("#vcy").val()), z: 0}});
    } else if (selectedEntity.getAttribute("id").includes("gradient") || selectedEntity.getAttribute("id").includes("grille")){ /* gradient and grille only changes */
        // check for valid inputs
        if(isNaN(parseFloat($("#width").val()))){
            alert("Please enter a valid width");
            return;
        }
        if(isNaN(parseFloat($("#height").val()))){
            alert("Please enter a valid height");
            return;
        }
        if(isNaN(parseFloat($("#numBarsIn").val()))){
            alert("Please enter a valid number of bars");
            return;
        }
        if(parseFloat($("#height").val()) < 0){
            alert("Please enter a valid height ( >= 0 )");
            return;
        } else if(parseFloat($("#width").val()) < 0){
            alert("Please enter a valid width ( >= 0 )");
            return;
        } else if(parseFloat($("#numBarsIn").val()) < 0 || parseFloat($("#numBarsIn").val()) % 1 != 0){
            alert("Please enter a valid number of bars ( >= 0 and a whole number )");
            return;
        }

        // remove bars
        let i = selectedEntity.children.length-1;
        while (i >= 0) {
            selectedEntity.children[i].parentNode.removeChild(selectedEntity.children[i]);
            i--;
        }
        // redraw gradient or grille
        if (selectedEntity.getAttribute("id").includes("gradient")){
            drawGradient(parseFloat($("#width").val()),parseFloat($("#height").val()),parseFloat($("#numBarsIn").val()),hexToRgb($("#color").val()),hexToRgb($("#color2").val()),selectedEntity);
        } else {
            drawGrille(parseFloat($("#width").val()),parseFloat($("#height").val()),parseFloat($("#numBarsIn").val()),$("#color").val(),$("#color2").val(),selectedEntity);
        }
        selectedEntity.setAttribute('color2',{val: $("#color2").val()})
        
    } else if (selectedEntity.getAttribute("id").includes("checkerboard")){ /* checkerboard only changes */
        // check for valid inputs
        if(isNaN(parseFloat($("#rowsIn").val()))){
            alert("Please enter a valid number of rows");
            return;
        }
        if(isNaN(parseFloat($("#colsIn").val()))){
            alert("Please enter a valid number of columns");
            return;
        }
        if(isNaN(parseFloat($("#tileSizeIn").val()))){
            alert("Please enter a valid size");
            return;
        }
        if(parseFloat($("#rowsIn").val()) <= 0 || parseFloat($("#rowsIn").val()) % 1 != 0){
            alert("Please enter a valid number of rows ( > 0 and a whole number)");
            return;
        } else if(parseFloat($("#colsIn").val()) <= 0 || parseFloat($("#colsIn").val()) % 1 != 0){
            alert("Please enter a valid number of cols ( > 0 and a whole number)");
            return;
        } else if(parseFloat($("#tileSizeIn").val()) < 0){
            alert("Please enter a tile size ( >= 0 )");
            return;
        }
        selectedEntity.setAttribute('color2',{val: $("#color2").val()})
        // remove boxes
        let i = selectedEntity.children.length-1;
        while (i >= 0) {
            selectedEntity.children[i].parentNode.removeChild(selectedEntity.children[i]);
            i--;
        }
        // draw new boxes
        drawCheckerboard(parseFloat($("#rowsIn").val()),parseFloat($("#colsIn").val()),parseFloat($("#tileSizeIn").val()),$("#color").val(),$("#color2").val(),selectedEntity);
    } else if (selectedEntity.getAttribute("id").includes("circularDotarray")){ /* checkerboard only changes */
        // check for valid inputs
        if(isNaN(parseFloat($("#numDotsIn").val()))){
            alert("Please enter a valid number of dots");
            return;
        }
        if(isNaN(parseFloat($("#numCirclesIn").val()))){
            alert("Please enter a valid number of circles");
            return;
        }
        if(isNaN(parseFloat($("#circleSizeIn").val()))){
            alert("Please enter a valid size");
            return;
        }
        if(isNaN(parseFloat($("#arraySpacingIn").val()))){
            alert("Please enter a valid array spacing");
            return;
        }
        if(parseFloat($("#numDotsIn").val()) < 0 || parseFloat($("#numDotsIn").val()) % 1 != 0){
            alert("Please enter a valid number of dots ( >= 0 and a whole number)");
            return;
        } else if(parseFloat($("#numCirclesIn").val()) <= 0 || parseFloat($("#numCirclesIn").val()) % 1 != 0){
            alert("Please enter a valid number of circles ( > 0 and a whole number)");
            return;
        } else if(parseFloat($("#circleSizeIn").val()) < 0){
            alert("Please enter a circle size ( >= 0 )");
            return;
        } else if(parseFloat($("#arraySpacingIn").val()) < 0){
            alert("Please enter a valid array spacing ( >= 0 )");
            return;
        }
        // remove boxes
        let i = selectedEntity.children.length-1;
        while (i >= 0) {
            selectedEntity.children[i].parentNode.removeChild(selectedEntity.children[i]);
            i--;
        }
        // draw new boxes
        drawCircularDotArray(parseFloat($("#arraySpacingIn").val()),parseFloat($("#numCirclesIn").val()),parseFloat($("#numDotsIn").val()),parseFloat($("#circleSizeIn").val()),$("#color").val(),toggleCenterDotIn.checked,selectedEntity);
        selectedEntity.setAttribute('arraySpacing',{val: parseFloat($("#arraySpacingIn").val())});
    } else if (selectedEntity.getAttribute("id").includes("dotarray")){ /* checkerboard only changes */
        // check for valid inputs
        if(isNaN(parseFloat($("#rowsIn").val()))){
            alert("Please enter a valid number of rows");
            return;
        }
        if(isNaN(parseFloat($("#colsIn").val()))){
            alert("Please enter a valid number of columns");
            return;
        }
        if(isNaN(parseFloat($("#circleSizeIn").val()))){
            alert("Please enter a valid size");
            return;
        }
        if(isNaN(parseFloat($("#spacingIn").val()))){
            alert("Please enter a spacing");
            return;
        }
        if(parseFloat($("#rowsIn").val()) <= 0 || parseFloat($("#rowsIn").val()) % 1 != 0){
            alert("Please enter a valid number of rows ( > 0 and a whole number)");
            return;
        } else if(parseFloat($("#colsIn").val()) <= 0 || parseFloat($("#colsIn").val()) % 1 != 0){
            alert("Please enter a valid number of cols ( > 0 and a whole number)");
            return;
        } else if(parseFloat($("#circleSizeIn").val()) < 0){
            alert("Please enter a circle size ( >= 0 )");
            return;
        } else if(parseFloat($("#spacingIn").val()) < 0){
            alert("Please enter a valid spacing ( >= 0 )");
            return;
        }
        // remove boxes
        let i = selectedEntity.children.length-1;
        while (i >= 0) {
            selectedEntity.children[i].parentNode.removeChild(selectedEntity.children[i]);
            i--;
        }
        // draw new boxes
        drawDotArray(parseFloat($("#rowsIn").val()),parseFloat($("#colsIn").val()),parseFloat($("#circleSizeIn").val()),parseFloat($("#spacingIn").val()),$("#color").val(),toggleCenterDotIn.checked,selectedEntity);
        selectedEntity.setAttribute('arraySpacing',{val: parseFloat($("#spacingIn").val())});
        selectedEntity.setAttribute('toggleCenterDot',toggleCenterDotIn.checked);
    }  else if (selectedEntity.getAttribute("id").includes("bullseye")){ /* checkerboard only changes */
        // check for valid inputs
        if(isNaN(parseFloat($("#numRingsIn").val()))){
            alert("Please enter a valid number of rings");
            return;
        }
        if(isNaN(parseFloat($("#ringPitchIn").val()))){
            alert("Please enter a valid ring thickness");
            return;
        }
        if(parseFloat($("#numRingsIn").val()) <= 0 || parseFloat($("#numRingsIn").val()) % 1 != 0){
            alert("Please enter a valid number of rings ( > 0 and a whole number)");
            return;
        } else if(parseFloat($("#ringPitchIn").val()) < 0){
            alert("Please enter a ring thickness ( >= 0 )");
            return;
        }
        // remove boxes
        let i = selectedEntity.children.length-1;
        while (i >= 0) {
            selectedEntity.children[i].parentNode.removeChild(selectedEntity.children[i]);
            i--;
        }
        // draw new boxes
        drawBullseye(parseFloat($("#ringPitchIn").val()),parseFloat($("#numRingsIn").val()),$("#color").val(),selectedEntity);
    } 
    updateJSON() // update the json file of current scene
}