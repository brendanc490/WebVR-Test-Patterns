/* Loads in prebuilt scenes and adds them to scenes json */

import red from './patterns/red.JSON' assert { type: "json" };
scenes['red'] = red['scenes']['default']

import green from './patterns/green.JSON' assert { type: "json" };
scenes['green'] = green['scenes']['default']

import blue from './patterns/blue.JSON' assert { type: "json" };
scenes['blue'] = blue['scenes']['default']

import white from './patterns/white.JSON' assert { type: "json" };
scenes['white'] = white['scenes']['default']

import grille from './patterns/grille.JSON' assert { type: "json" };
scenes['grille'] = grille['scenes']['default']

import line from './patterns/line.JSON' assert { type: "json" };
scenes['line'] = line['scenes']['line']

import checkerboard_w from './patterns/checkerboard (w).JSON' assert { type: "json" };
scenes['checkerboard (w)'] = checkerboard_w['scenes']['checkerboard (w)']

import checkerboard_b from './patterns/checkerboard (b).JSON' assert { type: "json" };
scenes['checkerboard (b)'] = checkerboard_b['scenes']['checkerboard (b)']

import dot_array from './patterns/dot array.JSON' assert { type: "json" };
scenes['dot array'] = dot_array['scenes']['dot array']

import circular_dot_array from './patterns/circularDotArray.JSON' assert { type: "json" };
scenes['circular dot array'] = circular_dot_array['scenes']['circularDotArray']

import crosshair from './patterns/crosshair.JSON' assert { type: "json" };
scenes['crosshair'] = crosshair['scenes']['crosshair']

import ring_package from './patterns/pattern_package_ring_w5_10_20.JSON' assert { type: "json" };
scenes['ring_w5'] = ring_package['scenes']['ring_w5']
scenes['ring_w10'] = ring_package['scenes']['ring_w10']
scenes['ring_w20'] = ring_package['scenes']['ring_w20']

let arr = Object.keys(scenes)
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
    uploadedTextureFormat = tmp
        
