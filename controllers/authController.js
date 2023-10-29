import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import jwt from 'jsonwebtoken'

export const registerController = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username)
            return res.send({ error: "username is required" });
        else if (!password)
            return res.send({ error: "password is required" });

        // check existing user
        const existingUser = await userModel.findOne({ username });
        if (existingUser) {
            return res.status(200).send({
                success: true,
                message: "user already exist, please login"
            });
        }

        // add new user
        const hashedPass = await hashPassword(password);
        const newUser = new userModel({
            username,
            password: hashedPass
        })
        await newUser.save()
        res.status(201).send({
            success: true,
            message: "user added successfully",
            newUser
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "error while adding new user",
            error
        })
    }
}

export async function loginController(req, res){
    try {
        const {username, password} = req.body;
        // if(!username || !password)
        // return res.send({
        // success:false, 
        // error:"username and password is required"
        // })

        // check if user is already registered
        // console.log(username, "pass", password);
        const user = await userModel.findOne({username})
        if(!user ){
            return res.status(200).send({
                success: true,
                message: "User not registered, please sign up first"
            })
        }
        
        const match = await comparePassword(password, user.password)
        if(!match){
            return res.status(200).send({
                success: false,
                message: "Invalid password, try again"
            })
        }
        
        const token = jwt.sign({_id:user._id},
            process.env.JWT_SECRET,
            {expiresIn:'2d'}
            )
            // console.log(token);
        return res.status(201).send({
            success: true,
            message: "user logged in successfully",
            user:{
                username : user.username
            },
            token
        });
    
    } catch (error) {
        console.log(error)
        return res.send ({
            success: false,
            message:"error logging in",
        })   
    }
}