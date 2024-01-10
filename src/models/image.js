const mongoose  = require("mongoose")
const path = require("path");
const {Schema} = mongoose

const imageSchema = new Schema ({
    tittle: {type: String},
    description:{type: String},
    filename:{type: String},
    views: { type: Number, default: 0 },
    likes: {type: Number, default: 0},
    timestamp: {type: Date, default: Date.now}


})

//lo que hace esta funcion es reemplazar el nombre de la imagen quitandole la extencion 
//para al visualizarla en la red social solo aparesca el nombre de la imagen
imageSchema.virtual('uniqueId')
.get(function (){
return this.files.map.replace(path.extname(this.filename), '' )
})

const image = mongoose.model('Image', imageSchema)


module.exports= {image}