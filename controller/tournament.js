const express = require('express');
const Tournament = require('../model/tournament');
const router = express.Router()


router.post(`/create`,async(req,res)=>{
    try {
    const { tourn_name, startDate, endDate, participant, status } = req.body;
    const tournament = new Tournament({ tourn_name, startDate, endDate, participant, status });
    await tournament.save();
    return  res.status(201).json(tournament);
    } catch (error) {
        return res.status(400).json(`Tournament not created`)
    }
})

router.post('/list', async (req, res) => {
    try {
        const tournaments = await Tournament.find();
        return res.status(200).json(tournaments);
    } catch (error) {
        return res.status(400).json('Tournament not found')
    }
  });

  router.delete('/delete/:_id',async(req,res)=>{
    try {
        const {_id} =req?.params
        await Tournament.deleteOne({ _id: _id }).then((item) => {
            console.log(item)
            return res.json("Tournament deleted successfully")
        })

    } catch (error) {
        return res.status(200).json("Tournament not deleted")
    }
  })

  

  router.put('/update/:_id',async (req,res)=>{
    try {
        await Tournament.findByIdAndUpdate({ _id: req?.params?._id }, req.body ,{new:true, upsert: false}) 
           return res.send("Tournament updated successfully")
        
    } catch (error) {
        return res.status(400).json('Tournament not updated')
    }
  })


module.exports = router