const express = require('express');

const app = express();

const router = express.Router();
const posts = {};


router.post('/add_post',(req, res) => {
    const title = req.body.title;
    const post = req.body.post;
    const newPost = ({title : title,
                      post : post,
    })
    res.redirect('/');

})

router.put('/edit_post',(req, res) => {
    
})
router.delete('/delete_post',(req, res ) => {

})

module.exports.admin = router;