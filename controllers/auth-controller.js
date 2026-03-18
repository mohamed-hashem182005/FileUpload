
const User = require("../models/User");
const bycrpt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//Register controller
const registerUser = async (req, res) => {
    try {
        //extract user information from request body
        const { username, email, password, role } = req.body;
        //check if the user is already exists in DB or not
        const checkExistUser = await User.findOne({ $or: [{ username }, { email }] });
        if (checkExistUser) {
            return res.status(400).json({
                sucess: false,
                message: 'User is already exists either with same username or same email. Please try with different username or email'
            })
        }


        //Hash user password
        const salt = await bycrpt.genSalt(10);
        const hashedPassword = await bycrpt.hash(password, salt);

        //create a new user and save in your DB using fun create that is save and create in the same time
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
            role: role || "user"
        });

        //create a new user and save in your DB using mongoose

        // const newUser = new User({
        //     username,
        //     email,
        //     password: hashedPassword,
        //     role: role || 'user'
        // });

        // await newUser.save();

        if (newUser) {

            res.status(201).json({
                sucess: true,
                message: 'User registered successfully!'
            })
        } else {
            res.status(400).json({
                sucess: false,
                message: 'Unable to register user!, Please try again'
            })

        }


    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: 'Some error occured ! Please try again'
        })


    }
}




//Login controller
const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        //find if the current user is exists in DB or not
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Ueser doesnot exists"
            })
        }
        //if the password is correct or not
        const isPasswordMatch = await bycrpt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid username or password!"
            })

        }
            //create user token
            const accessToken = jwt.sign({
                userId: user._id,
                username: user.username,
                role: user.role
            }, process.env.JWT_SECRET, { expiresIn: '15m' })
        res.status(201).json
            ({
                sucess: true,
                message: 'Logged in succussful',
                accessToken
            });

    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: 'Some error occured ! Please try again'
        })


    }
}


module.exports = {
    registerUser,
    loginUser
}
