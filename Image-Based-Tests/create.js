var scene = document.querySelector("a-scene");
var image = scene.querySelector("#im1");

function drawPattern(){
    console.log(image);
    image.setAttribute("src","patterns/"+$("#patterns :selected").text()+".jpg");
}
