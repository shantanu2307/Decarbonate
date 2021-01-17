const router = require('express').Router();
const { model, Mongoose } = require('mongoose');
let chats = require('../models/chats.model');
let voter = require('../models/voter.model')
const cors = require('cors');
const Chats = require('../models/chats.model');
const { response } = require('express');
ObjectId = require('mongodb').ObjectID;

router.use(cors());


router.post('/vote',async(req,res)=>{
  console.log({uid: req.body.vid, cid: req.body.cid});
    try{
      console.log('here');
     const isVoter = await voter.findOne({uid:req.body.vid, cid: req.body.cid});
     if(isVoter) { 
       console.log('voted already');
       res.send("Only one vote allowed per id!")
     }else{
        const chat = await chats.findById(req.body.cid);
        chat.votes+=1;
      await chat.save();
      console.log('new vote');
      const newVoter = await new voter({cid:req.body.cid, uid:req.body.vid})
      await newVoter.save();
      res.send("new vote accepted!")
     }
    }
    catch(e){
    console.log(e)
    }
})

router.get('/getchats',async(req,res)=>{
  const allchats = await chats.find({});
  res.json(allchats);
})

router.post('/chat',async(req,res)=>
{
    try{
      const obj={
          uid:req.body.uid,
          content:req.body.content
      }
      console.log(obj);
      const newPost = await new chats(obj)
      await newPost.save()
      res.send('new post made!')
    }
    catch(e){
       console.log(e) 
    }
})

module.exports = router