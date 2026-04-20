const express = require('express');
const mongoose = require('mongoose')

const app =express();

function connecttodb(){
    mongoose.connect('**********************************************************************************************/day-2')
    .then(()=>{
        console.log("connection done ");
        
    })

}

connecttodb()

















module.exports=app
