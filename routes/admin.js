const express = require('express');
const post = require('../models/Post');

const app = express();

const router = express.Router();
const posts = {};

const authUser = (req, res, next) => {
    const user = req.body.user;
    const password = req.body.password
    if (!user) {

    }
    if (!password) {

    }

}

router.get('/', (req, res) => {
    const metadata = {
        title : 'My Dev Tour',
        description: 'Blog about technology and programming languages',
    }
    res.render('mainboard', { metadata })
})
router.get('/post/:id', (req, res) => {
    const metadata = {
        title : 'My Dev Tour',
        description: 'Blog about technology and programming languages',
    }
    res.render('/', { metadata })
})

router.post('/add_post',(req, res) => {
    const postTitle = req.body.title;
    const bodyPost = req.body.post;
    const newPost = post.create({
        title : postTitle,
        body: bodyPost
    }) 
    res.redirect('/');

})

router.put('/edit_post/:id',(req, res) => {
    
})
router.delete('/delete_post/:id',(req, res ) => {

})

module.exports.admin = router;