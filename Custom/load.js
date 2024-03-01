/* Loads in prebuilt scenes and adds them to scenes json */

import red from './patterns/red.JSON' assert { type: "json" };
scenes['default']['red'] = red['scenes']['default']

import green from './patterns/green.JSON' assert { type: "json" };
scenes['default']['green'] = green['scenes']['default']

import blue from './patterns/blue.JSON' assert { type: "json" };
scenes['default']['blue'] = blue['scenes']['default']

import white from './patterns/white.JSON' assert { type: "json" };
scenes['default']['white'] = white['scenes']['default']

import black from './patterns/black.JSON' assert { type: "json" };
scenes['default']['black'] = black['scenes']['default']

import grille from './patterns/grille.JSON' assert { type: "json" };
scenes['default']['grille'] = grille['scenes']['default']

import line from './patterns/line.JSON' assert { type: "json" };
scenes['default']['line'] = line['scenes']['line']

import checkerboard_w from './patterns/checkerboard_w.JSON' assert { type: "json" };
scenes['default']['checkerboard_w'] = checkerboard_w['scenes']['checkerboard_w']

import checkerboard_b from './patterns/checkerboard_b.JSON' assert { type: "json" };
scenes['default']['checkerboard_b'] = checkerboard_b['scenes']['checkerboard_b']

import dot_array from './patterns/dot array.JSON' assert { type: "json" };
scenes['default']['dot array'] = dot_array['scenes']['dot array']

import circular_dot_array from './patterns/circularDotArray.JSON' assert { type: "json" };
scenes['default']['circular dot array'] = circular_dot_array['scenes']['circularDotArray']

import crosshair from './patterns/crosshair.JSON' assert { type: "json" };
scenes['default']['crosshair'] = crosshair['scenes']['crosshair']

/*import bullseye from './patterns/bullseye.JSON' assert { type: "json" };
scenes['default']['bullseye'] = bullseye['scenes']['bullseye']*/

/*import ring_package from './patterns/pattern_package_ring_w5_10_20.JSON' assert { type: "json" };
scenes['default']['ring_w5'] = ring_package['scenes']['ring_w5']
scenes['default']['ring_w10'] = ring_package['scenes']['ring_w10']
scenes['default']['ring_w20'] = ring_package['scenes']['ring_w20']*/

import ring_w1 from './patterns/ring_w1.JSON' assert { type: "json" };
scenes['default']['ring_w1'] = ring_w1['scenes']['ring_w1']

import ring_w2 from './patterns/ring_w2.JSON' assert { type: "json" };
scenes['default']['ring_w2'] = ring_w2['scenes']['ring_w2']

import ring_w5 from './patterns/ring_w5.JSON' assert { type: "json" };
scenes['default']['ring_w5'] = ring_w5['scenes']['ring_w5']

import flying_spot from './patterns/Flying_Spot.JSON' assert { type: "json" };
scenes['default']['Flying Spot'] = flying_spot['scenes']['Flying Spot']

console.log('Scenes')
console.log(scenes)
/*let arr = Object.keys(scenes)
    let len = arr.length
    let i = 0;
    let len2 = texture.options.length;
    let currTextures = [];
    while(i < len2){
        currTextures.push(texture.options[i].text)
        i++;
    }
    i = 0;
    let uploadedTextures = []
    while(i < ring_package['textures']['textureValues'].length){
        uploadedTextures.push(ring_package['textures']['textureValues'][i].text)
        i++;
    }
    let newTextures = [...new Set([...uploadedTextures,...currTextures])]
    newTextures.forEach(text => {
        var option = document.createElement("option"); 
        if(uploadedTextures.indexOf(text) != -1 && currTextures.indexOf(text) == -1){
            option.text = ring_package['textures']['textureValues'][uploadedTextures.indexOf(text)].text
            option.value = ring_package['textures']['textureValues'][uploadedTextures.indexOf(text)].val
            texture.add(option);
        }});

    // combines uploaded textures in uploaded file and current file
    let newUploadedTextureFormat = [...new Set([...Object.keys(uploadedTextureFormat),...Object.keys(ring_package['textures']['uploadedTextureFormats'])])]
    let tmp = {}
    newUploadedTextureFormat.forEach(texture => {
        if(Object.keys(uploadedTextureFormat).indexOf(texture) != -1){
            tmp[texture] = uploadedTextureFormat[texture]
        } else {
            tmp[texture] = ring_package['textures']['uploadedTextureFormats'][texture]
        }
    });
    uploadedTextureFormat = tmp*/
        
