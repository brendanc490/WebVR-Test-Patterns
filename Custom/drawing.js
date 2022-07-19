/* adds entity to scene */
function addEntity(){
    el = document.createElement('a-entity'); /* creates entity */

    /* check desired type of entity */
    if($("#entity :selected").text() == "circle"){ /* if circle */
        el.setAttribute("id","circle"+circleNum++);
        el.setAttribute("geometry",{primitive: "ring", radiusOuter: 0.25, radiusInner: 0});
    } else if ($("#entity :selected").text() == "plane"){ /* if plane */
        el.setAttribute("id","plane"+planeNum++);
        drawPlaneBorder(.25,.5,100,{r: 255, g: 255, b: 255},el);
        el.setAttribute("geometry",{primitive: "plane", width: 0, height: 0.5});
        
        /*
        el.setAttribute("geometry",{primitive: "plane", width: .25, height: 0.5});*/
    } else if ($("#entity :selected").text() == "triangle"){ /* if triangle */
        el.setAttribute("id","triangle"+triangleNum++);
        el.setAttribute("geometry",{primitive: "triangle", vertexA: {x: 0, y: 0.1875, z: 0}, vertexB: {x: -0.25, y: -0.25, z: 0}, vertexC: {x: 0.25, y: -0.25, z: 0}});
    } else if ($("#entity :selected").text() == "gradient"){
        el.setAttribute("id","gradient"+gradientNum++);
        drawGradient(.05,.15,32,{r: 255, g: 255, b: 255},el);
    } else if ($("#entity :selected").text() == "checkerboard"){
        el.setAttribute("id","checkerboard"+checkerboardNum++);
        drawCheckerboard(16,16,.1,{r: 255, g: 255, b: 255},el);
    } else if ($("#entity :selected").text() == "hollow plane"){
        el.setAttribute("id","hollow"+planeNum++);
        drawPlaneBorder(.25,.5,100,{r: 255, g: 255, b: 255},el);
    }
    /* Set default universal stats */
    el.setAttribute("position",{x: 0, y: 0, z: -1+(0.00005*numAdded++)});
    el.setAttribute("material", {color: "#FFFFFF"});
    el.setAttribute("rotation", {x: 0, y: 0, z: 0});
    el.setAttribute("click-checker","");

    entityCanvas.appendChild(el); /* add entity to scene */

    /* add entity to potential selections */
    var option = document.createElement("option"); 
    option.text = el.getAttribute("id");
    entitySelector.add(option);

    els.push(el);/* add entity to list of created entities */
}

function drawPlaneBorder(width,height,fill,color,parent){
        let newWidth = (width/2)*Math.sqrt(fill/100);
        let newHeight = (height/2)*Math.sqrt(fill/100);

        vertL = document.createElement('a-entity');
        vertR = document.createElement('a-entity');
        horizU = document.createElement('a-entity');
        horizD = document.createElement('a-entity');

        vertL.setAttribute("geometry",{primitive: "plane", width: newWidth, height: height});
        vertR.setAttribute("geometry",{primitive: "plane", width: newWidth, height: height});
        horizU.setAttribute("geometry",{primitive: "plane", width: width, height: newHeight});
        horizD.setAttribute("geometry",{primitive: "plane", width: width, height: newHeight});
        
        vertL.setAttribute("position",{x: (-1*width/2)+(newWidth/2), y: 0, z: -0.00001});
        vertR.setAttribute("position",{x: (width/2)-(newWidth/2), y: 0, z: -0.00001});
        horizU.setAttribute("position",{x: 0, y: (height/2)-(newHeight/2), z: -0.00001});
        horizD.setAttribute("position",{x: 0, y: (-1*height/2)+(newHeight/2), z: -0.00001});

        vertL.setAttribute("material", {shader: "flat", color: "rgb("+color.r.toString()+","+color.g.toString()+","+color.b.toString()+")"});
        vertR.setAttribute("material", {shader: "flat", color: "rgb("+color.r.toString()+","+color.g.toString()+","+color.b.toString()+")"});
        horizU.setAttribute("material", {shader: "flat", color: "rgb("+color.r.toString()+","+color.g.toString()+","+color.b.toString()+")"});
        horizD.setAttribute("material", {shader: "flat", color: "rgb("+color.r.toString()+","+color.g.toString()+","+color.b.toString()+")"});

        parent.appendChild(vertL);
        parent.appendChild(vertR);
        parent.appendChild(horizU);
        parent.appendChild(horizD);
}

function drawGradient(width,height,numBars,color,parent){
    var j = 0;
    while(j < numBars){
        let elChild = document.createElement('a-entity');
        elChild.setAttribute("id",parent.id+(numBars-j).toString());
        elChild.setAttribute("geometry",{primitive: "plane", width: width, height: height});
        elChild.setAttribute("position",{x: width*numBars/2-(width*j)-(width/2), y: 0, z: 0});
        elChild.setAttribute("material",{shader: "flat", color: "rgb("+Math.ceil(color.r-((color.r/numBars)*j)).toString()+","+Math.ceil(color.g-((color.g/numBars)*j)).toString()+","+Math.ceil(color.b-((color.b/numBars)*j)).toString()+")"});
        parent.appendChild(elChild);
        j++;
    }
}

function drawCheckerboard(rows,cols,size,color,parent){
    var r = 0;
    var isBlack = false;
    while (r < rows){
        let elChildRow = document.createElement("a-entity");
        elChildRow.setAttribute("id",parent.id+"row"+r);
        var c = 0;
        while (c < cols){
            let elChildCol = document.createElement("a-entity");
            elChildCol.setAttribute("id",parent.id+"col"+c);
            elChildCol.setAttribute("geometry",{primitive: "plane", width: size, height: size});
            elChildCol.setAttribute("position",{x: size*cols/2-(size*c)-(size/2), y: size*rows/2-(size*r)-(size/2), z: 0});
            if(isBlack){
                elChildCol.setAttribute("material",{shader: "flat", color: "rgb(0,0,0)"});
            } else {
                elChildCol.setAttribute("material",{shader: "flat", color: "rgb("+color.r.toString()+","+color.g.toString()+","+color.b.toString()+")"});
            }
            isBlack = !isBlack;
            elChildRow.appendChild(elChildCol)
            c++;
        }
        if (cols % 2 == 0) {isBlack = !isBlack};
        r++;
        parent.appendChild(elChildRow);
    }
}

/* edits selected entity */
function editEntity(){
    /* universal changes */
    if(isNaN(parseFloat($("#x").val())) || isNaN(parseFloat($("#y").val()))){
        alert("Please enter a valid position");
        return;
    }
    if(hexToRgb($("#color").val()) == null){
        alert("Invalid color (check that the color was entered in hexadecimal format)");
        return;
    }
    if(isNaN(parseFloat($("#rotation").val()))){
        alert("Please enter a valid rotation");
        return;
    }
    selectedEntity.setAttribute("position",{x: parseFloat($("#x").val()), y: parseFloat($("#y").val()), z: selectedEntity.getAttribute("position").z});
    if(texture.value != "none"){
        selectedEntity.setAttribute("material",{color: $("#color").val(), shader: "flat", src: "#"+texture.value});
    } else {
        selectedEntity.setAttribute("material",{color: $("#color").val(), shader: "flat", src: ""});
    }
    selectedEntity.setAttribute("rotation",{x: 0, y: 0, z: parseFloat($("#rotation").val())});

    if(selectedEntity.getAttribute("id").includes("circle")){  /* circle only changes */
        if(isNaN(parseFloat($("#radius").val()))){
            alert("Please enter a valid radius");
            return;
        }
        if(parseFloat($("#radius").val()) < 0){
            alert("Please enter a valid radius");
            return;
        }
        selectedEntity.setAttribute("geometry",{primitive: "ring", radiusOuter: parseFloat($("#radius").val()), radiusInner: parseFloat($("#radius").val())*Math.sqrt((100-parseFloat($("#fill").val()))/100)});
    } else if (selectedEntity.getAttribute("id").includes("plane")){ /* plane only changes */
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
        }
        if (texture.value == "none"){
            
            selectedEntity.setAttribute("geometry",{primitive: "plane", width: 0, height: parseFloat($("#height").val())});
            let i = selectedEntity.children.length-1;
            while (i >= 0) {
                selectedEntity.children[i].parentNode.removeChild(selectedEntity.children[i]);
                i--;
            }
            drawPlaneBorder(parseFloat($("#width").val()),parseFloat($("#height").val()),parseFloat($("#fill").val()),hexToRgb($("#color").val()),selectedEntity);
            /*let newWidth = (parseFloat($("#width").val())/2)*Math.sqrt((parseFloat($("#fill").val()))/100);
            let newHeight = (parseFloat($("#height").val())/2)*Math.sqrt((parseFloat($("#fill").val()))/100);

            selectedEntity.children[0].setAttribute("geometry",{primitive: "plane", width: (parseFloat($("#width").val())/2)*Math.sqrt((parseFloat($("#fill").val()))/100), height: parseFloat($("#height").val())});
            selectedEntity.children[1].setAttribute("geometry",{primitive: "plane", width: (parseFloat($("#width").val())/2)*Math.sqrt((parseFloat($("#fill").val()))/100), height: parseFloat($("#height").val())});
            selectedEntity.children[2].setAttribute("geometry",{primitive: "plane", width: parseFloat($("#width").val()), height: (parseFloat($("#height").val())/2)*Math.sqrt((parseFloat($("#fill").val()))/100)});
            selectedEntity.children[3].setAttribute("geometry",{primitive: "plane", width: parseFloat($("#width").val()), height: (parseFloat($("#height").val())/2)*Math.sqrt((parseFloat($("#fill").val()))/100)});
            
            selectedEntity.children[0].setAttribute("position",{x: (-1*(parseFloat($("#width").val())/2))+(newWidth/2), y: 0, z: 0});
            selectedEntity.children[1].setAttribute("position",{x: (parseFloat($("#width").val())/2)-(newWidth/2), y: 0, z: 0});
            selectedEntity.children[2].setAttribute("position",{x: 0, y: (parseFloat($("#height").val())/2)-(newHeight/2), z: 0});
            selectedEntity.children[3].setAttribute("position",{x: 0, y: (-1*(parseFloat($("#height").val())/2))+(newHeight/2), z: 0});*/
        } else {
            selectedEntity.setAttribute("geometry",{primitive: "plane", width: parseFloat($("#width").val()), height: parseFloat($("#height").val())});
        }


    } else if (selectedEntity.getAttribute("id").includes("triangle")){ /* triangle only changes */
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
        selectedEntity.setAttribute("geometry",{primitive: "triangle", vertexA: {x: parseFloat($("#vax").val()), y: parseFloat($("#vay").val()), z: 0},
         vertexB: {x: parseFloat($("#vbx").val()), y: parseFloat($("#vby").val()), z: 0}, vertexC: {x: parseFloat($("#vcx").val()), y: parseFloat($("#vcy").val()), z: 0}});
    } else if (selectedEntity.getAttribute("id").includes("gradient")){ /* gradient only changes */
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
        } else if(parseFloat($("#numBarsIn").val()) < 0){
            alert("Please enter a valid number of bars ( >= 0 )");
            return;
        }

        let i = selectedEntity.children.length-1;
        while (i >= 0) {
            selectedEntity.children[i].parentNode.removeChild(selectedEntity.children[i]);
            i--;
        }
        drawGradient(parseFloat($("#width").val()),parseFloat($("#height").val()),parseFloat($("#numBarsIn").val()),hexToRgb($("#color").val()),selectedEntity);
    } else if (selectedEntity.getAttribute("id").includes("checkerboard")){ /* checkerboard only changes */
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
        if(parseFloat($("#rowsIn").val()) < 0){
            alert("Please enter a valid height ( >= 0 )");
            return;
        } else if(parseFloat($("#colsIn").val()) < 0){
            alert("Please enter a valid width ( >= 0 )");
            return;
        } else if(parseFloat($("#tileSizeIn").val()) < 0){
            alert("Please enter a valid number of bars ( >= 0 )");
            return;
        }
        let i = selectedEntity.children.length-1;
        while (i >= 0) {
            selectedEntity.children[i].parentNode.removeChild(selectedEntity.children[i]);
            i--;
        }
        drawCheckerboard(parseFloat($("#rowsIn").val()),parseFloat($("#colsIn").val()),parseFloat($("#tileSizeIn").val()),hexToRgb($("#color").val()),selectedEntity);
    } 

}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }