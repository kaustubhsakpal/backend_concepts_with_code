const express=require('express');

const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))

const notes =[];

app.post('/notes',(req,res)=>{
    console.log(req.body);
    
    notes.push(req.body);
    
    res.send("note created")
})

app.get('/notes',(req,res)=>{
    res.send(notes)
})

app.delete('/notes/:id',(req,res)=>{
     delete notes[req.params.id];
     res.send("deleted succesfully")
})


app.patch("/notes/:id",(req,res)=>{
    notes[req.params.id].description=req.body.description;
    res.send("updated sucesss fully")

})
module.exports=app