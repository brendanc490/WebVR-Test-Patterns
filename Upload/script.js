var uploaded_image;
const plane = document.querySelector("a-image");
const image_input = document.querySelector("#image-input");
const cam = document.querySelector("a-camera");
const zoomSlider = document.getElementById("zoomSlider");
const zoomText = document.getElementById("zoomVal");

/* If the zoom slider is changed */
zoomSlider.oninput = function() {
    /* Update value in textbox */
    zoomText.value = this.value;
    /* Set zoom to be new height */
    cam.sceneEl.camera.zoom = this.value;
}

/* If the textbox for height is changed */
$("#zoomVal").change(function() {
    cam.sceneEl.camera.zoom = zoomText.value;
    zoomSlider.value = zoomText.value;
  });

function zoomCam(step){
    cam.sceneEl.camera.zoom += step;
    zoomSlider.value = cam.sceneEl.camera.zoom;
    zoomText.value = cam.sceneEl.camera.zoom;
}


cam.sceneEl.camera.zoom = 1;
cam.sceneEl.camera.fov = 80;
image_input.addEventListener("change", function() {
    document.querySelector("a-plane").setAttribute("visible","false");
    const reader = new FileReader();
    reader.addEventListener("load", () => {
        uploaded_image = reader.result;
    });
    reader.readAsDataURL(this.files[0]);
    reader.onload = function (e) {
        //Initiate the JavaScript Image object.
        var image = new Image();

        //Set the Base64 string return from FileReader as source.
        image.src = e.target.result;
        
        //Validate the File Height and Width.
        image.onload = function () {
            var height = this.height;
            var width = this.width;
            plane.setAttribute("src",`url(${uploaded_image})`);
            plane.setAttribute("width",1);
            plane.setAttribute("height",1/(width/height));
            plane.setAttribute("visible","true");
            recenter();
        };
    }
});

function recenter(){
    const height = plane.getAttribute("geometry").height;
    const width = plane.getAttribute("geometry").width;
    const distance = cam.object3D.position.distanceTo(plane.object3D.position);
    var newDistance = 0;
    if (width > height) {
        const fov = cam.sceneEl.camera.fov * (Math.PI / 180);
       newDistance = Math.abs((width / 2) / Math.tan(fov / 2));
    } else {
        const fov = cam.sceneEl.camera.fov * (Math.PI / 180);
        newDistance = Math.abs((height / 2) / Math.tan(fov / 2));
    }
    cam.sceneEl.camera.zoom = (distance / newDistance);
    zoomText.value = (distance/newDistance);
    zoomSlider.value = (distance/newDistance);
}