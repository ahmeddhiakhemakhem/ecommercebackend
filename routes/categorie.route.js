const express = require('express');
const Categorie = require("../models/categorie");
const categorie = require('../models/categorie');
const { verifyToken } = require('../middleware/verify-token');
const { authorizeRoles } = require('../middleware/authorizeRoles');
const router = express.Router();
router.post("/",verifyToken,authorizeRoles("admin","visiteur",), async (req, res) => {
    const cat1 = new Categorie(req.body)
    try {
        await cat1.save();
        res.status(200).json(cat1);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})
router.get('/',async(req,res)=>{
    try{
    const cat=await Categorie.find({},null,{sort:{'_id':-1}});
    res.status(200).json(cat)
}catch (error) {
     res.status(400).json({ message: error.message });
    }
    
});
router.delete('/:categorieId',async(req,res)=>{
    try {
    await Categorie.findByIdAndDelete(req.params.categorieId);
    res.status(200).json({ message:"categorie deleted succesfully "});
        }catch (error){
            res.status(400).json({ message: error.message });
            }
})
router.get('/:categorieId',async(req,res)=>{
    try {
    const findCategorie= await Categorie.findById(req.params.categorieId);
    res.status(200).json(findCategorie);
        }catch (error){
            res.status(400).json({ message: error.message });
            }
})
router.put('/:categorieId',async(req,res)=>{
    try{
    const findCategorie=await Categorie.findByIdAndUpdate(req.params.categorieId,
        {$set:req.body},
    {new:true}
);
res.status(200).json(findCategorie) 
}catch(error){
    res.status(400).json({ message: error.message });
    
}
});

module.exports=router