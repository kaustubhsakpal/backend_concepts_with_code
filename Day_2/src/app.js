const express = require('express');
const mongoose = require('mongoose')

const app =express();

function connecttodb(){
    mongoose.connect('mongodb+srv://kaustubhsakpal9_db_user:WImYjy70P8eXbgvF@cluster0.g5d3mmg.mongodb.net/day-2')
    .then(()=>{
        console.log("connection done ");
        
    })

}

connecttodb()

















module.exports=app
