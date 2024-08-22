const express=require("express");
const app = express();

const dotenv=require("dotenv");
const mongoose=require("mongoose");
const categorieRouter=require("./routes/categorie.route");
const scategorieRouter = require("./routes/scategorie.route");
const articleRouter = require("./routes/article.route");
const paymentRouter =require("./routes/payment.route.js");
const userRouter =require("./routes/user.route.js");
app.use('/api/payment', paymentRouter);
const cors=require("cors")
dotenv.config();
//middleware
 /*app.use(cors()); */  //pour donner lautorisation pour tous les port
app.use(cors({}))
app.use(express.json());
app.get("/", (req, res) => {
    res.send("bienvenue dans notre site web ")
})
app.use("/api/categories",categorieRouter)
app.use("/api/scategories",scategorieRouter)
app.use("/api/articles",articleRouter)
app.use("/api/users",userRouter)

app.listen(process.env.PORT)
console.log("application run at port "+process.env.PORT);
module.exports=app;
//connexion a la base de donne 
mongoose.connect(process.env.DATABASECLOUD,{
    //useNewUrlParser: true,
    //useUnifiedTopology: true,
})
.then(()=>{console.log("connexion a la base donne avec succes ")
}).catch(err=>{
    console.log("impossible de se connecte a la base donne ")
    process.exit();

});