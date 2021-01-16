const router = require('express').Router();
const { model } = require('mongoose');
let daily = require('../models/dailyEmission.model');
const cors = require('cors');

router.use(cors());

router.post('/daily',async(req,res)=>
{
    try{

    }
    catch{
        
    }
})

module.exports = router