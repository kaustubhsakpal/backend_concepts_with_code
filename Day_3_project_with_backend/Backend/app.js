const { urlencoded } = require('body-parser');
const express = require('express')
const multer =require('multer')
const uplodfile = require('./src/services/storage.service')
const postmodel =require('./src/models/post.model')
const cors =require('cors')
const app =express();

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

const uplod = multer({storage:multer.memoryStorage()})

app.post('/creat_post',uplod.single('image'), async(req,res)=>{    
      const result =await uplodfile(req.file.buffer); 
      console.log(result);

      const post =await postmodel.create({
            image:result.url,
            caption:req.body.caption
      })

      return res.status(201).json({
            message:"post created succesfully",
            post
      })           
})

app.get('/create_post', async (req,res)=>{
 const post=  await postmodel.find();

 return res.status(200).json({
      message:"data fetch succesfully ",
      post
 })
})



module.exports=app