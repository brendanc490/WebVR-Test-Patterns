window.onload = function() {
    let thisPage = new URL(window.location);
    let id = thisPage.searchParams.forEach( id => {
        pastebinFetch('https://pastebin.run/'+id+'.txt');
    })
    recentPackages.selectedIndex = -1
    let i = 1;
    while(i < localStorage.length){
        var option = document.createElement("option");
        option.text = localStorage.getItem("key"+i)
        recentPackages.add(option);
        if(id == option.text){
            recentPackages.selectedIndex = i-1;
        }
        i++;
    }
    
    
  };


async function pastebinFetch(url){
    var fileContent = await fetch(url).then((res) => {
        if(res.ok != true){
            return null
            
        } else {
            console.log(url)
           return res.json()
        }
    });
    manageLocalStorage(fileContent['filename'] + " ("+url.split("https://pastebin.run/")[1].split(".txt")[0]+")")
    scenes[fileContent['filename']] = fileContent['scenes']
    names[fileContent['filename']] = {}
    Object.keys(fileContent['scenes']).forEach( name => {
        currName = name.split(' (')[0];
        if(names[fileContent['filename']][currName]){
            currName = currName + ' ('+names[fileContent['filename']][currName]+')'
            names[fileContent['filename']][name.split(' (')[0]] = names[fileContent['filename']][name.split(' (')[0]] + 1
        } else {
            names[fileContent['filename']][currName] = 1
        }
    });

    textures = fileContent['textures']['textureValues']
    uploadedTextureFormats = fileContent['textures']['uploadedTextureFormats']

    let arr = Object.keys(scenes)
    let len = arr.length
    let i = 0;
    let len2 = texture.options.length;
    currTextures = []
    while(i < len2){
        currTextures.push(texture.options[i].text)
        i++;
    }
    i = 0;
    uploadedTextures = []
    while(i < textures.length){
        uploadedTextures.push(textures[i].text)
        i++;
    }
    newTextures = [...new Set([...uploadedTextures,...currTextures])]
    newTextures.forEach(text => {
        var option = document.createElement("option"); 
        if(uploadedTextures.indexOf(text) != -1 && currTextures.indexOf(text) == -1){
            option.text = textures[uploadedTextures.indexOf(text)].text
            option.value = textures[uploadedTextures.indexOf(text)].val
            texture.add(option);
        }
        

    })


    newUploadedTextureFormat = [...new Set([...Object.keys(uploadedTextureFormat),...Object.keys(uploadedTextureFormats)])]
    tmp = {}
    newUploadedTextureFormat.forEach(texture => {
        if(Object.keys(uploadedTextureFormat).indexOf(texture) != -1){
            tmp[texture] = uploadedTextureFormat[texture]
        } else {
            tmp[texture] = uploadedTextureFormats[texture]
        }
    });
    uploadedTextureFormat = tmp
    flag = false;
    i = 0;
    while(i < packageSelect.options.length){
        if(packageSelect.options[i].value == fileContent['filename']){
            alert('A package with this name already exists');
            return
        }
        i++;
    }

    packageSelect.options.add(new Option(fileContent['filename'],fileContent['filename']))
    packageSelect.value = fileContent['filename']
    changePackage()
}

function compressTextures(textures){
    textures.forEach( texture => {
        if(texture['val'].split("url(data:image/png;base64").length > 1){
            // compress texture and post it
            // save id as pastebin(<id>)
            //let compressed = LZString.compressToBase64(texture.val.split(',')[1].split(')')[0])
            let code = {name: texture['name'], val: texture.val.split(',')[1].split(')')[0]}
            console.log(texture.val.split(',')[1].split(')')[0])
            fetch('https://pastebin.run/api/v1/pastes', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                },
                body: "code="+JSON.stringify(code)
            })
            .then(response => {return response.text()}).then( async function (text) {
                try {
                    alert("URL copied to clipboard: "+ text);
                } catch (err) {
                    console.error('Failed to copy: ', err);
                }
            })
                }
            })
}

async function pastebinPost(){
    textures = []
    // get all textures
    i = 0;
    while(i < texture.options.length){
        textures.push({val: texture.options[i].value, text: texture.options[i].text});
        i++;
    }
    let code = {filename: packageSelect.value, scenes: scenes[packageSelect.value], textures: {uploadedTextureFormats: {}, textureValues: []}, date: ""}
    let compressedTextures = compressTextures(textures);
    code['textures']['textureValues'] = textures
    code['textures']['uploadedTextureFormats'] = uploadedTextureFormat
    // add date
    code['date'] = new Date().toLocaleString();
    console.log(code)
    fetch('https://pastebin.run/api/v1/pastes', {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    body: "code="+JSON.stringify(code)
})
   .then(response => {return response.text()}).then( async function (text) {
    try {
        let thisPage = new URL(window.location);
        newUrl = thisPage.origin+thisPage.pathname+"?id="+text
        manageLocalStorage(packageSelect.value+" ("+text+")");
        await navigator.clipboard.writeText(newUrl);
        alert("URL copied to clipboard: "+ newUrl);
        window.location = newUrl
      } catch (err) {
        console.error('Failed to copy: ', err);
      }
   })
}

function manageLocalStorage(key){

    let i = localStorage.length < 6 ? localStorage.length : 5;
    while(i > 0){
        localStorage.setItem("key"+i,localStorage.getItem("key"+(i-1)))
        i--;
    }
    localStorage.setItem("key1",key)
    i = 2;
    while(i < localStorage.length){
        if(localStorage.getItem("key"+i) == key){
            // delete current entry and shift everything down
            while(i < localStorage.length-1){
                localStorage.setItem("key"+i,localStorage.getItem("key"+(i+1)))
                i++;
            }
            localStorage.removeItem("key"+(localStorage.length-1))
            break;
        }
        i++;
    }
    /*if(localStorage.length == 6){
        localStorage.setItem("key5",localStorage.getItem("key4"))
        localStorage.setItem("key4",localStorage.getItem("key3"))
        localStorage.setItem("key3",localStorage.getItem("key2"))
        localStorage.setItem("key2",localStorage.getItem("key1"))
        localStorage.setItem("key1",key)
        
    } else {
        localStorage.setItem("key"+localStorage.length,key)
    }*/
}

function changeUrl(){
    if(recentPackages.value == "none"){
        return
    }
    let thisPage = new URL(window.location);
    newUrl = thisPage.origin+thisPage.pathname+"?id="+recentPackages.value
    window.location = newUrl
}