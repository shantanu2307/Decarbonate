const router = require('express').Router();
const { model } = require('mongoose');
let mothly = require('../models/monthlyEmission.model');
const cors = require('cors');

router.use(cors());

router.post('/monthly',async(req,res)=>
{
    try{
    const help=req.body
    const d=new Date
    const monthh=d.getMonth()
    let obj={
        uId:help.uId,
        gas:help.gas,
        flight:help.flight,
        electricity: help.electricity,
        month:monthh
    }
    const newMonth = monthly.findOne({month:obj.month,uId:obj.uId})
    if(newMonth)
    {
      if( obj.gas && obj.gas!=NaN )
      newMonth.gas +=obj.gas;
      if( obj.electricity && obj.electricity!=NaN )
      newMonth.electrcity +=obj.electricity;
      if(obj.flights && obj.flights!=NaN )
      newMonth.flights +=obj.flights;
      if(obj.total && obj.total!=NaN)
      newMonth.total +=obj.total;
  
      await newMonth.save();
      res.send("more emission for this month")
    }
    else{
      const newMonthEmission = await new monthly(obj)
      await newMonthEmission.save()
      res.send("New month, new emission")
    }
    }
    catch(e){
console.log(e)
    }
})

module.exports = router