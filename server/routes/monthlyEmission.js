const router = require('express').Router();
const { model } = require('mongoose');
let monthlyEmission = require('../models/monthlyEmission.model');
const cors = require('cors');

router.use(cors());

router.post('/getmonthly',async(req,res)=>
{
    try{
     const Id = req.body.uid;
     const todayEmission = await monthlyEmission.find({uid:Id})
     res.send(todayEmission)
    }
    catch(e){
        console.log(e)
    }
});

router.post('/monthly',async(req,res)=>
{
    console.log('hi')
    try{
        const help = req.body;
        const d=new Date();
        const p=d.getMonth()+1;
        console.log(p)
       obj = {
          uid : help.uid,
          flights: help.flights,
          electricity: help.electricity,
          total: help.total,
          date: p
      }
      console.log(obj);
      const todayEmission = await monthlyEmission.findOne({date:p,uid:help.uid})
    //   console.log(todayEmission.date)
      if(todayEmission){
          if( obj.flights && obj.flights!=NaN )
          todayEmission.flights +=obj.flights;
          if( obj.electricity && obj.electricity!=NaN )
          todayEmission.electricity +=obj.electricity;

          if(obj.total && obj.total!=NaN)
          todayEmission.total +=obj.total;
      
          await todayEmission.save();
          res.send("saved in this month")
      }
      else{
          const newEmission = await new monthlyEmission(obj);
          await newEmission.save()
          res.send("New month, new emission")
      }
    }
    catch(e){
        console.log(e);
    }
})

module.exports = router;