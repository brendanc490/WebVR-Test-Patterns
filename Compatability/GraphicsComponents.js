AFRAME.registerComponent('button',{
    schema: {
        isPressed: {type: 'boolean', default:false}
    },
    init: function () {},
    update: function () {},
    tick: function() {
        if (this.data.isPressed) {
            this.el.setAttribute("material","shader: flat; color: #FFFFFF; side:double")
        } else {
            if(this.el.id.includes( "ThumbIndicator")){
                this.el.setAttribute("material","shader: flat; color: #222222; side:double")
            } else {
                this.el.setAttribute("material","shader: flat; color: #797979; side:double")
            }
        }
    },
    remove: function () {},
    pause: function () {},
    play: function () {}
})

AFRAME.registerComponent('position-updates-cam',{
    schema: {},
    init: function () {},
    update: function () {},
    tick: function() {
        document.querySelector("#devCoords").setAttribute("value","x: "+this.el.getAttribute("position").x.toFixed(2)+", y: "+this.el.getAttribute("position").y.toFixed(2)+", z: "+this.el.getAttribute("position").z.toFixed(2)
        +" \n pitch: "+this.el.getAttribute("rotation").x.toFixed(2)+", yaw: "+this.el.getAttribute("rotation").y.toFixed(2)+", roll: "+this.el.getAttribute("rotation").z.toFixed(2)) },
    remove: function () {},
    pause: function () {},
    play: function () {}
})

AFRAME.registerComponent('position-updates-left',{
    schema: {},
    init: function () {},
    update: function () {},
    tick: function() {
        document.querySelector("#leftCoords").setAttribute("value","x: "+this.el.getAttribute("position").x.toFixed(2)+", y: "+this.el.getAttribute("position").y.toFixed(2)+", z: "+this.el.getAttribute("position").z.toFixed(2)
        +" \n pitch: "+this.el.getAttribute("rotation").x.toFixed(2)+", yaw: "+this.el.getAttribute("rotation").y.toFixed(2)+", roll: "+this.el.getAttribute("rotation").z.toFixed(2)) },
    remove: function () {},
    pause: function () {},
    play: function () {}
})

AFRAME.registerComponent('position-updates-right',{
    schema: {},
    init: function () {},
    update: function () {},
    tick: function() {
        document.querySelector("#rightCoords").setAttribute("value","x: "+this.el.getAttribute("position").x.toFixed(2)+", y: "+this.el.getAttribute("position").y.toFixed(2)+", z: "+this.el.getAttribute("position").z.toFixed(2)
        +" \n pitch: "+this.el.getAttribute("rotation").x.toFixed(2)+", yaw: "+this.el.getAttribute("rotation").y.toFixed(2)+", roll: "+this.el.getAttribute("rotation").z.toFixed(2)) },
    remove: function () {},
    pause: function () {},
    play: function () {}
})



