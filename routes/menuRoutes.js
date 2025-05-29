const express = require('express')
const router = express.Router()
const MenuItems = require('../models/Menu.js')
const { findByIdAndUpdate } = require('../models/person.js')


router.post('/', async(req,res)=>{
    try {
        const data = req.body
        const newMenuItems = new MenuItems(data)
        const response = await newMenuItems.save();
        console.log('menu data save')
        res.status(200).json(response)
    } catch (e) {
        console.log(e)
        res.status(500).json({error:'internal error'})
    }
})

router.get('/',async(req,res)=>{
    try {
        const data = await MenuItems.find();
        console.log('data fetch')
        res.status(200).json(data)
    } catch (e) {
        console.log(e)
        res.status(500).json({error:'Internla server error'})
    }

})

router.get('/:taste',async(req,res)=>{
    try {
        const taste = req.params.taste
        if(taste == 'sweet' || taste == 'spicy' || taste == 'sour'){
            const response = await MenuItems.find({taste:taste})
            console.log('data fetch')
            res.status(200).json(response)
        }else{
            res.status(404).json({error:'invalid worktype'})
        }
    } catch (e) {
          console.log(e)
        res.status(500).json({error:'internal server error'})
    }
})

router.put('/:id', async (req,res)=>{
    try {
        const menuId = req.params.id;
        const updateMenuData = req.body;

        const response = await MenuItems.findByIdAndUpdate(menuId,updateMenuData,{
            new:true,
            runValidators:true,
        })
        if(!response)[
             res.status(404).json({error:'menuItems not found'})
        ]
        console.log('data updated')
        res.status(200).json(response)
    } catch (e) {
        console.log(e)
        res.status(500).json({error:'internal server error'})
    }
})

router.delete('/:id', async (req,res) =>{
    try {
        const menuId = req.params.id;

        const response = await MenuItems.findByIdAndDelete(menuId);
            if(!response){
                return res.status(404).json({error:'not found'})
            }
        console.log('menuitem delete succesfully')
        res.status(200).json({message:'deleted'})
    } catch (e) {
        console.log(e)
        res.status(500).json({error:'internal server error'})
    }
})

module.exports = router