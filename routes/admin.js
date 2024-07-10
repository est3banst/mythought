const express = require('express');
const post = require('../models/Post');
const Userbd = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Secretly = process.env.ULTRA_SECRET

const router = express.Router();

const posts = {};
const adminPanel = "../views/layouts/admin"

const authUser = (req, res, next) => {
    const user = req.body.user;
    const password = req.body.password
    if (!user) {
        return "Invalid credentials"
    }
    if (!password) {
        return "Password incorrect"
    }
    next()
}

router.get('/', async (req, res) => {
    const metadata = {
        title : 'My Dev Tour',
        description: 'Blog about technology and programming languages',
    }
    try {
        res.render('admin/main', { metadata, layout: adminPanel })
    }
    catch(error) {

  }
})
 
router.post('/register', async (req, res) => {
    const user = req.body.usuario;
    const pass = req.body.contra;
    try {
    const passwordHash = await bcrypt.hash(pass, 5)
    try {
        const newUser = await Userbd.create({ username: user, password: passwordHash})
        res.status(201).json({message: "User created"});
        
    } 
    catch(error) {
        console.log('Something unexpected happen')
    }
    }
    catch (error) {
        console.log("Internal server error")
    }
})

router.post('/admin', async (req, res) => {
    const userToCheck = req.body.usuario;
    const passToCheck = req.body.contra;
    try {
        const usernameFound = await Userbd.findOne({ username: userToCheck})
        if (!usernameFound) {
            return res.status(404).json({ message: "No user found" })
        }
        const passwordFound = await bcrypt.compare(passToCheck, usernameFound.password)
        if (!passwordFound) {
            return res.status(401).json({ message: "Something went wrong with the password, try again" })
        }
        const tokenSession = jwt.sign({ userId: usernameFound._id }, Secretly)
        res.cookie('token', tokenSession, { httpOnly: true})

        res.redirect('/mainboard')
    } catch (error) {
        console.log(error)
    }
})
router.get('/mainboard', async (req, res) => {
    const metadata = {
        title : 'My Dev Tour',
        description: 'Blog about technology and programming languages',
    }
    res.render('admin/mainboard')
})
router.get('/post/:id', (req, res) => {
    const metadata = {
        title : 'My Dev Tour',
        description: 'Blog about technology and programming languages',
    }
    res.render('/', { metadata })
})

router.put('/edit_post/:id',(req, res) => {
    
})
router.delete('/delete_post/:id',(req, res ) => {

})

module.exports.admin = router;