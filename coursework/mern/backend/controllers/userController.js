import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    if (!req.body || !name || !email || !password) {
        res.status(400)
        throw new Error('Some fields are missing values')
    }

    const existingUser = await User.findOne({ email })

    if (existingUser) {
        res.status(400)
        throw new Error('Email already used')
    }

    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user.id)
        })

    }
    else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

const loginUser = asyncHandler(async (req, res) => {
    if (!req.body || !req.body.email || !req.body.password) {
        res.status(400)
        throw new Error('Some fields are missing values')
    }

    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (user && await bcrypt.compare(password, user.password)) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }
    else {
        res.status(400)
        throw new Error('Invalid user data')
    }


})

const getMe = asyncHandler(async (req, res) => {
    res.status(200).json(req.user)
})

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

export { registerUser, loginUser, getMe }