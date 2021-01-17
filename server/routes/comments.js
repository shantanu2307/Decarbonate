const router = require('express').Router();
const { model } = require('mongoose');
let comments = require('../models/comments.model');
let chats = require('../models/chats.model')
const cors = require('cors');
const { findByIdAndDelete } = require('../models/comments.model');

router.use(cors());
router.post('/getcomments',async(req,res)=>{
    try{
     const comment = await comments.find({cid:req.body.cid})
     res.send(comment)
    }
    catch(e){
     console.log(e)
    }
})
router.delete('/comment',async(req,res)=>{
    try{
        const x= findByIdAndDelete(req.body.cid);
        res.send("commnet deleted")
    }
    catch(e){
        console.log(e);
    }
})

router.post('/comment',async(req,res)=>
{
    try{
     const obj ={
         cid: req.body.cid,
         uid: req.body.uid,
         content: req.body.content
     }
     const comment = await new comments(obj)
     await comment.save()
     res.send('You made a comment')
    }
    catch(e){
       console.log(e); 
    }
})

module.exports = router