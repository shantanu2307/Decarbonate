const router = require('express').Router();
const { model } = require('mongoose');
let dailyEmission = require('../models/dailyEmission.model');
let monthlyEmission = require('../models/monthlyEmission.model')
const cors = require('cors');

router.use(cors());

router.post('/getdaily',async(req,res)=>
{
    try{
     const Id = req.body.uid;
     console.log(Id);
     const todayEmission = await dailyEmission.find({uid:Id});
     console.log(todayEmission);
     res.send(todayEmission)
    }
    catch(e){
        console.log(e)
    }
});

router.post('/daily',async(req,res)=>
{
    try{
        const help = req.body;
        const d=new Date
        const dayy=d.getDate()
        const monthh=d.getMonth()+1
        console.log(dayy)
        console.log(monthh)
        const t={day:dayy, month:monthh}
        console.log(t)
       const obj = {
          uid : help.uid,
          water: help.water,
          waste: help.waste,
          commute: help.commute,
          electronicDevices : help.electronicDevices,
          total: help.total,
          date: {day:dayy,
               month: monthh}
      };
      const obj2={
        uid : help.uid,
        water: help.water,
        waste: help.waste,
        commute: help.commute,
        electronicDevices : help.electronicDevices,
        total: help.total,
        month:monthh
      }
      console.log(obj.date.month)
      const todayEmission = await dailyEmission.findOne({date:obj.date,uid:help.uid})
      const thisMonthEmission = await monthlyEmission.findOne({month:obj.date.month,uid:help.uid})
      console.log(thisMonthEmission)
      if(thisMonthEmission!=null)
      {
        if( obj.water && obj.water!=NaN )
        thisMonthEmission.water +=obj.water;
        if( obj.waste && obj.waste!=NaN )
        thisMonthEmission.waste +=obj.waste;
        if(obj.commute && obj.commute!=NaN )
        thisMonthEmission.commute +=obj.commute;
       
        if(obj.electronicDevices && obj.electronicDevices!=NaN)
        thisMonthEmission.electronicDevices +=obj.electronicDevices;

        if(obj.total && obj.total!=NaN)
        thisMonthEmission.total +=obj.total;
    
        await thisMonthEmission.save();
        console.log('ahead');
      }
      else{
        const newMonthEmission = await new monthlyEmission(obj2)
        await newMonthEmission.save()
        console.log(newMonthEmission)
        
      }
      
      if(todayEmission){
          console.log("there")
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
      }
      else{
          console.log("here")
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