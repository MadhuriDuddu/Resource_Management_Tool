const express=require('express')
const router=express.Router()
const User=require('../models/User')
const {body,validationResult}=require('express-validator')
const bcrypt=require('bcryptjs')
var jwt=require('jsonwebtoken')
var fetchuser=require('../middleware/fetchuser');

const JWT_SECRET='thelasttrial'

// Endpoint 1--->using POST method and route('/api/auth/createuser') create a new user and save in databse 
router.post('/createuser',[body('email','Enter a valid email').isEmail(),body('password').isLength({min:5}),body('role').isString()],async (req,res)=>{
    
    let success=false

    //If there are any errors it will return bad request and the errors 
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    // Check if there id any existing user with the same email
    try{
        let user=await User.findOne({success,email:req.body.email})
        if (user){
            return res.status(400).json({success,errors:"Sorry , a user with this email already exists."})
        }

        const salt= await bcrypt.genSalt(10)
        const secPass= await bcrypt.hash(req.body.password,salt)

        // Create a new user
        user=await User.create({
            email:req.body.email,
            password:secPass,
            role:req.body.role
        })

        const data={
            user:{
                id:user.id
            }
        }
        const authtoken=jwt.sign(data,JWT_SECRET)
        success=true
        res.json({success,authtoken})
    }
    catch(error){
        console.error(error.message)
        res.status(500).send("Internal Server Error")
    }
    
})


// Endpoint 2-->Authenticate a user using POST method and route('/api/auth/login'). No authentication required 
router.post('/login',[body('email','Enter a valid email').isEmail(),body('password','Password cannot be blank').exists()],async (req,res)=>{
    let success=false
    //If there are any errors it will return bad request and the errors 
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    const {email,password}=req.body
    try{
        let user=await User.findOne({email})
        if(!user){
            return res.status(400).json({error:"Please enter valid credentials"})
        }
        const passwordCompare=await bcrypt.compare(password,user.password)
        if(!passwordCompare){
            return res.status(400).json({success,error:"Please enter valid credentials"})
        }
        const data={
            user:{
                id:user.id,
                role:user.role
            }
        }
        const authtoken=jwt.sign(data,JWT_SECRET)
        success=true
        res.json({success,authtoken})
    }
    catch(error){
        console.error(error.message)
        res.status(500).send("Internal Server Error")
    }
    
})


// Endpoint 3--->Get details of an user using the POST method and route('/api/auth/getuser')  
router.post('/getuser',fetchuser,async(req,res)=>{
    try{
        userId=req.user.id
        const user=await User.findById(userId).select("-password")
        res.send(user)
    }
    catch(error){
        console.error(error.message)
        res.status(500).send("Internal Server Error")
    }
})



module.exports=router