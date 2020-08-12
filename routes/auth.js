const bcrypt = require("bcrypt");
const config = require("config");
const jwt = require("jsonwebtoken");
const { Router } = require("express");
const {check, validationResult } = require("express-validator");

const User = require("../models/User");

const router = Router();

router.post(
    '/register', 
    [
        check('email', 'incorrect email').isEmail(),
        check('password', 'incorrect password').isLength({ min: 6 })
    ],
    async (req, res) => {
    try {
        
        const errors = validationResult(req);

        if ( !errors.isEmpty() ) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Incorrect is registration',
            })
        }

        const { email, password } = req.body;
        
        const candidate = await User.findOne({ email });

        if ( candidate ) {
           return  res.status(400).json({ message: 'Registration error pleasa again' });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({email, password: hashedPassword });

        await user.save();
        res.status(201).json({ message: "Account created"})

    } catch (error) {
        res.status(500).json({ message: 'Error in registration pleasa again' })
    }
})

router.post(
    '/login', 
    [
        check('email', 'incorrect email').isEmail(),
        check('password', 'incorrect password').isLength({ min: 6 }).exists()
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req);

        if ( !errors.isEmpty() ) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Incorrect is login',
            })
        }

        const { email, password } = req.body;
        
        const user = await User.findOne({ email });

        if ( !user ) {
            res.status(400).json({ message: 'Incorrect email or password' });
        }

        const match = await bcrypt.compare(password, user.password);
        if ( !match ) {
            return res.status(400).json({message: 'Incorrect email or password'});
        }

        const token = jwt.sign(
            {userId: user.id},
            config.get('jwtSecret'),
            {expiresIn: '1h'}
        )

        res.json({ token, userId: user.id })
        
        res.status(201).json({ message: "Success login"});

    } catch (error) {
        res.status(500).json({ message: 'Error in registration pleasa again' })
    }
})

module.exports = router;