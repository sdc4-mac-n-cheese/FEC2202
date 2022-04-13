
let currentdata = [
    {
        "feature": "Lenses",
        "currentitemvalue": "Ultrasheen"
    },
    {
        "feature": "UV Protection",
        "currentitemvalue": null
    },
    {
        "feature": "Frames",
        "currentitemvalue": "LightCompose"
    }
]
let compareddata = [
    {
        "feature": "Lenses",
        "compareditemvalue": "Rubber"
    },
    {
        "feature": "Material",
        "compareditemvalue": "FullControlSkin"
    },
    {
        "feature": "Stitching",
        "compareditemvalue": "Double Stitch"
    }
]
var newdataset = []
for (var i = 0; i < currentdata.length; i++) {
    for (var j = 0; j < compareddata.length; j++) {
        if (currentdata[i].feature === compareddata[j].feature) {
            compareddata[j].currentitemvalue = currentdata[i].currentitemvalue
        }
    }
    // if (Object.values(compareddata).indexOf(currentdata[i].feature)>-1){
    //     let currentfeature=currentdata[i].feature;
    //     compareddata
}
for (var k)
