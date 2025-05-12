import { handleError } from "../helper/handleError.js";
import User from "../models/user.model.js";
import brcypt from "bcryptjs";
import jwt from "jsonwebtoken"




export const Register = async (req, res,next) => {
  try {
    const { name, email, password } = req.body;
    const checkuser = await User.findOne({ email });

    if (checkuser) {
      // user already registerd
      next(handleError(409, "User already registered"));
    }
    // register user
    const hashedpassword = brcypt.hashSync(password)
    const user = new User({
        name,email,password:hashedpassword
    })
    await user.save();
    res.status(200).json({
        success:true,
        message:"Registered successfully"
    })
  } catch (error) {
    next(handleError(500,error.message))
    // console.log(error);
  }
};

export const Login = async (req, res,next) => {
    try {
      const {email,password}=req.body
      const user =await User.findOne({email})
      if(!user){
        next(handleError(404,'Invalid login credentials'))
      }
      const hashedpassword=user.password

      const comparePassword= brcypt.compare(password,hashedpassword)
      if(!comparePassword){
        next(handleError(404,'Invalid login credentials'))
      }

      const token = jwt.sign({
        _id:user._id,
        name:user.name,
        email:user.email,
        avatar:user.avatar
      },process.env.JWT_SECRET)

      res.cookie('access_token',token,{
        httpOnly:true,
        secure:process.env.NODE_ENV==='production',
        sameSite:process.env.NODE_ENV==='production' ? 'none':'strict',
        path:'/'
      })
      const newUser = user.toObject({getters:true})
      delete newUser.password
      res.status(200).json({
        success:true,
        user:newUser,
        message:"Login Successfully"
      })

      
    } catch (error) {
       next(handleError(500,error.message))
    }
};


export const GoogleLogin = async (req, res,next) => {
  try {
    const {name,email,avatar}=req.body
    let user
     user =await User.findOne({email})
    if(!user){
       //create new user
      const password =Math.random().toString()
      const hashedpassword= brcypt.hashSync(password)
      const newUser = new User({
      name,email,password:hashedpassword, avatar
      })

      user = await newUser.save()
    
    }
   

    const token = jwt.sign({
      _id:user._id,
      name:user.name,
      email:user.email,
      avatar:user.avatar
    },process.env.JWT_SECRET)

    res.cookie('access_token',token,{
      httpOnly:true,
      secure:process.env.NODE_ENV==='production',
      sameSite:process.env.NODE_ENV==='production' ? 'none':'strict',
      path:'/'
    })
    const newUser = user.toObject({getters:true})
    delete newUser.password
    res.status(200).json({
      success:true,
      user:newUser,
      message:"Login Successfully"
    })

    
  } catch (error) {
     next(handleError(500,error.message))
  }
};


// logout functionality

export const Logout = async (req, res,next) => {
  try {
   
    res.clearCookie('access_token',{
      httpOnly:true,
      secure:process.env.NODE_ENV==='production',
      sameSite:process.env.NODE_ENV==='production' ? 'none':'strict',
      path:'/'
    })
   
    res.status(200).json({
      success:true,
      
      message:"Logout Successfully"
    })

    
  } catch (error) {
     next(handleError(500,error.message))
  }
};