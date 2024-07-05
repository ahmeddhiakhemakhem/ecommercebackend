const express = require('express');
const article = require("../models/article");
const categorie = require('../models/categorie');
const router = express.Router();
router.post("/", async (req, res) => {
    const art= new Article(req.body)
    try {
        await art.save();
        res.status(200).json(art);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})
router.get('/',async(req,res)=>{
    try{
    const art=await article.find({},null,{sort:{'_id':-1}}).populate("scategorieID");
    res.status(200).json(art)
}catch (error) {
     res.status(400).json({ message: error.message });
    }
    
});
router.delete('/:articleId',async(req,res)=>{
    try {
    await article.findByIdAndDelete(req.params.articleId);
    res.status(200).json({ message:"categorie deleted succesfully "});
        }catch (error){
            res.status(400).json({ message: error.message });
            }
})
router.get('/:articleId',async(req,res)=>{
    try {
    const findArticle= await article.findById(req.params.articleId).populate("scategorieID");
    res.status(200).json(findArticle);
        }catch (error){
            res.status(400).json({ message: error.message });
            }
})
router.put('/:articleId',async(req,res)=>{
    try{
    const findArticle=await article.findByIdAndUpdate(req.params.articleId,
        {$set:req.body},
    {new:true}
);
res.status(200).json(findArticle) 
}catch(error){
    res.status(400).json({ message: error.message });
    
}
});

module.exports=router