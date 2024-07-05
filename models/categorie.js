const mongoose=require("mongoose")
const categorieSchema=mongoose.Schema({
    nomcategorie:{type:String,require:true,unique:true},
    imagecategorie:{type:String,require:false}
})
module.exports=mongoose.model('Categorie',categorieSchema)