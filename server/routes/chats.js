const router = require('express').Router();
const { model } = require('mongoose');
let chats = require('../models/chats.model');
let voter = require('../models/voter.model')
const cors = require('cors');

router.use(cors());


router.post('/vote',async(req,res)=>{
    try{
     const isVoter = await voter.findOne({voterid:req.body.vid, cid:req.body.cid})
     if(isVoter)
     { res.send("Only one vote allowed per id!")
    }
     else{
        const chat = await chats.findOne({cid:req.body.cid})
      chat.votes+=1;
      await chat.save();
      const newVoter = await new voter({cid:req.body.cid, voterid:req.body.vid})
      await newVoter.save();
      res.send("new vote accepted!")
     }
    }
    catch(e){
    console.log(e)
    }
})
router.post('/chat',async(req,res)=>
{
    try{
      const obj={
          uid:req.body.uid,
          content:req.body.content
      }
      const newPost = await new chats(obj)
      await newPost.save()
      res.send('new post made!')
    }
    catch(e){
       console.log(e) 
    }
})

module.exports = router