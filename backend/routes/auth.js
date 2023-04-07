const express=require('express')
const router= express.Router()
const User=require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt=require('bcryptjs')
const jwt = require('jsonwebtoken');
const JWT_SECRET="onlyaayushknowstheroot";
const fetchuser=require('../middleware/fetchuser');



//create a user using POST "/api/auth/createuser" doesnot require auth
router.post('/createuser',[
    body('name',"Enter a Valid Name!").isLength({min:3}),
    body('email',"Enter a Valid Email!").isEmail(),
    body("password","Enter a Valid Password!").isLength({min:5})
],async(req,res)=>{
  let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
    try{
    //check whether user exist with same email
    let user= await User.findOne({email:req.body.email});
    if(user){
      return res.status(400).json({success,error:"Sorry! A user With this Email Exists."})

    }
    const salt= await bcrypt.genSalt(10);
    const secPass=await bcrypt.hash(req.body.password,salt)
    user= await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      })
      const data={
        user:{
          id:user.id
        }
      }
      //.then(user => res.json(user));
      const authToken=jwt.sign(data,JWT_SECRET)
      success=true;
      res.json({success,authToken});
    }catch(err){
      console.log(err.message);
      res.status(500).send("Some Error Occured !")
    }
  }
  )

  //endpoint for login authentication
  router.post('/login',[
     body('email',"Enter a Valid Email!").isEmail(),
    body("password","Password Cannot Be Blank!").exists()
],async(req,res)=>{
  let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {email,password}=req.body;
    try{
    let user= await User.findOne({email});
    if(!user){
      return res.status(400).json({success,error:"Sorry! Wrong Credentials"})
    }
    const passCompare=await bcrypt.compare(password,user.password)
    if(!passCompare){
      return res.status(400).json({success,error:"Sorry! Wrong Credentials"})
    }
    const data={
        user:{
          id:user.id
        }
      }
      //.then(user => res.json(user));
      const authToken=jwt.sign(data,JWT_SECRET)
      success=true;
      res.json({success,authToken});
    }catch(err){
      console.log(err.message);
      res.status(500).send("Some Error Occured !")
    }
  }
  )


  //USER DETAILS ROUTE 3 GETUSER.LOGIN REQURED
  router.post('/getuser',fetchuser,async(req,res)=>{
   
  try {
    userId=req.user.id;
    const user=await User.findById(userId).select("-password")
    res.send(user)
  } catch (err) {
    console.log(err.message);
      res.status(500).send("Some Error Occured !")
  }
}
  )

module.exports=router