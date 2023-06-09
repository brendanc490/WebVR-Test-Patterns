/* DOM */
/* Scene related */
const scene = document.querySelector("a-scene");
const entityCanvas = scene.querySelector("#entityCanvas");

/* Edit Related */
var conRight = document.querySelector("#con-right");
var conLeft = document.querySelector("#con-left");

/* Headers */
const background = document.getElementById("backgroundSettings"); /* header for background settings */
const ent = document.getElementById("entitySettings");
const uni = document.getElementById("universalSettings");
const nonUni = document.getElementById("nonUniversalSettings");
const utility = document.getElementById("utility");
const collapse = document.getElementById("collapse");
const content = document.getElementById("content");
//content.style.display = "block";
const addEditContent = document.getElementById("addEditContent")
const addContent = document.getElementById('addContent')
const editContent = document.getElementById('editContent')
const displayEditContent = document.getElementById("displayEditContent")
const nameIn = document.getElementById('name');
const displayUtility = document.getElementById('displayUtility');
const advanced = document.getElementById('advanced');

collapse.addEventListener("click", function() {
    //this.classList.toggle("active");
    if (content.style.display === "block") {
        collapse.innerHTML = "Show Settings";
        content.style.display = "none";
    } else {
        collapse.innerHTML = "Hide Settings";
        content.style.display = "block";
    }
  });

/* Display scenes */
const pattern = document.getElementById("pattern");
const patternList = document.getElementById("items-list");
/*$( function() {
    $( "#items-list" ).selectable({
     // selected: function(event, ui) { 
     //   $(ui.selected).addClass("ui-selected").siblings().removeClass("ui-selected");           
    }    
    //}
    );
    
  } );*/

const patternDisplay = document.getElementById("patternDisplay");
const scene_display_input = document.getElementById("scene-disp-input");

/* Selection of entity */
const entitySelectorText = document.getElementById("editSelector"); /* current entity container paragraph */
const entitySelector = document.getElementById("entityId"); /* selector */

/* Sky related */
const skyIn = document.getElementById("skyIn"); /* sky color container */
const skyColor = document.getElementById("skyCol"); /* sky color input */
//skyIn.style.width = "75%";

/* Universal attributes */
/* Position related */
const posIn = document.getElementById("posIn"); /* position Container Paragraph */
var xIn = document.getElementById("x"); /* x input */
var yIn = document.getElementById("y"); /* y input */
var zIn = document.getElementById("z"); /* z input */

/* Rotation related */
const rotationZ = document.getElementById("rotationZ");
const rotationY = document.getElementById("rotationY");
const rotationX = document.getElementById("rotationX"); /* rotation container paragraph */ 
//rotationY.style.display = 'none'
//rotationX.style.display = 'none'
const rotIn = document.getElementById("rotIn"); /* rotation input */

/* Color related */
const color = document.getElementById("color"); /* color container paragraph */
const colIn = document.getElementById("colIn"); /* color input */
const colIn2 = document.getElementById("colIn2"); /* color input */
const color2 = document.getElementById("color2"); /* color input */
//colIn.style.width = "75%";

/* Texture related */
const textureIn = document.getElementById("textureIn");
const texture = document.getElementById("texture");
const uploadTextureIn = document.querySelector("#uploadTextureIn");
const texture_input = document.querySelector("#texture-input");

/* Fill related */
const fillIn = document.getElementById("fillIn");
const fill = document.getElementById("fill");

/* Circle only attributes */
/* Radius related */
const radius = document.getElementById("radius"); /* radius container paragraph */
const radiusIn = document.getElementById("radiusIn"); /* radius input */

/* Plane/Gradient only attributes */
/* Width related */
const width = document.getElementById("width"); /* width container paragraph */
const widthIn = document.getElementById("widthIn"); /* width input */

/* Height related */
const height = document.getElementById("height"); /* height container paragraph */
const heightIn = document.getElementById("heightIn"); /* height input */

/* Triangle only attributes */
/* Vertex A related */
const va = document.getElementById("va"); /* vertex A container paragraph */
const vax = document.getElementById("vax"); /* x input */
const vay = document.getElementById("vay"); /* y input */

/* vertex B related */
const vb = document.getElementById("vb"); /* vertex B container paragraph */
const vbx = document.getElementById("vbx"); /* x input */
const vby = document.getElementById("vby"); /* y input */

/* Vertex C related */
const vc = document.getElementById("vc"); /* vertex C container paragraph */
const vcx = document.getElementById("vcx"); /* x input */
const vcy = document.getElementById("vcy"); /* y input */

/* Gradient only attributes */
/* Number of bars related */
const numBars = document.getElementById("numBars"); /* number of bars container paragraph */
const numBarsIn = document.getElementById("numBarsIn"); /* number of bars input */

/* Checkerboard only attributes */
const rows = document.getElementById("rows"); /* rows container paragraph */
const rowsIn = document.getElementById("rowsIn"); /* rows input */
const cols = document.getElementById("cols"); /* columns container paragraph */
const colsIn = document.getElementById("colsIn"); /* columns input */
const tileSize = document.getElementById("tileSize"); /* tile size container paragraph */
const tileSizeIn = document.getElementById("tileSizeIn"); /* tile size input */

/* dotarray attributes */
const circleSize = document.getElementById("circleSize"); /* circle size container paragraph */
const circleSizeIn = document.getElementById("circleSizeIn"); /* circle size input */
const spacing = document.getElementById("spacing"); /* circle size container paragraph */
const spacingIn = document.getElementById("spacingIn"); /* circle size input */
const numDots = document.getElementById("numDots"); /* circle size container paragraph */
const numDotsIn = document.getElementById("numDotsIn"); /* circle size input */
const arrayRadius = document.getElementById("arrayRadius"); /* circle size container paragraph */
const arrayRadiusIn = document.getElementById("arrayRadiusIn"); /* circle size input */
const numCircles = document.getElementById("numCircles"); /* circle size container paragraph */
const numCirclesIn = document.getElementById("numCirclesIn"); /* circle size input */
const arraySpacing = document.getElementById("arraySpacing"); /* circle size container paragraph */
const arraySpacingIn = document.getElementById("arraySpacingIn"); /* circle size input */

/* bullseye attributes */
const numRings = document.getElementById("numRings"); /* circle size container paragraph */
const numRingsIn = document.getElementById("numRingsIn"); /* circle size input */
const ringThickness = document.getElementById("ringThickness"); /* circle size container paragraph */
const ringThicknessIn = document.getElementById("ringThicknessIn"); /* circle size input */
const ringSpacing = document.getElementById("ringSpacing"); /* circle size container paragraph */
const ringSpacingIn = document.getElementById("ringSpacingIn"); /* circle size input */


/* Send back/forward */
/*const sendButton = document.getElementById("sendButton");*/

/* Save Edits Button */
/*const editButton = document.getElementById("editButton");*/

/* Save Scene button */
const saveButton = document.getElementById("saveButton");

/* Add related */
const addChoice = document.getElementById("addChoice"); /* add button container paragraph */
const addButton = document.getElementById("addButton"); /* add button */
const upload = document.getElementById("upload"); /* upload button container paragraph*/
const scene_input = document.querySelector("#scene-input"); /* upload button */

const removeButton = document.getElementById("removeButton"); /* remove button container paragraph */
const duplicateButton = document.getElementById("duplicateButton");

/* Local Variables */
var el = null; /* recently created entity */
var els = new Array(); /* array of all created entities */
var pool = new Array();

var sky = scene.querySelector("#sky"); /* sky */

var selectedEntity = null; /* selected entity */

var circleNum = 0; /* number of circles created */
var planeNum = 0; /* number of planes created */
var triangleNum = 0; /* number of triangles created */
var gradientNum = 0; /* number of gradients created */
var checkerboardNum = 0; /* number of checkerboards created */
var grilleNum = 0;
var dotarrayNum = 0;
var circularDotarrayNum = 0;
var bullseyeNum = 0;
var textureNum = 0;
var numAdded = 0; /* total entities added */

var boolAddEdit = false;
var boolDisplayEdit = true; /* toggle for add or edit element */

var fileContent = null; /* contents of uploaded JSON file */

var uploadedTextureFormat = {};


const coreLayout = document.getElementById('coreLayout');
const packageLayout = document.getElementById('packageLayout');
const editPatternLayout = document.getElementById('editPatternLayout');
const packageSelect = document.getElementById('packageDisplay')
patternList.setAttribute('multi-select',false);


let items = document.querySelectorAll('#items-list > li');

items.forEach(item => {
  $(item).prop('draggable', true)
  item.addEventListener('dragstart', dragStart)
  item.addEventListener('drop', dropped)
  item.addEventListener('dragenter', cancelDefault)
  item.addEventListener('dragover', cancelDefault)
  item.addEventListener('click',selectPattern)
})

function selectPattern (e){
  e.target.style.background = '#F39814'
  items = document.querySelectorAll('#items-list > li');
  if(keysPressed['ctrl'] && !isNaN(parseInt(patternList.getAttribute('selectedIndex')))){
    patternList.setAttribute("multi-select",true);
    return;
  }
  items.forEach(item => {
    if(item != e.target){
      item.style.background = '#FFF'
    } else {
      patternList.setAttribute("selectedIndex",$(item).index())
      patternList.setAttribute("multi-select",false);
      revertChanges()
      addEntitiesFromScene(scenes[packageSelect.value][patternList.children[parseInt(patternList.getAttribute('selectedIndex'))].textContent])
      if(els.length > 0){
        selectedEntity = els[0]
      }
    }
  })
  
}

function dragStart (e) {
  var index = $(e.target).index()
  e.dataTransfer.setData('text/plain', index)
}

function dropped (e) {
  cancelDefault(e)
  
  // get new and old index
  let oldIndex = e.dataTransfer.getData('text/plain')
  let target = $(e.target)
  let newIndex = target.index()
  
  // remove dropped items at old place
  let dropped = $(this).parent().children().eq(oldIndex).remove()

  // insert the dropped items at new place
  if (newIndex < oldIndex) {
    target.before(dropped)
  } else {
    target.after(dropped)
  }
}

function cancelDefault (e) {
  e.preventDefault()
  e.stopPropagation()
  return false
}