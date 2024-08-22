const express = require('express');
const article = require("../models/article");
const categorie = require('../models/categorie');
const router = express.Router();
const { verifyToken } = require("../middleware/verify-token")
router.post("/", async (req, res) => {
    const art = new article(req.body)
    try {
        await art.save();
        res.status(200).json(art);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})
router.get('/art/pagination', async (req, res) => {
    const filter = req.query.filter || ""; //search
    const page = parseInt(req.query.page);
    const pageSize = parseInt(req.query.pageSize);
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const articles = await article.find({ designation: { $regex: filter, $options: "i" } }, null, { sort: { '_id': -1 } }).populate("scategorieID").exec()
    const paginationProducts = articles.slice(startIndex, endIndex)
    const totalPages = Math.ceil(articles.length / pageSize)

    res.json({ products: paginationProducts, totalPages });
})

// afficher la liste des articles.
router.get('/', verifyToken, async (req, res) => {
    try {
        const articles = await Article.find();
        res.status(200).json(articles);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});
router.delete('/:articleId', async (req, res) => {
    try {
        await article.findByIdAndDelete(req.params.articleId);
        res.status(200).json({ message: "categorie deleted succesfully " });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})
router.get('/:articleId', async (req, res) => {
    try {
        const findArticle = await article.findById(req.params.articleId).populate("scategorieID");
        res.status(200).json(findArticle);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})
router.put('/:articleId', async (req, res) => {
    try {
        const findArticle = await article.findByIdAndUpdate(req.params.articleId,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(findArticle)
    } catch (error) {
        res.status(400).json({ message: error.message });

    }
});

module.exports = router