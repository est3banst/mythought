const express = require('express');
const post = require('../models/Post');
const Userbd = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Post = require('../models/Post');
const Secretly = process.env.JWT_SECRET

const router = express.Router();

const adminPanel = "../views/layouts/admin"
const loginPanel = "../views/layouts/login"

const authUser = (req, res, next) => {
    const token = req.cookies.token;

    if (!token ) {
        return res.status(401).json({message: "No Autorizado"})
    }

    try {
        const decoded = jwt.verify(token, Secretly);
        req.userId = decoded.userId;
        next();

    } catch(error) {
        res.status(401).json({message: "No autorizado"})
    }

}

router.get('/admin', async (req, res) => {
    const metadata = {
        title : 'My Dev Tour',
        description: 'Blog about technology and programming languages',
    }
    try {
        if (req.cookies.token) {
            res.redirect('/mainboard')
        }
        res.render('admin/main', { metadata, layout: loginPanel })
    }
    catch(error) {
        console.log(error)
  }
})

router.get('/register', (req, res) => {
    const metadata = {
        title: 'My Dev Tour',
        description: 'Blog about technology and programming languages',
    }
    try {
        if (req.cookies.token) {
            res.redirect('/mainboard')
        } else {
        res.render('admin/register', {
            metadata, layout: loginPanel
        })
    }
    } catch (error) {
        console.log(error)
    }
});

// Registro de usuario
 
router.post('/register', async (req, res) => {
    const name = req.body.name;
    const lname = req.body.lname;
    const user = req.body.usuario;
    const pass = req.body.contra;
    try {
    const passwordHash = await bcrypt.hash(pass, 5)
    try {
        const newUser = await Userbd.create({ name: name, lname: lname,username: user, password: passwordHash});
        res.redirect('/admin');
        
    } 
    catch(error) {
        console.log('Ocurrió un error inesperado')
    }
    }
    catch (error) {
        console.log("Ha ocurrido un error interno")
    }
})
//

// Login de usuario

router.post('/admin', async (req, res) => {
    const userToCheck = req.body.usuario;
    const passToCheck = req.body.contra;
    try {
        const usernameFound = await Userbd.findOne({username: userToCheck})
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

// Panel de usuario
router.get('/mainboard',authUser, async (req, res) => {
    const metadata = {
        title : 'My Dev Tour',
        description: 'Blog about technology and programming languages',
    }

    try {
        const data = await Post.find();
        
        res.render('admin/mainboard', {data, metadata, layout: adminPanel})
    } catch (error) {
        console.log(error);
    }
  })

router.get('/post/:id', authUser, async (req, res) => {
    const metadata = {
        title : 'My Dev Tour',
        description: 'Blog about technology and programming languages',
    }
    if (req.cookies) {
        res.render('admin/', { metadata, data, layout: adminPanel })
    }
})

router.get('/add_post', authUser, async (req, res) => {
    const metadata = {
        title : 'My Dev Tour',
        description: 'Blog about technology and programming languages',
    }
    res.render('admin/add_post', {
        layout: adminPanel,
        metadata})
})


router.post('/add_post', authUser, async(req, res) => {
    const metadata = {
        title : 'My Dev Tour',
        description: 'Blog about technology and programming languages',
    }
    try {
        try {
            const newPost = new Post({
                title: req.body.titulo,
                description: req.body.description,  
                body: req.body.cuerpo,
            })
        await Post.create(newPost);
        res.redirect('/mainboard')
        }
        catch (error) {
            throw new Error(error)
        }

    } catch (error) {
        console.log(error);
    }
})

router.get('/edit_post/:id' ,authUser ,async (req, res) => {
    const metadata = {
        title : 'My Dev Tour',
        description: 'Blog about technology and programming languages',
    }
    try {
        const postId = req.params.id
        const post = await Post.findById({ _id : postId})
        res.render('admin/edit_post', {
            metadata, post, layout: adminPanel
        })
    } catch (error) {

    }
});

router.put('/edit_post/:id' ,authUser ,async (req, res) => {
    const metadata = {
        title : 'My Dev Tour',
        description: 'Blog about technology and programming languages',
    }
    try {
        const postId = req.params.id
        const post = await Post.findByIdAndUpdate(postId,{
            title: req.body.title,
            description: req.body.description,
            body: req.body.body,
            updatedAt: Date.now(),
         })
        res.redirect(`admin/edit_post/${postId}`, {
            metadata, post, layout: adminPanel
        })
    } catch (error) {
        console.log(error)
    }
});

router.delete('/delete_post/:id', authUser, async (req, res ) => {
    try {
        await Post.deleteOne({ _id : req.params.id})
        res.redirect('/mainboard')
    } catch (error) {
        console.log(error)
    }
})

router.get('/logout', authUser, (req, res) => {
    res.clearCookie('token');
    res.redirect('/')
})

module.exports.admin = router;