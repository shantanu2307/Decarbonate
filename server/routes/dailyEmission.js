const router = require('express').Router();
const { model } = require('mongoose');
let dailyEmission = require('../models/dailyEmission.model');
const cors = require('cors');

router.use(cors());
router.get('/daily',async(req,res)=>
{
    try{
     const Id = req.body.uId;
     const todayEmission = await dailyEmission.findOne({uId:Id})
     res.send(todayEmission)
    }
    catch(e){
        console.log(e)
    }
});
router.post('/daily',async(req,res)=>
{console.log('hi')
    try{
        const help = req.body;
        const d=new Date
        const p=d.getDate()
        console.log(p)
       obj = {
          uId : help.uId,
          water: help.water,
          waste: help.waste,
          commute: help.commute,
          electronicDevices : help.electronicDevices,
          total: help.total,
          date: p
      }
      const todayEmission = await dailyEmission.findOne({date:p,uId:help.uId})
      console.log(todayEmission.date)
      if(todayEmission){
          if( obj.water && obj.water!=NaN )
          todayEmission.water +=obj.water;
          if( obj.waste && obj.waste!=NaN )
          todayEmission.waste +=obj.waste;
          if(obj.commute && obj.commute!=NaN )
          todayEmission.commute +=obj.commute;
         
          if(obj.electronicDevices && obj.electronicDevices!=NaN)
          todayEmission.electronicDevices +=obj.electronicDevices;

          if(obj.total && obj.total!=NaN)
          todayEmission.total +=obj.total;
      
          await todayEmission.save();
          res.send("saved in today")
      }
      else{
          const newEmission = await new dailyEmission(obj)
          await newEmission.save()
          res.send("New day, new emission")
      }
    }
    catch(e){
        console.log(e);
    }
})

module.exports = router