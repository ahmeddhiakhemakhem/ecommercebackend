const express=require('express');
const Scategorie=require("../models/scategorie");
const categorie = require('../models/categorie');

const router=express.Router();
router.post("/", async (req, res) => {
    const scat1 = new Scategorie(req.body)
    try {
        await scat1.save();
        res.status(200).json(scat1);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})
router.get('/',async(req,res)=>{
    try{
    const scat=await Scategorie.find({},null,{sort:{'_id':-1}}).populate("categorieID"); //populate pour jointure des table
    res.status(200).json(scat)
}catch (error) {
     res.status(400).json({ message: error.message });
    }
    
});
router.delete('/:scategorieId',async(req,res)=>{
    try {
    await Scategorie.findByIdAndDelete(req.params.scategorieId);
    res.status(200).json({ message:"sous categorie deleted succesfully "});
        }catch (error){
            res.status(400).json({ message: error.message });
            }
})
router.get('/:scategorieId',async(req,res)=>{
    try {
    const findsCategorie= await Scategorie.findById(req.params.scategorieId);
    res.status(200).json(findsCategorie);
        }catch (error){
            res.status(400).json({ message: error.message });
            }
})
router.put('/:scategorieId',async(req,res)=>{
    try{
    const findsCategorie=await Scategorie.findByIdAndUpdate(req.params.scategorieId,
        {$set:req.body},
    {new:true}
);
res.status(200).json(findsCategorie) 
}catch(error){
    res.status(400).json({ message: error.message });
    
}
});
module.exports=router