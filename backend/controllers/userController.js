const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");

//Register User
exports.registerUser = catchAsyncErrors(async(req, res, next) => {
    const {name, email, password} =   req.body;
    
    const user = await User.create({
        name, email, password, 
        avatar: {
            public_id: "this is a Sample id",
            url: "profilepicURL"
        }
    });

    // const token = user.getJWTToken();
    // res.status(201).json({
    //     sucess: true,
    //     token,
    // });
      
    // This upper code are replaced with this sendToken() func
    sendToken(user, 201, res);
});

//LogIn user
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const {email, password} = req.body;

    //Checking if user has given email and password both
    if(!email || !password){
        return next(new ErrorHander("Please enter Email and Password", 400));
    }

    const  user = await User.findOne({email}).select("+password");
    
    if(!user) {
        return next(new ErrorHander("Invalid Email or Password"), 401);
    }

    const isPasswordMatched =await user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new ErrorHander("Invalid  Password", 401));
    }

    //  const token = user.getJWTToken();
    // res.status(200).json({
    //     sucess: true,
    //     token,

    // });
   // This upper code are replaced with this sendToken() func     
    sendToken(user, 200, res);
});

//LogOut User:
exports.logout = catchAsyncErrors(async(req, res, next) =>{
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        message: "Logged Out",
    });
});