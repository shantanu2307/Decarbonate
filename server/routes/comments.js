const router = require('express').Router();
const { model } = require('mongoose');
let comments = require('../models/comments.model');
const cors = require('cors');

router.use(cors());

router.post('/comment',async(req,res)=>
{
    try{

    }
    catch{
        
    }
})

module.exports = router