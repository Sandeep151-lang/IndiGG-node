const express = require('express');
const Participant = require('../model/participents');
const users = require('../model/users');
const Tournament = require('../model/tournament');

const router = express.Router()




router.post('/login',async(req,res)=>{
    const userExist = await users.findOne({email:req.body.email,has_password:req.body.password})
    console.log(userExist)
    try {
        if(!userExist){
            return res.status(400).send({message:"Invalid Credential"})
        }
        return res.json(userExist)
    } catch (error) {
    // throw new Error(error)
        return res.status(400).send({message: error})
    }
 })


router.post(`/create`,async(req,res)=>{
    try {
    // const { name, tournamentId } = req.body;
    const participant = new Participant({...req.body});
    await participant.save();
    return  res.status(201).json(participant);
    } catch (error) {
        return res.status(400).json(`participant not created`)
    }
})

router.get('/list', async (req, res) => {
    try {
        const participant = await Participant.find().populate('participants');
        return res.status(200).json(participant);
    } catch (error) {
        return res.status(400).json('participant not found')
    }
  });

  router.delete('/delete/:_id',async(req,res)=>{
    try {
        const {id} =req?.params
        await Participant.deleteOne({ _id: id }).then(() => {
            return res.json("Participant deleted successfully")
        })

    } catch (error) {
        return res.status(200).json("Participant not deleted")
    }
  })

  router.post('/update',async (req,res)=>{
    const {tourn_id,user_id}= req.body
    console.log(req.body)
    try {
      const resp=  await Tournament.findOneAndUpdate({ _id: tourn_id }, {$addToSet:{participant:user_id}} ,{new:true, upsert: false}) 
      if(resp){
       const userData= await users.findOneAndUpdate({ _id: user_id }, {$addToSet:{tournament:tourn_id}} ,{new:true, upsert: false}) 
       return res.send(userData)
      }
        
    } catch (error) {
        return res.status(400).json('Participant not updated')
    }
  })


  router.post('/apply',async(req,res)=>{
    try {
        const resp = await users.findOne({_id:req.body.id})
        return res.json(resp)
    } catch (error) {
        return res.json(error)
    }
  })


module.exports = router