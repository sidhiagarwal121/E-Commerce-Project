import userModel from '../models/userModel.js'
import { hashPassword,comparePassword} from '../helpers/authHelper.js'
import JWT from 'jsonwebtoken'
export const registerController=async(req,res)=>{
    try{
        const {name,email,password,phone,address}=req.body
        const existingUser=await userModel.findOne({email})
        if(existingUser)
        {
            return res.status(200).send({
                success:true,
                message:"Already registered please login"
            })
        }
        const hashedPassword=await hashPassword(password)
        const user=await new userModel({name,email,phone,address,password:hashedPassword}).save()
        res.status(201).send({
            message:"User registered successfully",
            user
        })




    }
    catch(err)
    {
        res.status(500).send({
            success:false,
            message:'Error in registration',
            err
        })
        console.log(err)
    }

}
export const loginController=async(req,res)=>{
    try{
        const {email,password}=req.body;
        const user=await userModel.findOne({email})
        if(!user)
        {
            return res.status(500).send({
                success:false,
                message:"User not found"

            })
        }
        const match=comparePassword(password,user.password)
       if(!match)
       {
        return res.status(500).send({
            success:false,
            message:"Invalid credentials"

        })
       }
       const token=await JWT.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'})
       res.status(500).send({
        success:true,
        message:"Login Successfull",
        user:{
            name:user.name,
            email:user.email,
            phone:user.phone,
            address:user.address
 
        },token
    })
        


    }
    catch(err)
    {
        console.log(err)
        res.status(500).send({
            success:false,
            message:"error in login",
            err
        })
    }
    
}
export const  testController=(req,res)=>{
        res.send("protected route")
}
