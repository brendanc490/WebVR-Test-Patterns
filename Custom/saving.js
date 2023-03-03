/* 
    Handles processes involved in saving scenes alone or in groups.

*/

/* saves single scene in JSON format */
function saveScene(){
    // get all of the current texture options
    let i = 0;
    let arr = [];
    let data = {scenes: {}, textures: {uploadedTextureFormats: {}, textureValues: []}, date: ""}
    while(i < texture.options.length){
        arr.push({val: texture.options[i].value, text: texture.options[i].text});
        i++;
    }
    // add textures and uploaded textures
    data["textures"]['textureValues'] = arr;
    data["textures"]['uploadedTextureFormats'] = uploadedTextureFormat;
    // add single scene
    data['scenes'][patternDisplay.value] = scenes[[patternDisplay.value]]
    // add current date
    data['date'] = new Date().toLocaleString();
    var blob = new Blob([JSON.stringify(data, null, '\t')], { type: "text/plain;charset=utf-8" });
    saveAs(blob, patternDisplay.value+".JSON"); // save object as JSON file
}

/* saves package of scenes in JSON format */
function saveSelected(){
    let data = {scenes: {}, textures: {uploadedTextureFormats: {}, textureValues: []}, date: ""}
    let i = 0;
    let len = patternDisplay.options.length
    textures = []
    // get all textures
    while(i < texture.options.length){
        textures.push({val: texture.options[i].value, text: texture.options[i].text});
        i++;
    }
    // get all scenes
    i = 0;
    while(i < len){
        data['scenes'][patternDisplay.options[i].text] = scenes[[patternDisplay.options[i].text]]
        i++;
    }
    // add textures
    data['textures']['textureValues'] = textures
    data['textures']['uploadedTextureFormats'] = uploadedTextureFormat
    // add date
    data['date'] = new Date().toLocaleString();
    var blob = new Blob([JSON.stringify(data, null, '\t')], { type: "text/plain;charset=utf-8" });
    saveAs(blob, "pattern_package.JSON"); // save object as JSON file
}
