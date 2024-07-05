const mongoose=require('mongoose');
const Categorie = require("./categorie.js");

const scategorieSchema=mongoose.Schema({
    nomscategorie:{type:String,require:true},
    imagescategorie:{type:String,require:false},
    categorieID:{type:mongoose.Schema.Types.ObjectId,ref:'Categorie'}
})
module.exports=mongoose.model('Scategorie',scategorieSchema);