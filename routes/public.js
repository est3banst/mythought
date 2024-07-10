const express = require('express');
const post = require('../models/Post')

const router = express.Router();

router.get('/', async (req, res) => {
    const metadata = {
        title : 'My Dev Tour',
        description: 'Blog about technology and programming languages',
    }
    
    try {
        let pageCon = 5
        let page = req.query.page || 1;
        const displayPages = (pageCon * page) - pageCon
        const blogData = await post.aggregate([ {  $sort: { createdAt: + 1} }]).skip(displayPages).limit(pageCon).exec();

        const numPosts = await post.countDocuments()
        const nextpage = parseInt(page) + 1
        const hasMorePage = nextpage <= Math.ceil(numPosts / pageCon);

        res.render('index', { metadata, blogData, current: page, nextpage: hasMorePage ? nextpage : null })
    } catch (error) {
        console.log(error)
    }
})

router.post('/search', async (req, res) => {
    const searchObj = req.body.search;
        const metadata = {
            title : 'My Dev Tour',
            description: 'Blog about technology and programming languages',
        }        
        try {
        const searchRes = searchObj.replace(/[^a-zA-Z0-9]/g,"")
        const blogData = await post.find({
            $or : [
                {title: { $regex: new RegExp(searchRes, 'i') }},
                {body: {$regex: new RegExp(searchRes, 'i')}}
            ]
        });
        res.render("search", {
            blogData,
            metadata,
        })
    }
    catch (error) {
        console.log(error)
    }
    
})
router.get('/post/:id', async (req, res) => {
    let identifier = req.params.id
    try {
        const postData = await post.findById({_id : identifier}) 
        const metadata = {
            title: postData.title,
            description : 'Blog about technology and programming languages'
        } 
        res.render('post', {
            metadata, postData
        })

    }
    catch(error) {
        console.log(error)
    }
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