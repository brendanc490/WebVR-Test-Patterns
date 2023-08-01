var scene = document.querySelector("a-scene");
var image = scene.querySelector("#im1");
var patterns = document.getElementById("patterns");

function drawPattern(){
    console.log(image);
    image.setAttribute("src","#"+patterns.value);
}
