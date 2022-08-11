/* adds entity to scene */
function addEntity(){
    el = document.createElement('a-entity'); /* creates entity */

    /* check desired type of entity */
    if($("#entity :selected").text() == "circle"){ /* if circle */
        el.setAttribute("id","circle"+circleNum++);
        el.setAttribute("geometry",{primitive: "ring", radiusOuter: 0.125*250, radiusInner: 0});
        el.setAttribute("fill",{val: .125*250});
        /*let X = Math.random() * 3 - 1.5;
        let Y = Math.random() * 1.5 - .75;*/
        /*el.setAttribute("position",{x: X, y: Y, z: -1+(0.00005*numAdded++)});*/
        
        let R = ((Math.floor(Math.random()*255).toString(16)).toUpperCase()).padStart(2, '0');
        let G = ((Math.floor(Math.random()*255).toString(16)).toUpperCase()).padStart(2, '0');
        let B = ((Math.floor(Math.random()*255).toString(16)).toUpperCase()).padStart(2, '0');
        el.setAttribute("material", {shader: "flat", color: "#"+R+G+B});
    } else if ($("#entity :selected").text() == "plane"){ /* if plane */
        el.setAttribute("id","plane"+planeNum++);
        /*drawPlaneBorder(.25,1,100,{r: 255, g: 255, b: 255},el);*/
        el.setAttribute("geometry",{primitive: "plane", width: .125*250, height: .25*250});
        el.setAttribute("fill",{val: .125*250});
        /*let X = Math.random() * 3 - 1.5;
        let Y = Math.random() * 1.5 - .75;
        el.setAttribute("position",{x: X, y: Y, z: -1+(0.00005*numAdded++)});*/
        let R = ((Math.floor(Math.random()*255).toString(16)).toUpperCase()).padStart(2, '0');
        let G = ((Math.floor(Math.random()*255).toString(16)).toUpperCase()).padStart(2, '0');
        let B = ((Math.floor(Math.random()*255).toString(16)).toUpperCase()).padStart(2, '0');
        el.setAttribute("material", {shader: "flat", color: "#"+R+G+B});
        /*
        el.setAttribute("geometry",{primitive: "plane", width: .25, height: 0.5});*/
    } else if ($("#entity :selected").text() == "triangle"){ /* if triangle */
        el.setAttribute("id","triangle"+triangleNum++);
        el.setAttribute("geometry",{primitive: "triangle", vertexA: {x: 0, y: 0.1875*125, z: 0}, vertexB: {x: -0.25*125, y: -0.25*125, z: 0}, vertexC: {x: 0.25*125, y: -0.25*125, z: 0}});
        /*let X = Math.random() * 3 - 1.5;
        let Y = Math.random() * 1.5 - .75;
        el.setAttribute("position",{x: X, y: Y, z: -1+(0.00005*numAdded++)});*/
        let R = ((Math.floor(Math.random()*255).toString(16)).toUpperCase()).padStart(2, '0');
        let G = ((Math.floor(Math.random()*255).toString(16)).toUpperCase()).padStart(2, '0');
        let B = ((Math.floor(Math.random()*255).toString(16)).toUpperCase()).padStart(2, '0');
        el.setAttribute("material", {shader: "flat", color: "#"+R+G+B});
    } else if ($("#entity :selected").text() == "gradient"){
        el.setAttribute("id","gradient"+gradientNum++);
        drawGradient(.025*250,.075*250,32,{r: 255, g: 255, b: 255},el);
        /*el.setAttribute("position",{x: 0, y: 0, z: -1+(0.00005*numAdded++)});*/
        el.setAttribute("material",{shader: "flat", color: "#FFFFFF"});
    } else if ($("#entity :selected").text() == "checkerboard"){
        el.setAttribute("id","checkerboard"+checkerboardNum++);
        drawCheckerboard(16,16,.02*250,{r: 255, g: 255, b: 255},el);
        /*el.setAttribute("position",{x: 0, y: 0, z: -1+(0.00005*numAdded++)});*/
        el.setAttribute("material",{shader: "flat", color: "#FFFFFF"});
    } else if ($("#entity :selected").text() == "grille"){
        el.setAttribute("id","grille"+grilleNum++);
        drawGrille(.025*250,.125*250,32,{r: 255, g: 255, b: 255},el);
        /*el.setAttribute("position",{x: 0, y: 0, z: -1+(0.00005*numAdded++)});*/
        el.setAttribute("material",{shader: "flat", color: "#FFFFFF"});
    }
    /* Set default universal stats */

    
    el.setAttribute("click-checker","");
    let THETAX = Math.random() * 110 -55;
    let Y = Math.random() * 30 - 15;
    el.setAttribute("position",{x: -250 * Math.sin((THETAX*Math.PI)/180), y: Y, z: -250 * Math.cos((THETAX*Math.PI)/180)+(0.0001*numAdded++)});
    el.setAttribute("rotation", {x: 0, y: THETAX, z: 0});
    
    el.setAttribute("angle",{x: THETAX});
    

    entityCanvas.appendChild(el); /* add entity to scene */

    /* add entity to potential selections */
    var option = document.createElement("option"); 
    option.text = el.getAttribute("id");
    entitySelector.add(option);

    els.push(el);/* add entity to list of created entities */
    pool.push(el.object3D);
}

function drawPlaneBorder(width,height,fill,color,parent){
        /*let newWidth = (width/2)*Math.sqrt(fill/100);
        let newHeight = (height/2)*Math.sqrt(fill/100);*/

        let newWidth = fill/2;
        let newHeight = fill/2;

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

        vertL.setAttribute("id",parent.getAttribute("id")+"-0");
        vertR.setAttribute("id",parent.getAttribute("id")+"-1");
        horizU.setAttribute("id",parent.getAttribute("id")+"-2");
        horizD.setAttribute("id",parent.getAttribute("id")+"-3");


        parent.appendChild(vertL);
        parent.appendChild(vertR);
        parent.appendChild(horizU);
        parent.appendChild(horizD);
}

function drawGradient(width,height,numBars,color,parent){
    var j = 0;
    while(j < numBars){
        let elChild = document.createElement('a-entity');
        elChild.setAttribute("id",parent.id+"-"+(numBars-j).toString());
        elChild.setAttribute("geometry",{primitive: "plane", width: width, height: height});
        elChild.setAttribute("position",{x: width*numBars/2-(width*j)-(width/2), y: 0, z: 0});
        elChild.setAttribute("material",{shader: "flat", color: "rgb("+Math.ceil(color.r-((color.r/numBars)*j)).toString()+","+Math.ceil(color.g-((color.g/numBars)*j)).toString()+","+Math.ceil(color.b-((color.b/numBars)*j)).toString()+")"});
        parent.appendChild(elChild);
        j++;
    }
}

function drawGrille(width,height,numBars,color,parent){
    var j = 0;
    var isBlack = false;
    while(j < numBars){
        let elChild = document.createElement('a-entity');
        elChild.setAttribute("id",parent.id+"-"+(numBars-j).toString());
        elChild.setAttribute("geometry",{primitive: "plane", width: width, height: height});
        elChild.setAttribute("position",{x: width*numBars/2-(width*j)-(width/2), y: 0, z: 0});
        if(isBlack){
            elChild.setAttribute("material",{shader: "flat", color: "rgb(0,0,0)"});
        } else {
            elChild.setAttribute("material",{shader: "flat", color: "rgb("+color.r.toString()+","+color.g.toString()+","+color.b.toString()+")"});
        }
        isBlack = !isBlack;
        parent.appendChild(elChild);
        j++;
    }
}

function drawCheckerboard(rows,cols,size,color,parent){
    var r = 0;
    var isBlack = false;
    while (r < rows){
        let elChildRow = document.createElement("a-entity");
        elChildRow.setAttribute("id",parent.id+"-"+"row"+r);
        var c = 0;
        while (c < cols){
            let elChildCol = document.createElement("a-entity");
            elChildCol.setAttribute("id",parent.id+"-"+"col"+c);
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
    selectedEntity.setAttribute("angle",{x:-1*parseFloat($("#x").val()), y:-1*parseFloat($("#y").val())});
    selectedEntity.setAttribute("position",{x: -250 * Math.sin((-parseFloat($("#x").val())*Math.PI)/180), y: parseFloat($("#y").val()), z: -250 * Math.cos((-parseFloat($("#x").val())*Math.PI)/180)+(0.0001*numAdded++)});
    selectedEntity.setAttribute("rotation",{x: 0, y: -parseFloat($("#x").val()), z: parseFloat($("#rotation").val())});
    selectedEntity.setAttribute("material",{shader: "flat", src: selectedEntity.getAttribute("material").src, color: $("#color").val()});

    if(selectedEntity.getAttribute("id").includes("circle")){  /* circle only changes */
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
        selectedEntity.setAttribute("fill",{val: parseFloat($("#fill").val())});
        /*selectedEntity.setAttribute("geometry",{primitive: "ring", radiusOuter: parseFloat($("#radius").val()), radiusInner: parseFloat($("#radius").val())*Math.sqrt((100-parseFloat($("#fill").val()))/100)});*/
        selectedEntity.setAttribute("geometry",{primitive: "ring", radiusOuter: parseFloat($("#radius").val()), radiusInner: parseFloat($("#radius").val())-parseFloat($("#fill").val())});
        selectedEntity.setAttribute("material",{shader: "flat", src: selectedEntity.getAttribute("material").src, color: $("#color").val()});
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
        } else if(parseFloat($("#fill").val()) <= 0){
            alert("Border too small (0 < border <= smallest dimension of entity)");
            return;
        } else if((parseFloat($("#width").val()) < parseFloat($("#fill").val())) && (parseFloat($("#width").val()) < parseFloat($("#height").val())) || (parseFloat($("#height").val()) < parseFloat($("#fill").val())) && (parseFloat($("#width").val()) > parseFloat($("#height").val()))){
            alert("Border too large, will change size of entity (0 < border <= smallest dimension of entity)")
        }
        selectedEntity.setAttribute("fill",{val: parseFloat($("#fill").val())});
        if (texture.value == "none"){
            selectedEntity.setAttribute("geometry",{primitive: "plane", width: 0, height: parseFloat($("#height").val())});
            let i = selectedEntity.children.length-1;
            while (i >= 0) {
                selectedEntity.children[i].parentNode.removeChild(selectedEntity.children[i]);
                i--;
            }
            drawPlaneBorder(parseFloat($("#width").val()),parseFloat($("#height").val()),parseFloat($("#fill").val()),hexToRgb($("#color").val()),selectedEntity);
        } else {
            let i = selectedEntity.children.length-1;
            while (i >= 0) {
                selectedEntity.children[i].parentNode.removeChild(selectedEntity.children[i]);
                i--;
            }
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
    } else if (selectedEntity.getAttribute("id").includes("gradient") || selectedEntity.getAttribute("id").includes("grille")){ /* gradient only changes */
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
        if (selectedEntity.getAttribute("id").includes("gradient")){
            drawGradient(parseFloat($("#width").val()),parseFloat($("#height").val()),parseFloat($("#numBarsIn").val()),hexToRgb($("#color").val()),selectedEntity);
        } else {
            drawGrille(parseFloat($("#width").val()),parseFloat($("#height").val()),parseFloat($("#numBarsIn").val()),hexToRgb($("#color").val()),selectedEntity);
        }
        
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