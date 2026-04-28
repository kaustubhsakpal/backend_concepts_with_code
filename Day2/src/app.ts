import express from 'express'
export const app = express()
import Grapfunction from './services/garp.nodes.js'

app.use(express.json())

app.post('/grap-post',async (req,res)=>{
    const {question} = req.body
    console.log("usermessage : ",question)
await Grapfunction(question).then((result)=>{
    res.status(200).json({
        message:result
    })
})
})