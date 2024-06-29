const express = require('express');

const router = express.Router();

router.get('/',(req, res) => {
    const metadata = {
        title : 'My Dev Tour',
        description: 'Blog about technology and programming languages',
    }
    res.render('index', { metadata })
})

router.post('/search', (req, res) => {

})

router.get('/posts', (req,res) => {
    const metadata = {
        title : 'My Dev Tour',
        description: 'Blog about technology and programming languages',
    }
    res.render('posts', { metadata })
})

router.get('/about',(req,res) => {
    const metadata = {
        title : 'My Dev Tour',
        description: 'Blog about technology and programming languages',
    }
    res.render('about', { metadata })
})

router.get('/contact', (req, res) => {
    const metadata = {
        title : 'My Dev Tour',
        description: 'Blog about technology and programming languages',
    }
    res.render('contact', { metadata })
})
module.exports.routes = router;