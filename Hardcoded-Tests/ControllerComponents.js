/*
    Listens for button inputs and handles them accordingly.
    Any button press on the left controller will move backwards one scene.
    Any button press on the right controller will move forward one scene.
    
*/

/* Code to register thumbstick behavior for left hand */
AFRAME.registerComponent('thumbstick-left',{
init: function () {
    this.el.addEventListener('thumbstickmoved', this.logThumbstick);
},
    logThumbstick: function (evt) {
        if (evt.detail.y > 0.95) {

        }
        if (evt.detail.y < -0.95) { 

        }
        if (evt.detail.x < -0.95) { 

        }
        if (evt.detail.x > 0.95) {

        }
    }
});

/*  */
AFRAME.registerComponent('thumbstick-right',{
init: function () {
    this.el.addEventListener('thumbstickmoved', this.logThumbstick);
},
    logThumbstick: function (evt) {
        if (evt.detail.y > 0.95) {
            
        }
        if (evt.detail.y < -0.95) { 
            
        }
        if (evt.detail.x < -0.95) { 

        }
        if (evt.detail.x > 0.95) {

            
        }

    }
});

AFRAME.registerComponent('trackpad-left',{
    init: function () {
        this.el.addEventListener('trackpadmoved', this.logTrackpad);
    },
        logTrackpad: function (evt) {
            if (evt.detail.y > 0.2) {

            }
            if (evt.detail.y < -0.2) { 

            }
            if (evt.detail.x < -0.2) { 

            }
            if (evt.detail.x > 0.2) {

            }

        }
    });
    
    /*  */
    AFRAME.registerComponent('trackpad-right',{
    init: function () {
        this.el.addEventListener('trackpadmoved', this.logTrackpad);
    },
        logTrackpad: function (evt) {
            if (evt.detail.y > 0.2) {

            }
            if (evt.detail.y < -0.2) { 

            }
            if (evt.detail.x < -0.2) { 

            }
            if (evt.detail.x > 0.2) {

            }

        }
    });

AFRAME.registerComponent('button-listener-r', {
init: function () {
    var el = this.el;

    el.addEventListener('gripdown', function (evt) {
        displayNext(true);
    });
    /*el.addEventListener('gripup', function (evt) {

    });*/

    el.addEventListener('triggerdown', function (evt) {
        updateInfo()
    });
    /*el.addEventListener('triggerup', function (evt) {

    });*/

    el.addEventListener('abuttondown', function (evt) {
        displayNext(true);
    });
    /*el.addEventListener('abuttonup', function (evt) {

    });*/

    el.addEventListener('bbuttondown', function (evt) {
        displayNext(true);
    });
    /*el.addEventListener('bbuttonup', function (evt) {

    });*/

    /*el.addEventListener('menudown', function (evt) {
        menuRightPressed = true;
        rightMenu.setAttribute("value", "Right Menu: Yes"); rightMenu.setAttribute("color","green")
    });*/

    el.addEventListener('thumbstickdown', function (evt) {
        displayNext(true);
    });
    /*el.addEventListener('thumbstickup', function (evt) {
        
    });*/

    el.addEventListener('trackpaddown', function (evt) {
        updateInfo()
    });
/*
    el.addEventListener('trackpadup', function (evt) {
        
    });

    el.addEventListener('trackpadtouchstart', function (evt) {
        
    });

    el.addEventListener('trackpadtouchend', function (evt) {
        
    });*/
}
});

AFRAME.registerComponent('button-listener-l', {
init: function () {
    var el = this.el;

    el.addEventListener('gripdown', function (evt) {
        displayNext(false);
    });
    /*
    el.addEventListener('gripup', function (evt) {

    });*/

    el.addEventListener('triggerdown', function (evt) {
        updateInfo()
    });
    /*
    el.addEventListener('triggerup', function (evt) {

    });*/

    el.addEventListener('xbuttondown', function (evt) {
        displayNext(false);
    });
    
    /*el.addEventListener('xbuttonup', function (evt) {

    });*/

    el.addEventListener('ybuttondown', function (evt) {
        displayNext(false);
    });
    
    /*el.addEventListener('ybuttonup', function (evt) {

    });*/

    /*el.addEventListener('menudown', function (evt) {
        menuLeftPressed = true;
        leftMenu.setAttribute("value", "Left Menu: Yes"); leftMenu.setAttribute("color","green")
    });*/

    el.addEventListener('thumbstickdown', function (evt) {
        displayNext(false);
    });
    /*el.addEventListener('thumbstickup', function (evt) {

    });*/

    el.addEventListener('trackpaddown', function (evt) {
        updateInfo()
    });

    /*el.addEventListener('trackpadup', function (evt) {

    });

    el.addEventListener('trackpadtouchstart', function (evt) {

    });

    el.addEventListener('trackpadtouchend', function (evt) {

    });*/
}
});