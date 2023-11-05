const express=require("express")
const app=express()
const multer=require("multer")

app.use(express.urlencoded({extended:false}))
app.set("view engine","ejs")
app.use(express.static("uploads"));

const upload=multer({
    storage:multer.diskStorage({
        destination:(req,file,cb)=>{
            cb(null,"uploads")
        },   
        filename:(req,file,cb)=>{
            cb(null,file.fieldname+"-"+".jpg")
        }
    })
}).single("fileImage")

   
app.post("/Uploads",upload,(req,res)=>{
   if(req.file){
    const imagepath=`/${req.file.fieldname}-.jpg`
    res.render("index",{image:imagepath})

   }   
})
app.get("/",(req,res)=>{
    const imagepath2="its for just  for avoid the bugs"
    res.render("index",{image:imagepath2})
})
app.listen(4000,()=>{
    console.log("server has start")
})