import data from './controller_profiles.json' assert { type: "json" };
const windows = data[0]['windows']
const oc_touch = data[0]['oc_touch']
const oc_go = data[0]['oc_go']
const vive = data[0]['vive']
const vive_focus = data[0]['vive_focus']
// contains all possible buttons and axes
const generic = data[0]['generic']






conLeft.addEventListener('buttondown', function (evt) {
    if(scheme == 'windows-mixed-reality'){
        conLeft.dispatchEvent(CustomEvent(windows['left'][evt.detail.id]+'down', {detail:{}}))
    }  else if(scheme == 'oculus-touch' || scheme == 'oculus-touch-v2' || scheme == 'oculus-touch-v3' || scheme == 'meta-quest-touch-pro') {
        conLeft.dispatchEvent(CustomEvent(oc_touch['left'][evt.detail.id]+'down', {detail:{}}))
    } else if (scheme = 'oculus-go'){
        conLeft.dispatchEvent(CustomEvent(oc_go['left'][evt.detail.id]+'down', {detail:{}}))
    } else if(scheme == 'htc-vive' || scheme == 'htc-vive-focus-plus') {
        conLeft.dispatchEvent(CustomEvent(vive['left'][evt.detail.id]+'down', {detail:{}}))
    } else if(scheme == 'htc-vive-focus') {
        conLeft.dispatchEvent(CustomEvent(vive_focus['left'][evt.detail.id]+'down', {detail:{}}))
    } else {
        conLeft.dispatchEvent(CustomEvent(generic['left'][evt.detail.id]+'down', {detail:{}}))
    }
});

conRight.addEventListener('buttondown', function (evt) {
    if(scheme == 'windows-mixed-reality'){
        conRight.dispatchEvent(CustomEvent(windows['right'][evt.detail.id]+'down', {detail:{}}))
    }  else if(scheme == 'oculus-touch' || scheme == 'oculus-touch-v2' || scheme == 'oculus-touch-v3' || scheme == 'meta-quest-touch-pro') {
        conRight.dispatchEvent(CustomEvent(oc_touch['right'][evt.detail.id]+'down', {detail:{}}))
    } else if (scheme = 'oculus-go'){
        conRight.dispatchEvent(CustomEvent(oc_go['right'][evt.detail.id]+'down', {detail:{}}))
    } else if(scheme == 'htc-vive' || scheme == 'htc-vive-focus-plus') {
        conRight.dispatchEvent(CustomEvent(vive['right'][evt.detail.id]+'down', {detail:{}}))
    } else if(scheme == 'htc-vive-focus') {
        conRight.dispatchEvent(CustomEvent(vive_focus['right'][evt.detail.id]+'down', {detail:{}}))
    } else {
        conRight.dispatchEvent(CustomEvent(generic['right'][evt.detail.id]+'down', {detail:{}}))
    }
});

conLeft.addEventListener('buttonup', function (evt) {
    if(scheme == 'windows-mixed-reality'){
        conLeft.dispatchEvent(CustomEvent(windows['left'][evt.detail.id]+'up', {detail:{}}))
    }  else if(scheme == 'oculus-touch' || scheme == 'oculus-touch-v2' || scheme == 'oculus-touch-v3' || scheme == 'meta-quest-touch-pro') {
        conLeft.dispatchEvent(CustomEvent(oc_touch['left'][evt.detail.id]+'up', {detail:{}}))
    } else if (scheme = 'oculus-go'){
        conLeft.dispatchEvent(CustomEvent(oc_go['left'][evt.detail.id]+'up', {detail:{}}))
    }   else if(scheme == 'htc-vive' || scheme == 'htc-vive-focus-plus') {
        conLeft.dispatchEvent(CustomEvent(vive['left'][evt.detail.id]+'up', {detail:{}}))
    } else if(scheme == 'htc-vive-focus') {
        conLeft.dispatchEvent(CustomEvent(vive_focus['left'][evt.detail.id]+'up', {detail:{}}))
    } else {
        conLeft.dispatchEvent(CustomEvent(generic['left'][evt.detail.id]+'up', {detail:{}}))
    }
});

conRight.addEventListener('buttonup', function (evt) {
    if(scheme == 'windows-mixed-reality'){
        conRight.dispatchEvent(CustomEvent(windows['right'][evt.detail.id]+'up', {detail:{}}))
    }  else if(scheme == 'oculus-touch' || scheme == 'oculus-touch-v2' || scheme == 'oculus-touch-v3' || scheme == 'meta-quest-touch-pro') {
        conRight.dispatchEvent(CustomEvent(oc_touch['right'][evt.detail.id]+'up', {detail:{}}))
    } else if (scheme = 'oculus-go'){
        conRight.dispatchEvent(CustomEvent(oc_go['right'][evt.detail.id]+'up', {detail:{}}))
    }   else if(scheme == 'htc-vive' || scheme == 'htc-vive-focus-plus') {
        conRight.dispatchEvent(CustomEvent(vive['right'][evt.detail.id]+'up', {detail:{}}))
    } else if(scheme == 'htc-vive-focus') {
        conRight.dispatchEvent(CustomEvent(vive_focus['right'][evt.detail.id]+'up', {detail:{}}))
    } else {
        conRight.dispatchEvent(CustomEvent(generic['right'][evt.detail.id]+'up', {detail:{}}))
    }
});

conLeft.addEventListener('axismove', function (evt) {
    if(scheme == "windows-mixed-reality"){
        let trackpadmove = new CustomEvent('trackpadmoved', {
            detail: {
                x: evt.detail.axis[0],
                y: evt.detail.axis[1]
            }
        })
        conLeft.dispatchEvent(trackpadmove)
        let thumbstickmove = new CustomEvent('thumbstickmoved', {
            detail: {
                x: evt.detail.axis[2],
                y: evt.detail.axis[3]
            }
        })
        conLeft.dispatchEvent(thumbstickmove)
    } else if(scheme == "oculus-touch" || scheme == 'oculus-touch-v2' || scheme == 'oculus-touch-v3' || scheme == 'meta-quest-touch-pro'){
        let thumbstickmove = new CustomEvent('thumbstickmoved', {
            detail: {
                x: evt.detail.axis[2],
                y: evt.detail.axis[3]
            }
        })
        conLeft.dispatchEvent(thumbstickmove)
    } else if (scheme = 'oculus-go'){
        let touchpadmove = new CustomEvent('touchpadmoved', {
            detail: {
                x: evt.detail.axis[0],
                y: evt.detail.axis[1]
            }
        })
        conLeft.dispatchEvent(touchpadmove)
    }  else if(scheme == 'htc-vive' || scheme == 'htc-vive-focus-plus' || scheme == 'htc-vive-focus') {
        let trackpadmove = new CustomEvent('trackpadmoved', {
            detail: {
                x: evt.detail.axis[0],
                y: evt.detail.axis[1]
            }
        })
        conLeft.dispatchEvent(trackpadmove)
    } else {
        let touchpadmove = new CustomEvent('touchpadmoved', {
            detail: {
                x: evt.detail.axis[0],
                y: evt.detail.axis[1]
            }
        })
        conLeft.dispatchEvent(touchpadmove)
        let thumbstickmove = new CustomEvent('thumbstickmoved', {
            detail: {
                x: evt.detail.axis[2],
                y: evt.detail.axis[3]
            }
        })
        conLeft.dispatchEvent(thumbstickmove)
    }
});

conRight.addEventListener('axismove', function (evt) {
    if(scheme == "windows-mixed-reality"){
        let trackpadmove = new CustomEvent('trackpadmoved', {
            detail: {
                x: evt.detail.axis[0],
                y: evt.detail.axis[1]
            }
        })
        conRight.dispatchEvent(trackpadmove)
        let thumbstickmove = new CustomEvent('thumbstickmoved', {
            detail: {
                x: evt.detail.axis[2],
                y: evt.detail.axis[3]
            }
        })
        conRight.dispatchEvent(thumbstickmove)
    } else if(scheme == "oculus-touch" || scheme == 'oculus-touch-v2' || scheme == 'oculus-touch-v3' || scheme == 'meta-quest-touch-pro'){
        let thumbstickmove = new CustomEvent('thumbstickmoved', {
            detail: {
                x: evt.detail.axis[2],
                y: evt.detail.axis[3]
            }
        })
        conRight.dispatchEvent(thumbstickmove)
    } else if (scheme = 'oculus-go'){
        let touchpadmove = new CustomEvent('touchpadmoved', {
            detail: {
                x: evt.detail.axis[0],
                y: evt.detail.axis[1]
            }
        })
        conRight.dispatchEvent(touchpadmove)
    }  else if(scheme == 'htc-vive' || scheme == 'htc-vive-focus-plus' || scheme == 'htc-vive-focus') {
        let trackpadmove = new CustomEvent('trackpadmoved', {
            detail: {
                x: evt.detail.axis[0],
                y: evt.detail.axis[1]
            }
        })
        conRight.dispatchEvent(trackpadmove)
    } else {
        let touchpadmove = new CustomEvent('touchpadmoved', {
            detail: {
                x: evt.detail.axis[0],
                y: evt.detail.axis[1]
            }
        })
        conRight.dispatchEvent(touchpadmove)
        let thumbstickmove = new CustomEvent('thumbstickmoved', {
            detail: {
                x: evt.detail.axis[2],
                y: evt.detail.axis[3]
            }
        })
        conRight.dispatchEvent(thumbstickmove)
    }
});