const express = require('express');
const router = express.Router();
const Person = require('./../models/person.js')

 

router.post('/',async (req,res)=>{
    try {
        const data = req.body
        const newPerson = new Person(data)
        const response = await newPerson.save()
        console.log('data saved')
        res.status(200).json(response)
    } catch (e) {
        console.log(err)
        res.status(500).json({error:'Internal server Error'})
    }
}) 


router.get('/', async (req,res)=>{
    try {
        const data = await Person.find();
        console.log('data fetch');
        res.status(200).json(data);
    } catch (e) { 
        console.log(err)
        res.status(500).json({error:"Internal server error"})
    }
})

router.get('/:worktype',async(req,res)=>{
    try {
        const worktype = req.params.worktype;
        if(worktype == 'chef' || worktype == 'manager' || worktype == 'waiter'){
            const response = await Person.find({work:worktype});
            console.log('response fetchedd');
            res.status(200).json(response);
        }else{
            res.status(404).json({error:'invalid work type'})
        }
    } catch (e) {
        console.log(e)
        res.status(500).json({error:'internal server error'})
    }
})

router.put('/:id',async (req,res)=>{
    try {
        const personId = req.params.id;  // Extract the id from the URL parameter
        const updatePersonData = req.body; // Updated data for the person

        const response = await Person.findByIdAndUpdate(personId,updatePersonData,{
            new:true,
            runValidators:true,
        })
        if(!response){
            return res.status(404).json({error:'Person not found'})
        }

        console.log('data updated')
        res.status(200).json(response)
    } catch (e) {
        console.log(e)
        res.status(500).json({error:'intrnal server error'})
    }
})

router.delete('/:id', async (req,res)=>{
    try {
        const personId = req.params.id;

        const response = await Person.findByIdAndDelete(personId,);
           if (!response) {
            return res.status(404).json({error:'person not found'})
        }
        console.log('data deleted');
        res.status(200).json({message:'person deleted succesfully'})
    } catch (e) {
        console.log(e)
        res.status(500).json({error:'internal server error'})
    }
})

module.exports = router;
 